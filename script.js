document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. SELEÇÃO DE ELEMENTOS GLOBAIS ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const contentStorage = document.getElementById('content-storage');
    const langSelector = document.getElementById('lang-selector');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    const hubs = {
        gallery: {
            tabButtons: document.querySelectorAll('#gallery-hub .hub-tab-button'),
            contentTabs: document.querySelectorAll('#gallery-hub .hub-content-tab'),
            contentButtons: document.querySelectorAll('#gallery-hub .hub-content-button'),
            displayArea: document.getElementById('gallery-hub-content-display')
        },
        websites: {
            tabButtons: document.querySelectorAll('#websites-hub .hub-tab-button'),
            contentTabs: document.querySelectorAll('#websites-hub .hub-content-tab'),
            displayArea: document.getElementById('websites-hub-content-display')
        }
    };
    
    // --- 2. VARIÁVEIS E FUNÇÕES GLOBAIS ---
    let galleriesData = {};
    let translations = {};
    let currentLang = 'pt';

    const applyTranslations = () => {
        const lang = currentLang;
        if (!translations[lang]) return;
        document.documentElement.lang = lang;
        if(langSelector) langSelector.value = lang;

        populateInfoPages();

        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.dataset.lang;
            if (translations[lang] && translations[lang][key] !== undefined) {
                const span = element.querySelector('span');
                if (span) {
                    span.textContent = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    };

    const populateInfoPages = () => {
    const lang = currentLang;
    if (!translations[lang]) return;

    // Preenche a Tabela de Preços de ARTE
    const priceTableBodyArt = document.querySelector('#content-storage #price-table-body');
    if (priceTableBodyArt && translations[lang].price_table) {
        priceTableBodyArt.innerHTML = '';
        translations[lang].price_table.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.type}</td><td>${item.price}</td>`;
            priceTableBodyArt.appendChild(row);
        });
    }

    // Preenche a Lista de Termos de ARTE
    const tosListArt = document.querySelector('#content-storage #tos-list');
    if (tosListArt && translations[lang].tos_list) {
        tosListArt.innerHTML = '';
        translations[lang].tos_list.forEach(itemText => {
            const listItem = document.createElement('li');
            listItem.textContent = itemText;
            tosListArt.appendChild(listItem);
        });
    }
    
    // Preenche a Tabela de Preços de SITES
    const priceTableBodySites = document.querySelector('#content-storage #sites-price-table-body');
    if (priceTableBodySites && translations[lang].sites_price_table) {
        priceTableBodySites.innerHTML = '';
        translations[lang].sites_price_table.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.type}</td><td>${item.price}</td>`;
            priceTableBodySites.appendChild(row);
        });
    }

    // Preenche a Lista de Termos de SITES
    const tosListSites = document.querySelector('#content-storage #sites-tos-list');
    if (tosListSites && translations[lang].sites_tos_list) {
        tosListSites.innerHTML = '';
        translations[lang].sites_tos_list.forEach(itemText => {
            const listItem = document.createElement('li');
            listItem.textContent = itemText;
            tosListSites.appendChild(listItem);
        });
    }
};

    const loadWorkQueue = async (displayArea, sourceFolder) => {
        const statuses = { 
            'queue-not-started': `${sourceFolder}/NotStarted.txt`, 
            'queue-in-progress': `${sourceFolder}/InProgress.txt`, 
            'queue-completed': `${sourceFolder}/Finish.txt` 
        };
        const getText = (key, fallback) => (translations[currentLang] && translations[currentLang][key]) || fallback;
        for (const id in statuses) {
            const listElement = displayArea.querySelector(`#${id}`);
            if (!listElement) continue;
            listElement.innerHTML = `<li>${getText('queue_loading', 'Carregando...')}</li>`;
            try {
                const response = await fetch(statuses[id]);
                if (!response.ok) throw new Error(`Arquivo não encontrado: ${statuses[id]}`);
                const text = await response.text();
                listElement.innerHTML = '';
                const items = text.split('\n').filter(item => item.trim() !== '');
                if (items.length > 0) {
                    items.forEach(itemText => { const li = document.createElement('li'); li.textContent = itemText; listElement.appendChild(li); });
                } else {
                    listElement.innerHTML = `<li>${getText('queue_empty', 'Nenhum trabalho aqui.')}</li>`;
                }
            } catch (error) {
                console.error(error);
                listElement.innerHTML = `<li>${getText('queue_error', 'Não foi possível carregar.')}</li>`;
            }
        }
    };
    
    const setupSlider = (galleryElement) => {
        const slides = Array.from(galleryElement.querySelectorAll('.slide'));
        const thumbnailNav = galleryElement.querySelector('.thumbnail-navigation');
        const counter = galleryElement.querySelector('.slide-counter');
        if (slides.length === 0) return;
        let currentIndex = 0;
        const showSlide = (index) => {
            currentIndex = index;
            slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
            if(thumbnailNav) thumbnailNav.querySelectorAll('.thumbnail-img').forEach((thumb, i) => thumb.classList.toggle('active', i === index));
            if(counter) counter.textContent = `${index + 1} / ${slides.length}`;
        };
        if(thumbnailNav) {
            thumbnailNav.innerHTML = '';
            slides.forEach((slide, index) => {
                const thumb = document.createElement('img');
                thumb.src = slide.src;
                thumb.className = 'thumbnail-img';
                thumb.addEventListener('click', () => showSlide(index));
                thumbnailNav.appendChild(thumb);
                slide.addEventListener('click', () => {
                    lightboxImg.src = slide.src;
                    lightbox.classList.add('active');
                });
            });
        }
        galleryElement.querySelector('.prev')?.addEventListener('click', () => showSlide((currentIndex - 1 + slides.length) % slides.length));
        galleryElement.querySelector('.next')?.addEventListener('click', () => showSlide((currentIndex + 1) % slides.length));
        showSlide(0);
    };

    function showPage(pageId) {
        pages.forEach(page => page.classList.toggle('active', page.id === pageId));
    }

    const moveContent = (contentId, displayArea) => {
        if (displayArea.firstChild) contentStorage.appendChild(displayArea.firstChild);
        const source = contentStorage.querySelector(`#${contentId}`);
        if (source) {
            displayArea.appendChild(source);
            if (contentId === 'queue') loadWorkQueue(displayArea, 'work');
            if (contentId === 'sites-queue') loadWorkQueue(displayArea, 'WorkSites');
            const gallery = displayArea.querySelector('.gallery');
            if (gallery) setupSlider(gallery);
        }
    };

    const buildGalleries = () => {
        for (const galleryId in galleriesData) {
            const galleryElement = contentStorage.querySelector(`#${galleryId}`);
            const sliderContainer = galleryElement?.querySelector('.slider-container');
            if (sliderContainer) {
                sliderContainer.innerHTML = ''; // Limpa o container
                const imagePaths = galleriesData[galleryId];
                imagePaths.forEach((path, index) => {
                    const img = document.createElement('img');
                    img.src = path;
                    img.alt = `${galleryId} image ${index + 1}`;
                    img.classList.add('slide');
                    sliderContainer.appendChild(img);
                });
            }
        }
    };

    // --- 3. INICIALIZAÇÃO E EVENTOS ---
    try {
        // Carrega os dois arquivos JSON em paralelo
        const [translationsRes, galleriesRes] = await Promise.all([
            fetch('languages.json'),
            fetch('galleries.json')
        ]);
        translations = await translationsRes.json();
        galleriesData = await galleriesRes.json();

    } catch (error) { 
        console.error("ERRO: Falha ao carregar arquivos de configuração (JSON).", error); 
    }
    
    // Constrói as galerias com os dados carregados
    buildGalleries();
    
    
    currentLang = localStorage.getItem('language') || 'pt';
    applyTranslations();

    langSelector.addEventListener('change', () => {
        currentLang = langSelector.value;
        localStorage.setItem('language', currentLang);
        applyTranslations();
        const activeHubButton = document.querySelector('.hub-content-button.active');
        if(activeHubButton) activeHubButton.click();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const pageId = link.dataset.page;
            showPage(pageId);
            
            document.querySelectorAll('.hub-content-display').forEach(display => {
                if (display.firstChild) contentStorage.appendChild(display.firstChild);
            });

            if (pageId.includes('-hub')) {
                document.querySelector(`#${pageId} .hub-tab-button`)?.click();
            }
        });
    });

    // Lógica para o Hub de Galeria
    hubs.gallery.tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            hubs.gallery.tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const targetId = button.dataset.hubTarget;
            hubs.gallery.contentTabs.forEach(tab => tab.classList.toggle('active', tab.id === targetId));
            if (hubs.gallery.displayArea.firstChild) contentStorage.appendChild(hubs.gallery.displayArea.firstChild);
            hubs.gallery.contentButtons.forEach(btn => btn.classList.remove('active'));
        });
    });

    hubs.gallery.contentButtons.forEach(button => {
        button.addEventListener('click', () => {
            hubs.gallery.contentButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            moveContent(button.dataset.contentId, hubs.gallery.displayArea);
        });
    });
    
    // Lógica para o Hub de Sites
    
    hubs.websites.tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            hubs.websites.tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const contentId = button.dataset.hubTarget.replace('websites-hub-', 'sites-');
            moveContent(contentId, hubs.websites.displayArea);
        });
    });
    
    contentStorage.querySelectorAll('.gallery').forEach(setupSlider);
    
tsParticles.load("tsparticles", {
  fpsLimit: 120,
  particles: {
    number: {
      value: 100, // Poucas partículas, mas grandes
    },
    color: {
      value: ["#00BFFF", "#4a3a96", "#ffffff"], // Usa a cor azul, roxo e branco
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.1, max: 0.3 },
    },
    size: {
      value: { min: 50, max: 100 }, // Tamanhos grandes e variados
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "top",
      out_mode: "out",
      attract: { // Faz as bolhas se atraírem
          enable: true,
          rotateX: 600,
          rotateY: 1200
      }
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "bubble",
      },
    },
    modes: {
      bubble: {
        distance: 200,
        size: 120, // Aumenta ainda mais perto do mouse
        opacity: 0.4
      }
    },
  },
  retina_detect: true,
});
    contentStorage.querySelectorAll('.gallery').forEach(setupSlider);

    if (lightbox) {
        const closeLightbox = () => lightbox.classList.remove('active');
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
    }

    if (navLinks.length > 0) {
        navLinks[0].click();
    }
});