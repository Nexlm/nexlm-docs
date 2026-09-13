# User

| Field | Type | Notes |
| --- | --- | --- |
| `id` | String | CUID |
| `email` | String, unique | Lowercased by validation |
| `passwordHash` | String | bcrypt, 12 rounds |
| `displayName` | String, unique | 3–24 chars `[A-Za-z0-9_]`; uniqueness checked case-insensitively at registration |
| `phone` | String? | Normalised to `+234…` |
| `role` | `Role` | Default `USER` |
| `status` | `UserStatus` | Default `ACTIVE` |
| `emailVerified` | Boolean | |
| `emailVerifyTokenHash` | String?, unique | SHA-256 of the emailed token |
| `passwordResetTokenHash` | String?, unique | SHA-256 of the emailed token |
| `passwordResetExpiresAt` | DateTime? | 1 hour after request |
| `kycStatus` | `KycStatus` | Default `UNVERIFIED` |
| `kycIdType` | `KycIdType?` | |
| `kycIdLast4` | String? | Last four digits only |
| `kycIdHash` | String?, unique | HMAC-SHA256 of `TYPE:number` keyed with `ENCRYPTION_KEY` |
| `kycFullName` | String? | Name as submitted |
| `kycReference` | String? | Smile ID job ID |
| `kycSubmittedAt` / `kycReviewedAt` | DateTime? | |
| `stellarPublicKey` | String, unique | Wallet address |
| `stellarSecretEnc` | String | AES-256-GCM `iv.tag.ciphertext` (base64) |
| `createdAt` / `updatedAt` | DateTime | |

## Select shapes

Services never return a raw user. Two shapes in `src/lib/selects.js` control exposure:

| Shape | Used for | Includes |
| --- | --- | --- |
| `publicUserSelect` | Other users | `id`, `displayName`, `kycStatus`, `createdAt` |
| `sessionUserSelect` | The logged-in user | Public fields + email, phone, role, status, verification flags, KYC type/last4, Stellar address |

Secret, hash and token fields are never selected for API responses.
