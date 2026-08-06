---
title: "Over $100 Million In Bitcoin Stolen By 'Numerous' Hackers—How A Software Bug Made It Possible"
date: 2026-08-06
description: 'A single misread macro turned five years of Coldcard seed phrases into a solvable math problem.'
---

# Over $100 Million In Bitcoin Stolen By 'Numerous' Hackers—How A Software Bug Made It Possible

No phishing link. No malicious firmware. No device ever left its owner's hands.

Since late July 2026, more than $100 million in bitcoin — some estimates put it closer to $130 million — has been drained from thousands of Coldcard hardware wallets, the "cold storage" devices marketed as one of the safest ways to hold bitcoin precisely because they're never connected to the internet.

The attackers didn't break the encryption. They didn't need the physical device at all.

They just did the math.

---

## The Product That Was Supposed to Be Unhackable

Coldcard, made by Canadian firm Coinkite, is a bitcoin-only hardware wallet built for people who take self-custody seriously. It generates a seed phrase — a string of ordinary-looking words like "pepper" or "floorboard" — that encodes the private key controlling access to the coins. The entire security model rests on one assumption: that seed phrase is the product of true randomness, drawn from a dedicated hardware random number generator (RNG) that no outside party can predict or reproduce.

That assumption held for years. Then it didn't.

---

## The Bug, Precisely

In March 2021, a single code commit shipped in Coldcard firmware 4.0.0 quietly broke it.

Coinkite had built its own hardware RNG wrapper for the device's chip, and deliberately disabled MicroPython's built-in randomness path to avoid conflicts — setting a configuration flag, `MICROPY_HW_ENABLE_RNG`, to zero. That part was intentional and correct.

The failure was one line downstream, in a supporting cryptographic library called libngu. Its guard condition read `#ifndef MICROPY_HW_ENABLE_RNG` — a check for whether the macro *exists*, not what it's *set to*. Because the flag was defined as zero rather than left undefined, the library concluded hardware randomness was available and routed key generation to a software fallback called Yasmarang instead.

The hardware chip was sitting right there, fully functional. The firmware simply never asked it for a number.

In its place, the software substitute generated seeds from two inputs: the device's factory-assigned serial number, and its internal clock registers at boot. Neither is a secret. The serial number is fixed metadata. The clock state is something an attacker can measure directly on an identical device they own.

On the affected Mk2 and Mk3 units, that shrank the effective randomness of a seed phrase from a target of 128 bits down to roughly 40 — a search space small enough to brute-force on ordinary hardware. Newer models that mixed in partial secure-element entropy fared better, landing around 72 bits. Still not 128. Bits are exponents; the gap is not cosmetic.

For five years, nobody noticed.

---

## The Sweep

Once someone did notice — whether independently or by reading the same code Coinkite had shipped since 2021 — exploiting it required no access to the victim's device, their network, or their recovery phrase. Just compute.

The attackers reconstructed the seed generation locally, enumerated the reduced key space, and checked the resulting addresses against the blockchain for balances. Anywhere a match hit, they moved the funds.

The pace of the theft is the part that should unsettle anyone who still thinks of "cold storage" as inherently slow-motion safe:

- **594 BTC** (~$38M) drained from roughly 500 wallets in a **25-minute window** on July 31
- A second wave pushed the cumulative total to **1,367 BTC** by August 2
- A third sweep on August 3 added **449 BTC**
- By the time Galaxy Research published its consolidated analysis, the count stood at **1,596–1,816 BTC** across more than **5,200–7,300 addresses**, worth $116–130 million depending on the snapshot

Multiple blockchain-intelligence firms — Galaxy Research, Elliptic, and Block's own security team — independently corroborated the pattern. Crucially, this wasn't one actor. TechCrunch reported at least a dozen distinct hackers running the same math against the same predictable key space, arriving at the same wallets from different directions. The vulnerability wasn't a door somebody picked. It was a public formula, and whoever read the code first got there fastest.

Roughly 90% of the stolen funds sat untouched in the thieves' receiving wallets as of the initial reporting — moved, but not yet laundered or cashed out. That's not restraint. It's a queue.

---

## Why This One Is Different

Crypto has no shortage of nine-figure heists. TRM Labs recorded more than 200 separate hacks against crypto companies in the first half of 2026 alone, totaling near $1 billion. What makes Coldcard notable isn't the dollar figure — it's the failure mode.

Exchange hacks and hot-wallet drains are, in a sense, expected risk. You're trusting a company's servers, its access controls, its employees. Cold storage exists specifically to remove that trust — to take the private key fully offline, under the owner's exclusive physical control, immune to remote compromise by design.

This bug broke that premise from the inside, at the moment of wallet creation, before the user ever did anything wrong. As Metaplanet CEO Simon Gerovich put it: *"Even careful people doing everything right can be exposed by a flaw they had no way to see."*

There's no phishing training that prevents this. No amount of operational security compensates for a seed that was never actually random. The victims followed every recommended practice — offline generation, physical device, no cloud backup — and it didn't matter, because the randomness itself was compromised before the device left the factory.

---

## The Uncomfortable Precedent

This isn't a new category of bug. Binance founder Changpeng Zhao pointed to an almost identical incident: Trust Wallet hit the same class of flaw — a pseudo-random number generator that wasn't truly random — years earlier, at a $12 million scale. Trust Wallet's parent company covered every affected user.

Coinkite, so far, is assisting victims with tracing but has not committed to compensation.

Coinkite's CEO Rodolfo Novak has also floated a more provocative theory: that AI-assisted code review may be what surfaced a five-year-old bug that human auditors missed across multiple prior reviews. Security researchers are skeptical of that framing — the root cause traces to a specific, identifiable engineering error in how a conditional macro was evaluated, not some emergent AI-discovery event. But the implicit question is worth sitting with regardless: if tooling is now good enough to find bugs like this at scale, in code that's been shipping and passing review for half a decade, how many more `#ifndef` mistakes are quietly sitting in production firmware right now, in wallets, in medical devices, in anything where "it's been fine so far" has substituted for "we verified this is fine"?

---

## The Real Lesson

The temptation is to read this as a hardware-wallet story — patch your firmware, migrate your funds, move on. Coinkite has released fixes, and users on affected versions are being told to generate new seeds on unaffected firmware and transfer their coins.

But the deeper lesson is about the nature of the guarantee itself. "Hardware random number generator" is a sentence that implies a physical, verifiable, trust-minimizing process. What actually shipped was a software routing bug that silently substituted predictability for randomness — and did so in a way that was, for five years, invisible to the people relying on it, because the *symptom* of the bug (a working wallet, a valid-looking seed phrase) was indistinguishable from correct behavior. The system didn't fail loudly. It failed quietly, and kept issuing wallets that looked exactly like secure ones.

That's the pattern worth remembering, far beyond bitcoin: the most dangerous bugs aren't the ones that crash. They're the ones that keep working, convincingly, while the guarantee underneath them has already been hollowed out.

---

_Cold storage was supposed to mean the key never touches a network you don't control. Nobody accounted for the key never being random in the first place._
