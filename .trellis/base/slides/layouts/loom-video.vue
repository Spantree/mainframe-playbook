<template>
  <div class="slidev-layout loom-video w-full h-full flex flex-col p-8">
    <div class="grid grid-cols-2 gap-8 h-full">
      <div class="flex flex-col justify-center">
        <slot />
      </div>
      <div class="flex items-center justify-center">
        <div
          class="loom-embed-container w-full h-full flex items-center justify-center rounded-lg overflow-hidden"
        >
          <div v-if="!isLoaded" class="loading-placeholder">
            <div class="text-6xl mb-4">🎬</div>
            <p class="text-sm text-gray-400">Loading Loom video...</p>
          </div>
          <iframe
            v-show="isLoaded"
            ref="loomIframe"
            :src="embedUrl"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            class="loom-iframe"
            @load="onIframeLoad"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  loomId: string;
  hideOwner?: boolean;
  hideTitle?: boolean;
  hideShare?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hideOwner: true,
  hideTitle: false,
  hideShare: true,
});

const loomIframe = ref<HTMLIFrameElement>();
const isLoaded = ref(false);

const embedUrl = computed(() => {
  const params = new URLSearchParams();
  if (props.hideOwner) params.append("hide_owner", "true");
  if (props.hideTitle) params.append("hide_title", "true");
  if (props.hideShare) params.append("hide_share", "true");
  const queryString = params.toString();
  return `https://www.loom.com/embed/${props.loomId}${queryString ? "?" + queryString : ""}`;
});

const onIframeLoad = () => { isLoaded.value = true; };
</script>

<style scoped>
.slidev-layout.loom-video {
  background: radial-gradient(
    ellipse at top left,
    var(--bg-start) 0%,
    var(--bg-end) 100%
  ) !important;
}

.loom-embed-container { background: #1a1a1a; min-height: 300px; aspect-ratio: 16 / 9; max-height: 80vh; }
.loom-iframe { width: 100%; height: 100%; min-height: 300px; aspect-ratio: 16 / 9; }
.loading-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; color: #666; }

:deep(h1) { font-size: 2.5rem !important; font-weight: 700 !important; color: var(--primary-color) !important; margin-bottom: 1rem !important; }
:deep(p) { font-size: 1.125rem !important; color: var(--primary-color) !important; margin-bottom: 0.75rem !important; }
:deep(strong) { font-weight: 700 !important; }
:deep(em) { color: var(--accent-color) !important; font-style: italic !important; }
:deep(code) { background: #f3f4f6 !important; padding: 0.125rem 0.375rem !important; border-radius: 0.25rem !important; font-size: 0.9em !important; }
:deep(pre) { background: #1e1e1e !important; padding: 1rem !important; border-radius: 0.5rem !important; overflow-x: auto !important; font-size: 0.85rem !important; }
</style>
