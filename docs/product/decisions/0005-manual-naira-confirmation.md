# 0005 Sellers confirm Naira receipt manually

- Status: Accepted
- Date: 2026-09-13

## Context

Automatically confirming Naira payments would require holding customer funds or integrating bank and wallet APIs for every supported method. Holding Naira also changes Nexlm's regulatory position from P2P facilitator to payment intermediary.

## Decision

Naira moves directly between traders. The buyer marks the trade as paid; the seller checks their own account and releases escrow. Nexlm provides chat, payment proof uploads and guidance, but never touches the Naira.

## Consequences

- ✅ No custody of fiat and no dependency on bank APIs
- ✅ Works with any bank or mobile wallet from day one
- ⚠️ Fake payment alerts are the main fraud vector, so seller education is critical
- ⚠️ A buyer who paid depends on the seller releasing; a dispute process is required (Phase 2)
