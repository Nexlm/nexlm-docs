# Your Stellar wallet

Every Nexlm account comes with a Stellar wallet. Its address starts with **G** and is shown on the **Wallet** page and in **Settings**.

## What you can do

- [Deposit XLM](./deposit-xlm) by address or QR code
- [Withdraw XLM](./withdraw-xlm) to any Stellar address
- See recent on-chain activity with links to Stellar Expert
- Fund escrow automatically when you sell

## Custodial wallet

During early access, Nexlm manages the wallet's secret key for you so trades can be settled instantly. The key is encrypted with AES-256-GCM and only decrypted at the moment a transaction is signed.

::: info
Connecting your own external Stellar wallet is on the roadmap.
:::

## Activation

Stellar accounts must hold at least 1 XLM to exist. If you see **Wallet not activated yet**, deposit XLM to activate it. On testnet, wallets are activated automatically when you sign up.

## Recent activity

The activity list reads directly from the Stellar network and shows:

| Entry | Meaning |
| --- | --- |
| Received / Sent | A normal XLM payment |
| Account funded | Your wallet (or an escrow account) was created with a starting balance |
| Escrow returned | An escrow account was merged back into your wallet after a trade |
