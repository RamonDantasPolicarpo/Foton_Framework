<div align="center">
<img src="/assets/vector/Logo.svg" alt="Fóton Framework Logo" width="120" />
<h1>Fóton Framework</h1>
<p>
<strong>Biblioteca CSS minimalista para interfaces web.</strong>




Foco em simplicidade, performance e estética consistente.
</p>

<p>
<a href="#sobre">Sobre</a> •
<a href="#instalação">Instalação</a> •
<a href="#personalização">Personalização</a> •
<a href="#componentes">Componentes</a>
</p>

</div>

📄 Sobre

O Fóton Framework é uma solução de estilização agnóstica desenvolvida para oferecer uma interface visual polida com configuração zero.

Diferente de frameworks utilitários que exigem construção bloco a bloco, o Fóton entrega componentes prontos e uma tipografia ajustada (Manrope + Poppins) para garantir legibilidade e harmonia visual imediata. É ideal para prototipagem rápida, painéis administrativos e projetos onde a agilidade de implementação é prioritária.

Principais Características

Plug & Play: Não requer bundlers (Webpack, Vite) ou pré-processadores. Apenas HTML e CSS.

Semântica: Classes nomeadas de forma intuitiva (.ft-btn, .ft-card, .ft-hero, .ft-grid).

Design System: Espaçamentos, cores e tipografia definidos para manter a consistência.

Leveza: Focado apenas no essencial, sem scripts bloqueantes ou CSS não utilizado.

🚀 Instalação

Para utilizar o Fóton, adicione as referências de fonte e o arquivo CSS ao <head> do seu projeto.

Via CDN (Recomendado)

<!-- 1. Fontes (Manrope & Poppins) -->
<link href="[https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap](https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap)" rel="stylesheet">

<!-- 2. Ícones (Opcional - FontAwesome) -->
<link rel="stylesheet" href="[https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)">

<!-- 3. Fóton Framework CSS -->
<link rel="stylesheet" href="dist/foton_framework.css">

<!-- 4. Fóton Scripts (Opcional para interatividade) -->
<script src="dist/foton_scripts.js" defer></script>


🎨 Personalização

O framework utiliza CSS Custom Properties (Variáveis) nativas. Você pode alterar o tema globalmente sobrescrevendo as variáveis no seletor :root.

:root {
    /* Cores Principais */
    --primary: #40aa54;       /* Cor de destaque */
    --primary-soft: #ebf7ee;  /* Variação suave para fundos */
    
    /* Tipografia */
    --font-heading: 'Manrope', sans-serif;
    --font-body: 'Poppins', sans-serif;

    /* Tema Escuro (Opcional) */
    --dark: #1d1e25;
}


📦 Componentes

O Fóton oferece um conjunto de classes prontas para uso:

Estrutura: ft-navbar, ft-hero, ft-footer, ft-section-dark

Layout: ft-grid, flex-container, container

Elementos UI: * ft-btn (Botões com variantes gradient, outline, etc)

ft-card (Cartões de conteúdo)

ft-input, ft-select (Formulários estilizados)

ft-badge, ft-alert (Feedback visual)

<div align="center">
<p>Mantido por <a href="https://github.com/RamonDantasPolicarpo">Ramon Dantas</a></p>
</div>