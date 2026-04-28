<template>
  <div class="image-container" :style="containerStyle">
    <img
      :src="src"
      :alt="alt"
      class="contained-image"
      :style="imageStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src: string
  alt?: string
  maxWidth?: string
  maxHeight?: string
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Image',
  maxWidth: '90vw',
  maxHeight: '90vh',
  backgroundColor: 'transparent',
})

const containerStyle = computed(() => ({
  background: props.backgroundColor,
}))

const imageStyle = computed(() => ({
  maxWidth: props.maxWidth,
  maxHeight: props.maxHeight,
}))
</script>

<style scoped>
.image-container { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 2rem; box-sizing: border-box; }
.contained-image { max-width: 90vw; max-height: 90vh; width: auto; height: auto; object-fit: contain; object-position: center; display: block; }
</style>
