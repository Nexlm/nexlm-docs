# 0003 BigInt minor units for money

- Status: Accepted
- Date: 2026-09-13

## Context

XLM has 7 decimal places and NGN totals need kobo precision. JavaScript floats produce errors like `0.1 + 0.2 = 0.30000000000000004`, and `Decimal#toString()` can emit exponent notation that the Stellar SDK rejects.

## Decision

On the server, convert amounts to `BigInt` stroops (XLM) and kobo (NGN) for all arithmetic and comparisons, and convert back to fixed decimal strings for storage, Stellar operations and API responses. Reject inputs with more decimals than the currency allows rather than rounding them. Round NGN totals half-up.

## Consequences

- ✅ Exact balance checks and totals
- ✅ Amounts passed to Stellar are always valid strings
- ⚠️ Slightly more verbose code (`toStroops`, `fromStroops`) than plain numbers
- ⚠️ Client-side estimates use floats for display only; the server total is authoritative
