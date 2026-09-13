# Get an order

```http
GET /api/orders/:id
```

**Public**

Returns any order regardless of status, with the maker's public profile and stats — same shape as items in [list market orders](./list).

## Errors

| Status | Code |
| --- | --- |
| 404 | `NOT_FOUND` |
