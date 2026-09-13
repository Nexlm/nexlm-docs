# Releasing XLM

Releasing sends the escrowed XLM to the buyer. **Only sellers can release, and it can't be undone.**

## Before you release

1. Open your bank or wallet app.
2. Find the credit in your transaction history.
3. Check the amount matches the trade's Naira total exactly.
4. Check the sender name matches the buyer.

## Release

1. In the trade room, tap **Release XLM**.
2. Tick **I have checked my account and received ₦…**.
3. Tap **Release**.

The trade moves to **Releasing XLM** for a few seconds, then **Completed**. A link to the release transaction appears under **On-chain record**.

## What happens on-chain

One Stellar transaction from the escrow account:

1. Pays the trade amount to the buyer
2. Removes the platform co-signer
3. Merges the remaining balance back into your wallet

## If release fails

If Stellar rejects the transaction, the trade returns to its previous status and you can try again. If the network times out, Nexlm checks the escrow's on-chain history and completes the trade automatically once the outcome is known.
