# Get a trade (admin)

```http
GET /api/admin/trades/:id
```

**Admin**

Returns the same payload as [`GET /api/trades/:id`](../trades/get) (with `role: null` and `actions: []`) plus the full chat:

```json
{
  "id": "cmf3…",
  "status": "PAID",
  "paymentAccount": { "…": "…" },
  "links": { "…": "…" },
  "messages": [{ "id": "…", "content": "…", "imageUrl": null, "isSystem": true, "…": "…" }]
}
```

Admins can also join the trade's socket room to watch it live.
