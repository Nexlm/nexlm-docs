# List all trades

```http
GET /api/admin/trades?status=PAID&page=1
```

**Admin**

Every trade, most recently updated first. [Paginated](../pagination).

## Query

| Param | Values |
| --- | --- |
| `status` | Any `TradeStatus` |

## Response `200`

Trade objects with `buyer` and `seller` public profiles (no `role`, `actions` or payout details).
