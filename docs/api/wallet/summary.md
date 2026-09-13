# Wallet summary

```http
GET /api/wallet
```

**User**

Reads the user's balance live from Horizon and combines it with committed sell orders.

## Response `200`

```json
{
  "publicKey": "GBZ…Q7X",
  "network": "testnet",
  "explorerUrl": "https://stellar.expert/explorer/testnet/account/GBZ…Q7X",
  "funded": true,
  "balance": "10000",
  "available": "9998.99",
  "minimumBalance": "1",
  "committedToOrders": "102",
  "withdrawable": "9896.99"
}
```

| Field | Meaning |
| --- | --- |
| `funded` | Whether the Stellar account exists |
| `balance` | Native XLM balance |
| `minimumBalance` | Stellar reserve for this account |
| `available` | `balance − minimumBalance − selling liabilities − 0.01` |
| `committedToOrders` | Σ (amount + 2 XLM) over active, unexpired sell orders |
| `withdrawable` | `max(0, available − committedToOrders)` |

## Errors

| Status | Code |
| --- | --- |
| 503 | `HORIZON_UNAVAILABLE` |
