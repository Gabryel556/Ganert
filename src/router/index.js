import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Sites from '../views/Sites.vue';
import Apps from '../views/Apps.vue';
import Queue from '../views/Queue.vue';
import Contact from '../views/Contact.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/sites', name: 'Sites', component: Sites },
  { path: '/apps', name: 'Apps', component: Apps },
  { path: '/queue', name: 'Queue', component: Queue },
  { path: '/contact', name: 'Contact', component: Contact },
];

const router = createRouter({
  history: createWebHashHistory(), 
  routes,
});

export default router;