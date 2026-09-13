# Get a user

```http
GET /api/admin/users/:id
```

**Admin**

## Response `200`

The admin user fields (see [list users](./users-list)) plus:

| Field | Contents |
| --- | --- |
| `stats` | `{ completedTrades, completionRate }` |
| `recentTrades` | Last 20 trades as buyer or seller, with `buyer` and `seller` public profiles |
| `paymentAccounts` | All payout accounts |

## Errors

| Status | Code |
| --- | --- |
| 404 | `NOT_FOUND` |
