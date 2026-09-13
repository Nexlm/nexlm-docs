# Cancel an order

```http
POST /api/orders/:id/cancel
```

**User**

Cancels one of your active, unexpired orders and broadcasts `order:removed`.

## Response `200`

The updated order with `status: "CANCELLED"`.

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 403 | `FORBIDDEN` | Not your order |
| 404 | `NOT_FOUND` | |
| 409 | `CONFLICT` | Not active, expired, or matched a moment ago |
