<template>
  <div class="component-grid" :style="gridStyle">
    <div
      v-for="component in components"
      :key="component.name"
      class="component-card"
    >
      <h3>{{ component.name }}</h3>
      <div v-if="Array.isArray(component.content)" class="content-list">
        <ul>
          <li v-for="item in component.content" :key="item">{{ item }}</li>
        </ul>
      </div>
      <p v-else>{{ component.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface GridComponent {
  name: string;
  content: string | string[];
}

interface Props {
  components?: GridComponent[];
  columns?: number | null;
}

const props = withDefaults(defineProps<Props>(), {
  components: () => [
    { name: "Item 1", content: "Description for item 1." },
    { name: "Item 2", content: "Description for item 2." },
    { name: "Item 3", content: "Description for item 3." },
  ],
  columns: null,
});

const calculateOptimalColumns = (itemCount: number): number => {
  if (itemCount <= 1) return 1;
  if (itemCount <= 2) return 2;
  if (itemCount <= 3) return 3;
  const divisors: number[] = [];
  for (let i = 1; i <= Math.min(itemCount, 3); i++) {
    if (itemCount % i === 0) divisors.push(i);
  }
  return divisors.length > 0 ? Math.max(...divisors) : 3;
};

const columnCount = computed(() => {
  if (props.columns !== null) return props.columns;
  return calculateOptimalColumns(props.components.length);
});

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${columnCount.value}, 1fr)`,
}));
</script>

<style scoped>
.component-grid { padding: 0 !important; }
.component-grid .component-card .content-list ul { margin: 0 !important; padding: 0 !important; list-style: none !important; }
.component-grid .component-card .content-list li { font-size: 0.75rem !important; line-height: 1.4 !important; margin: 0 !important; margin-bottom: 0.5rem !important; padding: 0 !important; position: relative !important; }
.component-grid .component-card .content-list li::before { display: none !important; content: none !important; }
.component-grid .component-card .content-list li:last-child { margin-bottom: 0 !important; }
.component-grid .component-card h3 { font-size: 1.1rem !important; margin-bottom: 1rem !important; }
.component-grid .component-card p { font-size: 0.9rem !important; line-height: 1.4 !important; }
</style>
