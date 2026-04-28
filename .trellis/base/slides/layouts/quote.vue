<template>
  <div class="slidev-layout quote w-full h-full flex flex-col justify-center items-center px-16 relative">
    <div class="relative z-10 flex flex-col items-center justify-center flex-grow w-full max-w-4xl mx-auto text-center">
      <blockquote style="border-left: 0 !important; background: none;">
        <div class="quote-body">
          <slot />
        </div>
        <p v-if="attribution" class="quote-attribution">
          {{ attribution }}
        </p>
      </blockquote>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Quote layout — full-screen pull-quote with optional attribution.
 *
 * Props:
 *   attribution  — speaker name / source line rendered below the quote
 *
 * CSS variables (override in theme or per-slide style):
 *   --quote-color          quote text color     (default: var(--accent-color, #e87722))
 *   --quote-font           quote font family    (default: 'Caveat', cursive)
 *   --quote-size           quote font size      (default: 1.75rem)
 *   --quote-weight         quote font weight    (default: 600)
 *   --attribution-color    attribution color    (default: #6B7280)
 *   --attribution-size     attribution size     (default: 1.4rem)
 *
 * Usage in slides.md frontmatter (per-slide override):
 *   ---
 *   layout: quote
 *   attribution: "Name, Title"
 *   ---
 */
interface Props {
  attribution?: string
}
defineProps<Props>()
</script>

<style>
/* Load Caveat as the default quote font. Projects using a different font
   can override --quote-font without this import having any effect. */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');

.slidev-layout.quote {
  background: radial-gradient(
    ellipse at top left,
    var(--bg-start, #EDE6DD) 0%,
    var(--bg-end, #D5E0E8) 100%
  ) !important;
}

/* Quote text — targets the <p> emitted by Slidev's markdown renderer inside the slot */
.slidev-layout.quote .quote-body p {
  font-size: var(--quote-size, 1.75rem) !important;
  color: var(--quote-color, var(--accent-color, #e87722)) !important;
  font-family: var(--quote-font, 'Caveat', cursive) !important;
  font-weight: var(--quote-weight, 600) !important;
  line-height: 1.45 !important;
  margin: 0 0 1.5rem 0 !important;
}

/* Attribution line */
.slidev-layout.quote .quote-attribution {
  font-size: var(--attribution-size, 1.4rem) !important;
  font-family: var(--quote-font, 'Caveat', cursive) !important;
  font-weight: 400 !important;
  color: var(--attribution-color, #6B7280) !important;
  margin: 0 !important;
}
</style>
