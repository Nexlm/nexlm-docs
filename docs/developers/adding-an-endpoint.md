# How to add an API endpoint

Example: `GET /api/orders/:id/trades` — list trades opened on one of your orders.

## 1. Validate input

Reuse `idParams` from `validators/common.js`, or add a schema to the area's validator file.

## 2. Add service logic

`server/src/services/order.service.js`:

```js
export async function listOrderTrades(userId, orderId) {
  const order = await prisma.order.findUnique({ where: { id: orderId }, select: { userId: true } });
  if (!order) throw notFound('Order not found');
  if (order.userId !== userId) throw forbidden('You can only view trades on your own orders');

  return prisma.trade.findMany({
    where: { orderId },
    orderBy: { createdAt: 'desc' },
    include: { buyer: { select: publicUserSelect }, seller: { select: publicUserSelect } },
  });
}
```

Rules of thumb:

- Throw `AppError` helpers; never touch `req`/`res`.
- Select only the fields you need — never return raw users.
- Use `amount.js` for any money math.

## 3. Wire the route

`server/src/routes/orders.routes.js`:

```js
router.get(
  '/:id/trades',
  requireAuth,
  validate({ params: idParams }),
  asyncHandler(async (req, res) => {
    res.json({ items: await orders.listOrderTrades(req.user.id, req.valid.params.id) });
  }),
);
```

Register specific paths before generic ones (e.g. `/mine` before `/:id`).

## 4. Test

Put pure logic in a separate module and add a Vitest file in `server/tests/`. For flows that touch Prisma or Stellar, extend the smoke test.

## 5. Document

Add a page under `docs/api/` in this repository and link it in the API sidebar.
