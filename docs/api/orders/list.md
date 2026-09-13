# List market orders

```http
GET /api/orders?type=SELL&paymentMethod=OPAY&minAmount=50&page=1
```

**Public**

Active, unexpired orders from active users. [Paginated](../pagination).

## Query

| Param | Default | Notes |
| --- | --- | --- |
| `type` | `SELL` | `SELL` (for buyers) or `BUY` (for sellers) |
| `paymentMethod` | — | Only orders accepting this method |
| `minAmount` | — | Only orders with `xlmAmount ≥ minAmount` |
| `page`, `pageSize` | 1, 20 | |

## Sorting

- `SELL`: `ngnRate` ascending (cheapest first)
- `BUY`: `ngnRate` descending (highest bid first)
- Ties: oldest first

## Response `200`

```json
{
  "items": [
    {
      "id": "cmf1…",
      "userId": "cmf0x…",
      "type": "SELL",
      "xlmAmount": "100",
      "ngnRate": "520.5",
      "paymentMethods": ["OPAY"],
      "terms": "Own-name accounts only",
      "status": "ACTIVE",
      "expiresAt": "2026-09-13T15:36:00.000Z",
      "createdAt": "2026-09-13T15:06:00.000Z",
      "updatedAt": "2026-09-13T15:06:00.000Z",
      "user": {
        "id": "cmf0x…",
        "displayName": "emeka_ng",
        "kycStatus": "VERIFIED",
        "createdAt": "2026-09-01T10:00:00.000Z",
        "stats": { "completedTrades": 12, "completionRate": 92.3 }
      }
    }
  ],
  "pagination": { "page": 1, "pageSize": 20, "total": 1, "totalPages": 1, "hasMore": false }
}
```
