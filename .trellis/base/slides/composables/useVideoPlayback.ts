import { ref, watch, onUnmounted, type Ref } from "vue";
import { $slidev } from "@slidev/client";

const DEFAULT_PLAY_DELAY = 800;

interface UseVideoPlaybackOptions {
  videoRef: Ref<HTMLVideoElement | undefined>;
  slideNumber: Ref<number>;
  autoplay?: Ref<boolean>;
  playDelay?: number;
}

/**
 * Composable for managing video playback tied to Slidev slide navigation.
 * Automatically plays/pauses video when navigating to/from the target slide.
 */
export function useVideoPlayback({
  videoRef,
  slideNumber,
  autoplay,
  playDelay = DEFAULT_PLAY_DELAY,
}: UseVideoPlaybackOptions) {
  const isVideoLoaded = ref(false);

  const onVideoLoaded = () => {
    isVideoLoaded.value = true;
  };

  const playVideo = async () => {
    const shouldPlay = autoplay ? autoplay.value : true;
    if (!videoRef.value || !isVideoLoaded.value || !shouldPlay) return;

    try {
      videoRef.value.currentTime = 0;
      await new Promise((resolve) => setTimeout(resolve, 100));
      await videoRef.value.play();
    } catch (error) {
      console.warn("Video autoplay failed:", error);
    }
  };

  const pauseVideo = () => {
    if (!videoRef.value) return;
    videoRef.value.pause();
    videoRef.value.currentTime = 0;
  };

  watch(
    () => $slidev.nav.currentPage,
    (currentPage) => {
      if (currentPage === slideNumber.value) {
        setTimeout(playVideo, playDelay);
      } else {
        pauseVideo();
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    pauseVideo();
  });

  return { isVideoLoaded, onVideoLoaded, playVideo, pauseVideo };
}
