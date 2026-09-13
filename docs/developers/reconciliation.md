# Reconciliation

## The problem

A Stellar submission can time out after the network has already applied the transaction. If the server assumed failure it could double-spend on retry; if it assumed success it could mark a trade complete when no XLM moved.

## The approach

1. **Record intent first.** The escrow address is saved before the lock is submitted.
2. **Only roll back on definitive failure.** `STELLAR_TX_FAILED` means the ledger rejected the transaction; every other error leaves the trade in `PENDING_ESCROW`, `RELEASING` or `REFUNDING`.
3. **Wait out the timeout.** Transactions carry a 60-second time bound, after which they can never apply.
4. **Ask the ledger.** `jobs/reconcileTrades.js` runs every 60 seconds and calls `trade.service.reconcileTrade` for trades whose `updatedAt` is more than 2 minutes old.

## Decision table

`reconcileTrade` loads `accountExists(escrow)` and `findEscrowTransactions(escrow)`:

| Status | Escrow exists? | Matching memo found | Result |
| --- | --- | --- | --- |
| `PENDING_ESCROW` | yes | `lock` | `finalizeLock` → `ESCROW_LOCKED` with a fresh payment window |
| `PENDING_ESCROW` | yes | — | No action (retry next run) |
| `PENDING_ESCROW` | no | — | `CANCELLED` (`ESCROW_FAILED`), order reopened |
| `RELEASING` | no | `release` | `finalizeRelease` → `COMPLETED` |
| `REFUNDING` | no | `refund` | `finalizeRefund` → `CANCELLED` |
| `RELEASING` / `REFUNDING` | yes | — | Restore `PAID` if `paidAt` is set, else `ESCROW_LOCKED` |
| `RELEASING` / `REFUNDING` | no | none | Logged as `Escrow closed without a recognised transaction` |

The finalizers are the same functions the normal release/refund path uses, so ledger entries, system messages and socket events are identical.

## Verified behaviour

Tested against testnet data by forcing trades back into transitional states: a merged escrow was finalized with its original release hash, a refund was reconciled with its refund hash, and a never-funded escrow was cancelled with `ESCROW_FAILED`.
