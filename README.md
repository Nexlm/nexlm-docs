# Nexlm Docs

Documentation for **Nexlm**, the peer-to-peer XLM ↔ Naira exchange with on-chain Stellar escrow. Built with [VitePress](https://vitepress.dev).

| Section | Audience |
| --- | --- |
| [User guide](docs/guide/) | Traders: accounts, wallet, buying, selling, safety |
| [Admin guide](docs/admin/) | Operations: KYC review, users, trade monitoring |
| [Developers](docs/developers/) | Engineers: architecture, escrow, setup, deployment |
| [API reference](docs/api/) | Integrators: every endpoint and realtime event |
| [Product](docs/product/) | Roadmap, changelog, glossary, design decisions |

Related repositories: [Nexlm/nexlm](https://github.com/Nexlm/nexlm) (app) · [Nexlm/nexlm-landing](https://github.com/Nexlm/nexlm-landing) (website).

## Run locally

```bash
npm install
npm run docs:dev      # http://localhost:5173
npm run docs:build    # static site in docs/.vitepress/dist
npm run docs:preview
```

## Structure

```
docs/
  .vitepress/
    config.mjs      site config, nav
    sidebars.mjs    sidebars per section
    theme/          brand styles
  index.md          home page
  guide/            user guide
  admin/            admin guide
  developers/       developer docs (models/ for database models)
  api/              API reference (one page per endpoint)
  product/          roadmap, changelog, glossary, decisions/
  public/           static assets
```

## Writing guidelines

- Document behaviour as implemented in `Nexlm/nexlm`. If the product changes, update the docs in the same release.
- Label planned features clearly as planned.
- One endpoint per API page: method and path, access level, request, response example, errors.
- Use VitePress callouts (`::: tip`, `::: warning`, `::: danger`) for safety-critical notes.
- Add new pages to `docs/.vitepress/sidebars.mjs`.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`, with `DOCS_BASE=/nexlm-docs/`. For a custom domain, leave `DOCS_BASE` unset.
