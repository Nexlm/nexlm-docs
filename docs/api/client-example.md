# JavaScript client example

A minimal typed-error client, similar to the one used by the Nexlm web app.

```js
export class NexlmError extends Error {
  constructor(status, { code = 'HTTP_ERROR', message = `Request failed (${status})`, details } = {}) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function createNexlmClient({ baseUrl, getToken }) {
  async function request(path, { method = 'GET', body, query } = {}) {
    const url = new URL(`${baseUrl}/api${path}`);
    for (const [key, value] of Object.entries(query ?? {})) {
      if (value !== undefined && value !== '') url.searchParams.set(key, value);
    }

    const headers = {};
    const token = getToken?.();
    if (token) headers.Authorization = `Bearer ${token}`;
    const isForm = body instanceof FormData;
    if (body && !isForm) headers['Content-Type'] = 'application/json';

    const res = await fetch(url, { method, headers, body: isForm ? body : body && JSON.stringify(body) });
    if (res.status === 204) return null;
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new NexlmError(res.status, data?.error);
    return data;
  }

  return {
    login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
    market: (type = 'SELL', filters = {}) => request('/orders', { query: { type, ...filters } }),
    openTrade: (orderId, paymentMethod) => request('/trades', { method: 'POST', body: { orderId, paymentMethod } }),
    trade: (id) => request(`/trades/${id}`),
    markPaid: (id) => request(`/trades/${id}/paid`, { method: 'POST' }),
    release: (id) => request(`/trades/${id}/release`, { method: 'POST' }),
    cancel: (id) => request(`/trades/${id}/cancel`, { method: 'POST' }),
    sendMessage: (id, content, file) => {
      const form = new FormData();
      if (content) form.append('content', content);
      if (file) form.append('image', file);
      return request(`/trades/${id}/messages`, { method: 'POST', body: form });
    },
  };
}
```

## Handling errors

```js
try {
  await client.openTrade(orderId, 'OPAY');
} catch (err) {
  if (!(err instanceof NexlmError)) throw err;
  switch (err.code) {
    case 'KYC_REQUIRED':
      return redirect('/kyc');
    case 'CONFLICT':
      return refreshMarket(); // someone else took the order
    case 'HORIZON_UNAVAILABLE':
      return showPending('Checking Stellar… refresh your trades shortly');
    default:
      return showError(err.message);
  }
}
```

See [error codes](./errors).
