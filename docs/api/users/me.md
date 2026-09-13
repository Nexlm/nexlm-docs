# Get my profile

```http
GET /api/users/me
```

**User**

## Response `200`

```json
{
  "user": {
    "id": "cmf0x1a2b0000abcd",
    "email": "emeka@example.ng",
    "displayName": "emeka_ng",
    "phone": "+2348031234567",
    "role": "USER",
    "status": "ACTIVE",
    "emailVerified": true,
    "kycStatus": "VERIFIED",
    "kycIdType": "BVN",
    "kycIdLast4": "5678",
    "stellarPublicKey": "GBZ…Q7X",
    "createdAt": "2026-09-13T15:00:00.000Z",
    "stats": { "completedTrades": 12, "completionRate": 92.3 }
  }
}
```

`completionRate` is a percentage with one decimal, or `null` if the user has no completed or cancelled trades.
