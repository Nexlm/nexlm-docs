# Account status

From a user's detail page you can set their status.

| Status | Effect |
| --- | --- |
| **Active** | Normal access |
| **Suspended** | Temporary restriction: the user can't log in or use the API or sockets |
| **Banned** | Permanent restriction with the same effect; hidden from public profile lookups |

## What happens when you restrict a user

- Every request they make returns `403 ACCOUNT_RESTRICTED`.
- All of their **active orders are cancelled** so nobody can match them.
- Their orders are excluded from the market immediately.
- Trades already in progress are **not** cancelled — escrow still protects both sides.

::: warning Trades in progress
A suspended seller can't release escrow. If a suspended user has trades in `PAID`, coordinate with the counterparty before suspending, or reactivate the user briefly so the trade can complete.
:::

## Limits

- You can't change your own status.
- Admin accounts can't be restricted from the UI.
