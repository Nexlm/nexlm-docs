# Health check

```http
GET /health
```

**Public** · not under `/api`

Returns `200` when the process is serving requests. It doesn't query the database or Horizon, so it's safe for load balancer checks.

```json
{
  "status": "ok",
  "network": "testnet",
  "time": "2026-09-13T15:06:15.624Z"
}
```
