<template>
  <div class="page-fade-in Home-page">
    <h2 class="page-title">{{ getText('about_title') }}</h2>

    <div class="info-card about-card slide-up">
      <div class="profile-frame">
        <img src="../assets/profile.png" alt="Foto de Perfil" class="profile-pic" />
        <div class="profile-glow"></div>
      </div>
      
      <div class="about-text">
        <p class="highlight-text">{{ getText('about_p1') }}</p>
        <p>{{ getText('about_p2') }}</p>
      </div>
    </div>

    <div class="about-grid-container">
      <div class="info-card full-width slide-up delay-1">
        <h3><i class="fa-solid fa-layer-group"></i> {{ getText('about_programming_skills_title') }}</h3>
        <div class="skills-grid-wrapper">
          <SkillCard v-for="(cat, index) in programmingCategories" :key="index" v-bind="cat" />
        </div>
      </div>

      <div class="info-card slide-up delay-2">
        <h3><i class="fa-solid fa-desktop"></i> {{ getText('about_setup_title') }}</h3>
        <ul class="simple-list">
          <li v-for="(item, i) in setupList" :key="i"><i class="fa-solid fa-microchip"></i> {{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLanguage } from '../composables/useLanguage';
import SkillCard from '../components/SkillCard.vue';

const { getText, getData } = useLanguage();
const programmingCategories = computed(() => getData('programming_categories'));
const setupList = computed(() => getData('about_setup_content'));
</script>

<style scoped>
.Home-page { max-width: 1200px; margin: 0 auto; }
.page-title { font-size: 2.5rem; color: var(--brand-color); margin-bottom: 3rem; text-align: center; position: relative; display: inline-block; left: 50%; transform: translateX(-50%); }
.page-title::after { content: ''; position: absolute; bottom: -10px; left: 0; width: 100%; height: 3px; background: linear-gradient(90deg, transparent, var(--brand-color), transparent); }

.info-card { background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 16px; padding: 2.5rem; margin-bottom: 2rem; transition: 0.4s; }
.info-card h3 { color: var(--brand-color); margin-bottom: 1.8rem; font-size: 1.6rem; display: flex; align-items: center; gap: 12px; }

.about-card { display: flex; gap: 3rem; align-items: center; }
.profile-frame { width: 170px; height: 170px; flex-shrink: 0; position: relative; z-index: 2; }
.profile-pic { width: 100%; height: 100%; object-fit: cover; border-radius: 18px; border: 2px solid var(--sidebar-bg); position: relative; z-index: 2; }

.profile-frame::before {
  content: '';
  position: absolute;
  top: -4px; left: -4px; right: -4px; bottom: -4px;
  
  background-image: linear-gradient(135deg, 
    #ffffff 0%, 
    #a5f3fc 25%,
    #2563eb 50%,
    #a5f3fc 75%,
    #ffffff 100%
  );
  
  background-size: 400% 400%;
  border-radius: 22px;
  z-index: 1;
  animation: frameColorCycle 10s ease infinite;
}

.profile-glow {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, #a5f3fc, #2563eb);
  border-radius: 20px;
  filter: blur(25px);
  opacity: 0.15;
  z-index: 0;
}

@keyframes frameColorCycle {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.about-text { flex-grow: 1; display: flex; flex-direction: column; gap: 1.2rem; }
.highlight-text { font-size: 1.25rem; color: var(--text-primary); font-weight: 600; }
.about-text p { line-height: 1.8; font-size: 1.1rem; color: var(--text-secondary); }

.about-grid-container { display: grid; grid-template-columns: 1fr; gap: 2rem; }
.full-width { grid-column: 1 / -1; }
.skills-grid-wrapper { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.simple-list { list-style: none; padding: 0; }
.simple-list li { padding: 1rem 0; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); display: flex; align-items: center; gap: 12px; }
.simple-list li i { color: var(--brand-color); }

.slide-up { opacity: 0; animation: slideUpFade 0.6s ease forwards; }
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
@keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 900px) {
  .about-card { flex-direction: column; text-align: center; }
}
@media (max-width: 768px) {
  .page-title { font-size: 2rem; }
  .profile-frame { width: 150px; height: 150px; }
}
</style>