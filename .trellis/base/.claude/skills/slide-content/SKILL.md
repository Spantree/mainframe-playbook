---
name: slide-content
description: |
  Rules and quality standards for writing Slidev presentation content. Covers overflow prevention,
  the 3-second rule, visual hierarchy, speaker notes format, and AI writing pitfalls.
  Use this skill whenever writing or editing slide markdown content, reviewing a deck for quality
  (overflow, white space, bullet count, readability), splitting or restructuring slides, writing
  speaker notes, or applying Presentation Zen patterns. Also activate when a user mentions
  "too much text on this slide", "slides feel crowded", "deck review", or asks about slide
  content best practices. If in doubt, trigger this skill -- it is lightweight and always helpful
  when slides are involved.
---

# Slide Content Skill

Rules for creating and editing Slidev presentation content. The goal is slides that communicate one idea instantly and look great projected on a big screen.

## Overflow Protection

Slide overflow means the audience sees clipped or scrollable content -- which on a projector means invisible content. Treat overflow like a lint error: fix it before committing.

### Detection

With the dev server running (`bun run dev:slides`):

```bash
npx slidev-overflow-checker --url http://localhost:3032
```

A slide overflows when `scrollHeight > clientHeight + 15px`. Full-height layouts (cover, center, intro, section) are excluded from checking.

### Fixing Overflow

When a slide overflows, fix it using one of these strategies (in order of preference):

1. **Split the slide.** Find a natural break point -- a bold section header, a heading, or the midpoint of a long list -- and create two slides. Add "(continued)" or a refined subtitle to the second.
2. **Reduce content.** Move detailed explanations into speaker notes. Combine related bullets. Cut redundant information.
3. **Restructure.** Use a two-column layout, smaller font sizing, or a different layout that gives more space.

Never solve overflow by shrinking all text uniformly. If you need to shrink text, the slide has too much content.

### Prevention

- **Maximum 3 bullet points or 25 words of visible text per slide** (whichever is less). Headers, direct quotes, image captions, and table content do not count against the 25-word limit. Exceptions for data tables or reference lists are acceptable but should be questioned. Important: 3 is the ceiling, not the target. A slide with 1 bold stat or 2 punchy bullets is often stronger than one with 3. Vary bullet counts across the deck (1, 2, 3) so slides don't feel templated.
- **One concept per slide.** A slide can have multiple supporting points about one concept, but a second concept means a second slide.
- **Test after every content change.** Run the overflow checker before committing.

## Content Principles

### The 3-Second Rule

The audience should grasp the slide's message within 3 seconds of seeing it. A practical test: if the slide has more than one full sentence of body text, it probably fails. Bullet fragments and short phrases pass; paragraphs do not.

### Visual Hierarchy

- Make text LARGE -- readable from the back of the room.
- One clear focal point per slide.
- Remove everything non-essential.
- Leave abundant white space. Less clutter makes the message more powerful.

### Images

- Full-bleed or nearly full-screen images. Small centered images waste impact.
- Place text on top in areas with good empty space.
- Use the Rule of Thirds for element placement (3x3 grid intersections).

### Color and Contrast

- Use the brand accent color to highlight and guide the eye, not to decorate.
- Ensure strong contrast between text and background.
- One dominant element per slide.

### Animation

- No more than 2-3 different transition types in the entire deck.
- Prefer subtle transitions. Never use sound effects.
- **Do not use click animations** (`<v-clicks>`, `<v-click>`, `v-click` directives). Click animations progressively reveal content on advance, which breaks slide-level narration timing and makes TTS audio out of sync. Even in decks without narration, click animations encourage cramming too much onto one slide. If content needs pacing, split it into separate slides instead.

### Typography

- Sans-serif typefaces for projection.
- Increase font size, then increase it again. Bigger than feels comfortable when designing.
- Keep text minimal -- support the speaker's words, don't replace them.

## Speaker Notes

Speaker notes are written as HTML comments at the **end** of a slide's markdown block (after all visible content, before the `---` separator).

```markdown
---

# Slide Title

Content here.

- Bullet one
- Bullet two

<!--
This is a speaker note. It will appear in presenter mode
but not on the projected slide.

Only comments placed at the END of a slide block (after all
visible content) are treated as speaker notes.
-->

---
```

Comments placed elsewhere in the slide (e.g., between content elements) are treated as normal HTML comments and are not shown in presenter mode.

When narration is enabled (see the **slide-narration** skill), speaker notes become the input for TTS audio generation. This means notes should use natural spoken language, avoid markdown formatting that won't render in speech, and be mindful of pronunciation. Consult the slide-narration skill for voice, tone, and pronunciation guidance.

