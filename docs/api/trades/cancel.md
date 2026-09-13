# Cancel a trade

```http
POST /api/trades/:id/cancel
```

**User** · buyer only

Refunds the escrow to the seller.

## Preconditions

- Trade is `ESCROW_LOCKED` (not yet marked paid)

## Sequence

1. Claim `→ REFUNDING`.
2. Submit the refund transaction (remove signer, merge to seller).
3. `→ CANCELLED` with `refundTxHash`, `cancelReason: "BUYER_CANCELLED"`; write `ESCROW_REFUND` ledger entry and system message.
4. Reactivate the order if it hasn't expired (broadcasts `order:created`).

## Response `200`

Updated [trade details](./get) with `links.refund`.

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 403 | `FORBIDDEN` | Not the buyer |
| 409 | `CONFLICT` | Already paid, finished, or concurrent change |
| 502 | `STELLAR_TX_FAILED` | Rejected; status restored |
| 503 | `HORIZON_UNAVAILABLE` | Outcome unknown; reconciled automatically |
