# List trade messages

```http
GET /api/trades/:id/messages
```

**User** (buyer, seller or admin)

All messages for the trade, oldest first (not paginated).

## Response `200`

```json
{
  "items": [
    {
      "id": "cmf4…",
      "tradeId": "cmf3…",
      "senderId": null,
      "content": "100 XLM is now locked in escrow. The buyer has 15 minutes to send ₦52050 and mark the order as paid.",
      "imageUrl": null,
      "isSystem": true,
      "createdAt": "2026-09-13T15:07:00.000Z",
      "sender": null
    },
    {
      "id": "cmf5…",
      "tradeId": "cmf3…",
      "senderId": "cmf0y…",
      "content": "Sent via OPay, receipt attached",
      "imageUrl": "https://res.cloudinary.com/…/receipt.png",
      "isSystem": false,
      "createdAt": "2026-09-13T15:09:30.000Z",
      "sender": { "id": "cmf0y…", "displayName": "amaka_ng" }
    }
  ]
}
```

## Errors

| Status | Code |
| --- | --- |
| 403 | `FORBIDDEN` |
| 404 | `NOT_FOUND` |
