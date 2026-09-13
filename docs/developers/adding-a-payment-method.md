# How to add a payment method

Example: adding **Paystack Titan** accounts.

## 1. Database enum

`server/prisma/schema.prisma`:

```prisma
enum PaymentMethod {
  BANK_TRANSFER
  OPAY
  PALMPAY
  KUDA
  MONIEPOINT
  PAYSTACK_TITAN
}
```

```bash
npm run db:migrate -- --name add_paystack_titan
```

Adding an enum value is backwards compatible.

## 2. Server constants

`server/src/config/constants.js`:

```js
export const PAYMENT_METHODS = [..., 'PAYSTACK_TITAN'];
export const PAYMENT_METHOD_LABELS = { ..., PAYSTACK_TITAN: 'Paystack Titan' };
```

Validators read `PAYMENT_METHODS`, so the API accepts the new value automatically.

## 3. Account rules

If the method needs different fields (for example not 10 digits, or a required provider name), update `paymentAccountBody` in `server/src/validators/users.js` with a `refine` like the one requiring `bankName` for bank transfers, and add tests.

## 4. Client

- `client/src/lib/constants.js` — add `{ value: 'PAYSTACK_TITAN', label: 'Paystack Titan' }`
- `client/src/components/common/PaymentMethodChips.jsx` — add a chip colour

## 5. Docs and website

- Update the [payout accounts](/guide/payout-accounts) and [limits](/guide/limits-and-fees) pages
- Update `src/data/paymentMethods.js` in the landing site
