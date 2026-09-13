# Developer troubleshooting

## `Invalid environment configuration`

The server lists every failing variable and exits. Common ones:

| Message | Fix |
| --- | --- |
| `JWT_SECRET must be at least 32 characters` | Generate a longer secret |
| `ENCRYPTION_KEY must be 32 bytes encoded as hex` | Use exactly 64 hex characters |
| `PLATFORM_SECRET_KEY must be a Stellar secret seed` | Use an `S…` seed, not a `G…` public key |

## `@prisma/client did not initialize yet`

Run `npm run db:generate -w server`. With npm 11's install-script approval, also run `npm approve-scripts prisma @prisma/engines` and `npm rebuild prisma @prisma/engines`.

## Postgres error `22P05` … has no equivalent in encoding "WIN1252"

The database was created with a non-UTF-8 encoding and can't store "₦". Recreate it:

```sql
CREATE DATABASE nexlm WITH ENCODING 'UTF8' LC_COLLATE 'C' LC_CTYPE 'C' TEMPLATE template0;
```

## Wallets stay `funded: false` on testnet

Friendbot occasionally rate-limits or is down. Fund manually:

```bash
curl "https://friendbot.stellar.org?addr=G..."
```

## CORS errors in the browser

Add the client origin to `CLIENT_URL` (comma-separated for several). In development leave `VITE_API_URL` empty so the Vite proxy is used.

## Socket `connect_error: unauthorized`

The token is missing, expired, or belongs to a restricted user. Log in again.

## `STELLAR_TX_FAILED` with `op_underfunded`

The seller doesn't have `amount + 2 XLM` spendable, often because of other open escrows. Check `GET /api/wallet`.

## `tx_bad_seq`

Two transactions were submitted from the same account at once. Retry; if it's frequent, serialise submissions per account.

## Uploaded images return 404 after redeploy

Local uploads live on the instance disk. Configure `CLOUDINARY_URL` in production.
