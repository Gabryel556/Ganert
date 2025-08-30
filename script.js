document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. SELEÇÃO DE ELEMENTOS GLOBAIS ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const ageGate = document.getElementById('age-gate');
    const ageGateEnter = document.getElementById('age-gate-enter');
    const ageGateLeave = document.getElementById('age-gate-leave');
    const contentStorage = document.getElementById('content-storage');
    const langSelector = document.getElementById('lang-selector');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-nav.prev');
    const lightboxNext = lightbox.querySelector('.lightbox-nav.next');
    const themeToggleButton = document.getElementById('theme-toggle'); // ADICIONE ESTA LINHA
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Pega o tema salvo ou usa 'dark' como padrão
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.querySelector('.sidebar');
    const menuOverlay = document.getElementById('menu-overlay');

    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.removeAttribute('data-theme');
        themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }

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
    let elementToOpenAfterAgeGate = null;
    let currentLightboxGallerySlides = [];
    let currentLightboxIndex = 0;

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

        // --- Adicione esta lógica para atualizar o status das comissões ---
        const commissionStatus = translations.commission_status;
        if (commissionStatus) {
            const artBadge = document.getElementById('art-status-badge');
            const sitesBadge = document.getElementById('sites-status-badge');
            const langData = translations[lang];

            // Atualiza status de Arte
            if (artBadge) {
                if (commissionStatus.art === 'open') {
                    artBadge.textContent = langData.commission_status_open;
                    artBadge.className = 'status-badge open';
                } else {
                    artBadge.textContent = langData.commission_status_closed;
                    artBadge.className = 'status-badge closed';
                }
            }

            // Atualiza status de Sites
            if (sitesBadge) {
                if (commissionStatus.sites === 'open') {
                    sitesBadge.textContent = langData.commission_status_open;
                    sitesBadge.className = 'status-badge open';
                } else {
                    sitesBadge.textContent = langData.commission_status_closed;
                    sitesBadge.className = 'status-badge closed';
                }
            }
        }
        // --- Fim da lógica adicionada ---
    };

    const populateInfoPages = () => {
        const lang = currentLang;
        if (!translations[lang]) return;

        const priceTableBodyArt = document.querySelector('#content-storage #price-table-body');
        if (priceTableBodyArt && translations[lang].price_table) {
            priceTableBodyArt.innerHTML = '';
            translations[lang].price_table.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.type}</td><td>${item.price}</td>`;
                priceTableBodyArt.appendChild(row);
            });
        }

        const tosListArt = document.querySelector('#content-storage #tos-list');
        if (tosListArt && translations[lang].tos_list) {
            tosListArt.innerHTML = '';
            translations[lang].tos_list.forEach(itemText => {
                const listItem = document.createElement('li');
                listItem.textContent = itemText;
                tosListArt.appendChild(listItem);
            });
        }
        
        const priceTableBodySites = document.querySelector('#content-storage #sites-price-table-body');
        if (priceTableBodySites && translations[lang].sites_price_table) {
            priceTableBodySites.innerHTML = '';
            translations[lang].sites_price_table.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.type}</td><td>${item.price}</td>`;
                priceTableBodySites.appendChild(row);
            });
        }

        const tosListSites = document.querySelector('#content-storage #sites-tos-list');
        if (tosListSites && translations[lang].sites_tos_list) {
            tosListSites.innerHTML = '';
            translations[lang].sites_tos_list.forEach(itemText => {
                const listItem = document.createElement('li');
                listItem.textContent = itemText;
                tosListSites.appendChild(listItem);
            });
        }

        const setupList = document.querySelector('#about #setup-list');
        if (setupList && translations[lang].about_setup_content) {
            setupList.innerHTML = '';
            translations[lang].about_setup_content.forEach(itemText => {
                const listItem = document.createElement('li');
                listItem.textContent = itemText;
                setupList.appendChild(listItem);
            });
        }

        const scheduleList = document.querySelector('#about #live-schedule-list');
        if (scheduleList && translations[lang].about_schedule_list) {
            scheduleList.innerHTML = '';
            translations[lang].about_schedule_list.forEach(itemText => {
                const listItem = document.createElement('li');
                listItem.textContent = itemText;
                scheduleList.appendChild(listItem);
            });
        }
    };

    const loadArtWorkQueue = async (displayArea) => {
    const getText = (key, fallback) => (translations[currentLang]?.[key]) || fallback;
    try {
        const response = await fetch('WorkArt.json');
        if (!response.ok) throw new Error('Arquivo WorkArt.json não encontrado');
        const data = await response.json();

        const mapping = {
            'art-queue-not-started': data.NotStartedArt || [],
            'art-queue-in-progress': data.WipArt || [],
            'art-queue-completed': data.FinishArt || []
        };

        for (const id in mapping) {
            const listElement = displayArea.querySelector(`#${id}`);
            if (listElement) {
                listElement.innerHTML = '';
                const items = mapping[id];
                if (items.length > 0) {
                    items.forEach(item => listElement.innerHTML += `<li>${item}</li>`);
                } else {
                    listElement.innerHTML = `<li>${getText('queue_empty', 'Nenhum trabalho aqui.')}</li>`;
                }
            }
        }
    } catch (error) {
        console.error("Erro ao carregar a fila de trabalho de arte:", error);
        displayArea.querySelector('#art-queue-not-started').innerHTML = `<li>${getText('queue_error', 'Erro ao carregar.')}</li>`;
    }
};

