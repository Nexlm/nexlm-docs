# KYC status

```http
GET /api/kyc
```

**User**

## Response `200`

```json
{
  "kycStatus": "PENDING",
  "kycIdType": "BVN",
  "kycIdLast4": "5678",
  "kycFullName": "Emeka Okafor",
  "kycSubmittedAt": "2026-09-13T15:10:00.000Z",
  "kycReviewedAt": null
}
```

| `kycStatus` | Meaning |
| --- | --- |
| `UNVERIFIED` | Nothing submitted |
| `PENDING` | Waiting for manual review |
| `VERIFIED` | Approved |
| `REJECTED` | Didn't match; may resubmit |
