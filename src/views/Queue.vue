<template>
  <div class="page-fade-in">
    <h2 class="page-title">{{ getText('queue_title') !== 'queue_title' ? getText('queue_title') : 'Fila de Trabalho' }}</h2>

    <div class="queue-container">
      <div class="queue-column">
        <h3>
          <i class="fas fa-clock"></i> 
          <span>{{ getText('queue_col_not_started') !== 'queue_col_not_started' ? getText('queue_col_not_started') : 'Na Fila' }}</span>
        </h3>
        <ul>
          <li v-for="(item, index) in queueData.notStarted" :key="'ns-'+index" class="task-item">
            <div class="task-info">
              <span class="status-dot idle"></span>
              <span class="task-name">{{ item }}</span>
            </div>
            <div class="progress-track"><div class="progress-fill empty"></div></div>
          </li>
          <li v-if="queueData.notStarted.length === 0" class="empty-msg">Nenhum projeto aguardando.</li>
        </ul>
      </div>

      <div class="queue-column">
        <h3>
          <i class="fas fa-pencil-alt"></i> 
          <span>{{ getText('queue_col_in_progress') !== 'queue_col_in_progress' ? getText('queue_col_in_progress') : 'Em Desenvolvimento' }}</span>
        </h3>
        <ul>
          <li v-for="(item, index) in queueData.inProgress" :key="'wip-'+index" class="task-item in-progress-card">
            <div class="task-info">
              <span class="status-dot pulsing"></span>
              <span class="task-name">{{ item }}</span>
            </div>
            <div class="progress-track"><div class="progress-fill animated-stripes"></div></div>
          </li>
          <li v-if="queueData.inProgress.length === 0" class="empty-msg">Nenhum projeto em andamento.</li>
        </ul>
      </div>

      <div class="queue-column">
        <h3>
          <i class="fas fa-check-circle"></i> 
          <span>{{ getText('queue_col_completed') !== 'queue_col_completed' ? getText('queue_col_completed') : 'Concluídos' }}</span>
        </h3>
        <ul>
          <li v-for="(item, index) in queueData.completed" :key="'done-'+index" class="task-item">
            <div class="task-info">
              <span class="status-dot done"></span>
              <span class="task-name">{{ item }}</span>
            </div>
            <div class="progress-track"><div class="progress-fill full"></div></div>
          </li>
          <li v-if="queueData.completed.length === 0" class="empty-msg">Nenhum projeto concluído ainda.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useLanguage } from '../composables/useLanguage';

const { getText } = useLanguage();
const queueData = ref({ notStarted: [], inProgress: [], completed: [] });

onMounted(async () => {
  try {
    const response = await fetch('/queue.json');
    if (response.ok) {
      queueData.value = await response.json();
    } else { throw new Error('Arquivo não encontrado'); }
  } catch (error) {
    queueData.value = {
      notStarted: ['...'],
      inProgress: ['...'],
      completed: ['...']
    };
  }
});
</script>

<style scoped>
.page-fade-in { 
    animation: fadeIn 0.5s ease-in-out; 
    max-width: 1200px; 
    margin: 0 auto; 
}

.page-title { 
    font-size: 2.2rem; 
    color: var(--brand-color); 
    margin-bottom: 3rem; 
    text-align: center; 
}

.queue-container { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
    gap: 2rem; 
}

.queue-column { 
  background: var(--surface-color); 
  border: 1px solid var(--border-color); 
  border-radius: 12px; 
  padding: 2rem; 
  box-shadow: 0 4px 20px rgba(0,0,0,0.05); 
  transition: background-color 0.4s ease; 
}

.queue-column h3 { 
  display: flex; 
  align-items: center; 
  gap: 0.75rem; 
  font-size: 1.3rem; 
  color: var(--brand-color); 
  margin-bottom: 1.5rem; 
  padding-bottom: 0.75rem; 
  border-bottom: 1px solid var(--border-color); 
}

.queue-column ul { 
    list-style: none; 
    padding: 0; 
}

.task-item {
  background-color: var(--surface-hover);
  padding: 1.2rem;
  border-radius: 10px;
  margin-bottom: 1.2rem;
  border: 1px solid var(--border-color);
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}

.in-progress-card {
  border-color: rgba(255, 140, 0, 0.3);
  box-shadow: 0 0 15px rgba(255, 140, 0, 0.05);
}

.task-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-name {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 1.05rem;
}

.status-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-dot.idle { 
    background-color: #888; 
}

.status-dot.done { 
    background-color: #23b861; 
    box-shadow: 0 0 8px rgba(46, 204, 113, 0.5); 
}

.status-dot.pulsing {
  background-color: var(--brand-color);
  box-shadow: 0 0 8px var(--brand-color);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 140, 0, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(255, 140, 0, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 140, 0, 0); }
}

.progress-track {
  width: 100%; height: 6px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

[data-theme="light"] 

.progress-track { 
    background-color: rgba(0,0,0,0.05);
}

.progress-fill { 
    height: 100%; 
    border-radius: 10px; 
}

.progress-fill.empty { 
    width: 5%; 
    background-color: #888; 
    opacity: 0.3; 
}

.progress-fill.full { 
    width: 100%; 
    background-color: #2ecc71; 
}

.progress-fill.animated-stripes {
  width: 65%;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  background-color: var(--brand-color);
  animation: progressStripes 1s linear infinite;
}

@keyframes progressStripes {
  from { background-position: 1rem 0; }
  to { background-position: 0 0; }
}

.empty-msg {
  padding: 1rem; color: var(--text-secondary); font-style: italic; text-align: center;
}

@media (max-width: 768px) { .queue-container { grid-template-columns: 1fr; } }
</style>