When slides use `<v-click>` animations, place `[click]` markers in speaker notes to sync narration with each reveal step. Each `[click]` boundary generates a separate audio segment. See the slide-narration skill for full details.

### What Speaker Notes Should Include

- **Context the slide can't show.** The "why" behind the point. Real examples. Analogies.
- **Transitions.** How this connects to the previous and next slides.
- **Anticipated questions.** Common objections or confusions to address.
- **Demo narration.** What to show and what to say while showing it.

Speaker notes should **never** just restate what's on the slide. If the note reads the bullet points back, delete it.

## Layout Selection

Slidev provides built-in layouts. Choose based on the slide's purpose:

| Layout | When to Use |
|--------|-------------|
| `cover` | Title slide, opening slide with deck title and subtitle |
| `intro` | Speaker introduction or section opener with a bold statement |
| `section` | Chapter dividers between major topics |
| `center` | Single quote, key stat, or one-line takeaway |
| `two-cols` | Comparing two things side by side, or text + image |
| `image-right` / `image-left` | Content paired with a supporting image |
| `default` | Standard content slides with bullets or text |
| `end` | Closing slide with thank you or contact info |

If a slide doesn't fit neatly into a layout, `default` is always safe.

## Before and After Example

**Before (overflowing, unfocused):**
```markdown
---

# Why Trust Matters in AI

Trust is a critical factor in the adoption and deployment of AI systems.
Organizations that fail to build trust risk losing users, facing
regulatory scrutiny, and missing opportunities.

- Transparency builds confidence in AI decisions
- Explainability helps users understand model outputs
- Accountability ensures someone owns the outcomes
- Fairness prevents bias from harming underrepresented groups
- Privacy protects sensitive user data from misuse
- Reliability means the system works consistently over time

<!--
Talk about all six pillars and give examples for each one.
-->

---
```

**After (focused, split into two slides):**
```markdown
---
layout: section
---

# Trust Is the Bottleneck

Without trust, AI adoption stalls --
no matter how good the model is.

<!--
Start with the business case: companies that deployed AI without
a trust framework saw 40% lower adoption in internal tools.
The model accuracy wasn't the problem -- people didn't believe
the outputs. This sets up why we need a structured approach.
-->

---

# Three Pillars of AI Trust

- **Transparency** -- show how decisions are made
- **Accountability** -- someone owns the outcome
- **Fairness** -- audit for bias continuously

<!--
We've distilled six common principles down to three that matter
most in practice. Transparency and explainability merge because
users don't distinguish them. Privacy is table stakes, not a
differentiator. Reliability is an engineering concern, not a
trust-building one. We'll dig into each pillar in the next
three slides.
-->

---
```

Notice: the "before" had 6 bullets, a paragraph, and a lazy speaker note. The "after" splits into a section header slide and a content slide with 3 bullets. The speaker notes add context the slides can't show.

## Formatting Rules

- **No emojis in slide content.** Emojis look unprofessional in projected presentations. Use visual design (icons, color, layout) instead.
- **Captions go below the image or diagram, centered.** Use italic text for captions.
- **Mermaid diagrams should match the slide color scheme.** Use the `themeVariables` config to set colors and fonts consistent with the deck.

## AI Writing Patterns to Avoid

Slides are especially prone to AI-generated "tells" because of their condensed format.

- **Rigid three-part lists.** AI defaults to exactly three items on every slide. If your deck has five content slides and each one has exactly 3 bullets, that's a tell. Mix it up: some slides get 1 bold statement, some get 2 bullets, some get 3. The variation itself signals human authorship.
- **Identical parallel structure.** Not every bullet needs the same "Noun: explanation" format.
- **Buzzwords.** No "game-changer," "unlock," "cutting-edge," or "innovative." State facts.
- **"Not X, but Y" constructions.** Overused pattern. Rephrase.
- **Arrow CTAs.** No "-> Let's explore" or "-> Key takeaway." Just say it.

## File Organization

When slides are split across multiple files, use numeric prefixes for ordering:

```
slides/
  slides.md           # Single-file decks (most common)
# OR for multi-file decks:
  content/
    01-intro.md
    02-context.md
    03-deep-dive.md
    04-next-steps.md
```

Split into multiple files when a deck exceeds ~40 slides or when multiple authors need to work on different sections simultaneously. For most decks, a single `slides.md` is simpler and easier to navigate.

## Related Skills

- **slidev** -- Slidev framework syntax, Vue components, code highlighting, and configuration.
- **slide-narration** -- TTS narration pipeline, voice/tone guidance, pronunciation hints.
