# Platform transactions

```http
GET /api/wallet/transactions?page=1&pageSize=20
```

**User**

The ledger of Stellar operations Nexlm performed for this user: withdrawals and escrow movements. [Paginated](../pagination), newest first.

## Response `200`

```json
{
  "items": [
    {
      "id": "cmf2…",
      "userId": "cmf0x…",
      "tradeId": "cmf1…",
      "type": "ESCROW_LOCK",
      "xlmAmount": "100",
      "counterparty": "GA7L…XWZN",
      "stellarTxHash": "a4c1…",
      "createdAt": "2026-09-13T15:07:00.000Z",
      "explorerUrl": "https://stellar.expert/explorer/testnet/tx/a4c1…"
    }
  ],
  "pagination": { "page": 1, "pageSize": 20, "total": 1, "totalPages": 1, "hasMore": false }
}
```

| `type` | Written for |
| --- | --- |
| `WITHDRAWAL` | The sender |
| `ESCROW_LOCK` | The seller, when escrow is funded |
| `ESCROW_RELEASE` | The buyer, when XLM is released |
| `ESCROW_REFUND` | The seller, when escrow is refunded |
