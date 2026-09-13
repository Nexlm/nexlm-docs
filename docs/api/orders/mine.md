# My orders

```http
GET /api/orders/mine?status=ACTIVE&page=1
```

**User**

All orders the user created, newest first. [Paginated](../pagination).

## Query

| Param | Notes |
| --- | --- |
| `status` | Optional: `ACTIVE`, `FILLED`, `CANCELLED`, `EXPIRED` |
| `page`, `pageSize` | |

## Response `200`

Order objects (without `user`) with a trade count:

```json
{
  "items": [
    {
      "id": "cmf1…",
      "type": "SELL",
      "xlmAmount": "100",
      "ngnRate": "520.5",
      "paymentMethods": ["OPAY"],
      "status": "FILLED",
      "expiresAt": "2026-09-13T15:36:00.000Z",
      "_count": { "trades": 1 },
      "…": "…"
    }
  ],
  "pagination": { "…": "…" }
}
```

::: info
An `ACTIVE` order whose `expiresAt` has passed may briefly appear here until the expiry job marks it `EXPIRED` (within 30 seconds).
:::
