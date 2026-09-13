# The trade room

Every trade has its own page with everything both parties need. Open it from **My Trades**.

## What you'll see

- **Next-step guidance** tailored to whether you're buying or selling and the trade's status
- **Countdown** while the buyer's payment window is open
- **Trade summary** — amount, price, Naira total, payment method and the order's terms
- **Payment details** — the seller's payout account for this trade
- **Action buttons** — only the actions you're allowed to take right now
- **On-chain record** — links to the escrow lock, release or refund on Stellar Expert, plus the escrow account address
- **Chat** — realtime messages and payment proof

## Who can do what

| Status | Buyer | Seller |
| --- | --- | --- |
| Awaiting payment | I have paid · Cancel trade | Release XLM |
| Paid — awaiting release | — | Release XLM |
| Completed / Cancelled | — | — |

The page updates live when the other party acts.

## Escrow, step by step

1. **Locked** — the seller's XLM plus 2 XLM moves into a new escrow account. The escrow's own key is disabled in the same transaction.
2. **Released** — the buyer receives the XLM, and the rest merges back to the seller.
3. **Refunded** — everything merges back to the seller.
