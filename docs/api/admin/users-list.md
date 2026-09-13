# List users

```http
GET /api/admin/users?q=emeka&status=ACTIVE&kycStatus=PENDING&page=1
```

**Admin**

Newest first. [Paginated](../pagination).

## Query

| Param | Notes |
| --- | --- |
| `q` | Case-insensitive partial match on email or display name, or exact Stellar address (≤ 100 chars) |
| `status` | `ACTIVE`, `SUSPENDED`, `BANNED` |
| `kycStatus` | `UNVERIFIED`, `PENDING`, `VERIFIED`, `REJECTED` |

## Response `200`

```json
{
  "items": [
    {
      "id": "cmf0x…",
      "email": "emeka@example.ng",
      "displayName": "emeka_ng",
      "phone": null,
      "role": "USER",
      "status": "ACTIVE",
      "emailVerified": true,
      "kycStatus": "PENDING",
      "kycIdType": "BVN",
      "kycIdLast4": "5678",
      "kycFullName": "Emeka Okafor",
      "kycReference": null,
      "kycSubmittedAt": "2026-09-13T15:10:00.000Z",
      "kycReviewedAt": null,
      "stellarPublicKey": "GBZ…Q7X",
      "createdAt": "2026-09-13T15:00:00.000Z"
    }
  ],
  "pagination": { "…": "…" }
}
```
