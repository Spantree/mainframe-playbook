<template>
  <div
    class="slidev-layout contained-image w-full h-full flex flex-col p-8 relative overflow-hidden"
  >
    <!-- Content Section - Above the image -->
    <div
      v-if="heading || body || $slots.default"
      class="content-section flex-shrink-0 mb-6"
    >
      <h1 v-if="heading" class="slide-heading">{{ heading }}</h1>
      <p v-if="body" class="slide-body">{{ body }}</p>
      <div v-if="$slots.default">
        <slot />
      </div>
    </div>

    <!-- Image Section - Fills remaining vertical space -->
    <div class="image-section flex-grow" :style="imageStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { resolveAssetUrl } from "../utils/resolveAssetUrl";

interface Props {
  image?: string;
  heading?: string;
  body?: string;
  backgroundSize?: string;
}

const props = withDefaults(defineProps<Props>(), {
  backgroundSize: "contain",
});

const imageStyle = computed(() => {
  if (!props.image) return {};
  return {
    backgroundImage: `url("${resolveAssetUrl(props.image)}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: props.backgroundSize,
  };
});
</script>

<style scoped>
.slidev-layout.contained-image {
  background-image: none !important;
  background-color: var(--bg-start) !important;
}

.content-section {
  text-align: center;
  z-index: 10;
}

.slide-heading {
  font-size: 3rem !important;
  font-weight: bold !important;
  margin-bottom: 1rem !important;
  color: var(--primary-color) !important;
  line-height: 1.1 !important;
}

.slide-body {
  font-size: 1.125rem !important;
  line-height: 1.6 !important;
  color: var(--primary-color) !important;
  margin-bottom: 0 !important;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.image-section {
  background-color: transparent;
  min-height: 200px;
}

.content-section > div { color: var(--primary-color); }
.content-section h1 { font-size: 3rem !important; font-weight: bold !important; margin-bottom: 1rem !important; color: var(--primary-color) !important; }
.content-section h2 { font-size: 2rem !important; font-weight: 600 !important; margin-bottom: 0.75rem !important; color: var(--primary-color) !important; }
.content-section p { font-size: 1.125rem !important; line-height: 1.6 !important; margin-bottom: 0.5rem !important; color: var(--primary-color) !important; }
</style>
