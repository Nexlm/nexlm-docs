# PaymentAccount

A seller's Naira payout destination.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | String | |
| `userId` | String | Cascade-deleted with the user |
| `method` | `PaymentMethod` | |
| `bankName` | String? | Required by validation when `method = BANK_TRANSFER` |
| `accountName` | String | 2–80 chars |
| `accountNumber` | String | Exactly 10 digits |
| `createdAt` | DateTime | |

**Unique:** `(userId, method, accountNumber)`

## Usage

- Posting a `SELL` order requires one account per accepted method.
- Opening a trade requires the seller to have an account for the chosen method.
- The trade detail endpoint returns the seller's **oldest** account for the trade's method as `paymentAccount`.
- Users can store at most 10 accounts.
