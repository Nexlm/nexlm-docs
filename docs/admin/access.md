# Getting admin access

Admins are created or promoted with the server seed script. There is no self-service admin sign-up.

```bash
cd server
ADMIN_EMAIL=ops@nexlm.app \
ADMIN_PASSWORD='a-long-unique-password1' \
ADMIN_DISPLAY_NAME=nexlm_ops \
npm run db:seed
```

| Situation | Result |
| --- | --- |
| Email not registered | Creates a verified admin with a new Stellar wallet (funded on testnet) |
| Email already registered | Promotes that user to `ADMIN` and marks their email verified |

`ADMIN_DISPLAY_NAME` is optional and defaults to `nexlm_admin`.

After seeding, log in normally. An **Admin** link appears in the top navigation.

## Good practice

- Give each operator their own admin account — don't share credentials.
- Use an email address that isn't used for trading.
- Admin accounts cannot be suspended or banned from the admin UI; demote them directly in the database if needed.
