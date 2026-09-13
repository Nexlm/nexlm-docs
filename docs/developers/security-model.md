# Security model

## Assets

| Asset | Where | Protection |
| --- | --- | --- |
| User wallet secrets | `User.stellarSecretEnc` | AES-256-GCM with `ENCRYPTION_KEY` |
| Escrowed XLM | Per-trade Stellar accounts | Master key disabled; platform co-signer only signs release to buyer or merge to seller |
| Platform co-signer | `PLATFORM_SECRET_KEY` env | Secrets manager; never logged |
| Identity data | `User.kyc*` | Only last 4 digits + keyed fingerprint stored |
| Passwords | `User.passwordHash` | bcrypt, 12 rounds |
| Sessions | JWT | HS256, 7-day expiry, user reloaded each request |

## Key compromise scenarios

| Compromised | Impact | Mitigation |
| --- | --- | --- |
| Database only | Encrypted secrets are useless without `ENCRYPTION_KEY` | Keep the key outside the database and backups |
| `ENCRYPTION_KEY` + database | Attacker can decrypt custodial wallets | Split storage, restrict access, rotate with re-encryption |
| `PLATFORM_SECRET_KEY` | Attacker can co-sign open escrows | Keep offline/HSM in production; monitor escrow operations; limit open escrow value |

## Application controls

- Zod validation on every input; parsed values only
- Rate limiting on auth, KYC and withdrawals
- Helmet security headers; `x-powered-by` disabled
- CORS restricted to `CLIENT_URL`
- JSON body limit 100 KB; uploads 5 MB and content-sniffed
- Timing-safe login responses; no user enumeration on password reset
- Atomic trade transitions prevent double release/refund
- Session users never include secrets or hashes

## Known gaps (tracked)

- No 2FA yet (Phase 2)
- No dispute resolution flow — admins can't settle a `PAID` trade whose seller is unresponsive (Phase 2)
- Upload URLs are unauthenticated if leaked
- Rate limit store is in-memory per instance

## Reporting vulnerabilities

Email **security@nexlm.app**. Please don't open public issues for security reports.
