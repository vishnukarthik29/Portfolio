---
title: "Why CRUD Is the Easy Part of Business Software"
description: "Create, read, update, delete is a weekend of work. The business is everything that decides when those four verbs are allowed, and that is where projects actually die."
date: 2026-09-30
tags: ["software", "architecture", "erp"]
---

# Why CRUD Is the Easy Part of Business Software

Every business application starts the same way. A list page, a form, an edit button, a delete button. Four verbs, one table per noun. A competent developer can stand up a working version of it in a weekend, and the demo looks like a finished product.

It isn't. It's the part of the product that was never the problem.

CRUD answers one question: *what is the current state of this record?* Business software exists to answer a different one: *who is allowed to change this record, from what state, to what state, under which conditions, and what must remain true afterwards?*

That second question is where the money, the audits, the lawsuits, and the missed deadlines live.

---

## What CRUD Quietly Assumes

A CRUD model carries a set of assumptions so basic that nobody writes them down:

1. **Records are independent.** Editing one row has no consequence for any other.
2. **Edits are free.** Any field can move to any value at any time.
3. **Deletes are deletes.** When a row is gone, it was never there.
4. **There is one actor.** Nobody else is touching this row right now.
5. **Only the present matters.** The current value is the whole truth.

Each of those is false the moment real money is involved. Business software is, roughly, the discipline of replacing each one with a rule.

| CRUD assumes | The business requires |
| --- | --- |
| Records are independent | Invariants that span many records |
| Any edit is valid | Legal transitions between defined states |
| Delete removes the row | Reversal, with the original preserved |
| One user at a time | Concurrency control on scarce resources |
| Only current state | History, effective dates, and an audit trail |

---

## 1. A Status Column Is Not a State Machine

The first place CRUD leaks is the `status` field. Take an invoice: `draft`, `sent`, `paid`, `void`.

In CRUD, that's a string column. Any user with edit access can set it to any value. Nothing stops `paid` from being changed back to `draft`, or a `void` invoice from being marked `sent`.

In the business, the invoice is a small graph with rules on every edge:

- `draft` to `sent` requires a customer, at least one line item, and a valid tax treatment.
- `sent` to `paid` requires a matching receipt, and only for the amount actually received.
- `paid` to anything else is not an edit. It's a credit note, which is a *new document* that references the old one.
- `void` is terminal.

The screen for this takes an hour. The transition table, the guards on each edge, the side effects each one triggers, and the tests that prove illegal paths are refused: that's the actual feature.

```js
// The CRUD version
invoice.status = req.body.status
await invoice.save()

// The business version
invoice.transition('send', { actor, at })   // throws if the edge is illegal
```

The difference is not style. In the first version, correctness is the caller's problem. In the second, it belongs to the model.

---

## 2. Invariants Span Records

CRUD validates a row. Businesses have rules that no single row can express:

- Stock on hand can't go negative.
- Every journal entry must have debits equal to credits.
- The sum of payments against an invoice can't exceed its total.
- A purchase order can't be approved by the person who raised it.

These rules cross tables, and they must hold *even when two requests arrive at the same instant*. That takes transactions, locks or optimistic versioning, and a decision about where each rule is enforced: in application code, or in the database where nothing can bypass it.

The failure mode is quiet. Two clerks reserve the last unit of an item a few milliseconds apart. Both saves succeed, because each request validated against a stock count that was true when it started. Nothing crashes. The system is simply wrong, and it stays wrong until someone counts the shelf.

---

## 3. Update Destroys the Thing the Business Needs

An `UPDATE` statement overwrites. That is precisely what a business can't afford.

Consider a price change. If a product's price is a field on the product and you edit it, every historical sale that referenced that product now appears to have been sold at the new price. The past has been rewritten.

The business needs to know:

- What was the price *at the time of sale*?
- Who changed it, and when?
- What was the tax rate on the invoice date, not today?
- What did the report say last quarter, before this correction?

This is why mature systems copy values onto transactions at the moment they occur, version their reference data with effective dates, and treat financial records as **append-only**. Accounting has never had a delete operation. It has reversing entries: a mistake is corrected by posting the opposite, leaving both visible.

CRUD's four verbs have no vocabulary for that. You can bolt on an audit table, but the bolt-on is the real system.

---

## 4. The Boring Numbers Are the Dangerous Ones

Money and tax look trivial until you try to make two reports agree.

- Floating-point currency drifts by fractions that surface as a one-paisa mismatch in a ledger nobody can explain.
- Tax computed per line and tax computed per invoice can differ after rounding, and the correct method is set by regulation, not by preference.
- Multi-currency adds a rate, a date for that rate, and a decision about who bears the difference.
- Discounts, freight, and inclusive versus exclusive pricing each change the order in which arithmetic must be performed.

None of this appears on a wireframe. All of it appears in a dispute.

---

## 5. Permissions Are Rules About State, Not Screens

CRUD access control is usually a matrix: role by table, with create, read, update, and delete ticked or not.

Real authorization depends on the record's state, its value, and the actor's relationship to it:

- A manager can approve an expense, but only under a threshold, and never their own.
- A salesperson can edit a quote until it's sent, then only request a revision.
- Finance can view everything but change nothing after month-end close.

That's a policy engine, and it interacts with the state machines above. Every "can edit" is really "can perform *this* transition, *now*."

---

## 6. Where Estimates Go Wrong

This is why business software gets mis-scoped so consistently. Requirements are gathered as a list of screens and nouns: customers, products, orders, invoices, payments. Effort is estimated per noun, and per noun it looks small.

But the cost was never in the nouns. It's in the **verbs between them and the rules on those verbs**:

- Order confirmation reserves stock, and reservation interacts with warehouse allocation.
- Invoicing posts to the ledger, which interacts with tax, which interacts with period locking.
- Returns reverse all of the above, partially, and in an order that must not break any invariant on the way through.

A system with ten entities can have a hundred meaningful transitions and several hundred rules across them. Estimating by screen count misses roughly all of that.

A better unit of estimation is the **transition**: what triggers it, what must be true before, what changes, what must be true after, and what happens if it fails halfway.

---

## What Follows From This

If CRUD is the easy part, the design priorities invert:

1. **Model commands, not edits.** `approveOrder`, `postInvoice`, `reverseReceipt`, not `PUT /orders/:id`.
2. **Make illegal states unrepresentable, or at least unsaveable.** Push invariants into transactions and database constraints, not just form validation.
3. **Prefer append-only for anything financial.** Corrections are new records that reference old ones.
4. **Snapshot at the moment of the event.** Price, tax, rate, and address are copied onto the transaction, not looked up later.
5. **Test the rules, not the endpoints.** A green CRUD test suite says the framework works. It says nothing about whether the business does.
6. **Audit by default.** Who, what, when, from which state. Retrofitting this is far harder than building it in.

---

## The Real Product

A CRUD app is a spreadsheet with a login screen. It stores what people typed.

Business software is a set of *enforced agreements*: about what a document means, who may move it, what it costs to reverse, and what the books must show afterwards. The forms are the visible five percent. The agreements are the product.

That's also why the hard part can't be templated away. Scaffolding tools will generate every list page and edit form you need in seconds, and they should. But they generate the one layer that was already cheap.

The work is in the rules, and the rules belong to the business, not the framework.

---

_The screen takes a weekend. The invariants take a year. Price the second one._
