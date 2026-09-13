# 0004 Reconcile unknown Stellar outcomes instead of guessing

- Status: Accepted
- Date: 2026-09-13

## Context

A Horizon submission can time out after the transaction has been applied. Treating that as failure risks double releases on retry; treating it as success risks marking trades complete when nothing moved. An early end-to-end test also showed a lock succeeding on-chain while the following database write failed, leaving no record of where the funds went.

## Decision

1. Store the escrow address on the trade before submitting the lock.
2. Roll back only on `STELLAR_TX_FAILED` (definitive rejection).
3. For any other error, keep the trade in `PENDING_ESCROW`, `RELEASING` or `REFUNDING`.
4. A job reconciles trades that stay there beyond the 60-second transaction timeout by reading the escrow account and its transaction memos.

## Consequences

- ✅ No double spends and no false completions
- ✅ Funds are always traceable to a trade
- ⚠️ Users may see a transitional status for a few minutes during Horizon incidents
- ⚠️ Rare cases (escrow merged without a recognised memo) need manual investigation
