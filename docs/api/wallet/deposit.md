# Deposit details

```http
GET /api/wallet/deposit
```

**User**

## Response `200`

```json
{
  "publicKey": "GBZ…Q7X",
  "network": "testnet",
  "qrCode": "data:image/png;base64,iVBORw0KGgo…",
  "memoRequired": false,
  "warning": "This is a TESTNET wallet. Do not send real XLM to this address."
}
```

`qrCode` is a 280px PNG data URL encoding the public key. On mainnet `warning` reads "Only send XLM on the Stellar network to this address."
