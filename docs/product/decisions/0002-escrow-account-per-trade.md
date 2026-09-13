# 0002 One Stellar escrow account per trade

- Status: Accepted
- Date: 2026-09-13

## Context

Options for holding XLM during a trade:

1. A single shared escrow account with internal accounting
2. Claimable balances
3. A Soroban smart contract
4. A new multisig account per trade

## Decision

Create a new account per trade, funded by the seller with the trade amount + 2 XLM. In the same transaction, add the platform key as the sole effective signer and set the escrow master weight to 0. Release pays the buyer and merges the rest to the seller; refund merges everything to the seller.

## Consequences

- ✅ Funds for each trade are isolated and visible on a public explorer
- ✅ Only native operations — no contract code to audit
- ✅ The escrow's own secret is powerless and never stored
- ⚠️ Sellers need 2 XLM headroom per concurrent trade (mostly refunded)
- ⚠️ Each trade costs a few extra operations in fees (~0.00005 XLM)
- ⚠️ The platform key is a high-value secret; see the security model
- ❌ Rejected shared account: commingled funds and bugs could affect all trades
- ❌ Rejected claimable balances: release depends on off-chain payment confirmation that predicates can't express
