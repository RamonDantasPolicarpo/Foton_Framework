/**
 * FÓTON FRAMEWORK SCRIPTS
 * Funcionalidades interativas para componentes UI.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAlerts();
    initPopovers();
    initAccordions();
});

// --- 1. Menu Mobile ---
function initMobileMenu() {
    const sidebar = document.getElementById('docsSidebar');
    const overlay = document.getElementById('mobileOverlay');
    const toggleBtn = document.getElementById('mobileToggle');

    if (toggleBtn) {
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
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');

    const icon = btn.querySelector('i');
    if (sidebar.classList.contains('open')) {
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
        btn.querySelector('i').classList.remove('fa-times');
        btn.querySelector('i').classList.add('fa-bars');
    }
}

// --- 2. Alertas (Fechar) ---
function initAlerts() {
    // Usa Event Delegation para funcionar com alertas criados dinamicamente
    document.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('.alert-close');
        if (closeBtn) {
            const alert = closeBtn.closest('.alert');
            if (alert) {
                // Efeito de fade-out simples
                alert.style.transition = 'opacity 0.3s, transform 0.3s';
                alert.style.opacity = '0';
                alert.style.transform = 'translateY(-10px)';

                // Remove do DOM após a animação
                setTimeout(() => {
                    alert.remove();
                }, 300);
            }
        }
    });
}

// --- 3. Popovers & Dropdowns (Click Outside) ---
function initPopovers() {
    // Lógica para abrir/fechar popovers
    document.addEventListener('click', (e) => {
        // Verifica se clicou num gatilho de popover
        const trigger = e.target.closest('[data-toggle="popover"]');

        if (trigger) {
            const container = trigger.closest('.popover-container');
            const content = container.querySelector('.popover-content');

            // Fecha outros popovers abertos
            closeAllPopovers(content);

            // Toggle do atual
            content.classList.toggle('show');
            e.stopPropagation(); // Impede que o evento suba e feche imediatamente
        } else if (!e.target.closest('.popover-content')) {
            // Se clicar fora do conteúdo, fecha tudo
            closeAllPopovers();
        }
    });
}

function closeAllPopovers(except = null) {
    document.querySelectorAll('.popover-content.show').forEach(popover => {
        if (popover !== except) {
            popover.classList.remove('show');
        }
    });
}

// --- 4. Accordions (Animação Suave) ---
function initAccordions() {
    const accordions = document.querySelectorAll('details.accordion');

    accordions.forEach(acc => {
        const summary = acc.querySelector('summary');
        const content = acc.querySelector('.accordion-body');

        // Garante que o height seja auto se já estiver aberto no load
        if (acc.hasAttribute('open')) {
            acc.style.height = 'auto';
        }

        summary.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o comportamento padrão instantâneo

            // Fechando
            if (acc.hasAttribute('open')) {
                // 1. Define a altura atual explicitamente (para poder animar)
                acc.style.height = `${acc.offsetHeight}px`;

                // 2. Força um reflow/repaint
                requestAnimationFrame(() => {
                    // 3. Define a altura para apenas o cabeçalho (fechando)
                    acc.style.height = `${summary.offsetHeight}px`;
                });

                // 4. Quando terminar a animação, remove o atributo open
                const onTransitionEnd = () => {
                    acc.removeAttribute('open');
                    acc.style.height = null; // Limpa o estilo inline
                    acc.removeEventListener('transitionend', onTransitionEnd);
                };
                acc.addEventListener('transitionend', onTransitionEnd);

            } else {
                // Abrindo
                // 1. Define a altura inicial (só o cabeçalho)
                acc.style.height = `${summary.offsetHeight}px`;
                acc.setAttribute('open', ''); // Renderiza o conteúdo (ainda oculto pelo height)

                // 2. Calcula a altura final (cabeçalho + conteúdo)
                const fullHeight = summary.offsetHeight + content.offsetHeight;

                // 3. Anima para a altura total
                requestAnimationFrame(() => {
                    acc.style.height = `${fullHeight}px`;
                });

                // 4. Ao terminar, define height: auto para responsividade
                const onTransitionEnd = () => {
                    acc.style.height = 'auto';
                    acc.removeEventListener('transitionend', onTransitionEnd);
                };
                acc.addEventListener('transitionend', onTransitionEnd);
            }
        });
    });
}

// --- 5. Utilitários (Copy & Toast) ---
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

function showToast(message) {
    // Remove toast anterior se existir
    const existingToast = document.querySelector('.foton-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'badge badge-dark foton-toast';

    // Estilos inline para garantir funcionamento sem CSS extra
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%) translateY(20px)',
        zIndex: '3000',
        padding: '10px 20px',
        background: '#1d1e25',
        color: '#fff',
        borderRadius: '50px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        opacity: '0',
        transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        fontWeight: '500',
        fontSize: '14px'
    });

    toast.innerText = message;
    document.body.appendChild(toast);

    // Animação de entrada
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Animação de saída
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// --- 6. Download Real do CSS ---
function downloadCSS() {
    // Busca o arquivo CSS na mesma pasta
    fetch('foton_framework.css')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo CSS.');
            }
            return response.blob();
        })
        .then(blob => {
            // Cria uma URL temporária para o blob
            const url = window.URL.createObjectURL(blob);
            
            // Cria um link invisível para forçar o download
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'foton_framework.css'; // Nome do arquivo ao baixar
            
            document.body.appendChild(a);
            a.click();
            
            // Limpeza
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            showToast('Download iniciado!');
        })
        .catch(err => {
            console.error(err);
            showToast('Erro ao baixar o arquivo.');
        });
}