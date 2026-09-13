# Authentication

## Tokens

- Login and registration return a JWT signed with `JWT_SECRET` (HS256).
- Payload: `{ sub: userId, role }`
- Lifetime: `JWT_EXPIRES_IN` (default `7d`)
- Clients send `Authorization: Bearer <token>`

## `requireAuth`

`src/middleware/auth.js`:

1. Extracts the bearer token (→ `401 UNAUTHORIZED` if missing).
2. Verifies it (→ `401 SESSION_EXPIRED` if invalid or expired).
3. Loads the user with `sessionUserSelect` (→ `401` if deleted).
4. Rejects non-`ACTIVE` users with `403 ACCOUNT_RESTRICTED`.
5. Sets `req.user`.

Because the user is reloaded on every request, suspensions take effect immediately even for valid tokens.

## `requireAdmin`

Requires `req.user.role === 'ADMIN'`, otherwise `403`.

## Trading eligibility

`requireTradingEligibility` (posting orders, opening trades):

| Check | Error |
| --- | --- |
| `emailVerified` | `403 EMAIL_NOT_VERIFIED` |
| `kycStatus === 'VERIFIED'` (when `REQUIRE_KYC=true`) | `403 KYC_REQUIRED` |

`requireVerifiedEmail` guards withdrawals.

## Passwords

- bcrypt with 12 rounds
- Login compares against a dummy hash when the email doesn't exist, keeping response timing similar
- Failed logins always return `401 INVALID_CREDENTIALS` without revealing which field was wrong

## Email and reset tokens

- 32 random bytes, hex-encoded (64 characters)
- Only the SHA-256 hash is stored
- Verification tokens are single-use; reset tokens expire after 1 hour
- `forgot-password` responds identically for unknown emails

## Client

The Zustand `authStore` persists `{ token, user }` to `localStorage` under `nexlm-auth`. Any `401` response while a token is present logs the user out.
