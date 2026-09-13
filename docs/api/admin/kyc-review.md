# Review KYC

```http
POST /api/admin/kyc/:userId
```

**Admin**

## Body

| Field | Type |
| --- | --- |
| `decision` | `APPROVE` or `REJECT` |

## Effects

| Decision | `kycStatus` |
| --- | --- |
| `APPROVE` | `VERIFIED` |
| `REJECT` | `REJECTED` |

`kycReviewedAt` is set to now.

## Response `200`

The updated user (admin fields).

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 404 | `NOT_FOUND` | |
| 409 | `CONFLICT` | "This user has no pending verification" |
