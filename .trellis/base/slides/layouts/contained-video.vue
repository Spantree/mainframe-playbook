<template>
  <div
    class="slidev-layout contained-video w-full h-full flex flex-col p-8 relative overflow-hidden"
  >
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

    <div class="video-section flex-grow flex items-center justify-center">
      <video
        v-if="video"
        ref="videoRef"
        :src="resolveAssetUrl(video)"
        :controls="controls"
        :muted="muted"
        :autoplay="false"
        :loop="loop"
        class="contained-video-element"
        @loadeddata="onVideoLoaded"
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from "vue";
import { resolveAssetUrl } from "../utils/resolveAssetUrl";
import { useVideoPlayback } from "../composables/useVideoPlayback";

interface Props {
  video?: string;
  heading?: string;
  body?: string;
  controls?: boolean;
  muted?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  slideNumber?: number;
}

const props = withDefaults(defineProps<Props>(), {
  controls: true,
  muted: true,
  autoplay: false,
  loop: false,
  slideNumber: 0,
});

const videoRef = ref<HTMLVideoElement>();

const { onVideoLoaded } = useVideoPlayback({
  videoRef,
  slideNumber: toRef(props, "slideNumber"),
  autoplay: toRef(props, "autoplay"),
});
</script>

<style scoped>
.slidev-layout.contained-video {
  background-image: none !important;
  background-color: var(--bg-start) !important;
}

.content-section { text-align: center; z-index: 10; }
.slide-heading { font-size: 3rem !important; font-weight: bold !important; margin-bottom: 1rem !important; color: var(--primary-color) !important; line-height: 1.1 !important; }
.slide-body { font-size: 1.125rem !important; line-height: 1.6 !important; color: var(--primary-color) !important; margin-bottom: 0 !important; max-width: 80%; margin-left: auto; margin-right: auto; }

.video-section { background-color: transparent; min-height: 300px; max-height: calc(100vh - 200px); flex-grow: 1; display: flex; align-items: center; justify-content: center; padding: 1rem 0; }
.contained-video-element { width: 100%; max-width: 85%; height: auto; max-height: 100%; object-fit: contain; border-radius: 0.5rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); background: black; display: block; }
.contained-video-element:not([style*="filter"]) { filter: none !important; opacity: 1 !important; color: unset !important; }
.video-section .contained-video-element { min-width: 640px; min-height: 360px; }

@media (max-width: 768px) {
  .video-section .contained-video-element { min-width: 320px; min-height: 180px; max-width: 95%; }
  .slide-heading { font-size: 2rem !important; }
}

.content-section > div { color: var(--primary-color); }
.content-section h1 { font-size: 3rem !important; font-weight: bold !important; margin-bottom: 1rem !important; color: var(--primary-color) !important; }
.content-section h2 { font-size: 2rem !important; font-weight: 600 !important; margin-bottom: 0.75rem !important; color: var(--primary-color) !important; }
.content-section p { font-size: 1.125rem !important; line-height: 1.6 !important; margin-bottom: 0.5rem !important; color: var(--primary-color) !important; }
</style>
