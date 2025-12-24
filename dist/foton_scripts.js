/**
 * FÓTON FRAMEWORK SCRIPTS (CORE) v1.7
 * Funcionalidades essenciais para os componentes UI do framework.
 * Inclui correção de glitch visual em Popovers e transição suave (dissolver).
 */

document.addEventListener('DOMContentLoaded', () => {
    initAlerts();
    initPopovers();
    initAccordions();
    initKeyboardFocus();
    initNavbar();
    initModals();
});

/* ... existing initKeyboardFocus ... */
// --- Utilitário: Detecção de Foco por Teclado ---
function initKeyboardFocus() {
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' || e.key.startsWith('Arrow')) {
            document.body.classList.add('user-is-tabbing');
        }
    });

    document.body.addEventListener('mousedown', () => {
        document.body.classList.remove('user-is-tabbing');
    });
}

// --- 1. Alertas (Fechar) ---
function initAlerts() {
    document.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('.ft-alert-close');
        if (closeBtn) {
            const alert = closeBtn.closest('.ft-alert');
            if (alert) {
                // Alterado para apenas transição de opacidade (dissolver)
                alert.style.transition = 'opacity 0.3s ease';
                alert.style.opacity = '0';
                // Removido transform para evitar deslize
                // alert.style.transform = 'translateY(-10px)'; 

                setTimeout(() => {
                    alert.remove();
                }, 300);
            }
        }
    });
}

// --- 2. Popovers & Dropdowns ---
/* ... existing initPopovers ... */
function initPopovers() {
    const triggers = document.querySelectorAll('[data-toggle="popover"], .ft-dropdown > a, .ft-dropdown > button');
    triggers.forEach(trigger => {
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-toggle="popover"]') || e.target.closest('.ft-dropdown > a') || e.target.closest('.ft-dropdown > button');

        if (trigger) {
            if (trigger.tagName === 'A') e.preventDefault();
            toggleDropdown(trigger);
            e.stopPropagation();
        } else if (!e.target.closest('.ft-popover-content') && !e.target.closest('.ft-dropdown-menu') && !e.target.closest('.ft-navbar-toggle')) {
            closeAllPopovers();
        }
    });

    // Handler de Teclado
    document.addEventListener('keydown', (e) => {
        const activeEl = document.activeElement;

        if (e.key === 'Escape') {
            closeAllPopovers();

            // Fecha Modais
            const openModal = document.querySelector('.ft-modal.show');
            if (openModal) toggleModal(openModal.id, false);

            // Fecha Navbar Mobile
            const navMenu = document.querySelector('.ft-navbar-menu.active');
            if (navMenu) {
                const navToggle = document.querySelector('.ft-navbar-toggle');
                navMenu.classList.remove('active');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            }
            return;
        }

        // Dropdowns & Popovers
        const isTrigger = activeEl.matches('[data-toggle="popover"]') || (activeEl.parentElement && activeEl.parentElement.classList.contains('ft-dropdown'));

        if (isTrigger && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            toggleDropdown(activeEl, true);
            return;
        }

        // Navegação Interna Dropdown
        const activeDropdown = document.querySelector('.ft-dropdown-menu.show, .ft-popover-content.show');
        if (activeDropdown && activeDropdown.contains(activeEl)) {
            const focusableItems = Array.from(activeDropdown.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])'));
            const index = focusableItems.indexOf(activeEl);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (index + 1) % focusableItems.length;
                focusableItems[nextIndex]?.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (index - 1 + focusableItems.length) % focusableItems.length;
                focusableItems[prevIndex]?.focus();
            }
        }
    });

    window.addEventListener('resize', () => {
        const openPopover = document.querySelector('.ft-popover-content.show');
        if (openPopover) {
            const container = openPopover.closest('.ft-popover-container');
            const trigger = container ? container.querySelector('[data-toggle="popover"]') : null;
            if (trigger) updatePopoverPosition(trigger, openPopover);
        }
    });
}

/* ... existing toggleDropdown ... */
function toggleDropdown(trigger, forceOpen = false) {
    const container = trigger.closest('.ft-popover-container') || trigger.closest('.ft-dropdown');
    const content = container.querySelector('.ft-popover-content') || container.querySelector('.ft-dropdown-menu');

    if (!content) return;

    const isAlreadyOpen = content.classList.contains('show');

    if (!forceOpen && isAlreadyOpen) {
        closeAllPopovers();
        return;
    }

    closeAllPopovers(content);

    // Remove classes antigas
    content.classList.remove('pos-top', 'pos-bottom', 'pos-left', 'pos-right', 'visible');

    // Adiciona .show para display:block, mas ainda opacity:0
    content.classList.add('show');
    trigger.setAttribute('aria-expanded', 'true');

    if (content.classList.contains('ft-popover-content')) {
        // Calcula posição enquanto está invisível
        updatePopoverPosition(trigger, content);

        // Força reflow/repaint antes de adicionar 'visible' para garantir transição suave
        requestAnimationFrame(() => {
            content.classList.add('visible');
        });
    } else {
        // Dropdown normal
        requestAnimationFrame(() => {
            content.classList.add('visible'); // Caso dropdowns também usem a classe visible
        });
    }

    if (forceOpen) {
        const firstFocusable = content.querySelector('a, button, input');
        if (firstFocusable) setTimeout(() => firstFocusable.focus(), 50);
    }
}