// Função para carregar a Fila de Trabalho de SITES
    const loadSitesWorkQueue = async (displayArea) => {
        const getText = (key, fallback) => (translations[currentLang]?.[key]) || fallback;
        try {
            const response = await fetch('WorkSite.json');
            if (!response.ok) throw new Error('Arquivo work_sites.json não encontrado');
            const data = await response.json();

            const mapping = {
                'sites-queue-not-started': data.NotStartedSite || [],
                'sites-queue-in-progress': data.WipSite || [],
                'sites-queue-completed': data.FinishSite || []
            };

            for (const id in mapping) {
                const listElement = displayArea.querySelector(`#${id}`);
                if (listElement) {
                    listElement.innerHTML = '';
                    const items = mapping[id];
                    if (items.length > 0) {
                        items.forEach(item => listElement.innerHTML += `<li>${item}</li>`);
                    } else {
                        listElement.innerHTML = `<li>${getText('queue_empty', 'Nenhum trabalho aqui.')}</li>`;
                    }
                }
            }
        } catch (error) {
            console.error("Erro ao carregar a fila de trabalho de sites:", error);
            displayArea.querySelector('#sites-queue-not-started').innerHTML = `<li>${getText('queue_error', 'Erro ao carregar.')}</li>`;
        }
    };

    const loadWorkQueue = async (displayArea, sourceFolder) => {
        const statuses = { 
            'queue-not-started': `${sourceFolder}/NotStarted.txt`, 
            'queue-in-progress': `${sourceFolder}/Wip.txt`, 
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

    const updateLightboxImage = () => {
        if (currentLightboxGallerySlides.length > 0) {
            lightboxImg.src = currentLightboxGallerySlides[currentLightboxIndex].src;
        }
    };
    
    const setupSlider = (galleryElement) => {
        const sliderContainer = galleryElement.querySelector('.slider-container');
        const slides = Array.from(galleryElement.querySelectorAll('.slide'));
        const thumbnailNav = galleryElement.querySelector('.thumbnail-navigation');
        const counter = galleryElement.querySelector('.slide-counter');
        if (slides.length === 0) return;

        sliderContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('slide') && event.target.classList.contains('active')) {
                const clickedSlide = event.target;
                currentLightboxGallerySlides = slides;
                currentLightboxIndex = slides.findIndex(s => s === clickedSlide);
                updateLightboxImage();
                lightbox.classList.add('active');
            }
        });

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
                // Use CLICK para as miniaturas para ser consistente
                thumb.addEventListener('click', () => showSlide(index));
                thumbnailNav.appendChild(thumb);
            });
        }
        
        // Listener unificado para o contêiner do slider
        if (sliderContainer) {
            sliderContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('slide') && event.target.classList.contains('active')) {
                    const clickedSlide = event.target;
                    currentLightboxGallerySlides = slides;
                    currentLightboxIndex = slides.findIndex(s => s === clickedSlide);
                    updateLightboxImage();
                    lightbox.classList.add('active');
                }
            });
        }
        
        galleryElement.querySelector('.prev')?.addEventListener('click', () => showSlide((currentIndex - 1 + slides.length) % slides.length));
        galleryElement.querySelector('.next')?.addEventListener('click', () => showSlide((currentIndex + 1) % slides.length));
        showSlide(0);
    };

    const buildGalleries = () => {
        for (const galleryId in galleriesData) {
            const galleryElement = contentStorage.querySelector(`#${galleryId}`);
            const sliderContainer = galleryElement?.querySelector('.slider-container');
            if (sliderContainer) {
                sliderContainer.innerHTML = '';
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

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.toggle('active', page.id === pageId);
        });
    }

    const moveContent = (contentId, displayArea) => {
    if (displayArea.firstChild) {
        contentStorage.appendChild(displayArea.firstChild);
    }
    const source = contentStorage.querySelector(`#${contentId}`);
    if (source) {
        displayArea.appendChild(source);
        
        // Lógica de chamada atualizada
        if (contentId === 'queue') {
            loadArtWorkQueue(displayArea);
        } else if (contentId === 'sites-queue') {
            loadSitesWorkQueue(displayArea);
        }
        
        const gallery = displayArea.querySelector('.gallery');
        if (gallery) {
            setupSlider(gallery);
        }
    }
};

    // --- 3. INICIALIZAÇÃO E EVENTOS ---
    try {
        const [translationsRes, galleriesRes] = await Promise.all([
            fetch('languages.json'),
            fetch('galleries.json')
        ]);
        translations = await translationsRes.json();
        galleriesData = await galleriesRes.json();
    } catch (error) { 
        console.error("ERRO: Falha ao carregar arquivos de configuração (JSON).", error); 
    }
    
    buildGalleries();
    currentLang = localStorage.getItem('language') || 'pt';
    applyTranslations();
    contentStorage.querySelectorAll('.gallery').forEach(setupSlider);


    langSelector.addEventListener('change', () => {
        currentLang = langSelector.value;
        localStorage.setItem('language', currentLang);
        applyTranslations();
        const activeHubButton = document.querySelector('.hub-content-button.active');
        if(activeHubButton) activeHubButton.click();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                toggleMenu(); // FECHA O MENU NO CELULAR
            }
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

    ageGateLeave.addEventListener('click', () => {
        ageGate.classList.remove('active');
    });

    ageGateEnter.addEventListener('click', () => {
        sessionStorage.setItem('nsfw-verified', 'true');
        ageGate.classList.remove('active');
        if (elementToOpenAfterAgeGate) {
            elementToOpenAfterAgeGate.click(); // Simula o clique original
        }
    });

    Object.values(hubs).forEach(hub => {
        hub.tabButtons.forEach(button => {
            button.addEventListener('mouseover', () => { // MUDADO PARA CLICK
                hub.tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                if (hub.contentTabs) {
                    const targetId = button.dataset.hubTarget;
                    hub.contentTabs.forEach(tab => tab.classList.toggle('active', tab.id === targetId));
                }
                
                if (hub.displayArea.firstChild) contentStorage.appendChild(hub.displayArea.firstChild);
                
                if (hub.contentButtons) {
                    hub.contentButtons.forEach(btn => btn.classList.remove('active'));
                } else { // Para o hub de sites que carrega direto
                    const contentId = button.dataset.hubTarget.replace('websites-hub-', 'sites-');
                    moveContent(contentId, hub.displayArea);
                }
            });
        });

        if (hub.contentButtons) {
            hub.contentButtons.forEach(button => {
                button.addEventListener('click', (e) => { // Adicionamos o 'e' de evento
                    const contentId = button.dataset.contentId;
                    const isNsfw = contentId === 'nsfw';
                    const isVerified = sessionStorage.getItem('nsfw-verified') === 'true';

                    // 1. Verifica se o conteúdo é NSFW e se o usuário AINDA NÃO foi verificado
                    if (isNsfw && !isVerified) {
                        e.preventDefault(); // Previne a ação padrão
                        elementToOpenAfterAgeGate = button; // Guarda o botão que foi clicado
                        ageGate.classList.add('active'); // Mostra a tela de aviso
                    } else {
                        // 2. Se não for NSFW, ou se o usuário já foi verificado, carrega o conteúdo normalmente
                        hub.contentButtons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                        moveContent(contentId, hub.displayArea);
                    }
                });
            });
        }
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

        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede o clique de fechar o lightbox
            currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxGallerySlides.length;
            updateLightboxImage();
        });

        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede o clique de fechar o lightbox
            currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxGallerySlides.length) % currentLightboxGallerySlides.length;
            updateLightboxImage();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') lightboxNext.click();
            if (e.key === 'ArrowLeft') lightboxPrev.click();
        });
    }

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            // Mudar para o modo escuro
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            // Mudar para o modo claro
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    const toggleMenu = () => {
        sidebar.classList.toggle('open');
        menuOverlay.classList.toggle('active');
    };

    hamburgerBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    const defaultPageLink = document.querySelector('.nav-link[data-page="about"]');
    if (defaultPageLink) {
        defaultPageLink.click();
        }
});