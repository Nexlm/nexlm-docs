# Architecture

```
 ┌────────────────────┐        HTTPS / WebSocket        ┌───────────────────────────┐
 │  React client       │ ─────────────────────────────▶ │  Express API + Socket.io   │
 │  (Vite, Zustand)    │ ◀───────────────────────────── │  (Node.js)                 │
 └────────────────────┘                                 │                             │
                                                        │  routes → services → lib    │
                                                        │  jobs (scheduler)           │
                                                        └──────┬─────────┬────────────┘
                                                               │         │
                                                  Prisma       │         │  @stellar/stellar-sdk
                                                               ▼         ▼
                                                     ┌──────────────┐  ┌──────────────────┐
                                                     │ PostgreSQL   │  │ Horizon (Stellar)│
                                                     └──────────────┘  └──────────────────┘
                                                               │
                                     Cloudinary · SMTP · Smile ID (optional integrations)
```

## Layers in the API

| Layer | Directory | Responsibility |
| --- | --- | --- |
| Routes | `src/routes` | HTTP wiring, middleware, response shaping |
| Middleware | `src/middleware` | Auth, zod validation, rate limits, uploads, errors |
| Services | `src/services` | Business logic and database access |
| Rules | `src/services/tradeRules.js` | Pure trade state rules, unit-tested |
| Stellar | `src/stellar` | Horizon client, wallets, payments, escrow |
| Lib | `src/lib` | Amount math, crypto, errors, pagination, logging |
| Socket | `src/socket` | Socket.io auth, rooms and emit helpers |
| Jobs | `src/jobs` | Order expiry, auto-refunds, reconciliation |

Routes stay thin: they validate input, call a service, and return JSON. Services throw `AppError`s which the error middleware turns into consistent responses.

## Key design decisions

- **Custodial wallets in Phase 1** — keys are generated per user and encrypted at rest, so trades settle without the user signing.
- **One escrow account per trade** — isolates funds and makes every trade independently verifiable on-chain. See [escrow design](./escrow-design).
- **Database is the source of truth for trade state; the ledger is the source of truth for funds** — transitional states and [reconciliation](./reconciliation) bridge the two.
- **Exact decimal math** — XLM and NGN are handled as BigInt minor units. See [amounts](./amounts-and-precision).
- **Naira never touches the platform** — payment confirmation is manual by the seller.
