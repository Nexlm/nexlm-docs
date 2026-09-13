# Submit KYC

```http
POST /api/kyc
```

**User** · rate limited (20 / 15 min)

## Body

| Field | Type | Rules |
| --- | --- | --- |
| `idType` | enum | `BVN` or `NIN` |
| `idNumber` | string | Exactly 11 digits |
| `firstName` | string | 2–50 letters, spaces, apostrophes or hyphens |
| `lastName` | string | Same rules |
| `dateOfBirth` | string | `YYYY-MM-DD`, at least 18 years ago |

```json
{ "idType": "BVN", "idNumber": "22212345678", "firstName": "Emeka", "lastName": "Okafor", "dateOfBirth": "1992-04-18" }
```

## Response `201`

With Smile ID configured:

```json
{ "status": "VERIFIED", "message": "Your identity has been verified. You can now trade." }
```

```json
{ "status": "REJECTED", "message": "We could not match your details to this ID. Check your name and date of birth, then try again." }
```

Without Smile ID:

```json
{ "status": "PENDING", "message": "Thanks! Your details are queued for manual review." }
```

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | e.g. "BVN and NIN are 11 digits", "You must be at least 18 years old" |
| 409 | `CONFLICT` | Already verified, already pending, or ID linked to another account |
| 503 | `KYC_PROVIDER_ERROR` | Smile ID unavailable; status unchanged |
