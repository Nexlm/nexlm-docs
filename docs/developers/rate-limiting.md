# Rate limiting

Implemented with `express-rate-limit` in `src/middleware/rateLimit.js`. Limits use the `draft-7` `RateLimit` headers and are disabled when `NODE_ENV=test`.

| Limiter | Window | Limit | Key | Applied to |
| --- | --- | --- | --- | --- |
| `apiLimiter` | 1 minute | 300 | IP | All `/api` routes |
| `authLimiter` | 15 minutes | 20 | IP | register, login, resend verification, forgot/reset password, KYC submission |
| `sensitiveLimiter` | 1 hour | 10 | User ID (IP fallback) | Withdrawals |

Exceeding a limit returns:

```json
{ "error": { "code": "RATE_LIMITED", "message": "Too many requests. Please slow down and try again shortly." } }
```

with status `429`.

## Behind a proxy

`app.set('trust proxy', 1)` makes `req.ip` the client address when running behind one reverse proxy (Render, Railway, Nginx). Adjust if your deployment has more hops.

## Scaling out

The default store is in-memory, so limits are per instance. When running multiple API instances, configure a shared store such as Redis.
