# Amounts and precision

JavaScript numbers can't represent values like `0.1 + 0.2` exactly. Nexlm never uses floats for money on the server.

## Minor units

| Currency | Minor unit | Decimals |
| --- | --- | --- |
| XLM | stroop (0.0000001) | 7 |
| NGN | kobo (0.01) | 2 |

`server/src/lib/amount.js` converts decimal strings to `BigInt` minor units and back:

```js
toStroops('123.4567891')     // 1234567891n
fromStroops(1234567891n)     // '123.4567891'
addXlm('0.1', '0.2')         // '0.3'
compareXlm('10', '9.9999999') // 1
ngnTotal('100', '520.25')    // '52025.00'
```

The helpers also accept Prisma `Decimal` objects (anything with `toFixed`).

## Rounding

`ngnTotal(xlm, rate)` multiplies stroops by kobo and rounds **half-up** to the nearest kobo:

```
kobo = (stroops × rateKobo + 5_000_000) ÷ 10_000_000
```

## Validation

- XLM inputs: `^\d+(\.\d{1,7})?$` and greater than zero
- NGN rates: `^\d+(\.\d{1,2})?$` and greater than zero

Values with too many decimals are rejected rather than rounded.

## Stellar SDK

Stellar operations take amounts as strings with at most 7 decimals. Always pass `fromStroops(toStroops(value))` rather than `String(decimal)` — `Decimal#toString()` can produce exponent notation for tiny values.

## Client

The client uses floats only for **display estimates** (`estimateNgn`). The server's `ngnAmount` is authoritative.
