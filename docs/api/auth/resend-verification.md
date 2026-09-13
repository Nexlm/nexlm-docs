# Resend verification email

```http
POST /api/auth/resend-verification
```

**User** · rate limited (20 / 15 min)

Generates a new verification token (invalidating the previous link) and emails it.

## Response `200`

```json
{ "ok": true }
```

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 409 | `CONFLICT` | Email already verified |
| 429 | `RATE_LIMITED` | |
| 500 | `INTERNAL_ERROR` | SMTP delivery failed |
