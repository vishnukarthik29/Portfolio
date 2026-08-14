---
title: "Generative AI Can Now Design Proteins From Scratch. The Screening Systems Built to Catch Bioweapons Weren't Built for That."
date: 2026-08-14
description: 'RFdiffusion went from research demo to clinical candidates in two years. The biosecurity infrastructure meant to watch it is still checking IDs against a guest list from 2010.'
---

# Generative AI Can Now Design Proteins From Scratch. The Screening Systems Built to Catch Bioweapons Weren't Built for That.

For twenty years, biosecurity screening has rested on one assumption: dangerous biology looks like biology we already know.

Order a gene sequence resembling anthrax toxin or a Select Agent pathogen, and synthesis providers flag it. Compare the ordered sequence against a reference list, look for a close match, block the order if one's found. It's a fingerprint-matching system, and until recently, that was a reasonable bet — nature is conservative, and dangerous function tended to travel with recognizable sequence.

Generative protein design broke that assumption. Not eventually. Already.

---

## What Actually Shipped

In December 2025, the Baker Lab released RFdiffusion3, extending its diffusion-based design approach to atom-level generation across DNA, RNA, and small-molecule interactions — open-source, and building on a model that had already changed the unit economics of protein engineering. Where earlier computational methods required screening tens of thousands of candidates to find one that worked, RFdiffusion has, in Baker Lab experiments, gotten that number down to as few as one per design challenge.

That's not a faster search. It's a different kind of tool — generation instead of retrieval.

By mid-2026, the platforms built on this approach had moved past pipeline-filling into clinical validation. Xaira Therapeutics — co-founded by David Baker, launched in 2024 with the largest initial funding commitment in biotech history — combined RFdiffusion-derived design with functional genomics into a single stack. Isomorphic Labs, the AlphaFold lineage spun out of DeepMind, published IsoDDE, a diffusion model generating drug candidates with near-perfect binding accuracy, backed by $1.7B+ in Eli Lilly milestones and $1.2B with Novartis. Generate Biomedicines went public. At BIO 2026, the industry's framing shifted from *this might work eventually* to *this already produced a Phase IIa candidate.*

Meanwhile, at MIT, VibeGen pushed the frontier further — designing proteins not just for static shape but for how they move, opening the door to dynamic biomaterials and adaptive therapeutics that fold, flex, and respond.

This is the legitimate, extraordinary case for generative biology: diseases that resisted twenty years of conventional drug discovery are now design problems instead of search problems. That distinction is the whole story on the upside.

---

## The Same Capability, Read Differently

Here's the sentence that should sit uncomfortably next to all of that progress, from a 2025 study published in *Science*:

Researchers evaluated whether open-source AI protein design tools could generate variants of known toxins and pathogen virulence factors that retained their dangerous function while evading biosecurity screening software. They could. Reliably.

The mechanism is precise, not hand-wavy. Generative models don't copy known toxin sequences — they design new sequences that fold into the same functional shape through a different amino acid path. Function is preserved. Sequence identity isn't. And identity is the only thing conventional screening checks.

A CSIS analysis of the resulting gap put a number on how thin the current safety net actually is: the U.S. Select Agents and Toxins List contains 63 regulated organisms and toxins. Extend it to include export-controlled items on the Commerce Control List, and the count reaches roughly 150. Every synthesis screening system in the industry is, in effect, checking incoming orders against a guest list of 150 names — built for a world where dangerous biology had to resemble something already on that list.

Generative design doesn't need to. It can produce the 151st entry, structurally novel, functionally identical, and the screening software has no basis to flag it, because there is nothing in its reference database to match against.

---

## Why This Isn't a Hypothetical Gap

The researchers who found the vulnerability didn't just publish the problem. They built patches — functional-prediction layers that flag sequences based on what they'd *do* rather than what they *resemble* — and worked with synthesis providers to deploy them. That's the responsible-disclosure version of this story, and it happened.

What hasn't happened is the regulatory infrastructure catching up to match.

A White House executive order issued in May 2026 created new uncertainty rather than resolving it — indicating the existing nucleic acid synthesis screening framework would be revised within 90 days. That deadline passed on August 3, 2026, without replacement guidance. As of this writing, the field is operating without a clear, current federal standard for what AI-resilient screening is even supposed to look like.

This is the structural pattern worth naming plainly: the capability moved from research paper to open-source release to production drug pipeline in under two years. The defensive infrastructure is still waiting on a policy document that missed its own deadline.

---

## The Asymmetry That Matters

There's a version of this argument that reduces to "dual-use technology is dual-use, more news at eleven." That undersells what's structurally different here.

Most dual-use technology retains some trace of intent or origin — a purchased chemical, a controlled precursor, a flagged transaction. Generative protein design severs that trace at the design stage, before synthesis, before any physical material exists. A functionally dangerous sequence and a functionally benign one can be computationally indistinguishable from each other in exactly the dimension — sequence homology — that screening was built to check. The risk isn't introduced at the point of manufacture. It's introduced upstream, at the point of generation, and current screening architecture wasn't built to look upstream at all.

That's also, not coincidentally, why the same properties make this technology valuable. A model that can design a novel protein with a target function, unconstrained by what nature happened to evolve, is exactly as useful for a vaccine candidate as it is dangerous for a toxin variant. The tool doesn't distinguish. The screening has to.

---

## What Closing the Gap Actually Requires

The Frontiers biosecurity review published earlier this year lays out the honest version of the fix, and it's not a single patch — it's a layered shift:

- **Function-based screening**, not just identity-based — flagging what a sequence would *do* biochemically, not just whether it resembles something on a list
- **Design-stage oversight**, recognizing that risk can be introduced before synthesis is ever attempted, which means screening only at the point of a synthesis order is already one step too late
- **Shared infrastructure**, because screening requirements sophisticated enough to catch generative redesigns are expensive — and if only well-funded providers can afford them, the safeguard becomes a moat with gaps on the low-resource end, not a floor
- **International coordination**, since a screening standard that only binds U.S.-based synthesis providers routes the problem to whichever jurisdiction doesn't have one

None of this is exotic. It mirrors, almost exactly, what cybersecurity had to learn a decade earlier: signature-based detection catches known threats and nothing else, and eventually you have to detect based on behavior instead of identity. Biosecurity is relearning that lesson on a domain where the stakes don't reset with a patch Tuesday.

---

## The Bigger Pattern

Generative biological AI is, right now, simultaneously one of the most legitimately promising applications of AI in any field and a case study in how fast defensive infrastructure falls behind generative capability when the capability is genuinely novel rather than incrementally faster.

Both of those sentences are true about the same technology, in the same year, often citing the same underlying models. RFdiffusion is the architecture behind Xaira's clinical candidates. It's also the architecture the *Science* red-team study used to demonstrate the screening bypass. There isn't a "good AI" and a "risky AI" here — there's one capability, and the question is entirely about what's built around it.

The pattern that should generalize: any time a generative model learns to produce novel instances of a category that a safety system was built to recognize by *matching against known instances*, the safety system's core assumption breaks the moment the model gets good enough. That happened with synthetic media and deepfake detection. It's happening now with protein design and toxin screening. It will happen again in whatever domain generative models reach next where the existing safeguard was built on an identity check.

The lesson isn't that generative biology should slow down — the clinical results are real and worth wanting more of. The lesson is that "we'll screen for it" stopped being a sufficient answer the moment the thing being screened for could be regenerated with a different face and the same function.

---

_A gene synthesis order and a drug candidate can come from the exact same model, the exact same afternoon. The only thing standing between them is a screening system checking a list that was finished being adequate two years ago._
