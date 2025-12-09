// --- Lógica de Abas (Tabs) ---
        function showTab(tabName) {
            document.querySelectorAll('.docs-link').forEach(link => link.classList.remove('active'));
            const activeLink = document.getElementById('link-' + tabName);
            if (activeLink) activeLink.classList.add('active');

            document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active'));
            document.getElementById('tab-' + tabName).classList.add('active');

            window.scrollTo(0, 0);
            closeMobileMenu();
        }

        // --- Menu Mobile ---
        const sidebar = document.getElementById('docsSidebar');
        const overlay = document.getElementById('mobileOverlay');
        const toggleBtn = document.getElementById('mobileToggle');

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

        overlay.addEventListener('click', closeMobileMenu);

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
                // Pode adicionar um feedback visual
            });
        }

        // --- Função de Download do CSS ---
        function downloadCSS() {
            // Gera o CSS para download
            const cssContent = `
/* --- FÓTON FRAMEWORK --- */
:root {
    /* 1. Marca & Identidade */
    --color-brand: #40aa54;
    --color-soft-mint: #ebf7ee;
    
    /* 2. Backgrounds */
    --bg-body: #f0f0f8;
    --bg-dark: #1d1e25;

    /* 3. Texto */
    --text-main: #343f52;
    --text-muted: #60697b;
    --text-inverse: #f1f5f9;
    --text-inverse-muted: #94a3b8;

    /* 4. Cores Semânticas */
    --color-info: #3b82f6;
    --color-info-soft: #eff6ff;
    --color-danger: #ef4444;
    --color-danger-soft: #fef2f2;
    --color-warning: #f59e0b;
    --color-warning-soft: #fffbeb;
    --color-success: #10b981;
    --color-success-soft: #ecfdf5;
    --color-neutral: #64748b;
    --color-neutral-soft: #f1f5f9;

    /* 5. Acentos */
    --color-accent-number: #0cc27e;
    --color-accent-check: #45c4a0;

    /* 6. Gradientes */
    --gradient-brand: linear-gradient(135deg, #40aa54, #2d8a3e);
    --gradient-social-insta: linear-gradient(135deg, #6559ca, #e33f5f);
    --gradient-urban-green: linear-gradient(135deg, #40aa54, #64748b);
    --gradient-corporate-blue: linear-gradient(135deg, #3b82f6, #94a3b8);
}

*{ font-family: Manrope; margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }
ul{ list-style: none; } a{ text-decoration: none; }
body{ margin: 0; padding: 0; font-family: poppins; background: var(--bg-body); }

/* Tipografia */
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 { margin-top: 0; font-weight: 700; color: var(--text-main); word-spacing: .1rem; letter-spacing: -.01rem; }
::selection{ color:#ffffff; background-color:var(--text-main); }

/* Classes Utilitárias */
.text-main { color: var(--text-main); }
.text-muted { color: var(--text-muted); }
.text-inverse { color: var(--text-inverse); }
.text-inverse-muted { color: var(--text-inverse-muted); }

/* Navbar */
.navbar{ display: flex; align-items: center; margin: auto; position: fixed; z-index: 100; width: 100%; flex-direction: column; backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.9); border-bottom: 1px solid rgba(0,0,0,0.05); }
.navbar-menu{ display: flex; } .navbar-menu li a{ padding: 3px 10px; margin: 0px 15px; color: var(--text-main); font-weight: 700; letter-spacing: 0.5px; transition: all ease 0.3s; display: flex; align-items: center; gap: 8px; font-size: 16px; } .navbar-menu li a:hover { color: var(--color-brand); }
.logo{ font-size: 1.4rem; font-weight: 800; letter-spacing: 1px; color: #202020; } .logo span{ color: var(--color-brand); }

/* Hero */
.hero{ position: relative; padding-top: 8.25rem; padding-right: 1.25rem; padding-bottom: 4.25rem; padding-left: 1.25rem; align-items: center; display: flex; justify-content: center; background: radial-gradient(#eef 1px, transparent 1px), linear-gradient(180deg, #f9f9ff 0%, #fff 100%); background-size: 20px 20px, 100% 100%; min-height: 600px; }
.hero-content{ display: flex; flex-direction: column; width: 780px; position: relative; align-items: center; z-index: 2; }
.hero-content span{ color: var(--text-main); font-size: 58px; line-height: 1.1; display: inline-block; background-clip: text; font-weight: 800; text-align: center; margin-bottom: 20px; }
.hero-content p { color: var(--text-muted); max-width: 530px; text-align: center; font-weight: 500; font-size: 16px; line-height: 1.6; margin-bottom: 25px; }

/* Input Group */
.input-group{ height: 60px; display: flex; align-items: center; padding: 8px; border-radius: 1000px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); border: 1px solid #e0e0e0; width: max-content; background: #fff; }
.input-group:focus-within { border-color: var(--color-brand); }
.input-group .input-field{ height: 100%; border: none; width: 350px; padding: 0px 15px; outline: none; background: transparent; font-size: 15px; }

/* --- ELEMENTOS DE FORMULÁRIO GENÉRICOS --- */
.form-group { margin-bottom: 1.5rem; width: 100%; }
.form-label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-main); font-size: 14px; font-family: 'Manrope', sans-serif; }

.form-control {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    color: var(--text-main);
    background-color: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.form-control:focus {
    outline: none;
    border-color: var(--color-brand);
    box-shadow: 0 0 0 3px rgba(64, 170, 84, 0.1);
}
.form-control::placeholder { color: #cbd5e1; }

textarea.form-control { resize: vertical; min-height: 100px; }

/* Checkbox & Radio Customizados */
.form-check { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; cursor: pointer; }
.form-check-input {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    flex-shrink: 0;
}
.form-check-input:checked {
    background-color: var(--color-brand);
    border-color: var(--color-brand);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}
.form-check-input[type="radio"] { border-radius: 50%; }
.form-check-input[type="radio"]:checked {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
}
.form-check-label { font-size: 14px; color: var(--text-muted); cursor: pointer; }

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    height: 50px;
    border-radius: 50px; /* Redondinho (Pill) */
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
    text-decoration: none;
    font-size: 15px;
    line-height: 1.5;
    box-sizing: border-box;
}

/* 1. Gradient */
.btn-gradient {
    background: var(--bg-dark);
    color: #fff;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    border: none;
}
.btn-gradient:hover {
    background-image: var(--gradient-brand);
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(64, 170, 84, 0.4);
    color: #fff;
    border-color: transparent;
}

/* 2. Primary */
.btn-primary {
    background-color: #e9e9ed;
    color: var(--text-muted); /* Texto secundário */
    border: 2px solid #e0e0e0;
}
.btn-primary:hover {
    background-color: #e3e3e3;
    color: var(--text-main); 
    transform: translateY(-2px);
    border-color: #d0d0d0;
}

/* 3. Dark */
.btn-dark {
    background: var(--bg-dark);
    color: #fff;
    border: 2px solid var(--bg-dark); 
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
.btn-dark:hover {
    background: #2a2b35; 
    border-color: #2a2b35;
    transform: translateY(-2px);
    color: #fff;
}

/* 4. Danger */
.btn-danger {
    background: var(--color-danger);
    color: #fff;
    border: 2px solid var(--color-danger);
    box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
}
.btn-danger:hover {
    background: #dc2626; /* Darker red */
    border-color: #dc2626;
    transform: translateY(-2px);
}

/* 5. Success */
.btn-success {
    background: var(--color-success);
    color: #fff;
    border: 2px solid var(--color-success);
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
}
.btn-success:hover {
    background: #059669; /* Darker green */
    border-color: #059669;
    transform: translateY(-2px);
}

/* 6. Warning */
.btn-warning {
    background: var(--color-warning);
    color: #fff;
    border: 2px solid var(--color-warning);
    box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);
}
.btn-warning:hover {
    background: #d97706; /* Darker orange */
    border-color: #d97706;
    transform: translateY(-2px);
}

/* 7. Info */
.btn-info {
    background: var(--color-info);
    color: #fff;
    border: 2px solid var(--color-info);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}
.btn-info:hover {
    background: #2563eb; /* Darker blue */
    border-color: #2563eb;
    transform: translateY(-2px);
}

/* 8. Small Link */
.btn-sm {
    padding: 6px 20px;
    font-size: 13px;
    height: auto;
    border-width: 2px;
}

/* 9. Link Style */
.btn-link {
    background: transparent;
    color: var(--text-main); 
    border-color: #e0e0e0;
}

.btn-link:hover {
    background: #fff;
    color: var(--color-brand);
    border-color: var(--color-brand);
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

/* Override para quando está na barra escura */
.top-bar .btn-link {
    color: #fff;
    border-color: rgba(255,255,255,0.4);
}
.top-bar .btn-link:hover {
    background: #fff;
    color: var(--color-brand);
    border-color: #fff;
}

/* 10. Outlines */
.btn-outline-danger { background: transparent; color: var(--color-danger); border: 2px solid var(--color-danger); }
.btn-outline-danger:hover { background: var(--color-danger); color: #fff; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(239, 68, 68, 0.2); }

.btn-outline-success { background: transparent; color: var(--color-success); border: 2px solid var(--color-success); }
.btn-outline-success:hover { background: var(--color-success); color: #fff; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(16, 185, 129, 0.2); }

.btn-outline-warning { background: transparent; color: var(--color-warning); border: 2px solid var(--color-warning); }
.btn-outline-warning:hover { background: var(--color-warning); color: #fff; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(245, 158, 11, 0.2); }

.btn-outline-info { background: transparent; color: var(--color-info); border: 2px solid var(--color-info); }
.btn-outline-info:hover { background: var(--color-info); color: #fff; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(59, 130, 246, 0.2); }


/* Helper */
.btn-block { width: 100%; }


/* Section Dark */
.section-dark{ display: flex; flex-direction: column; max-width: 1250px; margin: 50px auto; padding: 3rem; border-radius: 24px; background: var(--bg-dark); }
.section-header h2 { font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 0.5em; }
.section-header p { color: var(--text-inverse-muted) !important; font-size: 16px; font-weight: 400; margin-bottom: 2rem; }

/* Flex Grid */
.flex-container{ margin-top: 10px; display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }

/* Feature Card */
.card-feature{ display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: var(--color-soft-mint); border-radius: 16px; min-height: 140px; width: 220px; padding: 20px; border: 1px solid rgba(0, 0, 0, 0.03); position: relative; transform: scale(1.0); transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: pointer; }
.card-feature:hover{ transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); background-color: #fff; }
.card-feature h1{ display: inline-block; font-size: 18px; line-height: 1.4; color: var(--text-main); margin: 10px 0 5px 0; text-align: center; height: auto; }
.card-feature p{ font-size: 13px; color: var(--text-muted); text-align: center; font-weight: 500; margin-bottom: 0; line-height: 1.4; }
.card-feature span { font-weight: 900; color: var(--color-accent-number); font-size: 20px; background: rgba(12, 194, 126, 0.1); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }

/* Grid Responsive */
.grid-responsive { margin-block: 2rem; display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }

/* Base Card */
.card { padding: 2rem; box-shadow: 2px 0 24px rgba(64, 170, 84, 0.1); background: #fff; border-radius: 1.5rem; display: flex; gap: 1.5rem; flex-direction: column; transition: all 0.4s ease; border: 1px solid #f0f0f8; position: relative; top: 0; }
.card:hover { transform: translateY(-10px); box-shadow: 0 20px 60px -10px rgba(0,0,0,0.1); border-color: var(--color-brand); }
.card-body h3 { font-size: 24px; color: var(--text-main); font-weight: 800; margin-bottom: 10px;}
.card-body ul { padding-left: 0; margin-top: 20px; }
.card-body ul li { margin-bottom: 12px; color: var(--text-muted); display: flex; align-items: center; font-size: 15px; }
.card-body ul li::before { font-family: "Font Awesome 6 Free"; content: "\\f00c"; margin-right: 12px; font-weight: 900; color: var(--color-accent-check); font-size: 14px; }
.card .price { font-size: 48px; font-weight: 700; color: var(--text-main); letter-spacing: -1px; }
.card .price:before { content: "R$"; font-size: 20px; vertical-align: super; margin-right: 5px; color: var(--text-muted);}
.card .period { font-size: 14px; color: #999; font-weight: 500; }

/* Notification Card */
.notification-card { position: relative; width: max-content; min-width: 320px; padding: 1rem; background: #fff; border-radius: 16px; box-shadow: 0 5px 20px rgba(0,0,0,0.08); display: flex; align-items: center; gap: 15px; margin-bottom: 15px; opacity: 1; border: 1px solid rgba(0,0,0,0.02); transition: transform 0.2s; }
.notification-card:hover { transform: scale(1.02); }

/* Badge */
.badge { position: relative; height: 40px; width: 80px; display: inline-block; margin: 5px; }
.badge::before { content: attr(data-label); background: var(--bg-badge, #333); color: #fff; padding: 3px .5rem; border-radius: 5px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 10px; text-transform: uppercase; font-weight: 700; }
.badge.toast-pink {--bg-badge: var(--color-danger); } .badge.toast-light-green {--bg-badge: var(--color-success);} .badge.toast-light-blue {--bg-badge: var(--color-info);} .badge.toast-gray {--bg-badge: var(--color-neutral);}

/* Footer */
footer { display: block; width: 100%; background: #ffffff; padding: 0; position: relative; z-index: 10; }

/* CTA Card */
.cta-card { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; width: 90%; margin: auto; padding: 60px 80px; background: var(--bg-dark); background-image: linear-gradient(135deg, #1d1e25 0%, #2a2b35 100%); border-radius: 20px; position: relative; top: -80px; margin-bottom: -80px; box-shadow: 0 20px 50px rgba(0,0,0,0.2); flex-wrap: wrap; gap: 20px; }
.cta-card .section-title { color: #fff; font-size: 28px; font-weight: 700; margin-bottom: 5px;}
.cta-card p { color: var(--text-inverse-muted); font-size: 16px; }

/* Top Bar */
.top-bar { width: 100%; display: flex; align-items: center; justify-content: center; padding: 12px 15px; color: #fff; background: var(--gradient-social-insta); font-weight: 600; font-size: 14px; }

.toggle__section { display: flex; gap: 1rem; align-items: center; margin: 20px 0;} .toggle__section input { display: none; } .toggle__section .toggle__btn { display: flex; padding: 4px; background: #1d1e25; border-radius: 2rem; width: 3rem; transition: 0.3s; cursor: pointer;} .toggle__section .toggle__btn span { display: block; width: 1.2rem; height: 1.2rem; background: #fff; border-radius: 50%; transition: 0.3s;} .toggle__section input:checked ~ .toggle__btn { background: #40aa54; } .toggle__section input:checked ~ .toggle__btn span { transform: translateX(100%); }
        `;
            const blob = new Blob([cssContent], { type: 'text/css' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'styles-framework.css';
            a.click();
            window.URL.revokeObjectURL(url);
        }