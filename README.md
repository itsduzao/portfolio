# Eduardo Henrique — Portfolio

> Vitrine digital de alta performance construída com HTML5 semântico, CSS3 e JavaScript ES6+ puro — sem frameworks, sem build steps — demonstrando que código limpo e acessibilidade não dependem de complexidade de stack.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Stack](#stack)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Decisões Técnicas](#decisões-técnicas)
  - [SEO](#seo)
  - [HTML Semântico](#html-semântico)
  - [Acessibilidade (WCAG 2.1 AA)](#acessibilidade-wcag-21-aa)
  - [Design Tokens e Padrão CSS](#design-tokens-e-padrão-css)
  - [Escolha de Cores](#escolha-de-cores)
  - [Responsividade](#responsividade)
  - [Princípios SOLID no JavaScript](#princípios-solid-no-javascript)
  - [Exibição de Dados Dinâmica](#exibição-de-dados-dinâmica)
  - [Fallbacks de Imagem](#fallbacks-de-imagem)
  - [Botão Voltar ao Topo](#botão-voltar-ao-topo)
  - [Navegação Ativa Inteligente](#navegação-ativa-inteligente)
  - [Menu Mobile (Hamburger)](#menu-mobile-hamburger)
  - [Performance](#performance)
  - [Preferência por Movimento Reduzido](#preferência-por-movimento-reduzido)
  - [CI/CD — Auto-update do Currículo](#cicd--auto-update-do-currículo)
- [Como Rodar Localmente](#como-rodar-localmente)

---

## Visão Geral

O portfólio serve como ponto de contato para recrutadores e parceiros, transmitindo autoridade técnica não apenas pelo **conteúdo**, mas pela **qualidade da implementação**. Cada decisão — de uma tag `<article>` a um `aria-current="page"` — foi intencional e documentada aqui.

**Objetivos estratégicos:**

- Facilitar o contato de recrutadores via CTAs diretos (download de currículo, links de projetos)
- Demonstrar domínio de HTML5 semântico, CSS modular e JavaScript moderno
- Manter pontuação superior a 90 no Google Lighthouse em Performance, Acessibilidade e SEO

---

## Stack

| Camada        | Tecnologia                        | Justificativa                                                           |
| ------------- | --------------------------------- | ----------------------------------------------------------------------- |
| Estrutura     | HTML5 semântico                   | Máxima acessibilidade e indexabilidade sem overhead de framework        |
| Estilização   | CSS3 + Custom Properties          | Design tokens nativos, sem dependência de pre-processador               |
| Comportamento | JavaScript ES6+ (módulos nativos) | `type="module"` garante defer automático e tree-shaking pelo browser    |
| Design system | Figma (via Figma MCP)             | Fonte de verdade visual; tokens mapeados diretamente para variáveis CSS |
| CI/CD         | GitHub Actions                    | Auto-update do currículo sem intervenção manual                         |

---

## Estrutura do Projeto

```
portfolio/
├── index.html              # Único documento HTML — shell semântico
├── css/
│   └── styles.css          # Tokens + componentes + responsividade
├── js/
│   ├── data.js             # Camada de dados pura (SRP)
│   ├── renderer.js         # Builders de template HTML (SRP)
│   └── main.js             # Orquestrador e ponto de entrada (SRP)
├── assets/
│   └── images/
│       ├── profile.jpg
│       ├── icons/
│       │   ├── hardskills/  # SVGs de tecnologias (brand — coloridos)
│       │   └── softskills/  # SVGs Lucide (outline — monocromáticos)
│       └── projects/        # Previews dos projetos
└── .github/
    └── workflows/
        └── update-cv.yml   # Pipeline de atualização automática do CV
```

O `index.html` é intencionalmente um **shell estático**: contém apenas a estrutura semântica e os contêineres que o JavaScript popula. Isso mantém HTML legível, separa responsabilidades e facilita a manutenção dos dados.

---

## Decisões Técnicas

### SEO

O `<head>` concentra todas as sinalizações necessárias para mecanismos de busca e compartilhamento social:

```html
<!-- Metadados primários -->
<meta name="description" content="Portfólio de Eduardo Henrique — ..." />
<meta name="author" content="Eduardo Henrique" />

<!-- Open Graph — pré-visualização no LinkedIn, WhatsApp, etc. -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Eduardo Henrique — Portfolio" />
<meta property="og:description" content="..." />

<!-- Título expressa hierarquia: nome | categoria -->
<title>Eduardo Henrique | Portfolio</title>
```

**Por que sem Twitter Cards separados?** O LinkedIn e a maioria das plataformas modernas consomem as tags `og:*` também para o card de pré-visualização. Adicionar tags `twitter:*` redundantes aumentaria o peso sem benefício mensurável para este perfil de conteúdo.

---

### HTML Semântico

Cada elemento foi escolhido pelo seu **significado**, não pela sua aparência:

| Elemento                                 | Uso                      | Benefício                                     |
| ---------------------------------------- | ------------------------ | --------------------------------------------- |
| `<header role="banner">`                 | Cabeçalho do site        | Landmark region para leitores de tela         |
| `<nav aria-label="Navegação principal">` | Barra de navegação       | Identificação inequívoca do landmark nav      |
| `<main id="main-content">`               | Conteúdo principal       | Skip-link target; única `<main>` por página   |
| `<section aria-labelledby="…-heading">`  | Cada seção temática      | Associa automaticamente a seção ao seu título |
| `<article aria-labelledby="…">`          | Cards de projeto e skill | Conteúdo auto-contido e reindexável           |
| `<footer role="contentinfo">`            | Rodapé                   | Landmark region                               |
| `<h1>` → `<h2>` → `<h3>` → `<h4>`        | Hierarquia de títulos    | Estrutura de documento correta para AT e SEO  |

A hierarquia de headings nunca pula níveis: `h1` (nome na hero) → `h2` (títulos de seção) → `h3` (cards) → `h4` (rótulos internos aos cards).

---

### Acessibilidade (WCAG 2.1 AA)

#### Atributos ARIA

- **`aria-label`** em botões de ícone (toggle do menu, botão voltar ao topo, download do CV) — garante rótulo acessível sem texto visível.
- **`aria-expanded`** no botão hamburger — informa ao usuário de leitor de tela se o menu está aberto ou fechado.
- **`aria-controls="nav-links"`** no botão hamburger — associa o controle ao elemento controlado.
- **`aria-current="page"`** nos links da nav — atualizado dinamicamente via JS para refletir a seção visível, respeitando o padrão ARIA para navegação de âncoras.
- **`aria-hidden="true"`** e **`focusable="false"`** em todos os SVGs decorativos — evita que leitores de tela anunciem gráficos sem significado semântico.
- **`aria-disabled="true"`** em CTAs de projetos sem URL — comunica o estado inativo sem remover o elemento do DOM ou do foco.
- **`aria-labelledby`** associa cada `<section>` e `<article>` ao seu `id` de título, criando um rótulo legível automaticamente.

#### Imagens

- Foto de perfil: `alt` descritivo com contexto ("sorrindo").
- Ícones de skill: `alt=""` vazio — são decorativos; o nome da skill está no `<span>` adjacente.
- Previews de projeto: `alt` descreve o conteúdo visível da imagem.

#### Navegação por teclado

```css
:focus-visible {
  outline: 3px solid var(--color-border-focus);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
```

`:focus-visible` exibe o contorno apenas para navegação por teclado, sem afetar cliques com mouse — melhor UX sem sacrificar acessibilidade.

```css
.project-card:focus-within {
  outline: 3px solid var(--color-border-focus);
  outline-offset: 3px;
}
```

`focus-within` nos cards de projeto garante que o card inteiro receba destaque visual quando o link interno (`<a>`) está em foco — útil para navegação por Tab.

---

### Design Tokens e Padrão CSS

Todo o sistema visual é governado por **CSS Custom Properties** declaradas em `:root`, eliminando valores mágicos espalhados pelo código:

```css
/* Cores */
--color-accent: #327e88;
--color-accent-dark: #214a4f;

/* Tipografia */
--font-size-5xl: 3rem;
--font-weight-bold: 700;
--line-height-tight: 1.2;

/* Espaçamento (grade de 8 pontos) */
--space-4: 1rem; /* 16px */
--space-8: 2rem; /* 32px */

/* Sombras */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), ...;

/* Transições */
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
```

**Grade de 8 pontos:** todos os espaçamentos são múltiplos de 4px (0.25rem), alinhando o sistema CSS ao sistema de espaçamento padrão do Figma. Qualquer mudança de escala (ex.: aumentar padding geral) é feita em um único lugar.

**Padrão BEM para classes CSS:**

- Bloco: `.project-card`
- Elemento: `.project-card__body`, `.project-card__title`
- Modificador: `.section--alt`, `.skill-item__icon--outline`, `.btn--primary`

Isso garante especificidade baixa e previsível, evitando guerras de `!important`.

---

### Escolha de Cores

A paleta foi construída em torno de um **verde-petróleo** que comunica confiança técnica e diferencia o portfólio do azul padrão de portfólios genéricos:

| Token                  | Hex       | Uso                                                              |
| ---------------------- | --------- | ---------------------------------------------------------------- |
| `--color-accent`       | `#327e88` | Hover, underlines, títulos de cards                              |
| `--color-accent-dark`  | `#214A4F` | Botões CTA, background do footer-dark, scroll-top btn            |
| `--color-bg`           | `#ffffff` | Fundo base                                                       |
| `--color-bg-alt`       | `#f2f2f0` | Seção alternada (skills) — quebra visual sem contraste agressivo |
| `--color-bg-dark`      | `#1a1a1a` | Footer — ancora visualmente o fim da página                      |
| `--color-text`         | `#1a1a1a` | Texto principal — contraste 16.1:1 sobre branco (AAA)            |
| `--color-text-muted`   | `#555555` | Texto secundário — contraste 7.0:1 sobre branco (AAA)            |
| `--color-border-focus` | `#28b5a3` | Ring de foco — distinto o suficiente do accent para legibilidade |

**Contraste WCAG:** todas as combinações de text/background foram validadas para nível AA (mínimo 4.5:1 para texto normal). Os valores `#1a1a1a` e `#555555` sobre `#ffffff` passam no nível AAA.

**Ícones outline — CSS filter:**

```css
.skill-item__icon--outline img {
  filter: var(--filter-icon-to-accent);
}
```

SVGs Lucide (monocromáticos) são coloridos dinamicamente via `filter` CSS para respeitar o accent color sem precisar editar cada arquivo SVG ou inline cada ícone.

---

### Responsividade

A abordagem é **desktop-first** no breakpoint strategy, mas com atenção especial ao mobile:

| Breakpoint | Largura        | Ajustes principais                                         |
| ---------- | -------------- | ---------------------------------------------------------- |
| Desktop    | ≥ 1024px       | Layout padrão: projetos em 3 colunas, skills em 2 colunas  |
| Tablet     | 768px – 1023px | Projetos em 2 colunas, skills em 1 coluna, hero comprimida |
| Mobile     | < 768px        | Projetos em 1 coluna, hero em coluna, nav colapsada        |

```css
/* Escalagem fluida de tipografia via token override */
@media (max-width: 767px) {
  :root {
    --font-size-5xl: 2rem; /* hero heading */
    --font-size-3xl: 1.5rem; /* section titles */
  }
}
```

Ao sobrescrever os tokens em vez de classes específicas, **todos os elementos** que usam esses tokens escalam automaticamente — não é necessário tocar em cada seletor individual.

**`min-height: 100svh`** na hero usa a nova unidade `svh` (small viewport height), que desconta a barra de endereço do mobile — a seção nunca fica cortada em browsers iOS/Android.

**Grid auto-fill para skills:**

```css
.skill-card__list {
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
}
```

A lista de skills se reorganiza automaticamente em qualquer largura sem breakpoints adicionais.

---

### Princípios SOLID no JavaScript

A arquitetura JS é composta por três módulos com responsabilidades ortogonais:

#### `data.js` — Single Responsibility: dados

```js
// Apenas exporta arrays com os dados do portfólio.
// Não toca no DOM. Não tem efeitos colaterais.
export const skillCategories = [ ... ];
export const projects = [ ... ];
```

Se o conteúdo mudar, apenas este arquivo é editado.

#### `renderer.js` — Single Responsibility: templates

```js
// Funções puras: recebem objeto, retornam string HTML.
// Não leem do DOM. Não fazem fetch. Não adicionam listeners.
const buildProjectCard = ({ id, title, description, ... }) => `...`;

export const renderProjects = (container, projects) => {
  container.innerHTML = projects.map(buildProjectCard).join("");
};
```

`buildProjectCard` e `buildSkillCard` são funções puras e facilmente testáveis em isolamento.

#### `main.js` — Single Responsibility: orquestração

```js
// Conecta dados → renderizadores → comportamentos de UI.
// Não sabe como os dados são estruturados.
// Não sabe como o HTML é gerado.
const init = () => {
  renderSkills(getElement("#skills-grid"), skillCategories);
  renderProjects(getElement("#projects-grid"), projects);
  initScrollTop(getElement("#scroll-top-btn"));
  initActiveNav(getAllElements(".nav__link"));
  initMobileNav(...);
};
```

**Open/Closed Principle:** para adicionar uma nova seção (ex.: "Depoimentos"), basta criar `buildTestimonialCard` no `renderer.js` e chamar a função em `init()`. Nenhuma função existente é modificada.

**Helper tipado `getElement`:**

```js
const getElement = (selector, root = document) => {
  const element = root.querySelector(selector);
  if (!element) throw new Error(`Element not found: ${selector}`);
  return element;
};
```

Falha rapidamente e com mensagem clara se o HTML mudar — evita bugs silenciosos de `null`.

**Guard de DOM ready:**

```js
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init(); // DOM já disponível (ex.: script carregado como module com defer)
}
```

Garante execução correta independentemente de quando o script é parseado.

---

### Exibição de Dados Dinâmica

Skills e projetos vivem inteiramente em `data.js` como arrays de objetos tipados com JSDoc:

```js
/** @typedef {{ id: string, name: string, icon: string, iconVariant: 'brand'|'outline' }} Skill */
/** @typedef {{ id: string, title: string, description: string, stack: string[], ctaLabel: string, ctaUrl: string, imageUrl: string, imageAlt: string }} Project */
```

**Por que não JSON externo?** Eliminaria um `fetch` assíncrono desnecessário para dados que não mudam em runtime. O carregamento via `import` estático é síncrono e não exige tratamento de erro de rede.

**`iconVariant`:** campo discriminador (`'brand'` | `'outline'`) que controla a classe CSS aplicada ao ícone, permitindo dois tratamentos visuais distintos (SVGs coloridos de marca vs. SVGs monocromáticos Lucide filtrados via CSS) sem lógica condicional no renderer além do template literal.

**Batching de innerHTML:** o `renderer.js` monta toda a string HTML com `.map().join("")` antes de uma única atribuição a `innerHTML` — reduz reflows a um único ciclo de layout em vez de N inserções individuais.

---

### Fallbacks de Imagem

Toda `<img>` crítica possui um `onerror` declarado diretamente no HTML para garantir que o layout nunca quebre:

```html
<!-- Foto de perfil -->
<img
  src="assets/images/profile.jpg"
  onerror="this.src='https://placehold.co/312x312/e5e7eb/6b7280?text=EH'"
/>

<!-- Cards de projeto (gerado pelo renderer.js) -->
<img
  src="${imageUrl}"
  onerror="this.onerror='null'; this.src='${fallbackUrl}'"
/>
```

O `this.onerror='null'` no card de projeto previne um loop infinito caso a URL de fallback também falhe.

O `fallbackUrl` é gerado dinamicamente com o título do projeto:

```js
const fallbackUrl = `https://placehold.co/672x512/e5e7eb/9ca3af?text=${encodeURIComponent(title)}`;
```

**Fontes — fallback stack:**

```css
--font-family:
  "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Se o Google Fonts não carregar (rede lenta, bloqueio por ad-blocker), o browser cai para a fonte de sistema nativa — no macOS/iOS é `-apple-system` (San Francisco), no Windows é `Segoe UI`. O layout não quebra e a legibilidade é mantida.

---

### Botão Voltar ao Topo

O botão usa uma combinação de `hidden` attribute + CSS para animar entrada e saída sem causar layout shift:

```css
/* Sempre ocupa espaço no DOM, mas é invisível quando hidden */
.scroll-top[hidden] {
  display: flex !important; /* sobrescreve o display:none padrão do hidden */
  opacity: 0;
  pointer-events: none; /* não captura cliques quando invisível */
}

.scroll-top:not([hidden]) {
  opacity: 1;
}
```

Isso permite que a transição de `opacity` via `--transition-base: 250ms ease` funcione corretamente — se o elemento usasse `display: none` nativo, não haveria animação.

```js
const updateButtonVisibility = () => {
  const shouldShow = window.scrollY > window.innerHeight; // após 1 viewport
  scrollTopButton.hidden = !shouldShow;
};

// passive: true — não bloqueia o thread principal durante scroll
window.addEventListener("scroll", updateButtonVisibility, { passive: true });

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
```

O threshold de visibilidade é **1 viewport height**: o botão aparece somente quando o usuário já rolou o suficiente para a seção hero ter saído completamente da tela.

---

### Navegação Ativa Inteligente

Ao rolar a página, o link da nav correspondente à seção visível recebe `aria-current="page"`, disparando o sublinhado animado via CSS:

```css
.nav__link[aria-current="page"]::after {
  width: 100%; /* expande o pseudo-elemento de underline */
}
```

A estratégia foi escolhida deliberadamente **sem IntersectionObserver** por uma razão específica:

> `IntersectionObserver` com `rootMargin` baseada em porcentagem é instável em telas de larguras muito diferentes — a "linha de ativação" muda com o viewport. A abordagem por `getBoundingClientRect` calcula a posição real da seção relativa ao header sticky em cada evento de scroll, sendo determinística em qualquer largura.

```js
const getActiveSectionId = () => {
  // Lê a altura real do header em tempo real (mobile menu pode expandi-lo)
  const activationLine =
    getMobileMenuAwareHeaderBottom() + SECTION_ACTIVATION_BUFFER_PX;

  let activeSectionId = sections[0]?.id ?? "";
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= activationLine) {
      activeSectionId = section.id;
    }
  }
  return activeSectionId;
};
```

O listener usa `{ passive: true }` para não bloquear o thread principal.

---

### Menu Mobile (Hamburger)

```js
const setMenuExpanded = isOpen => {
  menuToggleButton.setAttribute("aria-expanded", String(isOpen));
  navLinksList.classList.toggle("is-open", isOpen);
};
```

Três condições de fechamento automático:

1. **Clique em link:** usuário selecionou um destino
2. **Clique fora:** `document.addEventListener("click")` verifica se o target está dentro de `menuToggleButton` ou `navLinksList` usando `.contains()`
3. **Clique no toggle novamente:** leitura de `aria-expanded === "true"` inverte o estado

O menu CSS usa `display: none` → `display: flex` via classe `.is-open`, posicionado com `position: absolute` abaixo do header para não deslocar o layout:

```css
.nav__links {
  display: none;
  position: absolute;
  top: var(--header-height); /* ancorado à altura exata do header */
  right: 0;
  left: 0;
}

.nav__links.is-open {
  display: flex;
}
```

---

### Performance

| Técnica              | Implementação                                                 | Benefício                                                                          |
| -------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Preconnect           | `<link rel="preconnect" href="https://fonts.googleapis.com">` | Resolve DNS e handshake TLS de fontes antes do parse do CSS                        |
| Lazy loading         | `loading="lazy"` em imagens de projetos e ícones              | Adia download de assets fora do viewport inicial                                   |
| Eager loading        | `loading="eager"` na foto de perfil                           | Garante carregamento prioritário da imagem hero (LCP)                              |
| Dimensões explícitas | `width` e `height` em todas as `<img>`                        | Reserva espaço no layout antes do download → elimina Cumulative Layout Shift (CLS) |
| JS deferido          | `<script type="module" src="js/main.js">`                     | Módulos ES nativos têm `defer` implícito — não bloqueiam o parser HTML             |
| Scroll passivo       | `{ passive: true }` em todos os listeners de scroll           | Não bloqueia o thread de compositing; garante 60fps de scroll                      |
| innerHTML batching   | `.map().join("")` → uma única atribuição                      | Um único reflow de layout para N elementos                                         |
| Smooth scroll nativo | `html { scroll-behavior: smooth; }`                           | Delegado ao browser/GPU, sem overhead JavaScript                                   |

---

### Preferência por Movimento Reduzido

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Usuários que configuraram "Reduzir movimento" no SO (acessível via Configurações de Acessibilidade no macOS, Windows e Android) recebem uma experiência sem animações — incluindo o scroll suave, os hovers e o fade do botão scroll-to-top. O `!important` é necessário aqui por design: deve sobrescrever todos os valores inline e de componente.

---

### CI/CD — Auto-update do Currículo

O currículo é mantido no Google Drive e atualizado automaticamente via GitHub Actions toda segunda-feira às 09h UTC:

```
.github/workflows/update-cv.yml
```

**Fluxo:**

1. **Download** do PDF do Google Drive usando `curl` com o `GDRIVE_FILE_ID` armazenado em GitHub Secrets
2. **Verificação de integridade:** `md5sum` compara o hash do arquivo baixado com o hash registrado na última release — evita criar uma nova release se o arquivo não mudou
3. **Release automática:** se o hash diferir, cria uma nova GitHub Release com tag versionada por data e anexa o PDF
4. O botão "Baixar Currículo" no portfólio aponta para `releases/latest/download/CV-Eduardo-H-L-Silva.pdf` — a URL é sempre estável e sempre entrega a versão mais recente

**Benefício:** o currículo no site está sempre sincronizado com a versão no Drive sem necessidade de re-deploy manual. O `workflow_dispatch` permite também rodar o pipeline manualmente a qualquer momento.

---

## Como Rodar Localmente

O projeto não tem dependências nem build step:

```bash
# Clone o repositório
git clone https://github.com/itsduzao/portfolio.git
cd portfolio

# Sirva com qualquer servidor HTTP estático (necessário por causa dos ES Modules)
python3 -m http.server 5500
# ou
npx serve .
# ou com a extensão Live Server do VS Code
```

Acesse `http://localhost:5500` no browser.

> **Nota:** `file://` não funciona para ES Modules (`import`/`export`) por CORS policy. Um servidor HTTP local é obrigatório.

---

_Feito com foco em acessibilidade (WCAG 2.1 AA) — Eduardo Henrique, 2026._

