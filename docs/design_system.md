# Design System — Oficina 3 Irmãos
**Projeto:** Landing Page de Alta Conversão para Oficina Mecânica e Motopeças  
**Localização:** Conceição do Coité - BA  
**Conceito Visual:** Automotive Detailing High-End & Motorsport (Baseado nas referências da Tint Garage adaptadas para identidade Racing da Oficina 3 Irmãos).

---

## 1. Paleta de Cores (Opção 1 - Vermelho Racing + Base Clean & Dark Footer)

### Cores Primárias e Acentos
* **Primary Racing Red:** `#E52229` (Substituto do ciano da referência; cor de destaque máxima para botões, barras verticais e detalhes de performance).
* **Primary Red Hover / Glow:** `#C4181F` / `rgba(229, 34, 41, 0.25)` (Efeito de iluminação e hover).
* **Deep Racing Crimson:** `#8B0000` (Degradês e sombras esportivas).

### Neutros e Superfícies (Base Clean das Seções 1 a 4)
* **Background Clean:** `#F4F6F9` (Cinza off-white tecnológico idêntico à referência).
* **Card Surface Light:** `#FFFFFF` (Branco puro para os cards de serviços e blocos).
* **Border Light:** `#E2E6EC` (Bordas sutis e divisores).
* **Watermark Text:** `rgba(17, 19, 23, 0.04)` (Tipografia gigante ao fundo em marca d'água).

### Neutros Escuros (Rodapé e Elementos de Alto Contraste - Seção 5)
* **Dark Background (Footer):** `#0B0D11` (Preto asfalto/carbono profundo).
* **Dark Surface Card:** `#14171E` (Superfície dos cards no modo escuro).
* **Dark Border:** `#222631` (Bordas no rodapé).

### Tipografia e Textos
* **Text Main Dark:** `#0F1217` (Preto grafite de alta legibilidade para títulos e parágrafos na base clara).
* **Text Muted:** `#5A6270` (Cinza intermediário para descrições secundárias).
* **Text Light (Footer):** `#F8FAFC` (Branco/gelo para títulos no rodapé).
* **Text Muted (Footer):** `#8E98A8` (Cinza suave para parágrafos no rodapé).

---

## 2. Tipografia

A referência utiliza uma fonte **Display Estendida e Geométrica** (estilo *Monument Extended / Syncopate*), com presença marcante e arrojada.

* **Títulos Display / Hero / Headings (Idêntica à Referência):**
  * Fonte: `'Syncopate', sans-serif` (Google Fonts, 700 Bold, Uppercase)
  * Fonte Alternativa / Suporte Display: `'Chakra Petch', sans-serif` (Google Fonts, 600/700)
  * Características: `letter-spacing: -0.02em` a `0.04em`, caixa alta estrita, largura expandida.
* **Corpo de Texto, Subtítulos e Navegação:**
  * Fonte: `'Plus Jakarta Sans', sans-serif` (Google Fonts, pesos 400, 500, 600, 700)
  * Características: legibilidade perfeita em celulares, traço limpo e contemporâneo.

---

## 3. Espaçamentos e Grid
* **Container Máximo:** `1280px` (com padding lateral fluido de `24px` no mobile e `40px` no desktop).
* **Espaçamento entre seções:** `100px` a `140px` no desktop; `60px` a `80px` no mobile.
* **Border Radius Padrão:**
  * Botões: `4px` (retangulares com cantos levemente suavizados, exatamente como na referência).
  * Cards e Imagens: `6px` a `8px` (geometria esportiva, sem arredondamentos excessivos).

---

## 4. Componentes Base

### Botão Principal (CTA WhatsApp / Orçamento)
* Fundo: `#E52229` (Vermelho Racing sólido).
* Texto: `#FFFFFF` (Branco, Caixa alta, `font-weight: 700`, `letter-spacing: 0.05em`).
* Efeito Hover: leve deslocamento superior (`translateY(-2px)`) com sombra difusa `0 8px 24px rgba(229, 34, 41, 0.35)`.

### Barra Indicadora de Seção
* Traço vertical sólido de `3px` de largura com a cor de acento `#E52229` ao lado de subtítulos em itálico (como visto em todas as seções da referência).

### Cards de Serviço Horizontais
* Grid dividido (50% imagem real / 50% conteúdo com tipografia display e botão alinhado à esquerda).

### Slider Antes x Depois (Seção 4)
* Imagem de alta resolução dividida por divisor vertical interativo com arraste por toque e mouse.

---

## 5. Motion Design & Animações
* **Smooth Scroll:** Implementado via **Lenis Scroll** para rolagem suave.
* **GSAP + ScrollTrigger:**
  * Entrada das palavras dos títulos com leve revelação de baixo para cima (`stagger: 0.08s`).
  * Parallax suave na moto do Hero da Seção 1.
  * Efeito de arraste suave no slider de Antes x Depois da Seção 4.
