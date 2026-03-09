<template>
  <div class="page-fade-in">
    <h2 class="page-title">{{ getText('contact_title') !== 'contact_title' ? getText('contact_title') : 'Contato' }}</h2>

    <div class="about-grid-container">
      
      <div class="info-container">
        <h3>Plataformas</h3>
        <p class="contact-text">{{ getText('contact_text') !== 'contact_text' ? getText('contact_text') : 'Você pode me encontrar nas seguintes plataformas:' }}</p>
        
        <div class="contact-buttons">
          <a href="https://www.reddit.com/user/Gabryel556/" target="_blank" class="contact-btn reddit"><i class="fab fa-reddit"></i> Reddit</a>
          <a href="https://discord.gg/754716945944805427" target="_blank" class="contact-btn discord"><i class="fab fa-discord"></i> Discord</a>
          <a href="https://www.instagram.com/g.ganert/" target="_blank" class="contact-btn instagram"><i class="fab fa-instagram"></i> Instagram</a>
          <a href="https://www.twitch.tv/Ganert" target="_blank" class="contact-btn twitch"><i class="fab fa-twitch"></i> Twitch</a>
          <a href="https://www.github.com/Gabryel556" target="_blank" class="contact-btn github"><i class="fab fa-github"></i> GitHub</a>
        </div>
      </div>

      <div class="info-container">
        <h3>Mensagem Direta</h3>
        <form action="https://formsubmit.co/gabryelnunes7483@gmail.com" method="POST" class="contact-form">
          <div class="form-row">
            <input type="text" name="name" placeholder="Seu Nome" required>
            <input type="email" name="email" placeholder="Seu Email" required>
          </div>
          <textarea name="message" placeholder="Sua Mensagem" rows="5" required></textarea>
          
          <input type="hidden" name="_next" value="https://gabryel556.github.io/AGStudio/">
          <input type="hidden" name="_captcha" value="false">

          <button type="submit" class="submit-btn">Enviar Mensagem</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage';

const { getText } = useLanguage();
</script>

<style scoped>
.page-fade-in { animation: fadeIn 0.5s ease-in-out; max-width: 1200px; margin: 0 auto; }
.page-title { font-size: 2.2rem; color: var(--brand-color); margin-bottom: 2rem; text-align: center; }

.about-grid-container { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.info-container { background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 12px; padding: 2.5rem; transition: background-color 0.4s ease; }
.info-container h3 { color: var(--brand-color); margin-bottom: 1.5rem; font-size: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; }
.contact-text { font-size: 1.1rem; margin-bottom: 2rem; color: var(--text-secondary); }

.contact-buttons { display: flex; flex-wrap: wrap; gap: 1rem; }
.contact-btn { display: inline-flex; align-items: center; justify-content: center; padding: 0.8rem 1.5rem; border-radius: 50px; font-size: 1rem; font-weight: 600; text-decoration: none; color: #fff; transition: transform 0.3s ease, box-shadow 0.3s ease; flex-grow: 1; min-width: 140px; }
.contact-btn i { font-size: 1.3rem; margin-right: 10px; }
.contact-btn:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }

.contact-btn.reddit { background-color: #FF4500; }
.contact-btn.x-twitter { background-color: #000000; border: 1px solid #333; }
.contact-btn.discord { background-color: #5865F2; }
.contact-btn.instagram { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%); }
.contact-btn.twitch { background-color: #9146FF; }
.contact-btn.github { background-color: #333; }
.contact-btn.vgen { background-color: #00ff15; color: #000; }

.contact-form { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; }
.form-row { display: flex; gap: 1rem; }
.contact-form input, .contact-form textarea { width: 100%; background-color: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; font-family: 'Poppins', sans-serif; color: var(--text-primary); font-size: 1rem; transition: border-color 0.3s ease, background-color 0.4s ease; }
.contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: var(--brand-color); background-color: var(--bg-color); }
.submit-btn { background-color: var(--brand-color); color: #fff; border: none; border-radius: 50px; padding: 1rem 1.5rem; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
.submit-btn:hover { filter: brightness(1.1); transform: translateY(-3px); box-shadow: 0 8px 15px rgba(0,0,0,0.1); }

@media (max-width: 768px) { .about-grid-container { grid-template-columns: 1fr; } .form-row { flex-direction: column; } }
</style>