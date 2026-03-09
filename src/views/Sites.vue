<template>
  <div class="page-fade-in">
    <h2 class="page-title">{{ getText('nav_websites') }}</h2>

    <div class="hub-nav">
      <button :class="['tab-btn', { active: activeTab === 'portfolio' }]" @click="activeTab = 'portfolio'">
        {{ getText('tab_portfolio_web') }}
      </button>
      <button :class="['tab-btn', { active: activeTab === 'pricing' }]" @click="activeTab = 'pricing'">
        {{ getText('tab_pricing') }}
      </button>
    </div>

    <div v-if="activeTab === 'portfolio'" class="sites-grid">
      <ProjectCard 
        v-for="(site, index) in mySites" :key="index"
        :image="site.image" :title="site.title" :link="site.link" :buttonText="getText('btn_visit_site')"
      />
    </div>

    <div v-if="activeTab === 'pricing'" class="pricing-container">
      <div class="info-container">
        <h3>{{ getText('pricing_title_web') }}</h3>
        <table class="price-table" v-if="webPriceTable.length > 0">
          <tbody>
            <tr v-for="(item, index) in webPriceTable" :key="index">
              <td>{{ item.type }}</td>
              <td class="price-val">{{ item.price }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Loading prices...</p>
      </div>

      <div class="info-container">
        <h3>{{ getText('tos_web_title') }}</h3>
        <ul class="simple-list" v-if="tosWebList.length > 0">
          <li v-for="(term, index) in tosWebList" :key="index">{{ term }}</li>
        </ul>
        <p v-else>Loading terms...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLanguage } from '../composables/useLanguage';
import ProjectCard from '../components/ProjectCard.vue';

import imgAG from '../assets/BannersSites/LogoAG.png';
import imgCF from '../assets/BannersSites/LogoCF.png';
import imgRP from '../assets/BannersSites/LogoRP.png';
import imgMC from '../assets/BannersSites/LogoMC.png';
import imgST from '../assets/BannersSites/LogoST.png';

const { getText, getData } = useLanguage();
const activeTab = ref('portfolio');

const webPriceTable = computed(() => getData('web_price_table') || []);
const tosWebList = computed(() => getData('tos_web_list') || []);

// Os nomes dos teus sites mantêm-se estáticos pois são marcas (Brands)
const mySites = [
  { title: 'AG Studio', image: imgAG, link: 'https://gabryel556.github.io/AGStudio/' },
  { title: 'Cosmic Fantasy Online', image: imgCF, link: 'https://cosmicfantasyonline.com' },
  { title: 'Relogio Pisca', image: imgRP, link: 'https://relogiopisca.com.br' },
  { title: 'Mestres da Cozinha', image: imgMC, link: 'https://gabryel556.github.io/MestresDaCozinha/' },
  { title: 'Sanctuaryum', image: imgST, link: 'https://gabryel556.github.io/Sanctuaryum/' }
];
</script>

<style scoped>
.page-fade-in { animation: fadeIn 0.5s ease-in-out; }
.page-title { font-size: 2.2rem; color: var(--brand-color); margin-bottom: 2rem; text-align: center; }

.hub-nav {
  display: inline-flex; justify-content: center; background: var(--surface-color);
  padding: 0.4rem; border-radius: 50px; border: 1px solid var(--border-color);
  margin-bottom: 3rem; box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
  position: relative; left: 50%; transform: translateX(-50%);
}

.tab-btn {
  background: transparent; color: var(--text-secondary); border: none;
  padding: 0.8rem 2.5rem; border-radius: 40px; cursor: pointer;
  font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); position: relative; z-index: 1;
}

.tab-btn:hover { color: var(--text-primary); }
.tab-btn.active { background: var(--brand-color); color: #fff; box-shadow: 0 4px 15px rgba(255, 140, 0, 0.3); transform: translateY(-2px); }
[data-theme="light"] .tab-btn.active { color: #ffffff; }

.sites-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }

.pricing-container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; }
.info-container { background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem; transition: background-color 0.4s ease, border-color 0.4s ease; }
.info-container h3 { color: var(--brand-color); margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; font-size: 1.4rem; }

.price-table { width: 100%; border-collapse: collapse; color: var(--text-secondary); }
.price-table td { padding: 1rem; border-bottom: 1px solid var(--border-color); font-size: 1.1rem; }
.price-table tr:last-child td { border-bottom: none; }
.price-val { text-align: right; font-weight: 600; color: var(--brand-color); }

.simple-list { list-style: none; padding: 0; }
.simple-list li { padding: 0.8rem 0; border-bottom: 1px solid var(--border-color); display: flex; align-items: flex-start; line-height: 1.5; color: var(--text-secondary); }
.simple-list li:before { content: "⚡"; margin-right: 12px; }
.simple-list li:last-child { border-bottom: none; }

@media (max-width: 768px) { .hub-nav { display: flex; flex-direction: column; border-radius: 12px; padding: 0.5rem; } .tab-btn { border-radius: 8px; } }
</style>