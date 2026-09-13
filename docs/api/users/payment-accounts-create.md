# Add a payout account

```http
POST /api/users/me/payment-accounts
```

**User**

## Body

| Field | Type | Rules |
| --- | --- | --- |
| `method` | enum | `BANK_TRANSFER`, `OPAY`, `PALMPAY`, `KUDA`, `MONIEPOINT` |
| `bankName` | string | Required for `BANK_TRANSFER`, 2–60 chars |
| `accountName` | string | 2–80 chars |
| `accountNumber` | string | Exactly 10 digits |

```json
{ "method": "BANK_TRANSFER", "bankName": "GTBank", "accountName": "Emeka Okafor", "accountNumber": "0123456789" }
```

## Response `201`

The created account (see [list](./payment-accounts-list)).

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | e.g. "Bank name is required for bank transfers" |
| 409 | `CONFLICT` | Same method and account number already saved |
| 422 | `TOO_MANY_ACCOUNTS` | 10 accounts already saved |
