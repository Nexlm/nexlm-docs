# Local setup

## Prerequisites

- Node.js 20 or newer
- PostgreSQL 14+ — or Docker to run the bundled compose file
- Git

## 1. Install

```bash
git clone https://github.com/Nexlm/nexlm.git
cd nexlm
npm install
```

## 2. Start PostgreSQL

```bash
docker compose up -d
```

This starts Postgres 16 on `localhost:5432` with user/password `postgres` and database `nexlm`.

::: warning Database encoding
The database must use UTF-8. Nexlm stores "₦" and other non-ASCII characters in chat messages. Windows installs that default to `WIN1252` will fail with Postgres error `22P05`.
:::

## 3. Configure the server

```bash
cp server/.env.example server/.env
```

Generate the secrets and paste them into `server/.env`:

```bash
# 32-byte encryption key for wallet secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# JWT secret
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"

# Platform escrow co-signer (run from server/)
node -e "import('@stellar/stellar-sdk').then(s => console.log(s.Keypair.random().secret()))"
```

See [environment variables](./environment-variables) for everything else. The defaults target Stellar testnet.

## 4. Migrate and seed

```bash
npm run db:migrate
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='choose-one-1' npm run db:seed
```

## 5. Run

```bash
npm run dev:server   # API on http://localhost:4000
npm run dev:client   # app on http://localhost:5173
```

The Vite dev server proxies `/api`, `/uploads` and `/socket.io` to the API.

## 6. Try a trade

1. Register two users in separate browsers. On testnet each wallet receives 10,000 test XLM.
2. Verification emails print to the server log when SMTP isn't configured — open the link.
3. Without Smile ID, KYC goes to manual review: approve both users as the admin.
4. As user A, add a payout account and post a sell order. As user B, buy it.

Or run the automated [smoke test](./testing#smoke-test).
