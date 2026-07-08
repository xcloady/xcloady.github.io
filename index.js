import { personalData, experienceData, technologies, projects, news, educationData, certificationsData, coursesData, publicationsData, languagesData } from './data.js';

// --- Typewriter Effect ---
function initTypewriter(containerId, text, delay = 300, speed = 60) {
    const container = document.getElementById(containerId);
    setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                container.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }, delay);
}

// --- Render Section Template Helper ---
function createSection(id, title, icon, contentClasses, contentHTML) {
    return `
    <section id="${id}" class="py-16 md:py-24 border-b border-[var(--color-terminal-green-dim)] scroll-animate">
      <div class="flex items-center mb-10">
        <i data-lucide="${icon}" class="text-[var(--color-terminal-green)] mr-3 w-7 h-7"></i>
        <h2 class="text-3xl md:text-4xl font-bold text-[var(--color-terminal-text)]">
          <span class="text-[var(--color-terminal-green)]">./</span>${title}
        </h2>
      </div>
      <div class="${contentClasses}">
        ${contentHTML}
      </div>
    </section>`;
}

// --- Modals Engine ---
function openModal(title, description, image, contentHTML) {
    const root = document.getElementById('modal-root');
    root.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm modal-overlay opacity-0">
        <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--color-terminal-bg)] border border-[var(--color-terminal-green)] p-6 shadow-[0_0_15px_rgba(0,255,65,0.3)] rounded-sm modal-content custom-scrollbar">
            <button id="close-modal" class="absolute top-4 right-4 text-[var(--color-terminal-text)] hover:text-[var(--color-terminal-green)] transition-colors">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            <h3 class="text-2xl font-bold text-[var(--color-terminal-green)] mb-4 pr-8">&gt; ${title}</h3>
            ${description ? `<p class="mb-4 text-[var(--color-terminal-text)] font-bold">${description}</p>` : ''}
            ${image ? `
            <div class="relative aspect-video w-full overflow-hidden border border-[var(--color-terminal-green-dim)] mb-6">
                <img src="${image}" alt="${title}" class="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity" />
                <div class="absolute inset-0 pointer-events-none border border-[var(--color-terminal-green)] opacity-20 mix-blend-overlay"></div>
            </div>` : ''}
            <div class="text-gray-300 leading-relaxed whitespace-pre-wrap">${contentHTML}</div>

            <div class="mt-8 flex justify-end">
                <button id="close-modal-btn" class="px-4 py-2 border border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] hover:bg-[var(--color-terminal-green)] hover:text-[var(--color-terminal-bg)] transition-colors uppercase text-sm font-bold tracking-wider">
                    Cerrar_
                </button>
            </div>
        </div>
    </div>`;
    
    lucide.createIcons();
    const overlay = root.querySelector('.modal-overlay');
    
    requestAnimationFrame(() => overlay.classList.add('open'));
    overlay.style.opacity = '1';

    const closeFn = () => {
        overlay.classList.remove('open');
        overlay.style.opacity = '0';
        setTimeout(() => { root.innerHTML = ''; }, 300);
    };

    document.getElementById('close-modal').addEventListener('click', closeFn);
    document.getElementById('close-modal-btn').addEventListener('click', closeFn);
}

// Global Click Handlers for Dynamic Elements
document.addEventListener('click', (e) => {
    // Courses Action Trigger
    const btnCursos = e.target.closest('#btn-cursos');
    if (btnCursos) {
        let coursesHTML = `
        <div class="space-y-4 mt-2">
          <div class="flex items-center justify-between bg-black/50 p-4 border border-[var(--color-terminal-green-dim)]">
            <h4 class="text-[var(--color-terminal-cyan)] font-bold">Listado de Formación Continua</h4>
            <div class="text-xs text-gray-500 font-mono">TOTAL: ${coursesData.length} REGISTROS</div>
          </div>
          <div class="max-h-[50vh] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
            ${coursesData.map(c => `<div class="p-3 border border-gray-800 hover:border-[var(--color-terminal-green-dim)] bg-[#0a0a0a] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span class="text-gray-300 text-sm font-medium">${c.title}</span>
                <span class="text-[var(--color-terminal-green)] text-xs font-mono whitespace-nowrap bg-black/40 px-2 py-1 border border-[var(--color-terminal-green)]/20">${c.date}</span>
              </div>`).join('')}
          </div>
          <div class="pt-4 border-t border-gray-800 mt-4 flex items-center">
            <input type="text" placeholder="Añadir nuevo curso (Sólo Admin)..." class="flex-grow bg-black/50 border border-gray-700 p-2 text-sm text-white font-mono focus:border-[var(--color-terminal-cyan)] outline-none" disabled />
            <button class="ml-2 px-4 py-2 border border-gray-600 text-gray-500 text-sm uppercase tracking-wider cursor-not-allowed">Insertar</button>
          </div>
        </div>`;
        openModal("Registro_Cursos.db", null, null, coursesHTML);
    }

    // Certifications Detail Modal Trigger
    const btnCert = e.target.closest('.btn-cert');
    if (btnCert) {
        const id = parseInt(btnCert.dataset.id);
        const cert = certificationsData.find(c => c.id === id);
        if (cert) {
            const content = `
                <p class="mb-4 text-gray-400">ID de la credencial: <span class="text-[var(--color-terminal-green)] font-mono">${cert.credentialId}</span></p>
                <div class="mt-6 flex flex-wrap gap-4">
                  <a href="${cert.file}" target="_blank" rel="noreferrer" class="px-4 py-2 bg-[var(--color-terminal-green)] text-black font-bold uppercase text-sm tracking-wider hover:bg-white transition-colors flex items-center">
                    <i data-lucide="award" class="mr-2 w-4 h-4"></i> Descargar Certificado
                  </a>
                </div>
            `;
            openModal(cert.title, `${cert.institution} - Exp: ${cert.date}`, cert.image, content);
        }
    }

    // News/RSS Stream Reader Trigger
    const btnNews = e.target.closest('.btn-news');
    if (btnNews) {
        const id = parseInt(btnNews.dataset.id);
        const n = news.find(item => item.id === id);
        if (n) {
            openModal(n.title, n.date, n.image, n.content);
        }
    }
});

// --- Application Layout & Core Renderer ---
function renderApp() {
    const root = document.getElementById('root');
    let html = '';

    // Fixed Dynamic Navigation Menu
    const sectionsList = ['experiencia', 'educacion', 'tecnologias', 'certificaciones', 'proyectos', 'publicaciones', 'noticias', 'contacto'];
    const navLinks = sectionsList
        .map((item, i) => `<a href="#${item}" class="hover:text-[var(--color-terminal-green)] transition-colors uppercase tracking-wider animate__animated animate__fadeInDown" style="animation-delay: ${0.2 + (i * 0.1)}s">/${item}</a>`)
        .join('');

    html += `
    <nav class="fixed top-0 w-full z-40 bg-[var(--color-terminal-bg)]/90 backdrop-blur-sm border-b border-[var(--color-terminal-green-dim)]">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="font-bold text-xl text-[var(--color-terminal-green)] tracking-tighter animate__animated animate__fadeInDown" style="animation-delay: 0.1s">
          <a href="#">xcloady<span class="animate-pulse">_</span></a>
        </div>
        <div class="hidden md:flex space-x-6 text-sm flex-wrap justify-end">
          ${navLinks}
        </div>
      </div>
    </nav>
    <main class="max-w-6xl mx-auto px-6 pt-24 pb-12">`;

    // System Hero Terminal Panel
    html += `
    <section class="py-20 md:py-32 min-h-[70vh] flex flex-col justify-center animate__animated animate__fadeIn">
      <p class="text-[var(--color-terminal-cyan)] mb-4 flex items-center text-lg">
        <i data-lucide="chevron-right" class="mr-2 w-5 h-5"></i> SISTEMA_INICIADO
      </p>
      <h1 class="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-[var(--color-terminal-text)] drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
        ${personalData.name.toUpperCase()}
      </h1>
      <div class="text-xl md:text-2xl text-[var(--color-terminal-green)] mb-8 h-20 md:h-12" id="hero-typewriter">
        <span class="cursor"></span>
      </div>
      <p class="max-w-2xl text-lg text-gray-400 mb-10 leading-relaxed">${personalData.bio}</p>
      
      <div class="flex flex-wrap gap-4">
        <a href="${personalData.linkedin}" target="_blank" class="flex items-center px-6 py-3 border border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] hover:bg-[var(--color-terminal-green)] hover:text-[var(--color-terminal-bg)] transition-all font-medium uppercase tracking-widest text-sm">
          <i class="fa-brands fa-linkedin text-[18px] mr-2"></i> LinkedIn
        </a>
        <a href="${personalData.github}" target="_blank" class="flex items-center px-6 py-3 border border-[var(--color-terminal-cyan)] text-[var(--color-terminal-cyan)] hover:bg-[var(--color-terminal-cyan)] hover:text-[var(--color-terminal-bg)] transition-all font-medium uppercase tracking-widest text-sm">
          <i class="fa-brands fa-github text-[18px] mr-2"></i> GitHub
        </a>
        <a href="${personalData.cv}" class="flex items-center px-6 py-3 border border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-[var(--color-terminal-bg)] transition-all font-medium uppercase tracking-widest text-sm">
          <i data-lucide="file-text" class="mr-2 w-[18px] h-[18px]"></i> Descargar CV
        </a>
      </div>
    </section>`;

    // Section 1: Experience Timeline
    const expHTML = experienceData.map(exp => `
        <div class="relative pl-6 border-l-2 border-[var(--color-terminal-green-dim)]">
          <div class="absolute w-3 h-3 bg-[var(--color-terminal-bg)] border-2 border-[var(--color-terminal-green)] -left-[7.5px] top-1 rounded-sm"></div>
          <h4 class="text-xl font-bold text-white">${exp.role}</h4>
          <p class="text-[var(--color-terminal-green)] mb-2 font-medium">${exp.company} | <span class="text-gray-400">${exp.period}</span></p>
          <p class="text-gray-400 text-sm leading-relaxed">${exp.description}</p>
        </div>`).join('');
    
    html += createSection('experiencia', 'experiencia_profesional.sh', 'briefcase', 'grid md:grid-cols-2 gap-8', `
        <div class="space-y-8">
            <h3 class="text-2xl text-[var(--color-terminal-cyan)] flex items-center mb-6">
                <i data-lucide="briefcase" class="mr-3 w-6 h-6"></i> Historial Laboral
            </h3>
            ${expHTML}
        </div>
        <div class="bg-[var(--color-terminal-green-dim)]/10 p-6 border border-[var(--color-terminal-green-dim)] h-fit">
            <h3 class="text-2xl text-[var(--color-terminal-green)] flex items-center mb-6">
                <i data-lucide="terminal" class="mr-3 w-6 h-6"></i> Consorcio Puntos Vuela
            </h3>
            <p class="mb-4 text-gray-300 leading-relaxed">Actualmente formo parte activa en proyectos clave dentro del Consorcio Puntos Vuela, destacando:</p>
            <ul class="space-y-4">
                <li class="flex items-start">
                    <i data-lucide="chevron-right" class="text-[var(--color-terminal-cyan)] mt-1 mr-2 flex-shrink-0 w-[18px] h-[18px]"></i>
                    <span><strong>Grupo de desarrollo:</strong> Portal Puntos Vuela</span>
                </li>
                <li class="flex items-start">
                    <i data-lucide="chevron-right" class="text-[var(--color-terminal-cyan)] mt-1 mr-2 flex-shrink-0 w-[18px] h-[18px]"></i>
                    <span><strong>Grupo de testeo:</strong> ChromeOS Flex</span>
                </li>
            </ul>
        </div>
    `);

    // Section 2: Education Records
    const eduHTML = educationData.map(edu => `
        <div class="p-6 border border-[var(--color-terminal-cyan-dim)] bg-black/40 hover:border-[var(--color-terminal-cyan)] transition-all">
          <i data-lucide="award" class="text-[var(--color-terminal-cyan)] mb-4 w-7 h-7"></i>
          <h4 class="text-xl font-bold text-white mb-2">${edu.title}</h4>
          <div class="text-[var(--color-terminal-green)] text-sm font-medium mb-1">${edu.institution}</div>
          <div class="text-gray-500 text-xs font-mono">${edu.period}</div>
        </div>`).join('');
    html += createSection('educacion', 'educacion.dat', 'award', 'grid md:grid-cols-2 gap-6', eduHTML);

    // Section 3: Tech Stack & Gists
    const techHTML = technologies.map(tech => `
        <a href="${tech.gist}" target="_blank" class="group block p-4 border border-[var(--color-terminal-green-dim)] hover:border-[var(--color-terminal-cyan)] bg-black/40 transition-all hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <i data-lucide="code" class="text-gray-500 group-hover:text-[var(--color-terminal-cyan)] mr-3 transition-colors w-5 h-5"></i>
              <span class="font-bold">${tech.name}</span>
            </div>
            <i data-lucide="github" class="text-gray-600 group-hover:text-[var(--color-terminal-text)] transition-colors w-4 h-4"></i>
          </div>
          <div class="mt-2 text-xs text-[var(--color-terminal-green)] opacity-0 group-hover:opacity-100 transition-opacity">
            VER_${tech.provider}_&gt;
          </div>
        </a>`).join('');
    html += createSection('tecnologias', 'stack_tecnologico.json', 'code', 'grid grid-cols-2 md:grid-cols-3 gap-4', techHTML);

    // Section 4: Projects Matrix
    const proHTML = projects.map(project => `
        <div class="group border border-[var(--color-terminal-green-dim)] bg-black/50 overflow-hidden flex flex-col hover:border-[var(--color-terminal-green)] transition-colors">
          <div class="relative h-48 overflow-hidden">
            <img src="${project.image}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 border-[var(--color-terminal-green)] mix-blend-overlay opacity-30 bg-gradient-to-t from-black to-transparent"></div>
          </div>
          <div class="p-6 flex-grow flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-bold mb-2 group-hover:text-[var(--color-terminal-green)] transition-colors">${project.title}</h3>
              <p class="text-gray-400 text-sm mb-4">${project.description}</p>
            </div>
            <a href="${project.link}" class="inline-flex items-center text-[var(--color-terminal-cyan)] text-sm font-bold uppercase tracking-wider hover:underline">
              Ver_Despliegue <i data-lucide="chevron-right" class="ml-1 w-4 h-4"></i>
            </a>
          </div>
        </div>`).join('');
    html += createSection('proyectos', 'proyectos_destacados.exe', 'terminal', 'grid md:grid-cols-2 gap-8', proHTML);

    // Section 5: Certifications Database
    const certsHTML = `
        <div class="mb-8">
          <h3 class="text-2xl text-[var(--color-terminal-cyan)] flex items-center mb-6">
            <i data-lucide="award" class="mr-3 w-6 h-6"></i> Licencias y Certificaciones
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            ${certificationsData.map(cert => `
              <button class="btn-cert flex items-center p-4 border border-[var(--color-terminal-green-dim)] hover:border-[var(--color-terminal-green)] bg-black/40 transition-all text-left group w-full" data-id="${cert.id}">
                <div class="w-16 h-16 mr-4 border border-gray-700 overflow-hidden flex-shrink-0">
                  <img src="${cert.image}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                </div>
                <div>
                  <div class="font-bold text-white group-hover:text-[var(--color-terminal-green)] transition-colors line-clamp-1">${cert.title}</div>
                  <div class="text-sm text-[var(--color-terminal-cyan)]">${cert.institution}</div>
                  <div class="text-xs text-gray-500 mt-1 font-mono">Exp: ${cert.date} // ID: ${cert.credentialId}</div>
                </div>
              </button>
            `).join('')}
          </div>
        </div>
        <div>
          <h3 class="text-2xl text-[var(--color-terminal-cyan)] flex items-center mb-6">
            <i data-lucide="code" class="mr-3 w-6 h-6"></i> Cursos de Formación
          </h3>
          <div class="bg-black/30 border border-gray-800 p-6 flex flex-col sm:flex-row items-center justify-between">
            <div>
              <p class="text-gray-300 font-medium mb-1">Registro completo de formación continua</p>
              <p class="text-sm text-gray-500">${coursesData.length} cursos registrados en la base de datos.</p>
            </div>
            <button id="btn-cursos" class="mt-4 sm:mt-0 px-6 py-3 border border-[var(--color-terminal-cyan)] text-[var(--color-terminal-cyan)] hover:bg-[var(--color-terminal-cyan)] hover:text-black font-bold uppercase tracking-widest transition-colors flex items-center">
              <i data-lucide="file-text" class="mr-2 w-[18px] h-[18px]"></i> Consultar_Cursos
            </button>
          </div>
        </div>
    `;
    html += createSection('certificaciones', 'certificaciones.dat', 'award', '', certsHTML);

    // Section 6: Publications & Languages
    const pubLangHTML = `
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-2xl text-[var(--color-terminal-cyan)] flex items-center mb-6">
              <i data-lucide="file-text" class="mr-3 w-6 h-6"></i> Publicaciones
            </h3>
            <div class="space-y-6">
              ${publicationsData.map(pub => `
                <div class="p-6 border border-gray-800 bg-[#0a0a0a] hover:border-[var(--color-terminal-green-dim)] transition-colors">
                  <div class="text-[var(--color-terminal-green)] text-xs font-mono mb-2">${pub.date} // ${pub.institution}</div>
                  <h4 class="text-lg font-bold text-white mb-3">${pub.title}</h4>
                  <p class="text-gray-400 text-sm leading-relaxed mb-4">${pub.description}</p>
                  <a href="${pub.link}" class="inline-flex items-center text-[var(--color-terminal-cyan)] text-xs font-bold uppercase tracking-wider hover:underline">
                    Ver_Publicación <i data-lucide="chevron-right" class="ml-1 w-[14px] h-[14px]"></i>
                  </a>
                </div>
              `).join('')}
            </div>
          </div>
          <div>
            <h3 class="text-2xl text-[var(--color-terminal-cyan)] flex items-center mb-6">
              <i data-lucide="code" class="mr-3 w-6 h-6"></i> Idiomas
            </h3>
            <div class="space-y-4">
              ${languagesData.map(lang => `
                <div class="flex items-center justify-between p-4 border border-[var(--color-terminal-green-dim)] bg-black/40">
                  <div>
                    <div class="font-bold text-white text-lg">${lang.language}</div>
                    <div class="text-[var(--color-terminal-green)] text-sm">${lang.level}</div>
                  </div>
                  <a href="${lang.file}" target="_blank" class="p-2 text-gray-400 hover:text-[var(--color-terminal-cyan)] transition-colors">
                    <i data-lucide="file-text" class="w-6 h-6"></i>
                  </a>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
    `;
    html += createSection('publicaciones', 'publicaciones_e_idiomas.log', 'file-text', '', pubLangHTML);

    // Section 7: RSS Stream / News
    const newsHTML = news.map(n => `
        <div class="btn-news group border border-gray-800 bg-black/40 flex flex-col hover:border-[var(--color-terminal-cyan-dim)] transition-colors cursor-pointer" data-id="${n.id}">
          <div class="h-40 overflow-hidden relative">
            <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10"></div>
            <img src="${n.image}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
            <div class="absolute bottom-2 left-2 z-20 bg-black/80 px-2 py-1 text-xs text-[var(--color-terminal-cyan)] border border-[var(--color-terminal-cyan-dim)]">${n.date}</div>
          </div>
          <div class="p-5 flex-grow flex flex-col justify-between">
            <div>
              <h4 class="font-bold text-white mb-3 leading-tight group-hover:text-[var(--color-terminal-cyan)] transition-colors">${n.title}</h4>
              <p class="text-sm text-gray-400 line-clamp-3">${n.excerpt}</p>
            </div>
            <div class="mt-4 flex items-center text-[var(--color-terminal-cyan)] text-xs font-bold tracking-widest uppercase">
              Leer_Entrada <i data-lucide="chevron-right" class="ml-1 w-[14px] h-[14px]"></i>
            </div>
          </div>
        </div>`).join('');
    html += createSection('noticias', 'noticias_feed.rss', 'terminal', 'grid md:grid-cols-3 gap-6', newsHTML);

    // Section 8: Terminal Transmission / Contact Form
    const contactHTML = `
        <div class="max-w-2xl">
          <p class="mb-8 text-gray-400">¿Interesado en colaborar? Inicia una conexión segura enviando tus datos a través del siguiente canal.</p>
          <form id="contact-form" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold text-[var(--color-terminal-green)] mb-2 uppercase tracking-widest">ID_Usuario (Nombre)</label>
                <input required type="text" class="w-full bg-black/50 border border-gray-700 focus:border-[var(--color-terminal-green)] p-3 text-white outline-none transition-colors font-mono" placeholder="Tu nombre" />
              </div>
              <div>
                <label class="block text-xs font-bold text-[var(--color-terminal-green)] mb-2 uppercase tracking-widest">Dirección_Host (Email)</label>
                <input required type="email" class="w-full bg-black/50 border border-gray-700 focus:border-[var(--color-terminal-green)] p-3 text-white outline-none transition-colors font-mono" placeholder="tu@email.com" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-[var(--color-terminal-green)] mb-2 uppercase tracking-widest">Carga_Útil (Mensaje)</label>
              <textarea required rows="5" class="w-full bg-black/50 border border-gray-700 focus:border-[var(--color-terminal-green)] p-3 text-white outline-none transition-colors font-mono resize-none" placeholder="Escribe tu mensaje aquí..."></textarea>
            </div>
            <button type="submit" class="flex items-center px-8 py-3 border-2 border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] hover:bg-[var(--color-terminal-green)] hover:text-black font-bold uppercase tracking-widest transition-colors w-full md:w-auto justify-center">
              <i data-lucide="send" class="mr-3 w-[18px] h-[18px]"></i> Transmitir_Datos
            </button>
            <div id="contact-status" class="mt-4 p-3 border border-[var(--color-terminal-cyan)] text-[var(--color-terminal-cyan)] bg-[var(--color-terminal-cyan-dim)]/20 animate-pulse hidden"></div>
          </form>
        </div>`;
    html += createSection('contacto', 'ping_contacto.sh', 'terminal', '', contactHTML);

    html += `</main>
    <footer class="border-t border-[var(--color-terminal-green-dim)] bg-black py-8 text-center text-gray-500 text-sm">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; ${new Date().getFullYear()} xcloady. Todos los derechos reservados.</p>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <a href="${personalData.linkedin}" target="_blank" class="hover:text-[var(--color-terminal-green)] transition-colors"><i class="fa-brands fa-linkedin text-[18px] mr-2"></i></a>
          <a href="${personalData.github}" target="_blank" class="hover:text-[var(--color-terminal-cyan)] transition-colors"><i class="fa-brands fa-github text-[18px] mr-2"></i></a>
          <a href="mailto:${personalData.email}" class="hover:text-[var(--color-terminal-text)] transition-colors"><i data-lucide="mail" class="w-5 h-5"></i></a>
        </div>
      </div>
    </footer>`;

    root.innerHTML = html;

    // Trigger Typing Header Sequence
    initTypewriter('hero-typewriter', `> ${personalData.role}`);

    // Transmission Engine Mock
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('contact-status');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Mostrar el efecto visual de "enviando"
        statusDiv.classList.remove('hidden');
        statusDiv.innerHTML = '&gt; PREPARANDO_ENVIO...';

        // 2. Extraer datos
        const formData = new FormData(form);
        const nombre = formData.get('nombre') || 'Usuario'; // Asegúrate de que tus inputs tengan name="nombre"
        const email = formData.get('email');
        const mensaje = formData.get('mensaje');

        // 3. Preparar los datos para el mailto
        const subject = encodeURIComponent(`Contacto desde Portfolio: ${nombre}`);
        const body = encodeURIComponent(`De: ${nombre} (${email})\n\n${mensaje}`);

        // 4. Usar un setTimeout para que el usuario vea el feedback antes de que salte el mail
        setTimeout(() => {
            statusDiv.innerHTML = '&gt; ABRIENDO_CLIENTE_CORREO...';
            
            // Abrir el mailto
            window.location.href = `mailto:${personalData.email}?subject=${subject}&body=${body}`;

            // Limpiar formulario y ocultar status tras un tiempo
            setTimeout(() => {
                form.reset();
                statusDiv.classList.add('hidden');
            }, 2000);
        }, 1200);
    });

    // Native Intersection Observer for Entrance Transitions
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    // Compile Dynamic Icons
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', renderApp);
