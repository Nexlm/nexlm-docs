# Logging

`src/lib/logger.js` is a small levelled logger with no dependencies.

| Environment | Format |
| --- | --- |
| `production` | One JSON object per line: `{ level, time, message, …meta }` |
| Other | Human-readable: `[time] LEVEL message { meta }` |

Levels: `debug` < `info` < `warn` < `error`. Set `LOG_LEVEL` to change the threshold (default `info`, or `error` under `NODE_ENV=test`).

`Error` objects in metadata are serialised to `{ name, message, code, stack }`.

```js
logger.error('Escrow release outcome unknown', { tradeId, err });
```

## HTTP logs

Morgan logs requests (`dev` format locally, `combined` in production). It's disabled in tests.

## Messages worth alerting on

| Message | Meaning |
| --- | --- |
| `Escrow lock outcome unknown` | Lock submission failed ambiguously; reconciliation will settle it |
| `Escrow release outcome unknown` / `Escrow refund outcome unknown` | Same, for release/refund |
| `Trade reconciliation failed` | Reconciliation threw — usually Horizon unavailable |
| `Escrow closed without a recognised transaction` | Needs manual investigation |
| `Auto-cancel failed` | A timeout refund failed; it retries next tick |
| `Horizon request failed` | Horizon unreachable |

## What's never logged

Wallet secrets, passwords, raw tokens and full ID numbers.
