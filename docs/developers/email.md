# Email

`services/email.service.js` sends transactional email through Nodemailer.

## Configuration

| Variable | Notes |
| --- | --- |
| `SMTP_HOST` | Unset → emails are logged at `info` level with their text body |
| `SMTP_PORT` | `465` enables implicit TLS; anything else uses STARTTLS if offered |
| `SMTP_USER`, `SMTP_PASS` | Optional credentials |
| `MAIL_FROM` | Sender header |

The transporter is created lazily and reused.

## Messages

| Function | Trigger | Link |
| --- | --- | --- |
| `sendVerificationEmail` | Registration, resend | `${CLIENT_URL}/verify-email?token=…` |
| `sendPasswordResetEmail` | Forgot password | `${CLIENT_URL}/reset-password?token=…` (1 hour) |

Each has a plain-text and simple HTML version. Links use the **first** origin in `CLIENT_URL`.

## Failure handling

- Registration doesn't wait for the verification email; failures are logged.
- Resend and password reset await delivery, so SMTP errors surface as `500`.

## Local development

Without SMTP, copy the verification link from the server log:

```
[email disabled] Verify your Nexlm email address → you@example.com
```
