<template>
  <div class="site-card">
    <img :src="image" :alt="title" class="site-banner">
    <div class="site-card-content">
      <h3>{{ title }}</h3>
      <a :href="link" target="_blank" class="btn-premium">{{ buttonText }}</a>
    </div>
  </div>
</template>

<script setup>
defineProps({ image: String, title: String, link: String, buttonText: String });
</script>

<style scoped>
.site-card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px; 
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.4s ease;
}

.site-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.site-banner {
  width: 100%; height: 180px; object-fit: cover; display: block;
  border-bottom: 1px solid var(--border-color);
}

.site-card-content { padding: 1.5rem; text-align: center; }
.site-card-content h3 { font-size: 1.4rem; color: var(--brand-color); margin-bottom: 1rem; }
</style>