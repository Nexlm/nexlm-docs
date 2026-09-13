# Send a trade message

```http
POST /api/trades/:id/messages
Content-Type: multipart/form-data
```

**User** (buyer, seller or admin)

## Form fields

| Field | Type | Rules |
| --- | --- | --- |
| `content` | text, optional | ≤ 2,000 chars, trimmed |
| `image` | file, optional | JPEG, PNG or WebP by content; ≤ 5 MB |

At least one is required.

```bash
curl -X POST "$API/api/trades/$TRADE/messages" \
  -H "Authorization: Bearer $TOKEN" \
  -F "content=Paid, receipt attached" \
  -F "image=@receipt.png"
```

## Response `201`

The created message (see [list messages](./messages-list)). A `message:new` event is emitted to the trade room.

## Errors

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `BAD_REQUEST` | Empty message, or file isn't a supported image |
| 400 | `UPLOAD_ERROR` | "Image must be 5 MB or smaller" |
| 403 | `FORBIDDEN` | |
| 409 | `CONFLICT` | "Chat for this trade is closed" (24 h after the trade ended) |
