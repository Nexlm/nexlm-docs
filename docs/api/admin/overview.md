# Admin overview

```http
GET /api/admin/overview
```

**Admin**

## Response `200`

```json
{
  "users": { "total": 523, "verified": 410, "pendingKyc": 7 },
  "trades": {
    "active": 12,
    "completed30d": 1840,
    "cancelled30d": 61,
    "completionRate30d": 96.8
  },
  "volume30d": { "ngn": "95731200.5", "xlm": "183920.1234567" },
  "activeOrders": 88
}
```

| Field | Definition |
| --- | --- |
| `trades.active` | Status in `PENDING_ESCROW`, `ESCROW_LOCKED`, `PAID`, `RELEASING`, `REFUNDING` |
| `completed30d` / `cancelled30d` | By `completedAt` / `cancelledAt` in the last 30 days |
| `completionRate30d` | Percentage, or `null` with no closed trades |
| `volume30d` | Sums over trades completed in the last 30 days; `"0"` when none |
| `activeOrders` | `ACTIVE` and not expired |
