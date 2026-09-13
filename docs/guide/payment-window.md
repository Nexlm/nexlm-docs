# Payment window

Buyers have **15 minutes** to pay and tap **I have paid**.

## When it starts

The window starts once the seller's XLM is confirmed in escrow — not when the offer is clicked.

## When it stops

Tapping **I have paid** stops the timer permanently. From that point the trade can only end with the seller releasing the XLM.

The **I have paid** button is disabled once the window has closed.

## When it expires

If the trade is still awaiting payment when time runs out, Nexlm's background job refunds the escrow to the seller, normally within about 15 seconds. The trade shows **Cancelled — Payment window expired**, and the seller's order is reactivated if it hasn't expired.

::: warning Paid at the last second?
If you sent money but the window expired before you tapped **I have paid**, tell the seller in the chat immediately and contact support with the trade ID and your receipt.
:::
