---
title: "AnyPS5 Doesn't Emulate the PS5. That's Why Sony Should Pay Attention."
description: "A new open-source tool relinks PS5 executables into native PC programs instead of emulating the console. The headline numbers mislead. The real story is the decryption step upstream."
date: 2026-10-06
tags: ["gaming", "security", "sony", "open-source"]
---

# AnyPS5 Doesn't Emulate the PS5. That's Why Sony Should Pay Attention.

On October 9, the AnyPS5 project's progress page showed every GPU shader encoding group at 100%. All 1,166 tracked instructions, covered. Within hours the headlines read like a finish line: the PS5's graphics hardware, "fully decoded."

It isn't a finish line. The same page lists exactly one verified game, a 2D platformer.

The distance between those two facts is the whole story, and it's more interesting than either number.

---

## What AnyPS5 Actually Is

Every PS5 emulator before it works the same way: recreate the console in software and run the game inside the recreation. shadPS4, KytyPS5, SharpEmu and RPCSX all take this route.

AnyPS5 doesn't. It takes a game's executable, relinks it against reimplemented versions of the PS5's system libraries, and outputs a native Windows or Linux program. The PC then runs it like any other program. Shaders written for the console's GPU get recompiled into SPIR-V so a PC's Vulkan driver can render them.

This is possible because of a hardware coincidence. The PS5 is an x86-64 machine built on AMD's Zen 2 cores, the same instruction set as most PCs sold in the last six years. There is no CPU to emulate. The only things standing between a PS5 binary and a PC are the operating system layer and the GPU format. Outlets compared the design to Valve's Proton: Windows games on Linux by reimplementing the API surface, not by virtualizing anything.

The project is open source under GPL v2, hosted on GitHub under the account boykopovar, and by its own account ships no Sony code and no game data.

---

## The Number Everyone Quoted Means Less Than It Looks

The shader figure is real progress. A few days earlier the project sat at about 96% (1,118 instructions), and an earlier snapshot was around 609, so the pace is fast.

But read how the project counts. An instruction is "implemented" once the decoder recognizes it. Recognizing an instruction is not the same as executing it correctly, in the right order, with the right timing, across a whole frame. TweakTown's own summary put it plainly: coverage means the decoder can recognize the instructions, not that games will run.

The second number matters more. System-library support sits around 85%: roughly 2,575 of about 3,040 functions, with the exact counts shifting between snapshots and between outlets. Even that denominator is soft, since it only counts functions the project has declared so far.

And here is the part the percentage hides. In a relinking design, a missing library function is not a small performance penalty. It is a crash. Each game calls a different subset of the system API. A title that touches one unimplemented function dies at that call. The earlier demonstration that reached a commercial game's main menu and then fell over around frame 168 is exactly what this failure mode looks like.

That gives the project a different shape from an emulator's. An emulator degrades gradually: slower, glitchier, but running. A relinker has a coverage cliff. At 85% it may run almost nothing complex. At 99% it may run a great deal. The curve is not linear, and nobody outside the project can tell you where on it the last 15% sits.

The honest summary, as TweakTown's reporter put it, is that a demanding 3D title still has to be shown.

---

## Where the Real Constraint Lives

Every account of AnyPS5 hits the same wall in its first paragraph: the tool needs a decrypted executable, and PS5 executables on disk are encrypted. Getting a decrypted copy means doing something on the console itself, which in practice requires a modified one.

I'm not going to describe how that step is done, and this post isn't a guide to it. What matters for analysis is where it sits in the system.

AnyPS5 contributes nothing to defeating Sony's protection. It starts after that. The project's legal and technical posture is built on a clean seam: obtain the decrypted file somewhere else, and this tool takes it from there. That seam is why AnyPS5 can credibly say it distributes no copyrighted material.

It is also the seam that tells you where Sony's security perimeter really is. The protection that matters is on the console: its firmware, its kernel, its key handling. A PC-side project can't touch it. It can only consume what someone else extracted.

