# Pagination

List endpoints accept:

| Query | Default | Rules |
| --- | --- | --- |
| `page` | `1` | Integer ≥ 1 |
| `pageSize` | `20` | Integer 1–100 |

and return:

```json
{
  "items": [],
  "pagination": {
    "page": 2,
    "pageSize": 20,
    "total": 45,
    "totalPages": 3,
    "hasMore": true
  }
}
```

`totalPages` is always at least `1`.

## Cursor pagination

[Wallet activity](./wallet/activity) reads from Stellar Horizon and uses a cursor instead:

```json
{ "items": [], "nextCursor": "123456789-1" }
```

Pass `nextCursor` as `?cursor=` to load the next page. `nextCursor` is `null` when there are no more records.
