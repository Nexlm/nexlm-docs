# Balances explained

The Wallet page shows several numbers:

| Balance | How it's calculated |
| --- | --- |
| **Total balance** | Everything your Stellar account holds |
| **Reserve** | Stellar's minimum balance: 0.5 XLM × (2 + entries your account owns) |
| **Available** | Total − reserve − a 0.01 XLM fee buffer |
| **In sell orders** | For each active sell order: its amount + 2 XLM escrow overhead |
| **Withdrawable** | Available − in sell orders |

## Why sell orders reserve extra XLM

Every trade creates a new escrow account, which Stellar requires to hold a minimum balance. The seller funds each escrow with the trade amount **plus 2 XLM**. When the trade completes or is cancelled, the escrow account is merged back into the seller's wallet and the unused part of the 2 XLM is returned.

## Example

You hold 500 XLM and have one active sell order for 100 XLM.

| | XLM |
| --- | --- |
| Total | 500 |
| Reserve | 1 |
| Available | 498.99 |
| In sell orders | 102 |
| Withdrawable | 396.99 |

Cancel the order to make that 102 XLM withdrawable again.
