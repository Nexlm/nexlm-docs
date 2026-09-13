# Register

```http
POST /api/auth/register
```

**Public** · rate limited (20 / 15 min)

Creates an account and a custodial Stellar wallet, sends a verification email, and returns a session token.

## Body

| Field | Type | Rules |
| --- | --- | --- |
| `email` | string | Valid email; trimmed and lowercased |
| `password` | string | 8–128 chars, at least one letter and one number |
| `displayName` | string | 3–24 chars, `[A-Za-z0-9_]`, unique (case-insensitive) |

```json
{ "email": "amaka@example.ng", "password": "naira2026", "displayName": "amaka_ng" }
```

## Response `201`

```json
{
  "user": {
    "id": "cmf0x1a2b0000abcd",
    "email": "amaka@example.ng",
    "displayName": "amaka_ng",
    "phone": null,
    "role": "USER",
    "status": "ACTIVE",
    "emailVerified": false,
    "kycStatus": "UNVERIFIED",
    "kycIdType": null,
    "kycIdLast4": null,
    "stellarPublicKey": "GBZ…Q7X",
    "createdAt": "2026-09-13T15:00:00.000Z"
  },
  "token": "eyJhbGciOi…"
}
```

On testnet the wallet is funded by Friendbot in the background; it may take a few seconds before `GET /wallet` shows `funded: true`.

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Invalid field |
| 409 | `CONFLICT` | "An account with this email already exists" or "That display name is taken" |
| 429 | `RATE_LIMITED` | |
