---
name: scope
description: Create a product/feature scope spec through a structured interview process
argument-hint: "[feature or problem description]"
allowed-tools: Read Glob Bash Write AskUserQuestion
---

# Create a Feature Scope

Create a scope document through a structured discovery interview, following BDD conventions.

## Naming & numbering

- Scope documents live in `docs/scopes/`.
- Filename pattern: `SCOPE-YYYY-DD-MM-<slugified-title>.md` (e.g. `SCOPE-2026-15-07-fundacao-do-projeto.md`).
- The slug is lowercase, words separated by hyphens, no special characters.
- The heading inside the file uses the pattern: `# Scope: <Title>`

## Metadata table

Each scope opens with a markdown table:

| Field | Value |
|---|---|
| **Status** | Draft |
| **Date** | YYYY-MM-DD |
| **Author** | Luiz |
| **Related ADRs** | <links, or "None"> |
| **Target branch** | <branch name> |

## Interview process

Do NOT write the scope file until all phases are complete. Gather information through conversation, one phase at a time. Do not dump all questions at once — each phase builds on previous answers.

### Phase 1 — Framing

Understand the problem space. Ask about:
- What problem are we solving? Why now?
- What is the desired outcome from the user's perspective?
- What is explicitly out of scope?

If the user provided a topic as arguments ($ARGUMENTS), use it as a starting point but still ask clarifying questions.

### Phase 2 — Behavior (BDD scenarios)

Build the Given/When/Then scenarios:
- Walk through the happy path: what does the user do, what happens?
- What are the edge cases? What can go wrong?
- What error states need handling?
- For each path, draft a Given/When/Then scenario and confirm it with the user.

If an answer is vague, push back with a specific follow-up (e.g. "what happens if the file is larger than 100MB?").

### Phase 3 — Constraints & context

Identify boundaries and prior art:
- Are there performance, security, or compatibility requirements?
- Are there related ADRs or existing patterns to follow? In this project, always check consistency with the standing ADRs in `docs/adr/` (free-tier limits, atomic quota debit, single document entity, link + print CSS delivery) and the rules in `CLAUDE.md`.
- Any open questions or dependencies on other work?

If the user describes a data model change or API contract change, flag it as an ADR candidate — do not write it into the scope. Suggest they create the ADR first, then link it.

### Phase 4 — Sequencing (milestones)

Break the work into ordered, incremental milestones:
- What is the smallest slice that delivers value or validates the approach?
- What order makes sense? What depends on what?
- Link each milestone to the scenarios it satisfies.
- Identify existing code to reference for each milestone.

### Phase 5 — Review

Before writing the file:
- Summarize everything gathered across all phases.
- Present the full scope to the user for review.
- Ask if anything needs correction or addition.
- Only after the user confirms, write the file.

## Content rules

- **Documents are written in PT-BR.** Scenario keywords keep the BDD convention (**Given/When/Then** in bold English), with the scenario body in PT-BR.
- **No code or pseudocode.** Scopes define *what* to build, not *how*.
- **Data model and API changes belong in ADRs.** If the scope requires them, flag as ADR candidates and link from the Related ADRs field.
- **Diagrams are encouraged** where they clarify structure or flow:
  - Use **Mermaid** (`flowchart`, `sequenceDiagram`) for system flows and interactions.
  - **Never use ASCII art** as a substitute for diagrams.
- **BDD scenarios are mandatory.** Every scope must have at least one feature with Given/When/Then scenarios.
- **Milestones must reference scenarios.** Each milestone lists which scenarios it satisfies.
- **Non-goals are mandatory.** A scope without explicit non-goals is incomplete.
- **No time estimates.** Do not include development or work hour estimates.
- **No placeholder text.** Every section must have real content or be explicitly removed as not applicable.
- Keep language clear and direct. The audience is the implementer (human or agent).

## Status lifecycle

- **Draft** — has open questions, not ready for implementation.
- **Ready** — all questions resolved, can be picked up.
- **In Progress** — actively being implemented.
- **Done** — all acceptance criteria (scenarios) met.
- **Abandoned** — decided not to pursue (keep for history).

A scope with open questions MUST stay in Draft status. An external dependency with an agreed resolution plan (documented in the scope) is not an open question.

## Template

Use the template at `docs/scopes/TEMPLATE.md` for the file structure.
