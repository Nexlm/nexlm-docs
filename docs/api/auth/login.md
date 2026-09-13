# Log in

```http
POST /api/auth/login
```

**Public** · rate limited (20 / 15 min)

## Body

| Field | Type |
| --- | --- |
| `email` | string |
| `password` | string |

## Response `200`

Same shape as [register](./register): `{ user, token }`.

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Missing fields |
| 401 | `INVALID_CREDENTIALS` | Unknown email or wrong password (indistinguishable by design) |
| 403 | `ACCOUNT_RESTRICTED` | Suspended or banned |
| 429 | `RATE_LIMITED` | |
