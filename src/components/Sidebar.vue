<template>
  <div class="mobile-header">
    <h1>{{ getText('artist_name') }}</h1>
    <button @click="toggleMenu" class="hamburger-btn">
      <i :class="isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
    </button>
  </div>
  <div v-if="isOpen" class="overlay" @click="toggleMenu"></div>
  <nav :class="['sidebar', { open: isOpen }]">
    <h1 class="desktop-logo">{{ getText('artist_name') }}</h1>
    <ul class="nav-links">
      <li><router-link to="/" @click="closeMenu" class="nav-link" active-class="active"><i class="fa-solid fa-address-card"></i> <span>{{ getText('nav_about') }}</span></router-link></li>
      <li><router-link to="/sites" @click="closeMenu" class="nav-link" active-class="active"><i class="fa-solid fa-globe"></i> <span>{{ getText('nav_websites') }}</span></router-link></li>
      <li><router-link to="/apps" @click="closeMenu" class="nav-link" active-class="active"><i class="fa-solid fa-robot"></i> <span>{{ getText('nav_apps') }}</span></router-link></li>
      <li><router-link to="/queue" @click="closeMenu" class="nav-link" active-class="active"><i class="fa-solid fa-list-check"></i> <span>{{ getText('nav_queue') }}</span></router-link></li>
      <li><router-link to="/contact" @click="closeMenu" class="nav-link" active-class="active"><i class="fa-solid fa-envelope"></i> <span>{{ getText('nav_contact') }}</span></router-link></li>
    </ul>
    <div class="sidebar-footer">
      <div class="footer-controls">
        <button @click="toggleTheme" class="theme-toggle-mini">
          <i :class="theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
        </button>
        <select v-model="currentLang" @change="changeLang" class="lang-selector-mini">
          <option v-for="(val, key) in languages" :key="key" :value="key">{{ key.toUpperCase() }}</option>
        </select>
      </div>
      <p class="copyright">© 2026 AG Studio</p>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useLanguage } from '../composables/useLanguage';
import languages from '../data/languages.json';

const { currentLang, setLanguage, getText } = useLanguage();
const isOpen = ref(false);
const theme = ref(localStorage.getItem('theme') || 'dark');

const toggleMenu = () => isOpen.value = !isOpen.value;
const closeMenu = () => isOpen.value = false;
const changeLang = (e) => setLanguage(e.target.value);
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', theme.value);
  localStorage.setItem('theme', theme.value);
};
onMounted(() => document.body.setAttribute('data-theme', theme.value));
</script>

<style scoped>
.sidebar { width: 250px; height: 100vh; position: fixed; left: 0; top: 0; background: var(--sidebar-bg); display: flex; flex-direction: column; padding: 2rem 1.5rem; transition: 0.3s; border-right: 1px solid var(--border-color); }
.desktop-logo { text-align: center; color: var(--brand-color); margin-bottom: 2rem; font-size: 1.8rem; }
.nav-links { list-style: none; padding: 0; flex-grow: 1; }
.nav-link { display: flex; align-items: center; gap: 12px; padding: 0.8rem 1rem; color: var(--text-secondary); text-decoration: none; border-radius: 8px; transition: 0.3s; margin-bottom: 0.5rem; }
.nav-link.active, .nav-link:hover { background: var(--brand-color); color: #fff; }
.nav-link i { width: 20px; text-align: center; }

.sidebar-footer { padding-top: 1rem; border-top: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 12px; }
.footer-controls { display: flex; gap: 8px; }
.theme-toggle-mini { width: 45px; height: 45px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); cursor: pointer; transition: 0.3s; }
.theme-toggle-mini:hover { background: var(--brand-color); color: #fff; }

.lang-selector-mini { flex-grow: 1; background: var(--surface-hover); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 8px; font-weight: bold; cursor: pointer; text-align: center; height: 45px; }
/* FIX DA CAIXA BRANCA */
.lang-selector-mini option { background: var(--sidebar-bg); color: var(--text-primary); }

.copyright { font-size: 0.7rem; text-align: center; opacity: 0.5; margin-top: 10px; }

@media (max-width: 768px) {
  .sidebar { transform: translateX(-100%); }
  .sidebar.open { transform: translateX(0); }
  .mobile-header { display: flex; justify-content: space-between; padding: 1rem; background: var(--sidebar-bg); color: var(--text-primary); }
  .hamburger-btn { background: none; border: none; font-size: 1.5rem; color: var(--text-primary); }
}
</style>