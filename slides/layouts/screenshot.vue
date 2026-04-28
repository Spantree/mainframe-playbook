<template>
  <div class="slidev-layout screenshot w-full h-full flex flex-col overflow-hidden">

    <!-- Header: optional eyebrow + title, centered -->
    <div class="flex-shrink-0 px-10 pt-5 pb-1" style="text-align: center;">
      <div v-if="eyebrow" class="eyebrow" style="margin-bottom: 0.5rem;">{{ eyebrow }}</div>
      <h2 v-if="header" class="slide-title" style="margin-bottom: 0.25rem !important; text-align: center;">{{ header }}</h2>
    </div>

    <!-- Image frame — fills remaining vertical space -->
    <div
      class="screenshot-frame flex-grow mx-10 mt-2 rounded-lg overflow-hidden"
      :style="frameStyle"
    />

    <!-- Caption — optional, zero bottom padding so image fills to edge -->
    <div class="flex-shrink-0 px-10 py-2 text-center" style="padding-bottom: 0;">
      <p v-if="caption" class="caption-text">{{ caption }}</p>
      <div v-else class="h-3" />
    </div>

  </div>
</template>

<script setup lang="ts">
/**
 * Screenshot layout — large image with optional header and caption.
 *
 * Props:
 *   image     path or URL to the image (resolved via Slidev asset pipeline)
 *   eyebrow   small uppercase label above the title
 *   header    slide title — keep ≤35 chars; truncated with ellipsis if longer
 *   caption   small italic text below the image
 *   bg        CSS background-color of the image frame (default: transparent)
 *             Useful for screenshots with white backgrounds on a warm slide bg.
 *   fit       'cover' (default) fills the frame; 'contain' shows the full image
 *   position  CSS background-position (default: 'center center')
 *
 * Example:
 *   ---
 *   layout: screenshot
 *   eyebrow: AI Visualization
 *   header: "1.1M documents, instantly organized"
 *   image: /images/my-screenshot.png
 *   caption: "Cluster wheel — documents grouped by concept."
 *   fit: contain
 *   bg: "#ffffff"
 *   ---
 */
import { computed } from 'vue'
import { resolveAssetUrl } from '../utils/resolveAssetUrl'

interface Props {
  image?: string
  header?: string
  eyebrow?: string
  caption?: string
  /** Background color of the image frame. Useful when fit=contain and image has a white background. */
  bg?: string
  /** How the image fills the frame. 'cover' (default) crops; 'contain' letterboxes. */
  fit?: 'cover' | 'contain'
  /** CSS background-position value (default: 'center center'). */
  position?: string
}

const props = withDefaults(defineProps<Props>(), {
  fit: 'cover',
  position: 'center center',
})

const frameStyle = computed(() => {
  if (!props.image) return {}
  const style: Record<string, string> = {
    backgroundImage: `url("${resolveAssetUrl(props.image)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: props.position,
    backgroundSize: props.fit,
  }
  if (props.bg) style.backgroundColor = props.bg
  return style
})
</script>

<style scoped>
.slidev-layout.screenshot {
  background: radial-gradient(
    ellipse at top left,
    var(--bg-start, #EDE6DD) 0%,
    var(--bg-end, #D5E0E8) 100%
  ) !important;
}

.eyebrow {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 600;
  color: var(--accent-color, #e87722);
  line-height: 1;
}

.slide-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-color, #2C3A41);
  line-height: 1.2;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.screenshot-frame {
  min-height: 0;
}

.caption-text {
  font-size: 0.7rem !important;
  color: #9CA3AF;
  font-style: italic;
  margin: 0;
}
</style>
