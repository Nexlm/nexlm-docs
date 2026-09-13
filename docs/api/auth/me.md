# Current session

```http
GET /api/auth/me
```

**User**

Returns the user attached to the token, as loaded by the auth middleware.

## Response `200`

```json
{ "user": { "id": "…", "email": "…", "displayName": "…", "emailVerified": true, "kycStatus": "VERIFIED", "…": "…" } }
```

For the same data plus reputation stats, use [`GET /api/users/me`](../users/me).

## Errors

| Status | Code |
| --- | --- |
| 401 | `UNAUTHORIZED`, `SESSION_EXPIRED` |
| 403 | `ACCOUNT_RESTRICTED` |
