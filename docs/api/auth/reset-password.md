# Reset password

```http
POST /api/auth/reset-password
```

**Public** · rate limited (20 / 15 min)

## Body

| Field | Type | Rules |
| --- | --- | --- |
| `token` | string | 64 hex characters from the reset link |
| `password` | string | 8–128 chars, a letter and a number |

## Response `200`

```json
{ "ok": true }
```

The token is cleared after use. Existing sessions stay valid.

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Weak password or malformed token |
| 400 | `BAD_REQUEST` | Unknown, used or expired token |
