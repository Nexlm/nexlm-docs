# Withdraw XLM

```http
POST /api/wallet/withdraw
```

**Verified email** · rate limited (10 / hour per user)

## Body

| Field | Type | Rules |
| --- | --- | --- |
| `destination` | string | Valid Stellar public key, not your own |
| `amount` | string \| number | > 0, ≤ 7 decimals, ≤ `withdrawable` |
| `memo` | string, optional | ≤ 28 bytes; empty string is ignored |

```json
{ "destination": "GDX…4KQ", "amount": "25.5", "memo": "1048213" }
```

If the destination account doesn't exist, a `createAccount` operation is used and the amount must be at least 1 XLM.

## Response `201`

```json
{
  "txHash": "2639d27c…a7a",
  "explorerUrl": "https://stellar.expert/explorer/testnet/tx/2639d27c…a7a"
}
```

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Invalid address, amount or memo |
| 400 | `BAD_REQUEST` | Sending to yourself, or < 1 XLM to an unactivated address |
| 403 | `EMAIL_NOT_VERIFIED` | |
| 422 | `INSUFFICIENT_BALANCE` | `details.withdrawable` shows the maximum |
| 429 | `RATE_LIMITED` | |
| 502 | `STELLAR_TX_FAILED` | Rejected by Stellar |
| 503 | `HORIZON_UNAVAILABLE` | Outcome unknown — check wallet activity before retrying |
