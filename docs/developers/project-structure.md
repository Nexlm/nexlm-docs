# Project structure

```
nexlm/
├── package.json            npm workspaces: server, client
├── docker-compose.yml      local PostgreSQL
├── render.yaml             Render blueprint for the API
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.js         create or promote an admin
│   ├── scripts/
│   │   └── smoke-test.mjs  end-to-end test on testnet
│   ├── src/
│   │   ├── index.js        HTTP server, sockets, scheduler, shutdown
│   │   ├── app.js          Express app factory
│   │   ├── config/         env validation, constants
│   │   ├── lib/            amount, crypto, secrets, errors, pagination, logger, …
│   │   ├── middleware/     auth, validate, rateLimit, requireTrading, upload, errorHandler
│   │   ├── validators/     zod schemas per area
│   │   ├── services/       auth, user, kyc, smileId, wallet, order, trade, tradeRules, chat, upload, reputation, admin, email
│   │   ├── stellar/        client, wallet, payments, escrow
│   │   ├── routes/         one router per area + index
│   │   ├── socket/         io helpers, connection handling
│   │   └── jobs/           expireOrders, autoCancelTrades, reconcileTrades, scheduler
│   └── tests/              Vitest unit tests
└── client/
    ├── vite.config.js      dev proxy, test config
    └── src/
        ├── App.jsx         routes (admin pages lazy-loaded)
        ├── lib/            api client, socket, format, forms, constants
        ├── store/          authStore, toastStore
        ├── hooks/          useApi, useSocket, useCountdown, useDebounce
        ├── components/     ui, layout, orders, trade, wallet, settings, common
        └── pages/          auth, market, orders, trades, wallet, settings, KYC, admin
```

## Conventions

- One zod schema module per area in `validators/`, imported by the matching router.
- Services never read `req`/`res`; routes never call Prisma directly.
- Every Stellar call goes through `src/stellar/` so errors are mapped consistently.
- Client pages fetch with `useApi` and render loading, empty and error states.
