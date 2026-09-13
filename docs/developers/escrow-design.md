# Escrow design

## Goals

1. Funds in a trade can only ever go to the **buyer** or back to the **seller**.
2. Each trade is independently verifiable on a public explorer.
3. A bug or crash in one trade cannot affect funds in another.
4. No custom smart contract risk — native Stellar operations only.

## Model: one account per trade

For every trade Nexlm generates a fresh keypair and creates a new Stellar account funded by the seller.

| Property | Value |
| --- | --- |
| Starting balance | trade amount + `ESCROW_OVERHEAD_XLM` (2 XLM) |
| Master key weight | 0 (disabled) |
| Signers | Platform key, weight 1 |
| Thresholds | low = med = high = 1 |

The 2 XLM covers the 1 XLM account minimum, 0.5 XLM for the extra signer subentry, and fees. Whatever is unused returns to the seller via `accountMerge`.

## Why disable the escrow master key?

The setup `setOptions` runs in the **same transaction** that creates the account, signed by both the seller and the new escrow key. Once it lands, the escrow's secret has no power, so there's no reason to store it — and nothing to leak.

## Why not claimable balances or Soroban?

| Option | Trade-off |
| --- | --- |
| Claimable balances | Need predicates known in advance; releasing depends on off-chain Naira confirmation, which a predicate can't express |
| Soroban contract | Adds contract risk and audit scope for what native multisig already handles |
| Shared escrow account | Commingles funds and makes per-trade verification and failure isolation harder |

## Traceability

The escrow public key is written to the trade **before** the lock is submitted. Even if the lock succeeds and the next database write fails, the funds' location is known and [reconciliation](./reconciliation) can finish the job.

See [escrow operations](./escrow-operations) for the exact transactions.
