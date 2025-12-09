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
    // Tenta usar a API moderna, fallback para execCommand se falhar
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
        var msg = successful ? 'successful' : 'unsuccessful';
        if (successful) showToast(`Cor copiada: ${text}`);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

// Função simples de toast para feedback visual (novo componente implícito)
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'badge badge-dark';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.zIndex = '3000';
    toast.style.padding = '10px 20px';
    toast.style.background = '#333';
    toast.style.color = '#fff';
    toast.style.borderRadius = '50px';
    toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

// --- Função de Download do CSS ---
function downloadCSS() {
    // Gera o CSS para download
    const cssContent = `/* Baixe o arquivo CSS completo na aba de arquivos */`;
    // Simulação apenas
    alert("O download iniciaria aqui com o arquivo .css gerado.");
}