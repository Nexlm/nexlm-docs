# KYC review

## When manual review happens

If Smile ID credentials (`SMILE_PARTNER_ID`, `SMILE_API_KEY`) are not configured, every identity submission is saved with status **Under review** (`PENDING`). When Smile ID is configured, submissions are verified automatically and only reach manual review if you change that behaviour.

## Reviewing a submission

1. Open **Users** and filter **KYC status → Under review** (or click **Pending KYC** on the overview).
2. Open the user.
3. Compare the **name on submission** with the user's payout account names.
4. Click **Approve** or **Reject**.

| Decision | Result |
| --- | --- |
| Approve | Status becomes `VERIFIED`; the user can trade immediately (after verifying email) |
| Reject | Status becomes `REJECTED`; the user can correct their details and resubmit |

Only `PENDING` submissions can be reviewed. Trying to review any other status returns an error.

## Red flags

- Payout account names that don't match the submitted name
- Several accounts with similar names created close together
- A rejected user repeatedly resubmitting with different names

Duplicate IDs are blocked automatically: the same BVN/NIN can't be linked to two accounts.
