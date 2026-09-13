# Cancelling a trade

## Who can cancel

Only the **buyer**, and only while the trade is **Awaiting payment**.

Once the buyer taps **I have paid**, the trade can no longer be cancelled.

## What happens

- The escrow is refunded to the seller.
- The trade shows **Cancelled — Cancelled by buyer**.
- The seller's order goes back on the market if it hasn't expired.

::: danger Already paid? Don't cancel
Cancelling returns the XLM to the seller. If you have sent money, tap **I have paid** instead and share your receipt.
:::

## Other ways a trade is cancelled

| Reason shown | Cause |
| --- | --- |
| Payment window expired | The buyer didn't mark the trade as paid within 15 minutes |
| Escrow could not be funded | The seller's lock transaction was rejected by Stellar; no XLM moved |
