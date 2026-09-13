# Order

| Field | Type | Notes |
| --- | --- | --- |
| `id` | String | |
| `userId` | String | The maker |
| `type` | `OrderType` | `SELL` = maker sells XLM; `BUY` = maker buys XLM |
| `xlmAmount` | Decimal(20,7) | Whole order is traded at once |
| `ngnRate` | Decimal(14,2) | Naira per XLM |
| `paymentMethods` | `PaymentMethod[]` | Postgres enum array |
| `terms` | VarChar(500)? | |
| `status` | `OrderStatus` | Default `ACTIVE` |
| `expiresAt` | DateTime | `now + ORDER_TTL_MINUTES` |
| `createdAt` / `updatedAt` | DateTime | |

## Lifecycle

```
ACTIVE ──(trade opened)──▶ FILLED ──(trade cancelled, not expired)──▶ ACTIVE
   │
   ├──(maker cancels)────▶ CANCELLED
   ├──(expiresAt passes)─▶ EXPIRED
   └──(maker restricted)─▶ CANCELLED
```

## Concurrency

Opening a trade claims the order with:

```js
prisma.order.updateMany({ where: { id, status: 'ACTIVE' }, data: { status: 'FILLED' } })
```

If `count` is 0, another taker won the race and the request fails with `409`.
