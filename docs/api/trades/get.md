# Get a trade

```http
GET /api/trades/:id
```

**User** (buyer, seller or admin)

## Response `200`

All trade fields plus viewer-specific data:

```json
{
  "id": "cmf3…",
  "status": "ESCROW_LOCKED",
  "xlmAmount": "100",
  "ngnRate": "520.5",
  "ngnAmount": "52050",
  "paymentMethod": "OPAY",
  "escrowPublicKey": "GA7L…XWZN",
  "escrowTxHash": "a4c1…",
  "releaseTxHash": null,
  "refundTxHash": null,
  "cancelReason": null,
  "paymentDeadline": "2026-09-13T15:22:00.000Z",
  "paidAt": null,
  "completedAt": null,
  "cancelledAt": null,
  "buyer": { "…": "…" },
  "seller": { "…": "…" },
  "order": { "id": "cmf1…", "type": "SELL", "terms": "Own-name accounts only", "userId": "cmf0x…" },

  "role": "BUYER",
  "actions": ["MARK_PAID", "CANCEL"],
  "paymentAccount": { "method": "OPAY", "bankName": null, "accountName": "Emeka Okafor", "accountNumber": "8031234567" },
  "secondsRemaining": 812,
  "links": {
    "escrow": "https://stellar.expert/explorer/testnet/tx/a4c1…",
    "release": null,
    "refund": null
  }
}
```

| Field | Notes |
| --- | --- |
| `role` | `BUYER`, `SELLER`, or `null` for admins |
| `actions` | Subset of `MARK_PAID`, `RELEASE`, `CANCEL` the viewer may perform now |
| `paymentAccount` | Seller's oldest account for `paymentMethod`, or `null` |
| `secondsRemaining` | Only non-zero in `ESCROW_LOCKED` |
| `cancelReason` | `BUYER_CANCELLED`, `PAYMENT_TIMEOUT`, `ESCROW_FAILED` |

## Errors

| Status | Code |
| --- | --- |
| 403 | `FORBIDDEN` |
| 404 | `NOT_FOUND` |
