/**
 * DOCUMENTATION SCRIPTS
 * Scripts específicos para o site de documentação do Fóton Framework.
 * Responsável por carregar o menu (includes), tema e interações da doc.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Carrega os componentes HTML externos (Sidebar)
    loadIncludes();

    // 2. Inicializa o tema (Dark Mode)
    initThemeToggle();
});

// --- CARREGADOR DE INCLUDES (Sidebar) ---
async function loadIncludes() {
    const sidebarContainer = document.getElementById('docsSidebar');

    if (sidebarContainer) {
        try {
            // Ajuste o caminho conforme sua estrutura de pastas. 
            // Se o HTML estiver na raiz 'docs/', o caminho é 'includes/sidebar.html'
            const response = await fetch('docs/includes/sidebar.html');

            if (response.ok) {
                const html = await response.text();
                sidebarContainer.innerHTML = html;

                // IMPORTANTE: Inicializa o menu mobile APÓS carregar o HTML
                initMobileMenu();

                // Marca o link da página atual como ativo
                highlightCurrentPage();

                // Re-inicializa o listener do toggle (pois o elemento foi recriado)
                initThemeToggle();
            } else {
                console.error('Erro ao carregar sidebar:', response.status);
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
        }
    }
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    // ATUALIZADO: Agora busca por .docs-link em vez de .sidebar-menu a
    const menuLinks = document.querySelectorAll('.docs-link');

    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

// --- MENUS E INTERAÇÃO ---
function initMobileMenu() {
    const sidebar = document.getElementById('docsSidebar');
    const overlay = document.getElementById('mobileOverlay');
    const toggleBtn = document.getElementById('mobileToggle');

    // Verifica se os elementos existem (agora que o sidebar foi injetado)
    if (toggleBtn && sidebar) {
        toggleBtn.setAttribute('aria-controls', 'docsSidebar');
        toggleBtn.setAttribute('aria-expanded', 'false');

        // Remove event listeners antigos para evitar duplicação (caso chame a função 2x)
        const newBtn = toggleBtn.cloneNode(true);
        toggleBtn.parentNode.replaceChild(newBtn, toggleBtn);

        newBtn.addEventListener('click', () => {
            const isOpen = sidebar.classList.toggle('open');
            if (overlay) overlay.classList.toggle('open');

            newBtn.setAttribute('aria-expanded', isOpen);

            // Troca ícone
            const icon = newBtn.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Fechar ao clicar no overlay
        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('open');
                newBtn.setAttribute('aria-expanded', 'false');
                const icon = newBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        }
    }
}

// --- DARK MODE (Data Attribute) ---
function initThemeToggle() {
    // ATENÇÃO: Como o switch é carregado via AJAX, precisamos tentar pegá-lo novamente
    const toggleInput = document.getElementById('darkModeSwitch');
    const html = document.documentElement;
    const themeKey = 'foton-theme';

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            if (toggleInput) toggleInput.checked = true;
        } else {
            html.setAttribute('data-theme', 'light');
            if (toggleInput) toggleInput.checked = false;
        }
        localStorage.setItem(themeKey, theme);
    }

    const savedTheme = localStorage.getItem(themeKey);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const htmlHasTheme = html.hasAttribute('data-theme');

    // Inicializa o estado visual (Check do switch)
    if (toggleInput) {
        if (htmlHasTheme) {
            toggleInput.checked = (html.getAttribute('data-theme') === 'dark');
        } else if (savedTheme) {
            toggleInput.checked = (savedTheme === 'dark');
        } else if (systemPrefersDark) {
            toggleInput.checked = true;
        }

        // Remove listener antigo para evitar duplicação
        const newInput = toggleInput.cloneNode(true);
        toggleInput.parentNode.replaceChild(newInput, toggleInput);

        newInput.addEventListener('change', () => {
            applyTheme(newInput.checked ? 'dark' : 'light');
        });
    } else {
        // Se o input ainda não existe (antes do loadIncludes), aplica apenas no HTML
        if (savedTheme) applyTheme(savedTheme);
        else if (systemPrefersDark) applyTheme('dark');
    }
}

// --- UTILITÁRIOS (Copy & Download) ---
function copyColor(color) {
    navigator.clipboard.writeText(color).then(() => {
        if (typeof showToast === 'function') showToast(`Copiado: ${color}`);
        else alert(`Copiado: ${color}`);
    });
}

function downloadCSS() {
    const link = document.createElement('a');
    // Ajuste o caminho se necessário (ex: '../dist/css/foton_framework.css')
    link.href = 'foton_framework.css';
    link.download = 'foton_framework.css';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (typeof showToast === 'function') showToast('Download iniciado!');
}