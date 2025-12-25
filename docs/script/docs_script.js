/**
 * DOCUMENTATION SCRIPTS
 * Scripts específicos para o site de documentação.
 */

document.addEventListener('DOMContentLoaded', () => {
    loadIncludes();
});

// --- 1. Carregador de Sidebar e footer (AJAX) ---
async function loadIncludes() {
    const sidebarContainer = document.getElementById('docsSidebar');
    if (sidebarContainer) {
        try {
            const response = await fetch('/docs/includes/sidebar.html');

            if (response.ok) {
                const html = await response.text();
                sidebarContainer.innerHTML = html;

                initMobileMenu();
                highlightCurrentPage();
                initThemeToggle();
            }
        } catch (error) {
            console.error('Erro ao carregar sidebar:', error);
        }
    }

    const footerContainer = document.getElementById('docsFooter');
    if (footerContainer) {
        try {
            const response = await fetch('/docs/includes/footer.html');

            if (response.ok) {
                const html = await response.text();
                footerContainer.innerHTML = html;
            }
        } catch (error) {
            console.error('Erro ao carregar footer:', error);
        }
    }
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.docs-link');
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// --- 2. Menu Mobile ---
function initMobileMenu() {
    const sidebar = document.getElementById('docsSidebar');
    const overlay = document.getElementById('mobileOverlay');
    const toggleBtn = document.getElementById('mobileToggle');

    if (toggleBtn && sidebar) {
        const newBtn = toggleBtn.cloneNode(true);
        toggleBtn.parentNode.replaceChild(newBtn, toggleBtn);

        newBtn.addEventListener('click', () => {
            const isOpen = sidebar.classList.toggle('open');
            if (overlay) overlay.classList.toggle('open');
            const icon = newBtn.querySelector('i');
            if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        });

        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('open');
            });
        }
    }
}

// --- 3. Dark Mode Toggle ---
function initThemeToggle() {
    const toggleInput = document.getElementById('darkModeSwitch');
    const html = document.documentElement;

    if (!toggleInput) return;

    const newInput = toggleInput.cloneNode(true);
    toggleInput.parentNode.replaceChild(newInput, toggleInput);

    if (html.getAttribute('data-theme') === 'dark') {
        newInput.checked = true;
    } else {
        newInput.checked = false;
    }

    newInput.addEventListener('change', () => {
        const theme = newInput.checked ? 'dark' : 'light';
        html.setAttribute('data-theme', theme);
        localStorage.setItem('foton-theme', theme);
    });
}

// --- 4. Utilitários (Atualizado para usar Foton.showToast) ---
function copyColor(color) {
    navigator.clipboard.writeText(color).then(() => {
        // Verifica se o namespace e a função existem
        if (typeof Foton !== 'undefined' && typeof Foton.showToast === 'function') {
            Foton.showToast(`Copiado: ${color}`);
        } else if (typeof showToast === 'function') {
            // Fallback para versão antiga caso o cache não tenha atualizado
            showToast(`Copiado: ${color}`);
        }
    });
}

function downloadCSS() {
    const link = document.createElement('a');
    link.href = '/dist/foton_framework.css';
    link.download = 'foton_framework.css';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Verifica se o namespace e a função existem
    if (typeof Foton !== 'undefined' && typeof Foton.showToast === 'function') {
        Foton.showToast('Download iniciado!');
    } else if (typeof showToast === 'function') {
        showToast('Download iniciado!');
    }
}