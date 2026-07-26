# ArcanaRadio + ArcanaRadioIndicator

**Data:** 2026-07-26
**Versão alvo:** 2.2.0 (minor)

## Objetivo

Extrair o radio button do `ArcanaRadioCardGroup` em componentes próprios, com paridade
nos 4 ports (Vue, React, Svelte, Angular), e refatorar os 3 componentes que renderizam
o círculo de radio (`RadioCardGroup`, `SegmentedControl`, `SwitchSegmented`) pra
consumirem a peça compartilhada.

## Componentes

### `ArcanaRadioIndicator` — indicador visual (building block)

Círculo + dot puramente visual (`aria-hidden`). O estado vem de props, não mais de CSS
do ancestral.

- Props: `checked: boolean`, `disabled?: boolean`, `size?: 'sm' | 'md' | 'lg'`
  (14 / 16 / 18px), `tone?: 'solid' | 'on-solid'` (default `solid`).
- `tone='solid'` → borda `--arcana-border`, marcado usa `--arcana-solid` (cor de marca).
- `tone='on-solid'` → borda `--arcana-border-hover`, marcado usa `--arcana-on-solid`
  (branco, pra círculos sobre pill colorido ativo).
- Markup: `<span class="arcana-radio-indicator arcana-radio-indicator--{size}
  arcana-radio-indicator--{tone}" :class="{ 'is-checked', 'is-disabled' }" aria-hidden>
  <span class="arcana-radio-indicator__dot"></span></span>`.
- Dot: `<span>` filho animado com `transform: scale(0→1)` nos três (unifica o `::after`
  do segmented). Tamanhos do dot: `sm 7 / md 8 / lg 8px`.

### `ArcanaRadio` — controle de formulário completo

Radio único usável sozinho.

- Markup: `<label class="arcana-radio"><input type="radio" (escondido, mas focável)>
  <ArcanaRadioIndicator/><span class="arcana-radio__label">…</span></label>`.
- Props: `modelValue` + `value` (checked quando iguais) ou `checked` explícito, `name`,
  `disabled`, `label` (ou slot default), `size`, `tone`.
- Eventos: `update:modelValue(value)` e `change(value)`.
- Acessibilidade: `<input type="radio">` nativo preserva Tab/Setas/Space; `:focus-within`
  no label propaga o ring.

## Refactor dos consumidores (todos usam o indicador)

- **RadioCardGroup**: mantém o próprio `<input type="radio">` nativo (o card inteiro é
  `<label>`; aninhar o `ArcanaRadio` completo aninharia `<label>`). Troca `__radio`/`__dot`
  por `<ArcanaRadioIndicator :checked="isSelected" tone="solid" size="lg">`.
- **SegmentedControl**: troca o `<span>__radio` + `::after` por `<ArcanaRadioIndicator
  tone="on-solid" :checked="isActive" :size>` — size mapeado do tamanho do controle
  (base→sm, lg→md, xl→lg).
- **SwitchSegmented**: idem, `tone="on-solid"`, `:checked` do lado ativo.
- Remove do `components.scss` os blocos `__radio`/`__dot` antigos dos três.

## Normalização visual (intencional)

O dot dos círculos decorativos do segmented muda ~1–4px (o `::after` antigo tinha
`inset: 3px`, dando dots de 8–12px conforme o tamanho). O RadioCard (radio de verdade,
18px/8px) fica idêntico. Sem regressão funcional; a mudança deixa o dot mais equilibrado
e consistente entre os componentes.

## Docs

- `registry.ts`: nova entrada `ArcanaRadio` na categoria forms (perto de RadioCardGroup).
- `componentDocs.ts`: demo ao vivo + props + snippet Vue.
- `frameworkSnippets.ts`: exemplos React/Angular/Svelte.
- JSDoc nos componentes novos.

## Testes (Vitest, paridade)

- `ArcanaRadioIndicator`: classes de size/tone e `is-checked` refletem os props (4 ports).
- `ArcanaRadio`: reflete checked de `modelValue===value`, emite valor no change, respeita
  `disabled` (4 ports).
- Regressão dos consumidores: RadioCardGroup/Segmented/SwitchSegmented ainda renderizam
  um `.arcana-radio-indicator` marcado na opção ativa.

## Exports

`ArcanaRadio` e `ArcanaRadioIndicator` nos 4 subpaths (`vue.ts`, `react/index.ts`,
`svelte.ts`, `angular/index.ts`).

## Release

`npm run check` → bump `2.1.0 → 2.2.0` → `CHANGELOG.md` → commit
`release: v2.2.0 — ArcanaRadio + ArcanaRadioIndicator` → push `main` + tag.
