// --- Menu Mobile ---
const sidebar = document.getElementById('docsSidebar');
const overlay = document.getElementById('mobileOverlay');
const toggleBtn = document.getElementById('mobileToggle');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
        const icon = toggleBtn.querySelector('i');
        if (sidebar.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        toggleBtn.querySelector('i').classList.remove('fa-times');
        toggleBtn.querySelector('i').classList.add('fa-bars');
    }
}

// --- Copiar para Clipboard ---
function copyColor(color) {
    navigator.clipboard.writeText(color).then(() => {
        // Feedback visual simples
        alert('Cor copiada: ' + color);
    });
}

// --- Função de Download do CSS ---
function downloadCSS() {
    // Gera o CSS para download
    const cssContent = `
/* --- FÓTON FRAMEWORK --- */
/* (Conteúdo CSS minificado ou completo iria aqui - mantido igual ao original) */
:root { --color-brand: #40aa54; --bg-body: #f0f0f8; } /* Exemplo encurtado */
    `;
    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'styles-framework.css';
    a.click();
    window.URL.revokeObjectURL(url);
}