Two consequences follow.

**Console security is time-bound, and extraction is permanent.** Firmware updates close holes going forward. They don't re-encrypt a file that has already been dumped. Every executable extracted while a hole was open is a permanent input to projects like this one. The perimeter protects the future; it can't recall the past.

**The pressure is to collapse the chain.** A fork of the project already carries a pull request that wraps a "decrypt a dump" step into a desktop launcher, sending a decryption payload to a user's own console and merging the results back. Its author states it was not tested against a real console. That's worth noting for what it signals, not what it does: the community is already working to turn a multi-tool expert workflow into a single menu. The easier the chain gets, the less AnyPS5's "we ship no code" seam protects anyone from the question of what the surrounding ecosystem is doing.

---

## The Legal Question Nobody Has Tested

AnyPS5's relinking step and the decryption step that feeds it are different acts, and the law treats them differently.

Relinking a binary you hold into another format is, on its face, a question of interoperability and copyright. Decrypting a protected executable is where anti-circumvention law enters, and in the US that is the DMCA's Section 1201, which prohibits circumventing access controls regardless of whether a later use is lawful. Other jurisdictions have their own versions.

No outlet has found a case that tests either step against this project. Sony has said nothing publicly, consistent with its silence on the PS5 emulators that surfaced in July. Silence isn't approval. Sony has a long record of acting against console-modification tools through lawyers, not press statements.

There's also a simpler exposure. "PS5" is Sony's trademark, and a project that puts it in its own name has made itself an easy target for a trademark complaint that never touches the technology. Commenters have already pointed this out.

I'm not a lawyer, and this isn't legal advice. The point is that the project's most defensible position, a tool with no Sony code in it, only covers the half of the pipeline it controls.

---

## Why Now

The reported timing isn't random. Sony has said it will end physical PS5 disc production in 2028, which hardens an existing argument about whether people own the games they bought. And Grand Theft Auto VI, set for November 19 as a console launch with no announced PC version, is the kind of title that makes a PC-side workaround newsworthy before it exists.

Neither fact makes the technique more likely to work. They explain why a project that cannot yet run a demanding game is getting this much coverage.

---

## What Could Go Wrong for Users

AnyPS5's own repository is being forked under multiple accounts within days of appearing. For a tool that relinks executables and swaps in replacement system libraries, that is the standard setup for a supply-chain problem: a popular repository, several mirrors, and compiled builds circulating on social media that nobody has audited.

No malware has been reported against the project. Absence of reports is not an audit. Anyone curious about this should read source, build it themselves if they build it at all, and treat any precompiled download as untrusted.

---

## What to Watch

Three things will tell you whether this is a milestone or a footnote.

1. **A demanding 3D title running end to end.** One verified 2D game at a stable 60 FPS on a GTX 1050 Ti proves the pipeline can work. It doesn't prove it scales. Until a large 3D game runs through the same path, the coverage numbers are decoration.
2. **The library curve.** Watch whether the last 15% moves as fast as the first 85%. Long-tail functions, the odd ones few games call, are where relinkers spend most of their time.
3. **Sony's first move.** Not a press statement. A takedown, a DMCA notice to GitHub, or a firmware change aimed at the extraction path. Any of those would reveal which half of the pipeline Sony considers the threat.

The headline claim, "PS5 games on PC without emulation," is a statement about architecture. It says nothing yet about results. What's established is smaller and more useful: because the PS5 is built on PC silicon, the usual cost of running a console's games elsewhere can in principle be skipped, and the barrier left standing is not technical sophistication on the PC side. It's a lock on the console, one that only has to fail once per game.

---

_Sources: TweakTown (Oct 9, 2026), TechPowerUp, Tom's Hardware, VideoCardz, KitGuru, HardwareBusters and Shattered.io coverage of the project, the project's public repository and progress page, and a community pull request on a fork of the repository._
