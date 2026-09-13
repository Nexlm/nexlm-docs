# Verify email

```http
POST /api/auth/verify-email
```

**Public**

Consumes the token from the verification email link (`/verify-email?token=…`).

## Body

| Field | Type | Rules |
| --- | --- | --- |
| `token` | string | 64 lowercase hex characters |

## Response `200`

```json
{ "user": { "id": "…", "emailVerified": true, "…": "…" } }
```

The token is cleared, so the link works only once.

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Malformed token |
| 400 | `BAD_REQUEST` | Unknown or already-used token |
