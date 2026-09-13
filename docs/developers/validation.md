# Request validation

Every route validates its inputs with zod before reaching a service.

```js
router.post(
  '/',
  requireAuth,
  validate({ body: createOrderBody }),
  asyncHandler(async (req, res) => {
    res.status(201).json(await orders.createOrder(req.user, req.valid.body));
  }),
);
```

`validate({ params, query, body })` parses each part and puts the **parsed** result on `req.valid`. Handlers read `req.valid.*`, never raw `req.body`, so transformations (trimming, lowercasing, coercion, de-duplication) always apply.

## Shared schemas

`src/validators/common.js`:

| Schema | Rules |
| --- | --- |
| `email` | trimmed, lowercased, valid email, ≤ 254 chars |
| `password` | 8–128 chars, at least one letter and one digit |
| `xlmAmount` | string or number → string, ≤ 7 decimals, > 0 |
| `ngnRate` | string or number → string, ≤ 2 decimals, > 0 |
| `stellarAddress` | valid ed25519 public key (`G…`) |
| `paymentMethod` | one of the five supported methods |
| `pageQuery` | `page ≥ 1`, `1 ≤ pageSize ≤ 100`, coerced from strings |

## Area schemas

| File | Schemas |
| --- | --- |
| `auth.js` | register, login, verify email, forgot/reset/change password |
| `users.js` | profile update, payout account, Nigerian phone normalisation |
| `kyc.js` | ID type, 11-digit number, names, date of birth (18+) |
| `wallet.js` | withdrawal (memo ≤ 28 bytes), activity cursor |
| `orders.js` | create order, market filters, my orders |
| `trades.js` | open trade, my trades scope, chat message |
| `admin.js` | user filters, status change, KYC decision, trade filters |

## Error format

Validation failures return `400 VALIDATION_ERROR` with the first issue as `message` and every issue in `details`:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Password must contain a number",
    "details": [{ "path": "password", "message": "Password must contain a number" }]
  }
}
```

The client's `fieldErrors()` helper maps `details` onto form fields.
