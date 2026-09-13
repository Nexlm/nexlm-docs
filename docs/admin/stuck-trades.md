# Stuck trades

Three statuses are transitional and should last seconds:

| Status | Normally means |
| --- | --- |
| `PENDING_ESCROW` | The seller's lock transaction is being submitted |
| `RELEASING` | The release transaction is being submitted |
| `REFUNDING` | The refund transaction is being submitted |

## Why a trade can get stuck

If Horizon times out or the server restarts mid-operation, Nexlm doesn't know whether the Stellar transaction landed. It deliberately leaves the trade in its transitional state rather than guessing.

## Automatic reconciliation

A background job runs every minute and picks up trades that have been in one of these states for **more than 2 minutes**. Stellar transactions are built with a 60-second timeout, so after that point they can no longer land.

For each trade it reads the escrow account and its transaction history:

| Status | On-chain finding | Action |
| --- | --- | --- |
| `PENDING_ESCROW` | Escrow exists with a lock transaction | Marks the trade `ESCROW_LOCKED` and starts the payment window |
| `PENDING_ESCROW` | Escrow account doesn't exist | Cancels with reason `ESCROW_FAILED` and reopens the order |
| `RELEASING` | Escrow merged, release transaction found | Completes the trade with that hash |
| `REFUNDING` | Escrow merged, refund transaction found | Cancels the trade with that hash |
| `RELEASING` / `REFUNDING` | Escrow still exists | Restores `PAID` (if the buyer had paid) or `ESCROW_LOCKED` so it can be retried |

## When to step in

If a trade stays stuck for more than ~5 minutes, check the server logs for `Trade reconciliation failed` or `Escrow closed without a recognised transaction`, then inspect the escrow address on Stellar Expert. See the developer page on [reconciliation](/developers/reconciliation) for details.
