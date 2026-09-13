# Escrow operations

All three are built in `server/src/stellar/escrow.js`. Each transaction uses `BASE_FEE` per operation, a 60-second timeout and a text memo.

## Lock

**Source account:** seller · **Signed by:** seller + escrow · **Memo:** `nexlm escrow lock`

| # | Operation | Source | Parameters |
| --- | --- | --- | --- |
| 1 | `createAccount` | seller | destination = escrow, startingBalance = amount + 2 |
| 2 | `setOptions` | escrow | signer = platform (weight 1), masterWeight = 0, thresholds = 1 |

The second operation's source account doesn't exist when the transaction is validated; Stellar checks its signature when the operation applies, after operation 1 has created it.

## Release

**Source account:** escrow · **Signed by:** platform · **Memo:** `nexlm escrow release`

| # | Operation | Parameters |
| --- | --- | --- |
| 1 | `payment` (or `createAccount` if the buyer account doesn't exist) | destination = buyer, amount |
| 2 | `setOptions` | remove platform signer (weight 0) |
| 3 | `accountMerge` | destination = seller |

The signer must be removed before the merge because accounts with subentries can't be merged. Signatures are verified before operations apply, so the platform signature still authorises the merge.

## Refund

**Source account:** escrow · **Signed by:** platform · **Memo:** `nexlm escrow refund`

| # | Operation | Parameters |
| --- | --- | --- |
| 1 | `setOptions` | remove platform signer |
| 2 | `accountMerge` | destination = seller |

## Verified on testnet

This sequence has been exercised end to end on testnet: lock → release to an existing account, lock → refund, and lock → release to a brand-new buyer account (via `createAccount`). After release the seller's balance reflects only the trade amount plus network fees; after refund only network fees.

## Lookup

`findEscrowTransactions(escrowPublicKey)` returns successful transactions touching the escrow account (Horizon keeps history after merges), each with `hash`, `memo` and `createdAt`. Reconciliation matches on `ESCROW_MEMOS`.
