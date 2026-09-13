# Users

`/admin/users` lists accounts, newest first.

## Search and filters

- **Search** matches email or display name (partial, case-insensitive) or an exact Stellar address.
- **Account status** — Active, Suspended, Banned
- **KYC status** — Not verified, Under review, Verified, Rejected

Filters are kept in the URL, so you can bookmark or share a view such as `/admin/users?kycStatus=PENDING`.

## User detail

Click a display name to open `/admin/users/:id`:

| Section | Contents |
| --- | --- |
| Profile | Email (and whether it's verified), phone, role, reputation, Stellar address, join date |
| Status actions | Reactivate, Suspend, Ban — see [Account status](./account-status) |
| Identity | Name on submission, ID type and last four digits, provider reference, submitted and reviewed times |
| Payout accounts | Every saved account with method, name and number |
| Recent trades | The last 20 trades with counterparty and status, linking to trade detail |

::: info Privacy
Admins never see full BVN/NIN numbers or wallet secret keys — they aren't stored in a readable form.
:::
