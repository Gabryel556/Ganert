import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Sites from '../views/Sites.vue';
import Apps from '../views/Apps.vue';
import Queue from '../views/Queue.vue';
import Contact from '../views/Contact.vue';

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home,
    meta: { 
      title: 'Ganert | Engenharia de Software & IA', 
      description: 'Desenvolvedor focado em projetos de alta performance, segurança cibernética e soluções integradas com Inteligência Artificial.' 
    }
  },
  { 
    path: '/sites', 
    name: 'Sites', 
    component: Sites,
    meta: { 
      title: 'Ganert | Sites Premium', 
      description: 'Desenvolvimento de sites de alta performance, portfólios e painéis administrativos sob medida para o seu negócio.' 
    }
  },
  { 
    path: '/apps', 
    name: 'Apps', 
    component: Apps,
    meta: { 
      title: 'Ganert | Sistemas & Apps', 
      description: 'Arquitetura de sistemas complexos, APIs, bots avançados e integração de ferramentas com IA.' 
    }
  },
  { 
    path: '/queue', 
    name: 'Queue', 
    component: Queue,
    meta: { 
      title: 'Ganert | Fila de Projetos', 
      description: 'Acompanhe de forma transparente o status, a fila de desenvolvimento e os prazos dos projetos atuais.' 
    }
  },
  { 
    path: '/contact', 
    name: 'Contact', 
    component: Contact,
    meta: { 
      title: 'Ganert | Contato e Orçamentos', 
      description: 'Entre em contato para discutirmos orçamentos, segurança de sistemas ou novas oportunidades de desenvolvimento.' 
    }
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Ganert | Portfolio';

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description);
  }

  next();
});

export default router;