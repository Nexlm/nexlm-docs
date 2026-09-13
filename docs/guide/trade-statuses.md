# Trade statuses

| Status in app | Code | What it means |
| --- | --- | --- |
| Locking escrow | `PENDING_ESCROW` | The seller's XLM is being moved into escrow |
| Awaiting payment | `ESCROW_LOCKED` | Escrow is funded; the buyer has 15 minutes to pay |
| Paid — awaiting release | `PAID` | The buyer marked the trade as paid |
| Releasing XLM | `RELEASING` | The release transaction is being submitted |
| Refunding seller | `REFUNDING` | The refund transaction is being submitted |
| Completed | `COMPLETED` | The buyer received the XLM |
| Cancelled | `CANCELLED` | The escrow was refunded, or never funded |

```
PENDING_ESCROW → ESCROW_LOCKED → PAID → RELEASING → COMPLETED
                      │                    ▲
                      ├────────────────────┘  (seller can release early)
                      └→ REFUNDING → CANCELLED (buyer cancels or window expires)
```

## Transitional statuses

`PENDING_ESCROW`, `RELEASING` and `REFUNDING` normally last a few seconds. If Stellar is slow to respond, Nexlm reconciles the trade against the blockchain within a few minutes and moves it to the correct status.
