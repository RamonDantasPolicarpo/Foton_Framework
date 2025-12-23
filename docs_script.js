/**
 * DOCUMENTATION SCRIPTS
 * Scripts específicos para o site de documentação do Fóton Framework.
 * Contém: Menu Mobile (Sidebar), Dark Mode Toggle, Copy Color e Download.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initThemeToggle();
});

// --- 1. Menu Mobile (Sidebar da Doc) ---
function initMobileMenu() {
    const sidebar = document.getElementById('docsSidebar');
    const overlay = document.getElementById('mobileOverlay');
    const toggleBtn = document.getElementById('mobileToggle');

    if (toggleBtn && sidebar) {
        // Inicialização ARIA
        toggleBtn.setAttribute('aria-controls', 'docsSidebar');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Abrir menu de navegação');

        toggleBtn.addEventListener('click', () => {
            toggleSidebar(sidebar, overlay, toggleBtn);
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            closeMobileMenu(sidebar, overlay, toggleBtn);
        });
    }
}

function toggleSidebar(sidebar, overlay, btn) {
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('open');

    // Atualiza estado ARIA
    btn.setAttribute('aria-expanded', isOpen);
    btn.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');

    const icon = btn.querySelector('i');
    if (isOpen) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function closeMobileMenu(sidebar, overlay, btn) {
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');

        // Reset ARIA
        if (btn) {
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Abrir menu de navegação');
            btn.querySelector('i').classList.remove('fa-times');
            btn.querySelector('i').classList.add('fa-bars');
        }
    }
}

// --- 2. Dark Mode Toggle (Data Attribute Only) ---
function initThemeToggle() {
    const toggleInput = document.getElementById('darkModeSwitch');
    const html = document.documentElement; // Seleciona a tag <html>
    const themeKey = 'foton-theme';

    // Função centralizada para aplicar o tema via data-attribute
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

    // 1. Verificação de Preferência (Ordem: HTML Tag > LocalStorage > Sistema)
    const savedTheme = localStorage.getItem(themeKey);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const htmlHasTheme = html.hasAttribute('data-theme');

    // Inicialização
    if (htmlHasTheme) {
        // Se o dev colocou <html data-theme="dark"> manualmente, atualiza o toggle visual se necessário
        const currentAttr = html.getAttribute('data-theme');
        if (toggleInput) toggleInput.checked = (currentAttr === 'dark');
    } else if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersDark) {
        applyTheme('dark');
    }

    // 2. Ouvir mudanças no Switch
    if (toggleInput) {
        toggleInput.addEventListener('change', () => {
            applyTheme(toggleInput.checked ? 'dark' : 'light');
        });
    }
}

// --- 3. Utilitários de Documentação (Copy & Download) ---

function copyColor(color) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(color).then(() => {
            // Usa a função showToast do framework se estiver disponível
            if (typeof showToast === 'function') {
                showToast(`Cor copiada: ${color}`);
            } else {
                alert(`Cor copiada: ${color}`);
            }
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
            fallbackCopyTextToClipboard(color);
        });
    } else {
        fallbackCopyTextToClipboard(color);
    }
}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        if (successful) {
            if (typeof showToast === 'function') {
                showToast(`Cor copiada: ${text}`);
            }
        }
    } catch (err) {
        console.error('Fallback: Erro ao copiar', err);
    }

    document.body.removeChild(textArea);
}

function downloadCSS() {
    try {
        const link = document.createElement('a');
        link.href = 'foton_framework.css'; // Caminho relativo direto
        link.download = 'foton_framework.css'; // Nome sugerido para salvar

        // Adiciona ao DOM temporariamente para funcionar no Firefox
        document.body.appendChild(link);

        link.click();

        // Limpeza
        document.body.removeChild(link);

        if (typeof showToast === 'function') {
            showToast('Download iniciado!');
        }
    } catch (err) {
        console.error('Erro no download:', err);
        if (typeof showToast === 'function') {
            showToast('Erro ao iniciar download.');
        }
    }
}