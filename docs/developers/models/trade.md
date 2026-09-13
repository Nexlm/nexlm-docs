# Trade

| Field | Type | Notes |
| --- | --- | --- |
| `id` | String | |
| `orderId` | String | |
| `buyerId` / `sellerId` | String | Resolved from order type and taker |
| `xlmAmount` | Decimal(20,7) | Copied from the order |
| `ngnRate` | Decimal(14,2) | Copied from the order |
| `ngnAmount` | Decimal(18,2) | `xlmAmount × ngnRate`, rounded half-up to the kobo |
| `paymentMethod` | `PaymentMethod` | Chosen by the taker |
| `status` | `TradeStatus` | See [state machine](../trade-state-machine) |
| `escrowPublicKey` | String?, unique | Stored **before** the lock is submitted |
| `escrowTxHash` | String? | Lock transaction |
| `releaseTxHash` | String? | |
| `refundTxHash` | String? | |
| `cancelReason` | String? | `BUYER_CANCELLED`, `PAYMENT_TIMEOUT`, `ESCROW_FAILED` |
| `paymentDeadline` | DateTime | Reset to `now + window` when escrow is confirmed |
| `paidAt` / `completedAt` / `cancelledAt` | DateTime? | |
| `createdAt` / `updatedAt` | DateTime | `updatedAt` drives reconciliation |

## Party resolution

| Order type | Buyer | Seller |
| --- | --- | --- |
| `SELL` | Taker | Maker |
| `BUY` | Maker | Taker |

The seller always funds escrow.