/* ... existing updatePopoverPosition ... */
function updatePopoverPosition(trigger, content) {
    const preferredPos = trigger.getAttribute('data-pos') || 'right';

    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    let finalPos = preferredPos;

    if (preferredPos === 'right') {
        if (triggerRect.right + contentRect.width + 10 > windowWidth) {
            finalPos = (triggerRect.left > contentRect.width) ? 'left' : 'bottom';
        }
    }

    if (preferredPos === 'left') {
        if (triggerRect.left - contentRect.width - 10 < 0) {
            finalPos = 'right';
        }
    }

    if (preferredPos === 'top') {
        if (triggerRect.top - contentRect.height - 10 < 0) {
            finalPos = 'bottom';
        }
    }

    // Ajuste para mobile
    if (windowWidth < 500 && (finalPos === 'left' || finalPos === 'right')) {
        finalPos = 'bottom';
    }

    content.classList.remove('pos-top', 'pos-bottom', 'pos-left', 'pos-right');
    content.classList.add(`pos-${finalPos}`);
}

/* ... existing closeAllPopovers ... */
function closeAllPopovers(exceptContent = null) {
    document.querySelectorAll('.ft-popover-content.show, .ft-dropdown-menu.show').forEach(el => {
        if (el !== exceptContent) {
            el.classList.remove('show', 'visible');
        }
    });

    document.querySelectorAll('[aria-expanded="true"]').forEach(btn => {
        if (btn.classList.contains('ft-navbar-toggle')) return;

        const container = btn.closest('.ft-popover-container') || btn.closest('.ft-dropdown');
        const content = container ? (container.querySelector('.ft-popover-content') || container.querySelector('.ft-dropdown-menu')) : null;

        if (content !== exceptContent) {
            btn.setAttribute('aria-expanded', 'false');
        }
    });
}

// --- 3. Accordions (Animação Suave) ---
/* ... existing initAccordions ... */
function initAccordions() {
    const accordions = document.querySelectorAll('details.ft-accordion');

    accordions.forEach(acc => {
        const summary = acc.querySelector('summary');
        const content = acc.querySelector('.ft-accordion-body');

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

// --- 4. Navbar Mobile Toggle ---
/* ... existing initNavbar ... */
function initNavbar() {
    const toggle = document.querySelector('.ft-navbar-toggle');
    const menu = document.querySelector('.ft-navbar-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('active');
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    menu.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}

// --- 5. Modais ---
/* ... existing initModals ... */
function initModals() {
    // Abrir
    document.querySelectorAll('[data-toggle="modal"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            if (targetId) toggleModal(targetId, true);
        });
    });

    // Fechar
    document.querySelectorAll('[data-dismiss="modal"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.ft-modal');
            if (modal) toggleModal(modal.id, false);
        });
    });

    // Backdrop
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('ft-modal')) {
            toggleModal(e.target.id, false);
        }
    });
}

/* ... existing toggleModal ... */
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (show) {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

/**
 * Sistema de Toasts
 */
function showToast(message) {
    let container = document.querySelector('.foton-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'foton-toast-container';
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
            pointerEvents: 'none'
        });
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'ft-badge ft-badge-dark ft-toast';
    toast.innerText = message;

    Object.assign(toast.style, {
        padding: '10px 20px',
        background: '#1d1e25',
        color: '#fff',
        borderRadius: '50px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        opacity: '0',
        transform: 'translateY(20px) scale(0.9)', // Ainda mantido apenas para entrada
        transition: 'all 0.3s ease', // Simplificado para dissolver
        fontWeight: '500',
        fontSize: '14px',
        pointerEvents: 'auto',
        minWidth: 'max-content'
    });

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0) scale(1)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        // toast.style.transform = 'translateY(-10px) scale(0.9)'; // Removido para apenas dissolver na saída
        setTimeout(() => {
            if (toast.isConnected) toast.remove();
            if (container.childNodes.length === 0) {
                container.remove();
            }
        }, 300);
    }, 3000);
}