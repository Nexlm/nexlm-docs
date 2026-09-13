# List payout accounts

```http
GET /api/users/me/payment-accounts
```

**User**

Returns the user's payout accounts, oldest first.

## Response `200`

```json
{
  "items": [
    {
      "id": "cmf0y…",
      "userId": "cmf0x…",
      "method": "OPAY",
      "bankName": null,
      "accountName": "Emeka Okafor",
      "accountNumber": "8031234567",
      "createdAt": "2026-09-13T15:05:00.000Z"
    }
  ]
}
```
