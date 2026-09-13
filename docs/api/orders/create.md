# Create an order

```http
POST /api/orders
```

**Trader**

## Body

| Field | Type | Rules |
| --- | --- | --- |
| `type` | enum | `SELL` or `BUY` |
| `xlmAmount` | string \| number | ≤ 7 decimals, between `MIN_TRADE_XLM` (10) and `MAX_TRADE_XLM` (100,000) |
| `ngnRate` | string \| number | ≤ 2 decimals, > 0 |
| `paymentMethods` | enum[] | At least one; duplicates removed |
| `terms` | string, optional | ≤ 500 chars; empty string ignored |

```json
{ "type": "SELL", "xlmAmount": "100", "ngnRate": "520.50", "paymentMethods": ["OPAY", "KUDA"], "terms": "Own-name accounts only" }
```

## Additional checks

| Check | Applies to |
| --- | --- |
| Fewer than 10 active orders | All |
| A payout account for every method | `SELL` |
| `available ≥ committed + xlmAmount + 2` | `SELL` |

`expiresAt` is set to `now + ORDER_TTL_MINUTES`. An `order:created` socket event is broadcast.

## Response `201`

The order with `user` (public fields).

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | |
| 403 | `EMAIL_NOT_VERIFIED`, `KYC_REQUIRED` | |
| 422 | `ORDER_SIZE_OUT_OF_RANGE` | |
| 422 | `TOO_MANY_ORDERS` | |
| 422 | `PAYMENT_ACCOUNT_REQUIRED` | `details.missing` lists methods |
| 422 | `INSUFFICIENT_BALANCE` | `details` has `available`, `committed`, `needed` |
| 503 | `HORIZON_UNAVAILABLE` | Balance check failed |
