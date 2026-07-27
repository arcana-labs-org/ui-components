# ArcanaTooltip

**Data:** 2026-07-26
**Versão alvo:** 2.3.0 (minor)

## Objetivo

Novo componente `ArcanaTooltip` nos 4 ports (Vue, React, Svelte, Angular): balão de
texto curto que abre ao passar o mouse (ou focar) o gatilho. Versão enxuta e opinativa
do `ArcanaHoverCard`, reaproveitando o posicionamento existente.

## Estrutura

Espelha o `ArcanaHoverCard`: gatilho inline (slot `trigger`) + balão TELEPORTADO pro
`<body>` com `position: fixed`, posicionado por `placeHoverCard` (`core/hover-card`,
com flip automático). Balão com `role="tooltip"`.

## API

- `label` — texto do tooltip (caso comum). Slot default opcional pra conteúdo rico;
  se o slot existe usa ele, senão renderiza `label`.
- `side` — `'top' | 'right' | 'bottom' | 'left'` (default `'top'`).
- `align` — `'start' | 'center' | 'end'` (default `'center'`).
- `placement` — atalho `'{side}-{align}'`; quando informado, vence `side`/`align`.
- `offset` — distância gatilho → balão (default `6`).
- `openDelay` — ms até abrir no `mouseenter` (default `200`; foco por teclado abre na hora).
- `closeDelay` — ms de carência antes de fechar (default `0`).
- `arrow` — mostra a setinha (default `true`).
- `disabled` — nunca abre.
- `panelClass` — classe extra no balão teleportado (tema por instância).
- Slots: `trigger` e default. Emite `open-change(boolean)`.

## Setinha (arrow)

Triângulo no balão apontando pro gatilho. A posição da seta é calculada a partir do
centro do gatilho relativo ao balão (não só do balão), então aponta certo mesmo com
`align` start/end ou quando o balão é clampado na borda. O offset da seta é preso
(clamp) pra não escapar da bolha.

## Interação / acessibilidade

- Abre no `mouseenter`/`focusin`; fecha no `mouseleave`/`focusout`/`Escape`.
- Balão é `pointer-events: none` (não se navega pra dentro de um tooltip) — dispensa a
  "ponte" de hover do HoverCard.
- Gatilho recebe `aria-describedby` apontando pro balão enquanto aberto.
- Reposiciona em scroll (capture) e resize.

## Posicionamento

Reusa `placeHoverCard` + os tipos `HoverCardSide/Align/Placement` do core, reexpostos
como `TooltipSide/TooltipAlign/TooltipPlacement` (aliases) em cada port. Nenhum core novo.

## Estilo

Novo `src/styles/parts/tooltip.scss`, importado no `components.scss`. Balão escuro com
tokens existentes: fundo `var(--arcana-solid)`, texto `var(--arcana-on-solid)`, radius
pequeno, sombra sutil, `max-width` com quebra de texto. Seta na mesma cor de fundo.

## Docs (todas as línguas e frameworks)

- `registry.ts`: entrada `ArcanaTooltip`, categoria `overlay`, `docKey: "tooltip"`.
- `i18n/types.ts`: novo `DocumentedKey` `"tooltip"`; blurb nas 8 locales.
- `componentDocs.ts`: demo ao vivo com vários exemplos (botão, ícone, 4 lados, com/sem
  seta) + props + `vueSnippet`.
- `frameworkSnippets.ts`: exemplos React/Angular/Svelte.

## Testes (Vitest, paridade)

Nos 4 ports: renderiza o gatilho; `mouseenter` abre `role="tooltip"` com o `label`;
`mouseleave`/`Escape` fecha; `disabled` não abre; classe `--{side}` reflete o lado.
Usa `openDelay: 0`.

## Exports

`ArcanaTooltip` + tipos `TooltipSide/TooltipAlign/TooltipPlacement` nos 4 subpaths.

## Release

`npm run check` → bump `2.2.0 → 2.3.0` → `CHANGELOG.md` → commit
`release: v2.3.0 — ArcanaTooltip` → push `main` + tag.
