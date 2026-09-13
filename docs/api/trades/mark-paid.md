# Mark as paid

```http
POST /api/trades/:id/paid
```

**User** · buyer only

Records that the buyer sent the Naira. Stops the payment window.

## Preconditions

- Trade is `ESCROW_LOCKED`
- `paymentDeadline` hasn't passed

## Effects

- `status → PAID`, `paidAt` set
- System message posted to chat
- `trade:updated` emitted

## Response `200`

Updated [trade details](./get).

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 403 | `FORBIDDEN` | Not the buyer |
| 404 | `NOT_FOUND` | |
| 409 | `CONFLICT` | Wrong status, or changed concurrently |
| 422 | `PAYMENT_WINDOW_CLOSED` | Deadline passed |
