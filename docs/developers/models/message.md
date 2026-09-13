# Message

| Field | Type | Notes |
| --- | --- | --- |
| `id` | String | |
| `tradeId` | String | Cascade-deleted with the trade |
| `senderId` | String? | `null` for system messages |
| `content` | VarChar(2000)? | |
| `imageUrl` | String? | Cloudinary or local upload URL |
| `isSystem` | Boolean | Platform-generated status messages |
| `createdAt` | DateTime | |

A message must have `content`, an image, or both.

## System messages

Posted by `postSystemMessage` in the trade service when:

- escrow is locked
- the buyer marks the trade as paid
- XLM is released
- escrow is refunded (buyer cancel, timeout, reconciliation)
- escrow could not be funded (reconciliation)

Chat accepts new messages until 24 hours after `completedAt`/`cancelledAt`.
