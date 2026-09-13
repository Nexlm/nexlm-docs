# Update my profile

```http
PATCH /api/users/me
```

**User**

## Body

| Field | Type | Rules |
| --- | --- | --- |
| `phone` | string, optional | Nigerian mobile number. Spaces and dashes are removed; `0…`, `234…` and `+234…` forms are normalised to `+234…`. |

```json
{ "phone": "0803 123 4567" }
```

## Response `200`

```json
{ "user": { "phone": "+2348031234567", "…": "…" } }
```

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | "Enter a valid Nigerian phone number" |
