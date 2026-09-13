# Contributing to Nexlm Docs

1. Fork or branch from `main`.
2. Run `npm run docs:dev` and edit Markdown under `docs/`.
3. Add new pages to `docs/.vitepress/sidebars.mjs`.
4. Run `npm run docs:build` — it fails on dead links.
5. Open a pull request using a Conventional Commit title, e.g. `docs(api): document POST /orders`.

## Accuracy

Docs must match the behaviour of [Nexlm/nexlm](https://github.com/Nexlm/nexlm). When in doubt, link to or quote the relevant source file and confirm limits (payment window, order TTL, sizes, rate limits) against `server/src/config`.

## Style

- Short sentences, second person for user guides ("you").
- Use tables for fields, limits and error codes.
- Mark planned features explicitly.
- Never include real personal data, keys or tokens in examples.
