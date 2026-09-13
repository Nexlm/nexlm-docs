# Trade monitoring

## Trades list

`/admin/trades` shows every trade, most recently updated first, with buyer → seller, XLM and Naira value, payment method, status and last update. Filter by status to focus on, for example, trades in `PAID`.

The list refreshes automatically when trades change.

## Trade detail

`/admin/trades/:id` shows:

- Trade ID, totals, rate, payment method
- Timestamps: opened, payment deadline, marked paid, completed or cancelled (with reason)
- Escrow account address and links to lock, release and refund transactions on Stellar Expert
- Buyer and seller, with links to their user pages
- The seller's payout account used for the trade
- The full trade chat, including payment proof images, updating live (read-only)

## Investigating a complaint

1. Search the trade ID or open it from the user's recent trades.
2. Read the chat and open any payment proof images.
3. Check timestamps: did the buyer mark paid before the deadline?
4. Verify on-chain state with the escrow links — is the escrow account still funded?
5. Check both users' reputations and history for patterns.
