# File uploads

Payment proof images are uploaded with chat messages.

## Flow

1. `singleImage('image')` (Multer, memory storage) accepts one file up to 5 MB.
2. `upload.service.storeImage` sniffs the **magic bytes** with `detectImageType`:
   - JPEG `FF D8 FF`
   - PNG `89 50 4E 47 0D 0A 1A 0A`
   - WebP `RIFF….WEBP`
3. Anything else — SVG, PDF, HTML renamed to `.png` — is rejected with `400`.
4. The image is stored and its URL saved on the message.

The client-provided MIME type is never trusted.

## Storage backends

| Condition | Backend | URL |
| --- | --- | --- |
| `CLOUDINARY_URL` set | Cloudinary, folder `nexlm/payment-proofs` | `secure_url` from Cloudinary |
| Otherwise | Local disk `server/uploads/payment-proofs/` | `${PUBLIC_API_URL}/uploads/payment-proofs/<random>.<ext>` |

Local files get a 32-hex-character random name and are served by `express.static` with a 7-day cache. Helmet's `Cross-Origin-Resource-Policy` is set to `cross-origin` so the client on another origin can display them.

## Production notes

- Use Cloudinary (or another object store) in production — local disk is ephemeral on most PaaS hosts.
- Payment proofs can contain bank details. Treat upload URLs as sensitive and consider signed/private delivery.
