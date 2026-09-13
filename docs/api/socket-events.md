# Realtime events

Connect with Socket.io to the API origin, passing the JWT:

```js
const socket = io('https://api.example.com', { auth: { token } });
```

## Emit

| Event | Payload | Ack |
| --- | --- | --- |
| `trade:join` | `tradeId` | `{ ok }` |
| `trade:leave` | `tradeId` | — |
| `trade:typing` | `{ tradeId }` | — |

## Listen

| Event | Payload | Delivered to |
| --- | --- | --- |
| `order:created` | `{ id, type? }` | Everyone |
| `order:removed` | `{ id }` | Everyone |
| `trade:created` | `{ tradeId, status }` | Buyer and seller |
| `trade:updated` | `{ id, status }` | Trade room |
| `trade:updated` | `{ tradeId, status }` | Buyer and seller personal rooms |
| `message:new` | Message | Trade room |
| `trade:typing` | `{ tradeId, userId }` | Trade room, except the sender |

::: warning Two `trade:updated` shapes
Room events use `id`; personal-room events use `tradeId`. Handle both, or join the trade room and read `id`.
:::

## Example

```js
socket.emit('trade:join', tradeId, ({ ok }) => {
  if (!ok) console.warn('Not allowed to watch this trade');
});

socket.on('trade:updated', async ({ id }) => {
  if (id === tradeId) setTrade(await api.get(`/trades/${tradeId}`));
});

socket.on('message:new', (message) => {
  if (message.tradeId === tradeId) appendMessage(message);
});
```

More detail: [developer guide to realtime](/developers/realtime).
