# API reference

The Nexlm API is a JSON REST API with a Socket.io channel for realtime updates.

## Base URL

| Environment | URL |
| --- | --- |
| Local | `http://localhost:4000/api` |
| Production | `https://<your-api-host>/api` |

## Authentication

Most endpoints need a bearer token from [register](./auth/register) or [login](./auth/login):

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Each endpoint page lists its requirement:

| Label | Meaning |
| --- | --- |
| **Public** | No token needed |
| **User** | Any active user |
| **Verified email** | `emailVerified` must be true |
| **Trader** | Verified email and, when `REQUIRE_KYC=true`, verified KYC |
| **Admin** | `role = ADMIN` |

## Requests

- Send JSON with `Content-Type: application/json` (max 100 KB).
- Chat messages use `multipart/form-data`.
- XLM amounts and NGN rates can be strings or numbers; strings are recommended.

## Responses

- Successful responses return the resource directly (no envelope).
- Decimal fields (`xlmAmount`, `ngnRate`, `ngnAmount`, …) are **strings**.
- Timestamps are ISO 8601 UTC strings.
- Lists are [paginated](./pagination).
- Errors follow a single [error format](./errors).

## Endpoints

| Area | Endpoints |
| --- | --- |
| [Auth](./auth/register) | register, login, me, verify email, resend verification, forgot/reset/change password |
| [Users](./users/me) | profile, payout accounts, public profiles |
| [KYC](./kyc/status) | status, submit |
| [Wallet](./wallet/summary) | summary, deposit, activity, transactions, withdraw |
| [Orders](./orders/list) | market, my orders, get, create, cancel |
| [Trades](./trades/list) | list, open, get, mark paid, release, cancel, messages |
| [Admin](./admin/overview) | overview, users, KYC review, trades |
| [Realtime](./socket-events) | Socket.io events |
| [Health](./health) | liveness |
