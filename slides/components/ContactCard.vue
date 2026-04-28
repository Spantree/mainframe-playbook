<template>
  <div class="contact-card">
    <h2 v-if="title">{{ title }}</h2>
    <slot v-else>
      <h2>Get In Touch</h2>
    </slot>

    <div class="contact-info">
      <div v-if="email">📧 {{ email }}</div>
      <div v-if="website">🌐 {{ website }}</div>
      <div v-if="phone">📱 {{ phone }}</div>
    </div>

    <slot name="action">
      <button v-if="cta" class="brand-button">{{ cta }}</button>
    </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  email?: string;
  website?: string;
  phone?: string;
  cta?: string;
}

withDefaults(defineProps<Props>(), {
  title: '',
  email: '',
  website: '',
  phone: '',
  cta: '',
});
</script>

<style scoped>
.contact-card {
  text-align: center;
}

.contact-info {
  margin: 2rem 0;
}

.contact-info > div {
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--brand-text-muted, #6b7280);
}
</style>
