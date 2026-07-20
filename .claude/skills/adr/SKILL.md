---
name: adr
description: Create an Architectural Decision Record (ADR) following the project template
argument-hint: "[decision topic]"
allowed-tools: Read Glob Bash Write
---

# Create an Architectural Decision Record

Create a new ADR document following the project's ADR conventions.

## Naming & numbering

- Existing ADRs are in `docs/adr/`. List them to find the highest ADR number, then increment by one.
- ADR numbers are zero-padded three digits: `001`, `002`, `003`, etc.
- Filename pattern: `ADR-YYYY-DD-MM-<slugified-title>.md` (e.g. `ADR-2026-15-07-stack-e-infraestrutura.md`).
- The slug is lowercase, words separated by hyphens, no special characters.
- The heading inside the file uses the pattern: `# ADR-NNN: <Title>`

## Metadata table

Each ADR opens with a markdown table (not a bullet list):

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | YYYY-MM-DD |
| **Decision makers** | Luiz |
| **Related scopes** | <links to scopes in docs/scopes/, or "None"> |

## Steps

1. List files in `docs/adr/` to determine the next ADR number.
2. If the user provided a topic as arguments ($ARGUMENTS), use it as the title. Otherwise, ask what architectural decision they want to document.
3. Ask the user for any information needed to complete each section before writing the file. Do not write the file with placeholder text — gather all required content first through conversation.
4. Create the ADR file using the template at `docs/adr/TEMPLATE.md` and the conventions above.
5. Default the status to **Proposed** and set the date to today.
6. Present the created ADR to the user for review.

## Content rules

- **Documents are written in PT-BR.** Section headings follow the template (Contexto, Decisão, Alternativas consideradas, Consequências). Code identifiers, when mentioned, stay in English per project convention.
- **No code or pseudocode.** ADRs are architecture documents, not implementation guides.
- **Diagrams are encouraged** where they clarify structure or flow:
  - Use **Mermaid** (`flowchart`, `sequenceDiagram`, `classDiagram`) for system flows, component relationships, and interactions.
  - Use **Mermaid `erDiagram`** for any data model or entity relationship decisions.
  - **Never use ASCII art** as a substitute for diagrams.
- File trees are encouraged to illustrate how a feature or decision maps to the directory structure. Use them to show where things live, not to list every file — keep them scoped to what's architecturally relevant.
- **No time estimates.** Do not include development or work hour estimates anywhere in the document.
- **Check consistency with existing ADRs.** If the new decision contradicts or supersedes a previous ADR, say so explicitly in the Contexto section and update the superseded ADR's status.
- Keep language clear and direct. The audience is the implementer (human or agent) and the future maintainer.
