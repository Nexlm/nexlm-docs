# Transaction

A ledger of Stellar operations **initiated by the platform** on a user's behalf. Deposits and other external payments are not stored — they are read live from Horizon.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | String | |
| `userId` | String | Whose wallet the entry concerns |
| `tradeId` | String? | Set for escrow entries |
| `type` | `TransactionType` | |
| `xlmAmount` | Decimal(20,7) | Trade or withdrawal amount |
| `counterparty` | String? | Destination address or escrow account |
| `stellarTxHash` | String | |
| `createdAt` | DateTime | |

## Entries written

| Event | `type` | `userId` |
| --- | --- | --- |
| Withdrawal | `WITHDRAWAL` | Sender |
| Escrow funded | `ESCROW_LOCK` | Seller |
| Escrow released | `ESCROW_RELEASE` | Buyer |
| Escrow refunded | `ESCROW_REFUND` | Seller |

Escrow entries are written in the same database transaction that updates the trade status.
