<template>
  <div class="page-fade-in">
    <h2 class="page-title">{{ getText('nav_apps') }}</h2>

    <div class="hub-nav">
      <button :class="['tab-btn', { active: activeTab === 'portfolio' }]" @click="activeTab = 'portfolio'">{{ getText('tab_portfolio_apps') }}</button>
      <button :class="['tab-btn', { active: activeTab === 'pricing' }]" @click="activeTab = 'pricing'">{{ getText('tab_pricing') }}</button>
    </div>

    <div v-if="activeTab === 'portfolio'" class="grid-layout">
      <div class="site-card" v-for="(app, index) in myApps" :key="index">
        <img :src="app.image" :alt="app.title" class="site-banner">
        <div class="site-card-content">
          <h3>{{ app.title }}</h3>
          <div class="buttons-row">
            <a :href="app.link" target="_blank" class="btn-premium">{{ getText('btn_download') }}</a>
            <button v-if="app.hasGuide" @click="showGuide = true" class="btn-outline">{{ getText('btn_guide') }}</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'pricing'" class="pricing-container">
      <div class="info-card">
        <h3>{{ getText('pricing_title_apps') }}</h3>
        <table class="p-table">
          <tr v-for="(item, index) in appPriceTable" :key="index">
            <td>{{ item.type }}</td>
            <td class="p-val">{{ item.price }}</td>
          </tr>
        </table>
      </div>

      <div class="info-card">
        <h3>{{ getText('pricing_title_backend') || 'Sistemas & APIs' }}</h3>
        <table class="p-table">
          <tr v-for="(item, index) in (getData('backend_price_table') || [])" :key="index">
            <td>{{ item.type }}</td>
            <td class="p-val">{{ item.price }}</td>
          </tr>
        </table>
      </div>

      <div class="info-card">
        <h3>{{ getText('tos_backend_title') || 'Termos de Serviço' }}</h3>
        <ul class="tos-list">
          <li v-for="(t, i) in (getData('tos_apps_list') || [])" :key="'app-'+i">{{ t }}</li>
          <li v-for="(t, i) in (getData('tos_backend_list') || [])" :key="'back-'+i">{{ t }}</li>
        </ul>
      </div>
    </div>

    <div v-if="showGuide" class="modal-overlay" @click.self="showGuide = false">
      <div class="modal-content">
        <h3>{{ getText('modal_guide_title') }}</h3>
        <ul class="guide-steps"><li v-for="(step, i) in (getData('modal_guide_steps') || [])" :key="i">{{ step }}</li></ul>
        <button class="btn-premium" style="width: 100%;" @click="showGuide = false">{{ getText('btn_close_guide') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLanguage } from '../composables/useLanguage';
const { getText, getData } = useLanguage();
const activeTab = ref('portfolio');
const showGuide = ref(false);
const placeholderImg = 'https://via.placeholder.com/300x180/1e1e1e/ff8c00?text=App';
const appPriceTable = computed(() => getData('app_price_table') || []);
const appNames = computed(() => getData('app_portfolio_names') || []);
const myApps = computed(() => [
  { title: appNames.value[0], image: placeholderImg, link: '#' },
  { title: appNames.value[1], image: placeholderImg, link: '#' },
  { title: appNames.value[2], image: placeholderImg, link: '#' },
  { title: appNames.value[3], image: placeholderImg, link: '#' },
  { title: appNames.value[4], image: placeholderImg, link: '#', hasGuide: true }
]);
</script>

<style scoped>
.page-fade-in { animation: fadeIn 0.5s ease; }
.page-title { font-size: 2.2rem; color: var(--brand-color); text-align: center; margin-bottom: 2rem; }
.hub-nav { display: flex; justify-content: center; background: var(--surface-color); padding: 5px; border-radius: 50px; border: 1px solid var(--border-color); width: fit-content; margin: 0 auto 3rem; }
.tab-btn { background: none; border: none; padding: 10px 30px; border-radius: 40px; color: var(--text-secondary); font-weight: bold; cursor: pointer; transition: 0.3s; }
.tab-btn.active { background: var(--brand-color); color: #fff; box-shadow: 0 4px 15px rgba(255,140,0,0.3); }

.grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.pricing-container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; }
.info-card { background: var(--surface-color); border: 1px solid var(--border-color); padding: 2rem; border-radius: 12px; }
.info-card h3 { color: var(--brand-color); margin-bottom: 1.5rem; }
.p-table { width: 100%; border-collapse: collapse; }
.p-table td { padding: 12px; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); }
.p-val { text-align: right; font-weight: bold; color: var(--brand-color); }

.tos-list { list-style: none; padding: 0; }
.tos-list li { padding: 8px 0; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); }
.tos-list li:before { content: "⚡ "; color: var(--brand-color); }

.site-card { background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; transition: 0.3s; }
.site-banner { width: 100%; height: 180px; object-fit: cover; border-bottom: 1px solid var(--border-color); }
.site-card-content { padding: 1.5rem; text-align: center; }
.site-card-content h3 { color: var(--brand-color); margin-bottom: 1rem; }
.buttons-row { display: flex; justify-content: center; gap: 10px; }

.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 999; }
.modal-content { background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 12px; padding: 2.5rem; max-width: 600px; width: 90%; }
.guide-steps { list-style: none; padding: 0; margin-bottom: 2rem; }
.guide-steps li { margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; color: var(--text-secondary); }
</style>