# My trades

```http
GET /api/trades?scope=active&page=1
```

**User**

Trades where the user is buyer or seller, newest first. [Paginated](../pagination).

## Query

| Param | Default | Values |
| --- | --- | --- |
| `scope` | `all` | `active` (any non-final status), `completed`, `cancelled`, `all` |
| `page`, `pageSize` | 1, 20 | |

## Response `200`

```json
{
  "items": [
    {
      "id": "cmf3…",
      "orderId": "cmf1…",
      "buyerId": "cmf0y…",
      "sellerId": "cmf0x…",
      "xlmAmount": "100",
      "ngnRate": "520.5",
      "ngnAmount": "52050",
      "paymentMethod": "OPAY",
      "status": "ESCROW_LOCKED",
      "escrowPublicKey": "GA7L…XWZN",
      "paymentDeadline": "2026-09-13T15:22:00.000Z",
      "buyer": { "id": "cmf0y…", "displayName": "amaka_ng", "kycStatus": "VERIFIED", "stellarPublicKey": "…", "createdAt": "…" },
      "seller": { "id": "cmf0x…", "displayName": "emeka_ng", "kycStatus": "VERIFIED", "stellarPublicKey": "…", "createdAt": "…" },
      "order": { "id": "cmf1…", "type": "SELL", "terms": null, "userId": "cmf0x…" },
      "role": "BUYER",
      "…": "…"
    }
  ],
  "pagination": { "…": "…" }
}
```

For actions, payout details and links, fetch [a single trade](./get).
