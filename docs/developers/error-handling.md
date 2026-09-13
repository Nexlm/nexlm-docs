# Error handling

## Throwing

Services throw helpers from `src/lib/errors.js`:

| Helper | Status | Default code |
| --- | --- | --- |
| `badRequest(message, details?)` | 400 | `BAD_REQUEST` |
| `unauthorized(message?, code?)` | 401 | `UNAUTHORIZED` |
| `forbidden(message?, code?)` | 403 | `FORBIDDEN` |
| `notFound(message?)` | 404 | `NOT_FOUND` |
| `conflict(message, details?)` | 409 | `CONFLICT` |
| `unprocessable(message, code?, details?)` | 422 | `UNPROCESSABLE` |
| `serviceUnavailable(message, code?, details?)` | 503 | `SERVICE_UNAVAILABLE` |

Or `new AppError(status, message, code, details)` directly.

Async route handlers are wrapped in `asyncHandler` so rejections reach the error middleware.

## Middleware mapping

`src/middleware/errorHandler.js` converts errors to JSON:

| Error | Response |
| --- | --- |
| `ZodError` | `400 VALIDATION_ERROR` with `details` |
| `MulterError` | `400 UPLOAD_ERROR` (friendly message for oversized files) |
| Malformed JSON body | `400 INVALID_JSON` |
| Prisma `P2002` (unique violation) | `409 CONFLICT` |
| Prisma `P2025` (record not found) | `404 NOT_FOUND` |
| `AppError` | Its status, code, message and details |
| Anything else | `500 INTERNAL_ERROR` with a generic message; full error logged |

Unknown routes return `404 ROUTE_NOT_FOUND`.

## Response shape

```json
{ "error": { "code": "INSUFFICIENT_BALANCE", "message": "…", "details": { } } }
```

`details` is omitted when undefined. See the [error code reference](/api/errors).

## Logging

`AppError`s with status ≥ 500 are logged at `warn`; unexpected errors at `error` with method, path and stack.
