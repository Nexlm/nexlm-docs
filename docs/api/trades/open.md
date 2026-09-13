# Open a trade

```http
POST /api/trades
```

**Trader**

Takes an order and locks the seller's XLM in a new escrow account. The request waits for the Stellar transaction (typically 2–5 seconds).

## Body

| Field | Type | Rules |
| --- | --- | --- |
| `orderId` | string | An active, unexpired order you don't own |
| `paymentMethod` | enum | Must be accepted by the order |

## Sequence

1. Validate order, method, active-trade limit (5), seller payout account, seller status and balance (`amount + 2 XLM`).
2. Atomically claim the order (`ACTIVE → FILLED`) and broadcast `order:removed`.
3. Create the trade in `PENDING_ESCROW` with a pre-generated escrow address.
4. Submit the escrow lock.
5. Set `ESCROW_LOCKED`, restart the payment window, write the ledger entry and system message, emit `trade:created`.

If Stellar rejects the lock, the trade is cancelled (`ESCROW_FAILED`) and the order reactivated. If the outcome is unknown, the trade stays `PENDING_ESCROW` and is [reconciled](/developers/reconciliation).

## Response `201`

The full [trade details](./get).

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `BAD_REQUEST` | Own order, or method not accepted |
| 403 | `EMAIL_NOT_VERIFIED`, `KYC_REQUIRED` | |
| 404 | `NOT_FOUND` | Order not available |
| 409 | `CONFLICT` | Another trader took the order first |
| 422 | `TOO_MANY_TRADES` | |
| 422 | `PAYMENT_ACCOUNT_REQUIRED` | Seller has no account for the method |
| 422 | `COUNTERPARTY_INACTIVE` | Seller restricted |
| 422 | `INSUFFICIENT_BALANCE` | |
| 502 | `STELLAR_TX_FAILED` | Lock rejected; trade cancelled |
| 503 | `HORIZON_UNAVAILABLE` | Lock outcome unknown; check [my trades](./list) |
