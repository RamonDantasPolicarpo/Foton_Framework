<div align="center">
<img src="vector/Logo.svg" alt="Fóton Framework Logo" width="120" />
<h1>Fóton Framework</h1>
<p><strong>A base invisível para interfaces modernas.</strong></p>

<p>
<a href="#recursos">Recursos</a> •
<a href="#como-usar">Como Usar</a> •
<a href="#customização">Customização</a> •
<a href="#componentes">Componentes</a>
</p>

</div>

⚡ Sobre

O Fóton Framework é uma biblioteca CSS agnóstica desenvolvida para criar layouts de alta conversão com o mínimo de esforço. Diferente de frameworks massivos que exigem configurações complexas, o Fóton foca no essencial: tipografia sólida, espaçamento rítmico e componentes prontos para produção.

O objetivo é fornecer uma base leve que não brigue com o seu código, permitindo prototipagem rápida e escalabilidade fácil.

✨ Vantagens

Ultra Leve: O núcleo é puramente CSS, otimizado para carregar instantaneamente.

Zero Dependências: Funciona sem jQuery, sem compiladores obrigatórios, apenas HTML e CSS.

Grid Inteligente: Layouts responsivos automáticos usando CSS Grid e Flexbox modernos.

Tipografia Premium: Combinação curada de Manrope (Títulos) e Poppins (Corpo) nativa.

Variáveis CSS: Design System completo controlado por variáveis nativas (:root), facilitando temas (incluindo Dark Mode).

Semântico: Classes com nomes intuitivos como .btn, .card, .hero, .navbar.

🚀 Como Usar

Instalação Rápida

Basta adicionar o arquivo CSS e as fontes ao <head> do seu projeto.

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- 1. Fontes Google (Obrigatório) -->
    <link href="[https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap](https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap)" rel="stylesheet">
    
    <!-- 2. Ícones (Opcional - FontAwesome) -->
    <link rel="stylesheet" href="[https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)">

    <!-- 3. Fóton Framework -->
    <link rel="stylesheet" href="foton_framework.css">
</head>
<body>
    <!-- Seu conteúdo aqui -->
</body>
</html>


🎨 Customização

O Fóton é construído sobre variáveis CSS nativas. Para alterar a identidade visual do seu projeto, basta sobrescrever as variáveis no seu arquivo CSS ou diretamente na tag <style>.

:root {
    /* Cor Principal */
    --primary: #7c3aed;       /* Roxo */
    --primary-soft: #f5f3ff;
    
    /* Backgrounds */
    --bg-page: #ffffff;
    --dark: #111827;

    /* Gradientes */
    --grad-primary: linear-gradient(135deg, #7c3aed, #4c1d95);
}


🧩 Componentes Incluídos

Categoria

Elementos

Estrutura

Navbar, Hero, Footer, Grid Responsivo, Flex Container

Ações

Botões (Solid, Outline, Ghost), Links, Toggles

Feedback

Alertas, Badges, Toasts, Progress Bars, Spinners

Conteúdo

Cards (Blog, Profile, Pricing), Tabelas, Acordeões

Formulários

Inputs, Selects, Checkboxes, Radios, Input Groups

Overlays

Popovers, Tooltips (CSS Puro)

📂 Estrutura de Arquivos

foton_framework.css - O núcleo do framework (use este em produção).

docs_style.css - Estilos específicos apenas para a documentação.

foton_scripts.js - Scripts opcionais para interatividade (Menu Mobile, Fechar Alertas, etc).

<div align="center">
<p>Desenvolvido por <a href="https://github.com/RamonDantasPolicarpo">Ramon Dantas</a></p>
</div>