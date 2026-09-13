# Overview dashboard

`/admin` shows platform health at a glance.

| Card | Definition |
| --- | --- |
| Volume (30d) | Sum of `ngnAmount` and `xlmAmount` for trades **completed** in the last 30 days |
| Completed trades (30d) | Trades completed in the last 30 days, with the cancelled count |
| Completion rate (30d) | completed ÷ (completed + cancelled) over 30 days |
| Active trades | Trades in `PENDING_ESCROW`, `ESCROW_LOCKED`, `PAID`, `RELEASING` or `REFUNDING` |
| Users | Total accounts and how many are KYC verified |
| Pending KYC | Submissions waiting for manual review — click to open the filtered user list |
| Active orders | Orders that are `ACTIVE` and not yet expired |

## Things to watch

- **Pending KYC growing** — the Smile ID integration may be unconfigured or failing, so submissions fall back to manual review.
- **Active trades not moving** — check [Stuck trades](./stuck-trades).
- **Completion rate dropping** — look for users with many cancelled trades in [Users](./users).
