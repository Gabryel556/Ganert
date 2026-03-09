<template>
  <div class="skill-category" :style="{ borderLeftColor: color }">
    <div class="skill-header" :style="{ color: color }">
      <i :class="icon"></i>
      <span>{{ title }}</span>
    </div>
    <ul class="skill-list">
      <li v-for="(skill, index) in skills" :key="index">{{ skill }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ title: String, icon: String, color: String, skills: Array });
</script>

<style scoped>
.skill-category {
  background: var(--surface-color);
  border-radius: 8px; padding: 1.5rem;
  transition: transform 0.2s ease, background-color 0.4s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid var(--border-color);
}

.skill-category:hover {
  transform: translateY(-5px);
  background: var(--surface-hover);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}

.skill-header {
  display: flex; align-items: center; gap: 12px; margin-bottom: 1rem;
  font-size: 1.1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
}
.skill-header i { font-size: 1.3rem; }
.skill-list { list-style: none; padding: 0; }
.skill-list li {
  padding: 8px 0; font-size: 0.95rem; display: flex; align-items: center;
  color: var(--text-secondary); border-bottom: 1px solid var(--border-color);
}
.skill-list li:before { content: "•"; margin-right: 8px; opacity: 0.5; }
.skill-list li:last-child { border-bottom: none; }
</style>