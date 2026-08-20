---
title: The Math Graveyard
date: 2026-08-20
description: Four open math problems fell to AI models in twelve weeks — what the Jacobian conjecture disproof and the Astra results actually prove, and what the hype skips.
---

# The Math Graveyard

Since May, three frontier labs have put a body count on open mathematics that took the field decades to accumulate on its own. This is not a headline about a chatbot getting better at algebra. It's a headline about a category of problem — the kind that sits on a list for eighty years, that PhD students avoid because tenure committees don't reward failed attempts, that becomes a minor celebrity when someone finally cracks it — being cleared in batches, on weekends, for the price of a nice dinner.

The scoreboard, compressed:

- **May 2026** — an unreleased OpenAI model disproved the Erdős unit-distance conjecture, an 80-year-old problem in discrete geometry. External mathematicians, including Timothy Gowers and Noga Alon, checked and endorsed it.
- **July 20, 2026** — Levent Alpöge, a number theorist at Anthropic, posted a three-variable polynomial map that disproves the general Jacobian conjecture, open since Ott-Heinrich Keller's 1939 work. The counterexample was short enough to verify by hand. Kevin Buzzard's group at Imperial College had confirmed it by the next morning.
- **August 1, 2026** — an internal OpenAI model from the "Astra" family produced solutions to ten problems across mathematics, quantum complexity, and theoretical computer science, each open for ten years or more, with full Lean 4 formal proofs and a "sorry" count of zero across all ten.
- **Early August 2026** — Anthropic reported an unreleased Claude model pushing the known lower bound on the critical-line density of the Riemann zeta function from 41.6% to 67.25%, discovered as a side effect of a different request.

Four results, three labs, roughly twelve weeks. That is a defensible reading of "more than the previous decade," and I'd rather test that claim than just repeat it — because the interesting story isn't the count, it's what's actually changed underneath it.

## What actually changed

The mechanism is not "the model is smarter." It's that a chunk of pure math turned out to have a shape that plays to what these systems are now good at: long, exact, checkable chains of reasoning where a single wrong step voids the whole thing, but where the *search* for the right chain can absorb enormous amounts of trial and error that a human researcher can't afford career-wise. The OpenAI ten-problem release cost about $2,000 in inference. The Jacobian counterexample was three lines long once found. Neither of those numbers describes intelligence. They describe a search process that got cheap enough to run exhaustively against problems that were previously gated by how much unpaid dead-end time a mathematician was willing to burn.

That's also why Lean matters more than the press releases do. A model claiming a result is not evidence. A model producing a proof that Lean's kernel either accepts or rejects is a binary verdict that removes the need to trust the model at all — you're trusting a proof checker with a much smaller, much more scrutinized codebase. The "sorry" count of zero on the Astra release is the actual headline; everything above the fold about "AI solves ten problems" is marketing wrapped around that fact.

## The part the momentum narrative skips

Two corrections are worth sitting with, because they're the difference between a genuine trend and a hype cycle that happens to have some genuine results inside it.

First: this is not OpenAI's first claim of this shape. In October 2025, then-VP of science Kevin Weil said GPT-5 had solved ten previously unsolved Erdős problems. Thomas Bloom, who maintains the reference database for that problem set, called it a dramatic misrepresentation — the model had located existing papers in the literature that Bloom himself wasn't aware of, which is a real and useful capability, but a different one from *solving* an open problem. The gap between "found the answer in the literature" and "derived the answer" is exactly the gap a lab has an incentive to blur in a press release, and it's exactly the gap outside mathematicians have an incentive to police. That policing is working, which is the actual good news buried in this story — the field has grown antibodies to the hype fast enough to keep pace with the results.

Second: the Riemann result is being reported more carefully than the October 2025 claim was, and it's worth noting why. 67.25% is not a proof of the Riemann hypothesis. It's a stronger unconditional bound on where non-trivial zeros of the zeta function can sit, discovered as an unintended byproduct while the model was working on something else, and — per Anthropic's own writeup — the model was initially skeptical of its own result, having presumably absorbed from training data just how hard problems in this space tend to be. That detail is more interesting than the percentage. It suggests these systems currently carry an inherited prior about how hard math is that occasionally undersells what they can actually do, which is a strange and specific failure mode to have inherited from us.

## What this doesn't mean

It doesn't mean the Millennium Prize Problems are next. Astra's team tried and failed on those. It doesn't mean pure math becomes a solved category — the two-variable Jacobian conjecture, the historically famous version of that problem, is still open; the disproof only killed the general n-dimensional statement. And it doesn't mean the humans are optional: every result above has a named mathematician in the loop directing the search, framing the question, or doing the "which of these ten computer-verified facts is actually a publishable, interesting result" judgment call that Lean can't make for you. Epoch AI's FrontierMath open-problems tracker has quietly removed problems from its own benchmark for the opposite reason — cases where it wasn't clear the AI contributed the core idea rather than the human collaborator, and they didn't want to count it.

That's the actual state of the field right now: verification has gotten cheap and trustworthy, discovery has gotten fast in a narrow but real band of problems, and attribution — figuring out how much of a given result belongs to the model versus the mathematician who aimed it — is now the hard part. Which is a strange thing to say about mathematics, a field that used to be the last place you'd expect authorship to become the open question.
