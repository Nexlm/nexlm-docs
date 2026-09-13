# Quickstart

Walk through a full trade against a local API on testnet using `curl` and `jq`.

```bash
API=http://localhost:4000/api
```

## 1. Register two traders

```bash
SELLER=$(curl -s -X POST $API/auth/register -H 'Content-Type: application/json' \
  -d '{"email":"seller@example.ng","password":"naira2026","displayName":"seller_ng"}' | jq -r .token)

BUYER=$(curl -s -X POST $API/auth/register -H 'Content-Type: application/json' \
  -d '{"email":"buyer@example.ng","password":"naira2026","displayName":"buyer_ng"}' | jq -r .token)
```

Both wallets are funded by Friendbot within a few seconds.

## 2. Make them eligible

Open each verification link from the server log, submit KYC, then approve both as an admin:

```bash
curl -s -X POST $API/admin/kyc/$USER_ID -H "Authorization: Bearer $ADMIN" \
  -H 'Content-Type: application/json' -d '{"decision":"APPROVE"}'
```

## 3. Seller: payout account and order

```bash
curl -s -X POST $API/users/me/payment-accounts -H "Authorization: Bearer $SELLER" \
  -H 'Content-Type: application/json' \
  -d '{"method":"OPAY","accountName":"Seller Name","accountNumber":"8031234567"}'

ORDER=$(curl -s -X POST $API/orders -H "Authorization: Bearer $SELLER" \
  -H 'Content-Type: application/json' \
  -d '{"type":"SELL","xlmAmount":"100","ngnRate":"520.50","paymentMethods":["OPAY"]}' | jq -r .id)
```

## 4. Buyer: open the trade

```bash
TRADE=$(curl -s -X POST $API/trades -H "Authorization: Bearer $BUYER" \
  -H 'Content-Type: application/json' \
  -d "{\"orderId\":\"$ORDER\",\"paymentMethod\":\"OPAY\"}")

echo $TRADE | jq '{id, status, ngnAmount, actions, escrow: .links.escrow}'
TRADE_ID=$(echo $TRADE | jq -r .id)
```

`status` is `ESCROW_LOCKED` and `links.escrow` points at the lock on Stellar Expert.

## 5. Pay, mark paid, release

```bash
curl -s -X POST $API/trades/$TRADE_ID/paid    -H "Authorization: Bearer $BUYER"  | jq .status   # "PAID"
curl -s -X POST $API/trades/$TRADE_ID/release -H "Authorization: Bearer $SELLER" | jq .status   # "COMPLETED"
```

## 6. Check balances

```bash
curl -s $API/wallet -H "Authorization: Bearer $BUYER" | jq .balance   # ~10100
```

Next: explore [trades](./trades/get), [errors](./errors) and [realtime events](./socket-events).
