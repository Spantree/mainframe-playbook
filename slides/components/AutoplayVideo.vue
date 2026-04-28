<template>
  <div class="video-container">
    <video
      ref="videoRef"
      :src="src"
      :muted="muted"
      :loop="loop"
      :controls="controls"
      :autoplay="false"
      class="contained-video-element"
      @loadeddata="onVideoLoaded"
      preload="metadata"
    >
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from "vue";
import { useVideoPlayback } from "../composables/useVideoPlayback";

interface Props {
  src: string;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  slideNumber?: number;
}

const props = withDefaults(defineProps<Props>(), {
  muted: true,
  loop: false,
  controls: true,
  slideNumber: 0,
});

const videoRef = ref<HTMLVideoElement>();

const { onVideoLoaded } = useVideoPlayback({
  videoRef,
  slideNumber: toRef(props, "slideNumber"),
});
</script>

<style scoped>
.video-container { width: 100%; height: 100%; min-height: 400px; max-height: 600px; display: flex; align-items: center; justify-content: center; background: transparent; padding: 1rem; }
.contained-video-element { width: 100%; max-width: 100%; height: auto; max-height: 500px; object-fit: contain; border-radius: 0.5rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); background: black; display: block; }
.contained-video-element:not([style*="filter"]) { filter: none !important; opacity: 1 !important; color: unset !important; }
.video-container .contained-video-element { min-width: 640px; min-height: 360px; }
@media (max-width: 768px) { .video-container .contained-video-element { min-width: 320px; min-height: 180px; } }
</style>
