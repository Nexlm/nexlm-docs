# Environment variables

The server validates its environment with zod at startup (`src/config/env.js`) and exits with a list of problems if anything is invalid. Empty values are treated as unset.

## Server

### Core

| Variable | Default | Description |
| --- | --- | --- |
| `NODE_ENV` | `development` | `development`, `test` or `production` |
| `PORT` | `4000` | HTTP port |
| `CLIENT_URL` | `http://localhost:5173` | Comma-separated allowed origins for CORS and sockets. The first is used for email links. |
| `PUBLIC_API_URL` | `http://localhost:4000` | Base URL used for locally stored upload URLs |
| `DATABASE_URL` | — | **Required.** PostgreSQL connection string |
| `LOG_LEVEL` | `info` (`error` in test) | `debug`, `info`, `warn`, `error` |

### Auth and crypto

| Variable | Default | Description |
| --- | --- | --- |
| `JWT_SECRET` | — | **Required.** At least 32 characters |
| `JWT_EXPIRES_IN` | `7d` | Session lifetime |
| `ENCRYPTION_KEY` | — | **Required.** 64 hex characters (32 bytes). Encrypts wallet secrets and keys ID fingerprints. |

::: danger Never rotate ENCRYPTION_KEY casually
Every stored wallet secret is encrypted with it. Changing the key without re-encrypting makes every custodial wallet unusable.
:::

### Stellar

| Variable | Default | Description |
| --- | --- | --- |
| `STELLAR_NETWORK` | `testnet` | `testnet` or `public` |
| `HORIZON_URL` | `https://horizon-testnet.stellar.org` | Horizon endpoint matching the network |
| `PLATFORM_SECRET_KEY` | — | **Required.** Secret seed of the escrow co-signer. It doesn't need a funded account. |

### Trading rules

| Variable | Default | Description |
| --- | --- | --- |
| `TRADE_PAYMENT_WINDOW_MINUTES` | `15` | Time buyers have to pay |
| `ORDER_TTL_MINUTES` | `30` | Order lifetime |
| `MIN_TRADE_XLM` | `10` | Minimum order size |
| `MAX_TRADE_XLM` | `100000` | Maximum order size |
| `REQUIRE_KYC` | `true` | Require `VERIFIED` KYC to post orders and open trades |

### Email

| Variable | Default | Description |
| --- | --- | --- |
| `SMTP_HOST` | — | When unset, emails are logged instead of sent |
| `SMTP_PORT` | `587` | `465` enables TLS |
| `SMTP_USER` / `SMTP_PASS` | — | Credentials |
| `MAIL_FROM` | `Nexlm <no-reply@nexlm.app>` | Sender |

### Integrations

| Variable | Default | Description |
| --- | --- | --- |
| `CLOUDINARY_URL` | — | When unset, uploads are written to `server/uploads` |
| `SMILE_PARTNER_ID` / `SMILE_API_KEY` | — | When unset, KYC goes to manual review |
| `SMILE_ENV` | `sandbox` | `sandbox` or `production` |

### Seed script

| Variable | Description |
| --- | --- |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Required by `npm run db:seed` |
| `ADMIN_DISPLAY_NAME` | Optional, defaults to `nexlm_admin` |

## Client

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_API_URL` | empty | API origin in production. Leave empty in development to use the Vite proxy. |
| `VITE_DEV_API_TARGET` | `http://localhost:4000` | Proxy target for `npm run dev` |
