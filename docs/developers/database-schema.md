# Database schema

Defined in `server/prisma/schema.prisma`. All IDs are CUIDs.

```
User 1───* PaymentAccount
User 1───* Order 1───* Trade
User 1───* Trade (as buyer)      Trade 1───* Message
User 1───* Trade (as seller)     Trade 1───* Transaction
User 1───* Message (sender)
User 1───* Transaction
```

## Tables

| Model | Purpose | Page |
| --- | --- | --- |
| `User` | Accounts, KYC state and custodial wallet | [User](./models/user) |
| `PaymentAccount` | Seller payout accounts | [PaymentAccount](./models/payment-account) |
| `Order` | Buy and sell offers | [Order](./models/order) |
| `Trade` | A matched order with escrow state | [Trade](./models/trade) |
| `Message` | Trade chat and system messages | [Message](./models/message) |
| `Transaction` | Ledger of platform-initiated Stellar operations | [Transaction](./models/transaction) |

## Enums

| Enum | Values |
| --- | --- |
| `Role` | `USER`, `ADMIN` |
| `UserStatus` | `ACTIVE`, `SUSPENDED`, `BANNED` |
| `KycStatus` | `UNVERIFIED`, `PENDING`, `VERIFIED`, `REJECTED` |
| `KycIdType` | `BVN`, `NIN` |
| `PaymentMethod` | `BANK_TRANSFER`, `OPAY`, `PALMPAY`, `KUDA`, `MONIEPOINT` |
| `OrderType` | `BUY`, `SELL` |
| `OrderStatus` | `ACTIVE`, `FILLED`, `CANCELLED`, `EXPIRED` |
| `TradeStatus` | `PENDING_ESCROW`, `ESCROW_LOCKED`, `PAID`, `RELEASING`, `REFUNDING`, `COMPLETED`, `CANCELLED` |
| `TransactionType` | `WITHDRAWAL`, `ESCROW_LOCK`, `ESCROW_RELEASE`, `ESCROW_REFUND` |

## Decimal columns

| Column | Type | Why |
| --- | --- | --- |
| XLM amounts | `Decimal(20, 7)` | Stellar has 7 decimal places (stroops) |
| NGN rates | `Decimal(14, 2)` | Kobo precision |
| NGN totals | `Decimal(18, 2)` | Room for large trades |

Prisma returns decimals as `Decimal` objects and serialises them to JSON strings. Never convert them with `Number()` for money math — see [amounts](./amounts-and-precision).

## Indexes

- `Order (status, type, expiresAt)` — market queries and expiry job
- `Trade (status, paymentDeadline)` — auto-refund job
- `Trade (buyerId)`, `Trade (sellerId)` — "my trades" and reputation
- `Message (tradeId, createdAt)` — chat history
- `Transaction (userId, createdAt)` — wallet ledger
