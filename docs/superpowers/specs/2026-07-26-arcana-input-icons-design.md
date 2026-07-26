# ArcanaInput — ícones no início e no fim

**Data:** 2026-07-26
**Versão alvo:** 2.1.0 (minor)

## Objetivo

Permitir renderizar um ícone (ou qualquer conteúdo custom) no início e/ou no fim do
`ArcanaInput`, com paridade entre os 4 ports (Vue, React, Svelte, Angular) e sem
quebrar consumidores existentes.

## API — conteúdo flexível (slots)

Dois pontos de conteúdo nomeados semanticamente como "ícone início/fim", aceitando
qualquer conteúdo (SVG, `<i class>`, texto como `@`/`kg`).

| Framework | Início | Fim |
|---|---|---|
| Vue | slot `#icon-start` | slot `#icon-end` |
| React | prop `iconStart?: ReactNode` | `iconEnd?: ReactNode` |
| Svelte | snippet `iconStart` | snippet `iconEnd` |
| Angular | `@Input() iconStart?: TemplateRef` | `@Input() iconEnd?: TemplateRef` |

## Estrutura DOM

Só quando há ao menos um ícone. Sem ícone, o componente continua sendo um `<input>`
puro (zero breaking change no DOM de quem já usa).

```html
<div class="arcana-input-wrap arcana-input-wrap--md">
  <span class="arcana-input__icon arcana-input__icon--start"><!-- conteúdo --></span>
  <input class="arcana-input arcana-input--md arcana-input--icon-start arcana-input--icon-end" ... />
  <span class="arcana-input__icon arcana-input__icon--end"><!-- conteúdo --></span>
</div>
```

## CSS (`src/styles/components.scss`)

- `.arcana-input-wrap` — `position: relative; display: flex; align-items: center;`
- `.arcana-input__icon` — absoluto, `pointer-events: none`, cor `--arcana-text-placeholder`,
  `display: flex; align-items: center;`. `--start { left }`, `--end { right }`.
- `.arcana-input--icon-start` / `--icon-end` — padding extra no lado do ícone.
- Offsets/padding ajustados por tamanho (`sm`/`md`/`lg`).

## Angular — sem mudar o selector

`selector: "input[arcanaInput]"` permanece (nada quebra). Quando `iconStart`/`iconEnd`
existem, o directive envolve a si mesmo imperativamente via `Renderer2` +
`ViewContainerRef`: cria `<div.arcana-input-wrap>`, move o input pra dentro e projeta
os `TemplateRef` nos `<span>` de ícone. Sem ícone, não faz nada.

## Docs

- Registro do `ArcanaInput` em `docs/src/components/componentDocs.ts` ganha as props novas.
- `snippets.ts` / `frameworkSnippets.ts`: exemplo com ícone de busca no início e ícone no fim.
- JSDoc dos 4 componentes atualizado.

## Testes (Vitest, paridade)

- Renderiza wrapper + ícones quando os slots estão presentes.
- Renderiza `<input>` puro quando ausentes (regressão de compatibilidade).
- Cobre os 4 ports.

## Fora de escopo (YAGNI)

- Não adicionar fonte de ícones (lib é zero-dep; consumidor traz o ícone).
- Não mexer no DOM quando não há slot.

## Release

`npm run check` → bump `2.0.0 → 2.1.0` → `CHANGELOG.md` → commit
`release: v2.1.0 — ícones start/end no ArcanaInput` → push `main` + tag.
