# 0001 Custodial wallets for Phase 1

- Status: Accepted
- Date: 2026-09-13

## Context

Escrow locks must be signed by the seller. Requiring every seller to connect an external wallet and sign in real time adds friction and failure modes (wrong network, rejected prompts, timeouts) exactly when a buyer is waiting.

## Decision

Generate a Stellar keypair per user at registration. Encrypt the secret with AES-256-GCM using a server-held key and decrypt it only immediately before signing a lock or withdrawal.

## Consequences

- ✅ One-click trades; no wallet setup for new users
- ✅ Escrow locks happen server-side in a single request
- ⚠️ Nexlm holds user funds and must protect `ENCRYPTION_KEY` and the database as a pair
- ⚠️ Regulatory expectations for custodians may apply
- ➡️ External wallet connections are planned so experienced users can self-custody
