/**
 * FÓTON FRAMEWORK SCRIPTS (CORE) v2.0
 * Namespace pattern applied to prevent global scope pollution.
 */

const Foton = {
    /**
     * Inicializador Mestre
     * Dispara todos os módulos do framework.
     */
    init: function () {
        this.initAlerts();
        this.initPopovers();
        this.initAccordions();
        this.initKeyboardFocus();
        this.initNavbar();
        this.initModals();
    },

    /**
     * Utilitário: Detecção de Foco por Teclado
     * Adiciona classe ao body para estilizar focus apenas quando usando teclado.
     */
    initKeyboardFocus: function () {
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' || e.key.startsWith('Arrow')) {
                document.body.classList.add('user-is-tabbing');
            }
        });

        document.body.addEventListener('mousedown', () => {
            document.body.classList.remove('user-is-tabbing');
        });
    },

    /**
     * Módulo: Alertas
     * Gerencia o fechamento de alertas.
     */
    initAlerts: function () {
        document.addEventListener('click', (e) => {
            const closeBtn = e.target.closest('.ft-alert-close');
            if (closeBtn) {
                const alert = closeBtn.closest('.ft-alert');
                if (alert) {
                    alert.style.transition = 'opacity 0.3s ease';
                    alert.style.opacity = '0';
                    setTimeout(() => {
                        alert.remove();
                    }, 300);
                }
            }
        });
    },

    /**
     * Módulo: Popovers & Dropdowns
     * Gerencia abertura, fechamento e posicionamento.
     */
    initPopovers: function () {
        const triggers = document.querySelectorAll('[data-toggle="popover"], .ft-dropdown > a, .ft-dropdown > button');
        triggers.forEach(trigger => {
            trigger.setAttribute('aria-haspopup', 'true');
            trigger.setAttribute('aria-expanded', 'false');
        });

        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-toggle="popover"]') || e.target.closest('.ft-dropdown > a') || e.target.closest('.ft-dropdown > button');

            if (trigger) {
                if (trigger.tagName === 'A') e.preventDefault();
                Foton.toggleDropdown(trigger);
                e.stopPropagation();
            } else if (!e.target.closest('.ft-popover-content') && !e.target.closest('.ft-dropdown-menu') && !e.target.closest('.ft-navbar-toggle')) {
                Foton.closeAllPopovers();
            }
        });

        // Handler de Teclado
        document.addEventListener('keydown', (e) => {
            const activeEl = document.activeElement;

            if (e.key === 'Escape') {
                Foton.closeAllPopovers();

                // Fecha Modais
                const openModal = document.querySelector('.ft-modal.show');
                if (openModal) Foton.toggleModal(openModal.id, false);

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
                Foton.toggleDropdown(activeEl, true);
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
                if (trigger) Foton.updatePopoverPosition(trigger, openPopover);
            }
        });
    },

    toggleDropdown: function (trigger, forceOpen = false) {
        const container = trigger.closest('.ft-popover-container') || trigger.closest('.ft-dropdown');
        const content = container.querySelector('.ft-popover-content') || container.querySelector('.ft-dropdown-menu');

        if (!content) return;

        const isAlreadyOpen = content.classList.contains('show');

        if (!forceOpen && isAlreadyOpen) {
            Foton.closeAllPopovers();
            return;
        }

        Foton.closeAllPopovers(content);

        // Remove classes antigas
        content.classList.remove('pos-top', 'pos-bottom', 'pos-left', 'pos-right', 'visible');

        // Adiciona .show para display:block, mas ainda opacity:0
        content.classList.add('show');
        trigger.setAttribute('aria-expanded', 'true');

        if (content.classList.contains('ft-popover-content')) {
            Foton.updatePopoverPosition(trigger, content);
            requestAnimationFrame(() => {
                content.classList.add('visible');
            });
        } else {
            requestAnimationFrame(() => {
                content.classList.add('visible');
            });
        }

        if (forceOpen) {
            const firstFocusable = content.querySelector('a, button, input');
            if (firstFocusable) setTimeout(() => firstFocusable.focus(), 50);
        }
    },

    updatePopoverPosition: function (trigger, content) {
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

        if (windowWidth < 500 && (finalPos === 'left' || finalPos === 'right')) {
            finalPos = 'bottom';
        }

        content.classList.remove('pos-top', 'pos-bottom', 'pos-left', 'pos-right');
        content.classList.add(`pos-${finalPos}`);
    },

    closeAllPopovers: function (exceptContent = null) {
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
    },

    /**
     * Módulo: Accordions
     * Animação suave para detalhes/resumo.
     */
    initAccordions: function () {
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
    },

    /**
     * Módulo: Navbar Mobile
     */
    initNavbar: function () {
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
    },

    /**
     * Módulo: Modais
     */
    initModals: function () {
        // Abrir
        document.querySelectorAll('[data-toggle="modal"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('data-target');
                if (targetId) Foton.toggleModal(targetId, true);
            });
        });

        // Fechar
        document.querySelectorAll('[data-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.ft-modal');
                if (modal) Foton.toggleModal(modal.id, false);
            });
        });

        // Backdrop
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('ft-modal')) {
                Foton.toggleModal(e.target.id, false);
            }
        });
    },

    toggleModal: function (modalId, show) {
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
    },

    /**
     * Módulo: Toasts
     * Exibe notificações flutuantes.
     */
    showToast: function (message) {
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
            transform: 'translateY(20px) scale(0.9)',
            transition: 'all 0.3s ease',
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
            setTimeout(() => {
                if (toast.isConnected) toast.remove();
                if (container.childNodes.length === 0) {
                    container.remove();
                }
            }, 300);
        }, 3000);
    }
};

// Inicialização automática ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    Foton.init();
});