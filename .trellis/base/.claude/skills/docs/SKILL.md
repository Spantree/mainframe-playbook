---
name: docs
description: |
  Activate when:
  - Writing or editing Docusaurus documentation pages
  - Reviewing docs for sidebar titles, heading structure, or plain language
  - User asks about documentation style or formatting conventions
---

# Documentation Writing Skill

Rules for creating and editing Docusaurus documentation pages.

## Sidebar Titles

Sidebar titles must be **30 characters or fewer**. Longer titles wrap in the Docusaurus sidebar and look broken.

If the page's `# heading` is longer than 30 characters, add a short `sidebar_label` in the frontmatter:

```markdown
---
sidebar_position: 3
sidebar_label: "Workshop Agenda"
---

# Two-Day Discovery & Design Workshop Agenda
```

Check every new page before committing. Count the characters in whatever text appears in the sidebar.

## Structured Paragraphs Over Bullets

The default format for explaining concepts is **paragraphs with bolded opening phrases**, not bullet lists. This provides the scannability of bullets with the depth and context that helps readers understand.

### When to Use Paragraphs

Use paragraphs when items need context, rationale, or elaboration. When "why" matters, bullets aren't enough.

**Bad:**

```markdown
## API Design
- Use consistent naming
- Handle errors properly
- Document endpoints
```

**Good:**

```markdown
## API Design

**Consistent naming** creates predictability. When endpoints follow clear
patterns, developers can guess the correct URL without checking documentation.

**Error handling** means returning appropriate HTTP status codes with actionable
messages. A 400 response should explain which field failed and why.
```

### When Bullets Are Fine

Bullets work for true lists where items don't need explanation:

- Tool names and versions
- File paths
- Prerequisites
- Simple checklists
- Command syntax

Even then, always precede the list with a sentence explaining what it contains.

## Header Rules

**Never follow a header immediately with a subheader.** Always include introductory content explaining what follows and why it matters.

```markdown
<!-- Wrong -->
## Architecture
### Data Layer
Details...

<!-- Right -->
## Architecture

The platform is organized into three layers, each with distinct
responsibilities and deployment characteristics.

### Data Layer
Details...
```

**Don't skip heading levels.** H1 → H3 without an H2 breaks hierarchy. Each level nests within its parent.

## Plain Language

Replace jargon with everyday words:

- "Use" not "leverage" or "utilize"
- "Tool" not "solution"
- "Approach" not "methodology"
- "Company software" not "enterprise systems"

Avoid marketing clichés. Don't write "cutting-edge," "innovative," "world-class," or "game-changer." State facts plainly and let their importance speak for itself.

## Voice and Tone

**Active voice.** Write "the function returns a list" not "a list is returned by the function." Write "you will learn" not "content will be covered."

**Direct address.** Use "you" for readers. Use "we" for shared exploration ("we'll walk through this together").

**Conversational but professional.** Write as if explaining to a colleague who's smart and eager but unfamiliar with this specific topic.

## Progressive Disclosure

Start simple, then add complexity.

**Layer concepts gradually.** Introduce the basic idea first, then add nuance, exceptions, and advanced applications. Each layer builds on the previous one.

**Signpost transitions.** When moving from basic to advanced, say so: "Once you're comfortable with the basics..." or "For those ready to go deeper..."

**Connect to foundations.** Reference earlier concepts when introducing new ones. Help readers see how ideas relate.

## AI Writing Patterns to Avoid

These patterns signal AI-generated content. Actively avoid them.

**Structural tells.** Defaulting to bullets when prose works better. Rigid parallelism where every item follows identical structure. The "three-part list" pattern — AI loves threes; vary your list lengths.

**Phrase-level tells.** Em dashes more than once per paragraph. Colon-heavy constructions ("The lesson: tools fail"). Buzzwords like "silver bullets," "game-changer," or "unlock." The "Not X, but Y" pattern.

**Rhythm tells.** Alternating short/long sentences in predictable patterns. Every paragraph ending on a punchy one-liner. Suspiciously clean parallel structure.

**How to sound human.** Vary sentence structure unpredictably. Use natural hedging ("though honestly," "in my experience"). Let some sentences be medium-length. Allow imperfect parallelism — real writing isn't perfectly balanced.

## Quality Checklist

Before committing a docs page:

- [ ] Sidebar title ≤30 characters?
- [ ] No header immediately followed by subheader?
- [ ] Concepts in paragraphs, not bullets?
- [ ] Plain language, no jargon?
- [ ] Active voice throughout?
- [ ] Complexity builds progressively?
- [ ] No AI writing pattern tells?
