# Stellar integration

All Stellar access lives in `server/src/stellar/`.

| Module | Exports |
| --- | --- |
| `client.js` | `horizon`, `networkPassphrase`, `platformKeypair()`, `accountExists()`, `submitTransaction()`, `wrapHorizonError()`, explorer URL helpers |
| `wallet.js` | `generateKeypair()`, `fundTestnetAccount()`, `getXlmBalance()`, `getPaymentHistory()` |
| `payments.js` | `sendXlm()` |
| `escrow.js` | `createEscrowKeypair()`, `lockEscrow()`, `releaseEscrow()`, `refundEscrow()`, `findEscrowTransactions()`, `ESCROW_MEMOS` |

## Networks

| `STELLAR_NETWORK` | Passphrase | Explorer |
| --- | --- | --- |
| `testnet` | `Networks.TESTNET` | stellar.expert/explorer/testnet |
| `public` | `Networks.PUBLIC` | stellar.expert/explorer/public |

Set `HORIZON_URL` to a Horizon instance for the same network.

## Error mapping

`wrapHorizonError` converts SDK errors into `AppError`s:

| Horizon response | Result |
| --- | --- |
| Transaction rejected with `extras.result_codes` | `502 STELLAR_TX_FAILED`, with result codes in `details` |
| Anything else (timeouts, network errors, 5xx) | `503 HORIZON_UNAVAILABLE` |

This distinction matters: services only roll back state on `STELLAR_TX_FAILED`, where the ledger definitively did not change. See [reconciliation](./reconciliation).

## Fees and timeouts

- Every transaction uses `BASE_FEE` (100 stroops per operation).
- Every transaction has a 60-second timeout, which bounds how long an uncertain outcome can remain uncertain.

## Balances

`getXlmBalance` computes spendable XLM as:

```
minimum   = (2 + subentry_count + num_sponsoring − num_sponsored) × 0.5 XLM
available = balance − minimum − selling_liabilities − 0.01 XLM
```

Unfunded accounts return `{ funded: false, balance: '0', available: '0' }` instead of throwing.
