# Admin guide

The admin area lets the Nexlm operations team monitor the platform, review identities and restrict accounts. It lives at `/admin` in the web app and is only visible to users with the `ADMIN` role.

| Page | Use it to |
| --- | --- |
| [Overview](./dashboard) | See volume, trade health and pending work |
| [Users](./users) | Search accounts and open user details |
| [KYC review](./kyc-review) | Approve or reject pending identity submissions |
| [Account status](./account-status) | Suspend, ban or reactivate users |
| [Trades](./trade-monitoring) | Monitor every trade and read its chat |
| [Stuck trades](./stuck-trades) | Understand and handle trades in transitional states |

::: warning Admin powers are limited by design
Admins cannot move escrowed XLM from the admin UI. Escrow can only be released by the seller or refunded by the buyer's cancellation or timeout. A dispute resolution flow with admin release/refund is planned for Phase 2.
:::

Start with [Getting admin access](./access).
