<template>
  <div class="app-container">
    <vue-particles id="tsparticles" :options="particlesOptions" />

    <Sidebar />
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';

const particlesOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 100, duration: 0.4 },
    },
  },
  particles: {
    color: { value: ["#00eeff", "#888888"] }, 
    links: { color: "#00eeff", distance: 150, enable: true, opacity: 0.2, width: 1 },
    move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1.5, straight: false },
    number: { density: { enable: true, area: 800 }, value: 50 },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};
</script>

<style>
:root {
  --bg-color: #020308;
  --surface-color: rgba(255, 255, 255, 0.03);
  --surface-hover: rgba(255, 255, 255, 0.08);
  --border-color: rgba(255, 255, 255, 0.05);
  --text-primary: #f5f5f5;
  --text-secondary: #e0e0e0;
  --brand-color: #70c5c1;
  --sidebar-bg: #00040c;
  --bt-color: #2f3479;
}

[data-theme="light"] {
  --bg-color: #f4f6f8;
  --surface-color: #ffffff;
  --surface-hover: #f0f0f0;
  --border-color: rgba(0, 0, 0, 0.1);
  --text-primary: #2c3e50;
  --text-secondary: #555555;
  --brand-color: #102272;
  --sidebar-bg: #ffffff;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body { 
  font-family: 'Exo 2', sans-serif;
  background-color: var(--bg-color); 
  color: var(--text-primary); 
  transition: background-color 0.4s ease, color 0.4s ease;
}

#tsparticles { 
  position: fixed; 
  top: 0; left: 0; 
  width: 100%; 
  height: 100%; 
  z-index: -1; 
}

.app-container { 
  display: flex; 
  position: relative;
  z-index: 1; 
}

.main-content { 
  flex-grow: 1; 
  margin-left: 250px; 
  min-height: 100vh; 
  padding: 2rem; 
}

.fade-enter-active, 
.fade-leave-active { 
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); 
}

.fade-enter-from { 
  opacity: 0; 
  transform: translateY(15px); 
}

.fade-leave-to { 
  opacity: 0; 
  transform: translateY(-15px); 
}

.btn-premium {
  background: linear-gradient(135deg, var(--brand-color), #8400ff);
  background-size: 200% 200%;
  color: #fff !important;
  font-weight: 600;
  padding: 0.7rem 2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-premium:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 140, 0, 0.5);
  background-position: 100% 0;
}

.btn-outline {
  background: transparent;
  color: var(--brand-color);
  font-weight: 600;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  border: 2px solid var(--brand-color);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 0 rgba(255,140,0,0);
}

.btn-outline:hover {
  background: rgba(255, 140, 0, 0.1);
  box-shadow: inset 0 0 10px rgba(255, 140, 0, 0.2), 0 4px 15px rgba(255, 140, 0, 0.2);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .app-container { 
    display: block; 
  }

  .main-content { 
    margin-left: 0; 
    padding: 1rem; 
  }
  
}
</style>