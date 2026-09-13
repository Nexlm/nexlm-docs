# Tech stack

## Server (`server/`)

| Concern | Library |
| --- | --- |
| Runtime | Node.js 20+, ES modules |
| HTTP | Express 4 |
| Validation | Zod |
| Database | PostgreSQL via Prisma 6 |
| Stellar | `@stellar/stellar-sdk` (Horizon) |
| Realtime | Socket.io 4 |
| Auth | `jsonwebtoken`, `bcryptjs` |
| Security headers | Helmet, CORS |
| Rate limiting | `express-rate-limit` |
| Uploads | Multer (memory) → Cloudinary or local disk |
| Email | Nodemailer |
| QR codes | `qrcode` |
| Tests | Vitest |

## Client (`client/`)

| Concern | Library |
| --- | --- |
| UI | React 18 |
| Build | Vite 6 |
| Styling | Tailwind CSS 3 |
| State | Zustand (persisted auth) |
| Routing | React Router 6 |
| Realtime | `socket.io-client` |
| Icons | lucide-react |
| Tests | Vitest |

## External services

| Service | Used for | Required |
| --- | --- | --- |
| Stellar Horizon | Balances, payments, escrow | Yes |
| Friendbot | Funding testnet wallets | Testnet only |
| Smile ID | BVN/NIN verification | No — falls back to manual review |
| Cloudinary | Payment proof storage | No — falls back to local disk |
| SMTP provider | Verification and reset emails | No — logs to console |

The repository is an npm workspace: run `npm install` once at the root.
