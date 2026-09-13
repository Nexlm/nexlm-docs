# Realtime events

Socket.io runs on the same HTTP server as the API.

## Connecting

```js
import { io } from 'socket.io-client';

const socket = io(API_URL, { auth: { token }, transports: ['websocket', 'polling'] });
```

The server verifies the JWT and rejects inactive users with `connect_error: unauthorized`.

## Rooms

| Room | Joined | Receives |
| --- | --- | --- |
| `user:<id>` | Automatically on connect | Events for that user's trades |
| `trade:<id>` | Via `trade:join` | Trade updates, messages, typing |

## Client → server

| Event | Payload | Ack |
| --- | --- | --- |
| `trade:join` | `tradeId` | `{ ok: boolean }` — `false` unless you're the buyer, seller or an admin |
| `trade:leave` | `tradeId` | — |
| `trade:typing` | `{ tradeId }` | — (only forwarded if you've joined the room) |

## Server → client

| Event | Room | Payload |
| --- | --- | --- |
| `order:created` | everyone | `{ id, type? }` — also sent when an order is reopened |
| `order:removed` | everyone | `{ id }` — matched, cancelled or expired |
| `trade:created` | `user:<buyer>`, `user:<seller>` | `{ tradeId, status }` |
| `trade:updated` | `trade:<id>` | `{ id, status }` |
| `trade:updated` | `user:<buyer>`, `user:<seller>` | `{ tradeId, status }` |
| `message:new` | `trade:<id>` | Message object (with `sender` for user messages) |
| `trade:typing` | `trade:<id>` (except sender) | `{ tradeId, userId }` |

::: tip
`trade:updated` carries only the new status. Refetch `GET /api/trades/:id` for the full trade.
:::

## Emitting from services

Services import helpers from `src/socket/io.js` — `emitToTrade`, `emitToUser`, `broadcast`. They're no-ops until the socket server is initialised, so services work unchanged in scripts and tests.

## Reconnection

Rooms are lost on reconnect. The client's trade room rejoins on every `connect` event.
