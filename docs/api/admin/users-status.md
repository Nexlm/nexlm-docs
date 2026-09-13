# Change user status

```http
PATCH /api/admin/users/:id/status
```

**Admin**

## Body

| Field | Type |
| --- | --- |
| `status` | `ACTIVE`, `SUSPENDED` or `BANNED` |

## Effects

- Updates the user's status.
- When the new status isn't `ACTIVE`, all the user's `ACTIVE` orders are set to `CANCELLED`.
- Restricted users receive `403 ACCOUNT_RESTRICTED` on their next request and can't connect sockets.

## Response `200`

The updated user (admin fields).

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `BAD_REQUEST` | Changing your own status, or targeting an admin |
| 404 | `NOT_FOUND` | |
