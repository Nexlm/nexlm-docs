# Testing

```bash
npm test            # server + client unit tests
npm test -w server  # server only
npm test -w client  # client only
```

## Server unit tests

Vitest, in `server/tests/`. `vitest.config.js` sets a dummy environment so modules that read config can be imported without a database.

| File | Covers |
| --- | --- |
| `amount.test.js` | Stroop/kobo conversion, rejection of bad input, NGN rounding |
| `crypto.test.js` | Encryption round trip, unique IVs, wrong key, tampering |
| `pagination.test.js` | Page clamping and metadata |
| `tradeRules.test.js` | Party resolution, every action × role × status, deadlines, fallback status |
| `validators.test.js` | Registration, orders, withdrawals, KYC age, payout accounts, phone normalisation |
| `reputation.test.js` | Completion rate and stat folding |
| `fileType.test.js` | Image signature detection |

Keep business rules in pure modules (like `tradeRules.js`) so they can be tested without Prisma or Horizon.

## Client unit tests

`client/src/lib/*.test.js` — formatting and form helpers.

## Smoke test

`server/scripts/smoke-test.mjs` exercises a running API against **Stellar testnet** and a **disposable** database:

- registers two traders and funds them with Friendbot
- adds a payout account and posts a sell order
- opens a trade (real escrow lock), joins the socket room
- sends a chat message with an image
- marks paid, releases, and checks the buyer's on-chain balance increased by 100 XLM
- cancels a second trade and checks the order reopened
- forces a payment deadline into the past and waits for the scheduler's auto-refund
- withdraws XLM and verifies an email link

```bash
npm run dev:server   # in one terminal
API_URL=http://localhost:4000 npm run smoke -w server
```

::: danger
The smoke test writes directly to the database to skip email and KYC steps. It refuses to run with `NODE_ENV=production` or `STELLAR_NETWORK=public`.
:::

## CI

GitHub Actions validates the Prisma schema, generates the client, runs both test suites and builds the client on every push and pull request.
