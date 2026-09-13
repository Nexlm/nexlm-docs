# Withdraw XLM

1. Open **Wallet → Withdraw**. (Requires a verified email.)
2. Paste the destination Stellar address.
3. Enter the amount, or tap **Max**.
4. Add a memo if the destination requires one.
5. Tap **Review withdrawal**, check the details, then **Send**.

After sending you'll see a link to the transaction on Stellar Expert.

## Rules

| Rule | Detail |
| --- | --- |
| Destination | A valid Stellar public key (starts with **G**). You can't send to your own wallet. |
| Amount | Up to your **withdrawable** balance, at most 7 decimal places |
| Memo | Optional text, up to 28 bytes |
| New accounts | If the destination doesn't exist yet, send at least 1 XLM to create it |
| Network fee | 0.00001 XLM |
| Rate limit | 10 withdrawals per hour |

::: warning Memos for exchanges
Many exchanges share one address and identify customers by memo. If the exchange shows a memo, include it or your deposit may not be credited.
:::

::: danger Stellar payments are final
Double-check the address. Nexlm cannot reverse a withdrawal.
:::

See [Balances explained](./balances) for why the withdrawable amount can be lower than your total balance.
