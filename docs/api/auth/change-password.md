# Change password

```http
POST /api/auth/change-password
```

**User**

## Body

| Field | Type | Rules |
| --- | --- | --- |
| `currentPassword` | string | Required |
| `newPassword` | string | 8–128 chars, a letter and a number, different from `currentPassword` |

## Response `200`

```json
{ "ok": true }
```

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Weak or unchanged new password (`path: newPassword`) |
| 400 | `BAD_REQUEST` | Current password is incorrect |
