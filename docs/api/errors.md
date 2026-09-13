# Errors

Every error uses the same shape:

```json
{
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient balance. You can withdraw up to 42.5 XLM.",
    "details": { "withdrawable": "42.5" }
  }
}
```

`message` is safe to show to users. `details` is optional.

## Codes

| Status | Code | When |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Body, query or params failed validation. `details` is `[{ path, message }]`. |
| 400 | `INVALID_JSON` | Malformed JSON body |
| 400 | `UPLOAD_ERROR` | File too large or invalid multipart |
| 400 | `BAD_REQUEST` | Invalid action, e.g. trading your own order, non-image upload, bad token |
| 401 | `UNAUTHORIZED` | Missing token or deleted account |
| 401 | `SESSION_EXPIRED` | Invalid or expired token |
| 401 | `INVALID_CREDENTIALS` | Wrong email or password |
| 403 | `FORBIDDEN` | Not allowed, e.g. not a trade participant, wrong role |
| 403 | `ACCOUNT_RESTRICTED` | Account suspended or banned |
| 403 | `EMAIL_NOT_VERIFIED` | Email verification required |
| 403 | `KYC_REQUIRED` | Identity verification required |
| 404 | `NOT_FOUND` | Resource missing or no longer available |
| 404 | `ROUTE_NOT_FOUND` | Unknown endpoint |
| 409 | `CONFLICT` | Duplicate data or a concurrent state change |
| 422 | `INSUFFICIENT_BALANCE` | Not enough XLM for an order, trade or withdrawal |
| 422 | `ORDER_SIZE_OUT_OF_RANGE` | Order below `MIN_TRADE_XLM` or above `MAX_TRADE_XLM` |
| 422 | `TOO_MANY_ORDERS` | 10 active orders already |
| 422 | `TOO_MANY_TRADES` | 5 trades in progress already |
| 422 | `TOO_MANY_ACCOUNTS` | 10 payout accounts already |
| 422 | `PAYMENT_ACCOUNT_REQUIRED` | Seller lacks a payout account for the method. `details.missing` lists methods when posting orders. |
| 422 | `COUNTERPARTY_INACTIVE` | The seller's account is restricted |
| 422 | `PAYMENT_WINDOW_CLOSED` | Marking paid after the deadline |
| 429 | `RATE_LIMITED` | Rate limit exceeded |
| 500 | `INTERNAL_ERROR` | Unexpected server error |
| 502 | `STELLAR_TX_FAILED` | Stellar rejected the transaction. `details` contains Horizon result codes. |
| 503 | `HORIZON_UNAVAILABLE` | Stellar Horizon unreachable or timed out |
| 503 | `KYC_PROVIDER_ERROR` | Smile ID unavailable |

## Handling conflicts

`409` with *"This trade just changed. Refresh and try again."* means another request changed the trade first. Refetch the trade and show its current state.

## Handling `503 HORIZON_UNAVAILABLE` during trades

The operation may or may not have reached Stellar. Don't retry blindly — refetch the trade after a short delay. The server reconciles uncertain outcomes automatically.
