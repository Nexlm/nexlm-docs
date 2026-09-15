# Deployment

Nexlm runs in two shapes from the same code:

| Shape | Entry | Realtime | Background jobs | Best for |
| --- | --- | --- | --- | --- |
| **Vercel (serverless)** | `server/api/index.js` | Polling fallback | On traffic + cron | Current production setup |
| **Long-running server** (Render, Railway, VPS) | `server/src/index.js` | Socket.io | Interval scheduler | Instant updates at scale |

## Vercel (current setup)

Two Vercel projects are connected to the `Nexlm/nexlm` GitHub repo and deploy on every push to `main`.

| Project | Root Directory | Framework preset | Production URL |
| --- | --- | --- | --- |
| `nexlm-server` | `server` | Other | `https://nexlm-server.vercel.app` |
| `nexlm-client` | `client` | Vite | `https://nexlm-client.vercel.app` |

### 1. Create a database

Create a PostgreSQL database — for example **Neon** from Vercel → Storage → Marketplace — and copy its connection string (use the pooled URL with `?sslmode=require`).

### 2. Server environment variables

In `nexlm-server` → Settings → Environment Variables:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Your Postgres connection string |
| `JWT_SECRET` | 48+ random bytes, hex |
| `ENCRYPTION_KEY` | 32 random bytes, hex (64 chars) — **back this up** |
| `PLATFORM_SECRET_KEY` | A Stellar secret seed (`S…`) |
| `CRON_SECRET` | Random string (16+ chars) |
| `CLIENT_URL` | `https://nexlm-client.vercel.app` |
| `PUBLIC_API_URL` | `https://nexlm-server.vercel.app` |
| `STELLAR_NETWORK` | `testnet` |
| `HORIZON_URL` | `https://horizon-testnet.stellar.org` |
| `CLOUDINARY_URL` | Required for chat image uploads on Vercel |
| `REQUIRE_KYC` | Optional — `false` lets testers trade without KYC review |

Generate secrets locally:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"   # ENCRYPTION_KEY
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"   # JWT_SECRET
node -e "import('@stellar/stellar-sdk').then(s => console.log(s.Keypair.random().secret()))"  # PLATFORM_SECRET_KEY (run in server/)
```

Redeploy after saving. The build runs `npm run vercel-build`, which generates the Prisma client and applies migrations whenever `DATABASE_URL` is set.

::: tip Missing variables
If anything is missing, every API request returns `500 SERVER_NOT_CONFIGURED` with a `details` list of the variables to add — instead of Vercel's opaque `FUNCTION_INVOCATION_FAILED`.
:::

### 3. Client environment variable

In `nexlm-client` → Settings → Environment Variables, set `VITE_API_URL=https://nexlm-server.vercel.app` and redeploy. (Production builds default to that URL if it's unset.)

### 4. Create an admin

Run the seed script locally against the production database:

```bash
cd server
DATABASE_URL="<production url>" ENCRYPTION_KEY=<same key> JWT_SECRET=<any> PLATFORM_SECRET_KEY=<same seed> \
ADMIN_EMAIL=ops@example.com ADMIN_PASSWORD='a-long-password-1' npm run db:seed
```

### 5. Verify

```bash
curl https://nexlm-server.vercel.app/health
# {"status":"ok","network":"testnet","runtime":"serverless","realtime":false,...}
```

### How serverless mode works

- **API** — `vercel.json` rewrites every path to `api/index.js`, which boots the same Express app.
- **Realtime** — Socket.io isn't available on serverless functions. The client detects the failed connection and polls: the trade room and chat every 4 s, trade lists every 8 s, the market every 10 s.
- **Jobs** — order expiry, auto-refunds and reconciliation run at most every 15 s per instance whenever API traffic arrives. Viewing an overdue trade also settles it immediately. A daily Vercel Cron calls `/api/cron/tick` as a safety net; for minute-level coverage without traffic, point an external scheduler at the same endpoint with `Authorization: Bearer $CRON_SECRET`.
- **Uploads** — serverless disks are temporary, so uploads require `CLOUDINARY_URL`.
- **Email and Friendbot** — registration waits (up to 8 s) for wallet funding and the verification email so the function isn't frozen mid-request.

## Long-running server (Render)

The repository also includes `render.yaml` for a single always-on API with Socket.io and the interval scheduler:

| Setting | Value |
| --- | --- |
| Build | `npm ci && npm run db:generate -w server` |
| Pre-deploy | `npm run db:deploy -w server` |
| Start | `npm start -w server` |
| Health check | `/health` |

Set the same secrets as above, then point the client's `VITE_API_URL` at the Render URL.

## Going to mainnet

1. Set `STELLAR_NETWORK=public` and `HORIZON_URL=https://horizon.stellar.org`.
2. Use a new `PLATFORM_SECRET_KEY` generated offline and stored in a secrets manager.
3. Configure Smile ID production credentials (`SMILE_ENV=production`).
4. Configure Cloudinary and SMTP.
5. Review the [security model](./security-model) and rate limits.
6. Run the smoke test against a staging testnet deployment before every release.

::: danger Wallets are network-specific
Testnet user wallets don't exist on mainnet. Launch mainnet with a fresh database.
:::
