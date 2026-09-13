# Changelog

## 2026-09-13

### Added

- Trade reconciliation job that settles trades left in `PENDING_ESCROW`, `RELEASING` or `REFUNDING` by reading escrow history on Stellar
- `findEscrowTransactions` and named escrow memos
- Testnet smoke test script (`npm run smoke -w server`)
- CI workflow, Docker Compose for Postgres, Render blueprint, Vercel config

### Fixed

- The escrow address is now stored on the trade before the lock is submitted, so funds stay traceable if a later database write fails

### Initial release (Phase 1)

- Express API with Prisma/PostgreSQL, zod validation, rate limiting and structured errors
- Custodial Stellar wallets with AES-256-GCM encrypted secrets
- Registration, email verification, password reset and change
- BVN/NIN KYC via Smile ID with manual fallback
- Order board, per-trade escrow, mark paid, release, cancel and auto-refund
- Socket.io chat with magic-byte validated image uploads
- Reputation stats and public profiles
- Admin overview, user management, KYC review and trade monitoring
- React client covering all of the above
