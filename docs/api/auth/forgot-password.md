# Forgot password

```http
POST /api/auth/forgot-password
```

**Public** · rate limited (20 / 15 min)

Emails a password reset link valid for 1 hour.

## Body

| Field | Type |
| --- | --- |
| `email` | string |

## Response `200`

```json
{ "ok": true, "message": "If that email is registered, a reset link is on its way." }
```

The response is identical whether or not the email exists, so it can't be used to discover accounts.
