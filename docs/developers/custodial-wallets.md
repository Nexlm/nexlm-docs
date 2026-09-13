# Custodial wallets

## Creation

On registration, `auth.service.register`:

1. Generates a random Stellar keypair.
2. Encrypts the secret with `encryptSecret` (AES-256-GCM, `ENCRYPTION_KEY`).
3. Stores `stellarPublicKey` and `stellarSecretEnc` on the user.
4. On testnet, calls Friendbot in the background (failures are logged, not fatal).

## Encryption format

```
base64(iv) . base64(authTag) . base64(ciphertext)
```

- 12-byte random IV per encryption
- 16-byte GCM auth tag — tampering causes decryption to throw
- Implemented in `src/lib/crypto.js`, wrapped with the app key in `src/lib/secrets.js`

## Using the secret

Secrets are decrypted only immediately before signing:

- `lockEscrow` — seller funds escrow
- `sendXlm` — withdrawals

They are never logged, returned by the API, or held in long-lived variables.

## Withdrawals

`wallet.service.withdraw`:

1. Loads the user's encrypted secret.
2. Computes `withdrawable = available − committedToSellOrders`.
3. Rejects amounts above that with `422 INSUFFICIENT_BALANCE`.
4. Sends a `payment`, or `createAccount` if the destination doesn't exist (≥ 1 XLM required).
5. Records a `WITHDRAWAL` [transaction](./models/transaction).

## Roadmap

Phase 2 adds external wallet connections, where users sign escrow locks with their own keys.
