# KYC integration

## Flow

`kyc.service.submitKyc(user, input)`:

1. Rejects users already `VERIFIED` or `PENDING` (`409`).
2. Computes `kycIdHash = HMAC-SHA256("BVN:12345678901", ENCRYPTION_KEY)`.
3. Rejects the ID if another user has the same hash (`409`).
4. Stores ID type, last four digits, full name, hash and submission time.
5. Verifies with Smile ID if configured; otherwise sets `PENDING` for [manual review](/admin/kyc-review).

## Smile ID

`services/smileId.js` calls the **Basic KYC** `id_verification` endpoint.

| Setting | Value |
| --- | --- |
| Sandbox URL | `https://testapi.smileidentity.com/v1/id_verification` |
| Production URL | `https://api.smileidentity.com/v1/id_verification` |
| `country` | `NG` |
| `id_type` | `BVN` or `NIN_V2` |
| `job_type` | `5` |
| Timeout | 30 seconds |

### Signature

```
signature = base64( HMAC-SHA256( timestamp + partner_id + "sid_request", api_key ) )
```

### Decision

The submission is `VERIFIED` when:

- `Actions.Verify_ID_Number === "Verified"`, and
- `Actions.Names` is `"Exact Match"` or `"Partial Match"`

Otherwise it's `REJECTED`. The Smile job ID is saved as `kycReference`.

Network failures or non-2xx responses return `503 KYC_PROVIDER_ERROR` without changing the user's status.

::: tip Tuning
Decision rules depend on your risk appetite. Consider also requiring a date-of-birth match (`Actions.DOB`), and review Smile ID's current result codes before going live.
:::

## Privacy

The full ID number exists only in memory for the duration of the request.
