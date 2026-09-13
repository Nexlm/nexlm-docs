# Background jobs

`src/jobs/scheduler.js` starts in-process interval jobs when the server boots.

| Job | Interval | Does |
| --- | --- | --- |
| `expire-orders` | 30 s | Marks up to 500 overdue `ACTIVE` orders `EXPIRED` and emits `order:removed` |
| `auto-cancel-trades` | 15 s | Refunds up to 20 `ESCROW_LOCKED` trades past `paymentDeadline` |
| `reconcile-trades` | 60 s | Settles up to 20 trades stuck in transitional states for > 2 minutes (see [reconciliation](./reconciliation)) |

## Guarantees

- **No overlap** — a job skips its tick if the previous run hasn't finished.
- **Isolated failures** — errors are logged per trade; one failing refund doesn't block the others.
- **Idempotent** — every job re-checks state with conditional updates, so running twice is harmless.

## Auto-cancel details

For each overdue trade `expireTrade` reloads it and returns early if it's no longer overdue (for example the buyer marked it paid a moment earlier). Otherwise it refunds with reason `PAYMENT_TIMEOUT` and reopens the order if it hasn't expired.

## Running multiple instances

Jobs run in every API process. Conditional updates prevent double refunds, but duplicate work wastes Horizon requests. With several instances, run the scheduler in only one (for example behind an environment flag) or move jobs to a dedicated worker.

## Shutdown

`SIGINT`/`SIGTERM` stop the scheduler, close sockets and the HTTP server, then disconnect Prisma. The process force-exits after 10 seconds.
