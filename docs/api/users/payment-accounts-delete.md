# Delete a payout account

```http
DELETE /api/users/me/payment-accounts/:id
```

**User**

Deletes one of your own payout accounts.

## Response `204`

No body.

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 404 | `NOT_FOUND` | No account with this ID belongs to you |
