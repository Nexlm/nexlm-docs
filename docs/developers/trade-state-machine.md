# Trade state machine

```
                ┌──────────────── STELLAR_TX_FAILED ────────────────┐
                ▼                                                    │
PENDING_ESCROW ──lock ok──▶ ESCROW_LOCKED ──buyer: MARK_PAID──▶ PAID │
      │                         │    │                           │   │
      │                         │    └──seller: RELEASE──┐       │   │
      │                         │                        ▼       ▼   │
      │                         │                     RELEASING ─────┘
      │                         │                        │
      │                         │                        ▼
      │                         │                    COMPLETED
      │                         │
      │               buyer: CANCEL / timeout
      │                         ▼
      │                     REFUNDING ──▶ CANCELLED
      │
      └── lock rejected / reconciled as unfunded ──▶ CANCELLED
```

## Actions

Defined in `server/src/services/tradeRules.js` — pure functions with no I/O.

| Action | Role | Allowed from | Extra rule |
| --- | --- | --- | --- |
| `MARK_PAID` | Buyer | `ESCROW_LOCKED` | `paymentDeadline` not passed |
| `RELEASE` | Seller | `ESCROW_LOCKED`, `PAID` | |
| `CANCEL` | Buyer | `ESCROW_LOCKED` | |

`assertCanAct(trade, action, userId, now)` throws:

| Situation | Error |
| --- | --- |
| Not a participant | `403 FORBIDDEN` |
| Wrong role | `403 FORBIDDEN` |
| Wrong status | `409 CONFLICT` |
| Window closed | `422 PAYMENT_WINDOW_CLOSED` |

`availableActions(trade, userId)` powers the `actions` array in trade responses, so the client shows only valid buttons.

## Atomic transitions

Every transition is claimed with a conditional update:

```js
const { count } = await prisma.trade.updateMany({
  where: { id, status: { in: fromStatuses } },
  data: { status: 'RELEASING' },
});
if (count === 0) throw conflict('This trade just changed. Refresh and try again.');
```

Two concurrent releases, or a release racing a timeout refund, can't both proceed — exactly one claim succeeds.

## Failure handling

| Error from Stellar | Action |
| --- | --- |
| `STELLAR_TX_FAILED` (definitive) | Restore the previous status (or cancel, for a failed lock) |
| Anything else (unknown outcome) | Leave the transitional status; [reconciliation](./reconciliation) settles it |
