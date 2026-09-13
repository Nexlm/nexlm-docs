# Client architecture

The web client (`client/`) is a Vite + React single-page app.

## Routing

`src/App.jsx` defines routes with React Router:

| Guard | Routes |
| --- | --- |
| `GuestOnly` | `/login`, `/register`, `/forgot-password` |
| none | `/`, `/u/:displayName`, `/verify-email`, `/reset-password` |
| `RequireAuth` | `/orders`, `/orders/new`, `/trades`, `/trades/:id`, `/wallet`, `/settings`, `/kyc` |
| `RequireAuth` + `RequireAdmin` | `/admin`, `/admin/users`, `/admin/users/:id`, `/admin/trades`, `/admin/trades/:id` |

Admin pages are lazy-loaded so regular users don't download them.

## State

| Store | Contents |
| --- | --- |
| `authStore` (Zustand, persisted) | `token`, `user`, `login`, `register`, `logout`, `refreshUser` |
| `toastStore` | Transient notifications via `toast.success/info/error` |

Server data isn't cached globally — pages load it with `useApi`.

## Data fetching

```js
const { data, loading, error, reload, setData } = useApi(() => api.get('/trades', { scope, page }), [scope, page]);
```

- Refetches when dependencies change and ignores stale responses.
- `reload({ silent: true })` refreshes without a loading flash — used after socket events.
- `setData` applies optimistic or server-returned updates.

## API client

`src/lib/api.js` wraps `fetch`:

- Prefixes `VITE_API_URL` + `/api`
- Adds the bearer token via handlers registered by the auth store (avoids circular imports)
- Serialises JSON, passes `FormData` through untouched
- Throws `ApiError { status, code, message, details }`
- Logs the user out on `401` when a token was sent

## Realtime

`useSocket()` returns a shared socket for the current token; `useSocketEvent(event, handler)` subscribes for a component's lifetime. The trade room joins `trade:<id>` and rejoins on reconnect.

## Styling

Tailwind with a `brand` palette and a few component classes (`card`, `field`, `label`, `page-title`) in `index.css`. Shared UI lives in `components/ui`.
