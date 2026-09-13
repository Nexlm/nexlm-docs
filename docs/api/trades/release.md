# Release escrow

```http
POST /api/trades/:id/release
```

**User** · seller only

Sends the escrowed XLM to the buyer and merges the remaining reserve back to the seller. **Irreversible.**

## Preconditions

- Trade is `ESCROW_LOCKED` or `PAID`

## Sequence

1. Claim `→ RELEASING`.
2. Submit the release transaction (payment, remove signer, merge).
3. `→ COMPLETED` with `releaseTxHash` and `completedAt`; write `ESCROW_RELEASE` ledger entry and system message; emit `trade:updated`.

## Response `200`

Updated [trade details](./get) with `links.release`.

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 403 | `FORBIDDEN` | Not the seller |
| 409 | `CONFLICT` | Wrong status or concurrent change |
| 502 | `STELLAR_TX_FAILED` | Rejected; status restored, safe to retry |
| 503 | `HORIZON_UNAVAILABLE` | Outcome unknown; trade stays `RELEASING` until reconciled — **don't retry** |
