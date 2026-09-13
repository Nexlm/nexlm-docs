# Public trader profile

```http
GET /api/users/:displayName
```

**Public**

Looks up a trader by display name (case-insensitive). Banned users are not found.

## Response `200`

```json
{
  "id": "cmf0x…",
  "displayName": "emeka_ng",
  "kycStatus": "VERIFIED",
  "createdAt": "2026-09-01T10:00:00.000Z",
  "stats": { "completedTrades": 12, "completionRate": 92.3 },
  "activeOrders": [
    {
      "id": "cmf1…",
      "type": "SELL",
      "xlmAmount": "250",
      "ngnRate": "520.5",
      "paymentMethods": ["OPAY", "KUDA"],
      "terms": null,
      "status": "ACTIVE",
      "expiresAt": "2026-09-13T15:30:00.000Z",
      "…": "…"
    }
  ]
}
```

`activeOrders` contains up to 10 unexpired active orders, newest first. Email, phone and payout accounts are never included.

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Name shorter than 3 or longer than 24 characters |
| 404 | `NOT_FOUND` | "Trader not found" |
