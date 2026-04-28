<template>
  <div class="process-diagram">
    <div class="process-center">
      <slot>{{ centerLabel }}</slot>
    </div>
    <div v-for="step in steps" :key="step" class="process-step">
      {{ step }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  centerLabel?: string;
  steps?: string[];
}

withDefaults(defineProps<Props>(), {
  centerLabel: 'Process',
  steps: () => ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
});
</script>

<style scoped>
.process-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.process-center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: var(--brand-accent, var(--slidev-theme-primary, #ff6600));
  color: white;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  line-height: 1.3;
}

.process-step {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background: var(--brand-bg, #f3f4f6);
  color: var(--brand-text, var(--slidev-theme-primary, #2c3a41));
  font-weight: 600;
  font-size: 1rem;
}
</style>
