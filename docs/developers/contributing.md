# Contributing

## Workflow

1. Branch from `main` (`feat/…`, `fix/…`, `docs/…`).
2. Keep commits small and use [Conventional Commits](https://www.conventionalcommits.org/).
3. Run `npm test` and `npm run build`.
4. Open a pull request; CI must pass.

## Money-moving code

Changes under `server/src/stellar/` or to `trade.service.js` need extra care:

- Never log, return or persist a plaintext secret.
- Use `amount.js` helpers — no floats.
- Claim state transitions atomically with conditional `updateMany`.
- Roll back only on `STELLAR_TX_FAILED`.
- Update `tradeRules.test.js` for rule changes and run the testnet [smoke test](./testing#smoke-test).

## Documentation

Every user-visible or API change should update this docs site in the same release. Docs live in [Nexlm/nexlm-docs](https://github.com/Nexlm/nexlm-docs); use the **Suggest an edit** link at the bottom of any page.

## Security issues

Report privately to security@nexlm.app.
