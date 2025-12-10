/**
 * FÓTON FRAMEWORK SCRIPTS
 * Funcionalidades interativas para componentes UI.
 * Atualizado com melhorias de Acessibilidade e UX.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAlerts();
    initPopovers();
    initAccordions();
    initThemeToggle();
});

// --- Dark Mode Toggle ---
function initThemeToggle() {
    const toggleInput = document.getElementById('darkModeSwitch');

    // 1. Verificar preferência salva
    const savedTheme = localStorage.getItem('foton-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
        if (toggleInput) toggleInput.checked = true;
    }

    // 2. Ouvir mudanças
    if (toggleInput) {
        toggleInput.addEventListener('change', () => {
            if (toggleInput.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('foton-theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('foton-theme', 'light');
            }
        });
    }
}

// --- 1. Menu Mobile (Acessibilidade Melhorada) ---
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

// --- 2. Alertas (Fechar) ---
function initAlerts() {
    document.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('.alert-close');
        if (closeBtn) {
            const alert = closeBtn.closest('.alert');
            if (alert) {
                alert.style.transition = 'opacity 0.3s, transform 0.3s';
                alert.style.opacity = '0';
                alert.style.transform = 'translateY(-10px)';

                setTimeout(() => {
                    alert.remove();
                }, 300);
            }
        }
    });
}

// --- 3. Popovers & Dropdowns (Acessibilidade Melhorada) ---
function initPopovers() {
    // Inicializa atributos ARIA em todos os gatilhos existentes
    const triggers = document.querySelectorAll('[data-toggle="popover"]');
    triggers.forEach(trigger => {
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-toggle="popover"]');

        if (trigger) {
            const container = trigger.closest('.popover-container') || trigger.closest('.dropdown');
            const content = container.querySelector('.popover-content') || container.querySelector('.dropdown-menu');

            // Verifica se este elemento específico já está aberto
            const isAlreadyOpen = content && content.classList.contains('show');

            // Fecha todos os outros primeiro
            closeAllPopovers(content);

            if (content) {
                // Alterna classe visual
                content.classList.toggle('show');

                // Atualiza ARIA
                const newState = content.classList.contains('show');
                trigger.setAttribute('aria-expanded', newState);
            }
            e.stopPropagation();
        } else if (!e.target.closest('.popover-content') && !e.target.closest('.dropdown-menu')) {
            closeAllPopovers();
        }
    });
}

function closeAllPopovers(exceptContent = null) {
    // Fecha visualmente
    document.querySelectorAll('.popover-content.show, .dropdown-menu.show').forEach(el => {
        if (el !== exceptContent) {
            el.classList.remove('show');
        }
    });

    // Reseta ARIA states de todos os gatilhos (exceto o que acabou de ser clicado, se houver)
    document.querySelectorAll('[data-toggle="popover"]').forEach(btn => {
        // Encontra o conteúdo associado a este botão para saber se ele é o "exceptContent"
        const container = btn.closest('.popover-container') || btn.closest('.dropdown');
        const content = container ? (container.querySelector('.popover-content') || container.querySelector('.dropdown-menu')) : null;

        if (content !== exceptContent) {
            btn.setAttribute('aria-expanded', 'false');
        }
    });
}

// --- 4. Accordions (Animação Suave) ---
function initAccordions() {
    const accordions = document.querySelectorAll('details.accordion');

    accordions.forEach(acc => {
        const summary = acc.querySelector('summary');
        const content = acc.querySelector('.accordion-body');

        if (acc.hasAttribute('open')) {
            acc.style.height = 'auto';
        }

        summary.addEventListener('click', (e) => {
            e.preventDefault();

            if (acc.hasAttribute('open')) {
                acc.style.height = `${acc.offsetHeight}px`;
                requestAnimationFrame(() => {
                    acc.style.height = `${summary.offsetHeight}px`;
                });

                const onTransitionEnd = () => {
                    acc.removeAttribute('open');
                    acc.style.height = null;
                    acc.removeEventListener('transitionend', onTransitionEnd);
                };
                acc.addEventListener('transitionend', onTransitionEnd);

            } else {
                acc.style.height = `${summary.offsetHeight}px`;
                acc.setAttribute('open', '');
                const fullHeight = summary.offsetHeight + content.offsetHeight;

                requestAnimationFrame(() => {
                    acc.style.height = `${fullHeight}px`;
                });

                const onTransitionEnd = () => {
                    acc.style.height = 'auto';
                    acc.removeEventListener('transitionend', onTransitionEnd);
                };
                acc.addEventListener('transitionend', onTransitionEnd);
            }
        });
    });
}

// --- 5. Utilitários (Copy & Toast Stack) ---
function copyColor(color) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(color).then(() => {
            showToast(`Cor copiada: ${color}`);
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
        if (successful) showToast(`Cor copiada: ${text}`);
    } catch (err) {
        console.error('Fallback: Erro ao copiar', err);
    }

    document.body.removeChild(textArea);
}

/**
 * Sistema de Toasts Empilháveis
 * Cria um container fixo e gerencia múltiplos toasts simultâneos.
 */
function showToast(message) {
    // 1. Garante que o container existe
    let container = document.querySelector('.foton-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'foton-toast-container';
        // Estilos do container (fixo, centralizado embaixo)
        Object.assign(container.style, {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '3000',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
            pointerEvents: 'none' // Permite clicar através do container vazio
        });
        document.body.appendChild(container);
    }

    // 2. Cria o novo toast
    const toast = document.createElement('div');
    toast.className = 'badge badge-dark foton-toast';
    toast.innerText = message;

    // Estilos do Toast Individual
    Object.assign(toast.style, {
        padding: '10px 20px',
        background: '#1d1e25',
        color: '#fff',
        borderRadius: '50px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        opacity: '0',
        transform: 'translateY(20px) scale(0.9)',
        transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        fontWeight: '500',
        fontSize: '14px',
        pointerEvents: 'auto', // Reabilita cliques no toast se necessário
        minWidth: 'max-content'
    });

    // 3. Adiciona ao container
    container.appendChild(toast);

    // 4. Animação de Entrada
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0) scale(1)';
    });

    // 5. Remoção Automática
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px) scale(0.9)'; // Sobe um pouco ao sumir

        // Remove do DOM após a transição CSS terminar
        setTimeout(() => {
            if (toast.isConnected) toast.remove();

            // Se container estiver vazio, remove ele também (opcional, para limpeza)
            if (container.childNodes.length === 0) {
                container.remove();
            }
        }, 300);
    }, 3000);
}

// --- 6. Download Direto (Sem Fetch) ---
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
        showToast('Download iniciado!');
    } catch (err) {
        console.error('Erro no download:', err);
        showToast('Erro ao iniciar download.');
    }
}