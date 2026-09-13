# Wallet activity

```http
GET /api/wallet/activity?cursor=
```

**User**

On-chain XLM movements for the wallet, newest first, read from Horizon's payments endpoint (20 per page). Non-native asset payments are skipped.

## Query

| Param | Type | Notes |
| --- | --- | --- |
| `cursor` | string, optional | `nextCursor` from the previous page |

## Response `200`

```json
{
  "items": [
    {
      "id": "3040271235219457",
      "txHash": "13521d47…7abc",
      "createdAt": "2026-09-13T15:07:02Z",
      "kind": "payment",
      "direction": "in",
      "amount": "100.0000000",
      "counterparty": "GA7L…XWZN",
      "explorerUrl": "https://stellar.expert/explorer/testnet/tx/13521d47…7abc"
    }
  ],
  "nextCursor": "3040271235219457"
}
```

| `kind` | `amount` |
| --- | --- |
| `payment` | Payment amount |
| `create_account` | Starting balance |
| `account_merge` | `null` (Horizon doesn't report merged amounts here) |

An unfunded wallet returns `{ "items": [], "nextCursor": null }`.

See [Pagination](../pagination#cursor-pagination).
