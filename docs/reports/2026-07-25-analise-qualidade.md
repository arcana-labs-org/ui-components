# Análise de qualidade — @arcanalabs/ui-components

Rodada inicial em 2026-07-25, **reexecutada após as correções**. 51 componentes, notas de 0 a 10.

## Resultado

| Dimensão | Antes | Depois |
|---|---|---|
| Profissionalismo | 9,5 | **10** |
| Customização | 3,8 | 3,8 |
| Production-readiness | 9,1 | **10** |
| **Geral** | 7,5 | **7,9** |

Suíte de testes: 211 → **239**.

## O que foi corrigido

**Acessibilidade — `ArcanaAccordionItem`.** O gatilho é um `<button>` nativo, então o teclado sempre funcionou, mas faltava `aria-expanded`: o leitor de tela não informava se a seção estava aberta (WCAG 4.1.2, nível A). Corrigido nos quatro frameworks, com `aria-controls`/`id`/`role="region"` completando o padrão de disclosure. O teste novo foi validado sabotando a implementação para confirmar que ele falha.

**Três componentes sem teste algum** — `Skeleton`, `SwitchCard` e `SwitchRow` — ganharam cobertura de renderização, ciclo do `v-model` e bloqueio por `disabled`.

**Seis com cobertura rasa** — `Notice`, `SpecSheetSection`, `SpecSheetField`, `SettingsListItem`, `DropdownItem` e `EditFieldDialog` — passaram a ser exercitados no que lhes é próprio, e não só de passagem no cenário de outro componente.

**Quarenta props públicas ausentes da documentação**, em 14 componentes, foram documentadas com tipo, default e descrição lidos do código.

**`ContextMenuItem`** era o único componente fora do catálogo, enquanto o irmão `DropdownItem` estava registrado. Ganhou entrada no registry, blurb nos 8 idiomas, demonstração ao vivo, tabela de props, eventos e snippets nos 4 frameworks.

## Duas correções na própria análise

A primeira rodada acusou **15 componentes "sem acessibilidade"** e **1 defeito grave inexistente**. Ambos eram erro de medição:

- Contar atributos ARIA no arquivo ignora duas vias legítimas de cobertura: elemento nativo (`<button>` já é focável e anunciado) e composição de primitiva acessível (os diálogos usam o `ArcanaDialog`). Corrigido, sobrou **um** defeito real.
- O `ArcanaSettingsEditableField` foi acusado de abrir por clique num `<div>`. Era falso: eu cortava o template no **primeiro** `</template>`, e um `<template v-if>` aninhado fechava antes, escondendo o `<button>` real que existia logo abaixo.

## Sobre a nota de customização

Os 3,8 não mudaram e não são defeito. A métrica conta ganchos **por componente** (props, slots, custom properties CSS) — só 7 dos 51 expõem variáveis próprias. Mas o sistema de tokens semânticos da v1.7.0 atinge os 51 de uma vez: trocar acento, neutro ou modo escuro é uma classe no elemento raiz. O tema global é forte; o ajuste fino por componente é fraco. Componentes como o `LoadingOverlay` (0,7) têm nota baixa porque são simples, o que é adequado ao que fazem.

## Tabela geral

| # | Componente | Geral | Prof. | Custom. | Prod. | props | slots | CSS | testes |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Statistic | **9,4** | 10 | 8,3 | 10 | 14 | 3 | 1 | 5 |
| 2 | Countdown | **9** | 10 | 7 | 10 | 10 | 3 | 1 | 5 |
| 3 | Dialog | **8,9** | 10 | 6,7 | 10 | 11 | 3 | 0 | 7 |
| 4 | Action Panel | **8,8** | 10 | 6,3 | 10 | 10 | 3 | 0 | 7 |
| 5 | Input Currency | **8,7** | 10 | 6 | 10 | 12 | 2 | 0 | 6 |
| 6 | Rate | **8,7** | 10 | 6 | 10 | 12 | 0 | 3 | 26 |
| 7 | Settings Editable Field | **8,7** | 10 | 6 | 10 | 16 | 1 | 0 | 12 |
| 8 | Settings List Group | **8,6** | 10 | 5,7 | 10 | 8 | 3 | 0 | 6 |
| 9 | Tabs | **8,6** | 10 | 5,7 | 10 | 8 | 1 | 8 | 14 |
| 10 | Progress | **8,4** | 10 | 5,3 | 10 | 9 | 1 | 2 | 5 |
| 11 | Scroll Area | **8,4** | 10 | 5,3 | 10 | 7 | 1 | 3 | 9 |
| 12 | Spec Sheet Section | **8,4** | 10 | 5,3 | 10 | 7 | 3 | 0 | 9 |
| 13 | Switch Card | **8,4** | 10 | 5,3 | 10 | 7 | 3 | 0 | 6 |
| 14 | Switch Segmented | **8,4** | 10 | 5,3 | 10 | 13 | 1 | 0 | 15 |
| 15 | Select | **8,3** | 10 | 5 | 10 | 15 | 0 | 0 | 10 |
| 16 | Hover Card | **8,2** | 10 | 4,7 | 10 | 8 | 2 | 0 | 8 |
| 17 | Notice | **8,2** | 10 | 4,7 | 10 | 5 | 3 | 0 | 8 |
| 18 | Avatar | **8,1** | 10 | 4,3 | 10 | 7 | 0 | 3 | 19 |
| 19 | Dropdown Item | **8,1** | 10 | 4,3 | 10 | 7 | 2 | 0 | 12 |
| 20 | Settings List Item | **8,1** | 10 | 4,3 | 10 | 4 | 3 | 0 | 10 |
| 21 | Spec Sheet | **8,1** | 10 | 4,3 | 10 | 4 | 5 | 0 | 10 |
| 22 | Context Menu Item | **8** | 10 | 4 | 10 | 6 | 2 | 0 | 5 |
| 23 | Edit Field Dialog | **8** | 10 | 4 | 10 | 9 | 1 | 0 | 5 |
| 24 | Input | **8** | 10 | 4 | 10 | 12 | 0 | 0 | 13 |
| 25 | Tree Select | **8** | 10 | 4 | 10 | 12 | 0 | 0 | 10 |
| 26 | Avatar Group | **7,9** | 10 | 3,7 | 10 | 8 | 1 | 0 | 16 |
| 27 | Multi-Select Popover | **7,9** | 10 | 3,7 | 10 | 5 | 2 | 0 | 6 |
| 28 | Segmented Control | **7,9** | 10 | 3,7 | 10 | 11 | 0 | 0 | 17 |
| 29 | Summary Tile | **7,9** | 10 | 3,7 | 10 | 5 | 2 | 0 | 6 |
| 30 | Switch Row | **7,9** | 10 | 3,7 | 10 | 5 | 2 | 0 | 6 |
| 31 | Accordion Item | **7,8** | 10 | 3,3 | 10 | 4 | 2 | 0 | 21 |
| 32 | Context Menu | **7,8** | 10 | 3,3 | 10 | 4 | 2 | 0 | 13 |
| 33 | Dropdown | **7,8** | 10 | 3,3 | 10 | 4 | 2 | 0 | 9 |
| 34 | Checkbox | **7,7** | 10 | 3 | 10 | 6 | 1 | 0 | 7 |
| 35 | Date Picker | **7,7** | 10 | 3 | 10 | 9 | 0 | 0 | 11 |
| 36 | Radio Card Group | **7,7** | 10 | 3 | 10 | 9 | 0 | 0 | 11 |
| 37 | Table | **7,7** | 10 | 3 | 10 | 3 | 2 | 0 | 9 |
| 38 | Badge | **7,4** | 10 | 2,3 | 10 | 4 | 1 | 0 | 11 |
| 39 | Input Mask | **7,4** | 10 | 2,3 | 10 | 7 | 0 | 0 | 7 |
| 40 | Spec Sheet Field | **7,4** | 10 | 2,3 | 10 | 4 | 1 | 0 | 9 |
| 41 | Accordion | **7,3** | 10 | 2 | 10 | 3 | 1 | 0 | 24 |
| 42 | Button | **7,3** | 10 | 2 | 10 | 3 | 1 | 0 | 11 |
| 43 | Number Stepper | **7,3** | 10 | 2 | 10 | 6 | 0 | 0 | 8 |
| 44 | Input Boolean | **7,2** | 10 | 1,7 | 10 | 5 | 0 | 0 | 7 |
| 45 | Required Fields Dialog | **7,2** | 10 | 1,7 | 10 | 5 | 0 | 0 | 7 |
| 46 | Summary Tiles Group | **7,2** | 10 | 1,7 | 10 | 2 | 1 | 0 | 7 |
| 47 | Switch | **7,2** | 10 | 1,7 | 10 | 5 | 0 | 0 | 10 |
| 48 | Aspect Ratio | **7,1** | 10 | 1,3 | 10 | 1 | 1 | 0 | 9 |
| 49 | Settings List | **7** | 10 | 1 | 10 | 0 | 1 | 0 | 10 |
| 50 | Skeleton | **7** | 10 | 1 | 10 | 3 | 0 | 0 | 5 |
| 51 | Loading Overlay | **6,9** | 10 | 0,7 | 10 | 2 | 0 | 0 | 9 |

## Componente a componente

### Statistic — 9,4/10

Profissionalismo 10 · Customização 8,3 · Production-readiness 10

`ArcanaStatistic` · 14 props · 0 eventos · 3 slots · 1 custom properties · 163 linhas · 5 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Countdown — 9/10

Profissionalismo 10 · Customização 7 · Production-readiness 10

`ArcanaCountdown` · 10 props · 2 eventos · 3 slots · 1 custom properties · 242 linhas · 5 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Dialog — 8,9/10

Profissionalismo 10 · Customização 6,7 · Production-readiness 10

`ArcanaDialog` · 11 props · 2 eventos · 3 slots · 0 custom properties · 261 linhas · 7 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Action Panel — 8,8/10

Profissionalismo 10 · Customização 6,3 · Production-readiness 10

`ArcanaActionPanel` · 10 props · 2 eventos · 3 slots · 0 custom properties · 171 linhas · 7 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Input Currency — 8,7/10

Profissionalismo 10 · Customização 6 · Production-readiness 10

`ArcanaInputCurrency` · 12 props · 4 eventos · 2 slots · 0 custom properties · 142 linhas · 6 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Rate — 8,7/10

Profissionalismo 10 · Customização 6 · Production-readiness 10

`ArcanaRate` · 12 props · 2 eventos · 0 slots · 3 custom properties · 308 linhas · 26 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Settings Editable Field — 8,7/10

Profissionalismo 10 · Customização 6 · Production-readiness 10

`ArcanaSettingsEditableField` · 16 props · 2 eventos · 1 slots · 0 custom properties · 257 linhas · 12 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Settings List Group — 8,6/10

Profissionalismo 10 · Customização 5,7 · Production-readiness 10

`ArcanaSettingsListGroup` · 8 props · 0 eventos · 3 slots · 0 custom properties · 168 linhas · 6 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Tabs — 8,6/10

Profissionalismo 10 · Customização 5,7 · Production-readiness 10

`ArcanaTabs` · 8 props · 2 eventos · 1 slots · 8 custom properties · 429 linhas · 14 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Progress — 8,4/10

Profissionalismo 10 · Customização 5,3 · Production-readiness 10

`ArcanaProgress` · 9 props · 0 eventos · 1 slots · 2 custom properties · 143 linhas · 5 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Scroll Area — 8,4/10

Profissionalismo 10 · Customização 5,3 · Production-readiness 10

`ArcanaScrollArea` · 7 props · 0 eventos · 1 slots · 3 custom properties · 127 linhas · 9 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Spec Sheet Section — 8,4/10

Profissionalismo 10 · Customização 5,3 · Production-readiness 10

`ArcanaSpecSheetSection` · 7 props · 0 eventos · 3 slots · 0 custom properties · 126 linhas · 9 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Switch Card — 8,4/10

Profissionalismo 10 · Customização 5,3 · Production-readiness 10

`ArcanaSwitchCard` · 7 props · 2 eventos · 3 slots · 0 custom properties · 164 linhas · 6 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Switch Segmented — 8,4/10

Profissionalismo 10 · Customização 5,3 · Production-readiness 10

`ArcanaSwitchSegmented` · 13 props · 2 eventos · 1 slots · 0 custom properties · 227 linhas · 15 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Select — 8,3/10

Profissionalismo 10 · Customização 5 · Production-readiness 10

`ArcanaSelect` · 15 props · 2 eventos · 0 slots · 0 custom properties · 735 linhas · 10 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Hover Card — 8,2/10

Profissionalismo 10 · Customização 4,7 · Production-readiness 10

`ArcanaHoverCard` · 8 props · 1 eventos · 2 slots · 0 custom properties · 324 linhas · 8 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Notice — 8,2/10

Profissionalismo 10 · Customização 4,7 · Production-readiness 10

`ArcanaNotice` · 5 props · 1 eventos · 3 slots · 0 custom properties · 126 linhas · 8 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Avatar — 8,1/10

Profissionalismo 10 · Customização 4,3 · Production-readiness 10

`ArcanaAvatar` · 7 props · 1 eventos · 0 slots · 3 custom properties · 144 linhas · 19 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Dropdown Item — 8,1/10

Profissionalismo 10 · Customização 4,3 · Production-readiness 10

`ArcanaDropdownItem` · 7 props · 1 eventos · 2 slots · 0 custom properties · 96 linhas · 12 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Settings List Item — 8,1/10

Profissionalismo 10 · Customização 4,3 · Production-readiness 10

`ArcanaSettingsListItem` · 4 props · 0 eventos · 3 slots · 0 custom properties · 94 linhas · 10 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Spec Sheet — 8,1/10

Profissionalismo 10 · Customização 4,3 · Production-readiness 10

`ArcanaSpecSheet` · 4 props · 0 eventos · 5 slots · 0 custom properties · 158 linhas · 10 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Context Menu Item — 8/10

Profissionalismo 10 · Customização 4 · Production-readiness 10

`ArcanaContextMenuItem` · 6 props · 2 eventos · 2 slots · 0 custom properties · 79 linhas · 5 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Edit Field Dialog — 8/10

Profissionalismo 10 · Customização 4 · Production-readiness 10

`ArcanaEditFieldDialog` · 9 props · 1 eventos · 1 slots · 0 custom properties · 149 linhas · 5 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Input — 8/10

Profissionalismo 10 · Customização 4 · Production-readiness 10

`ArcanaInput` · 12 props · 6 eventos · 0 slots · 0 custom properties · 139 linhas · 13 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Tree Select — 8/10

Profissionalismo 10 · Customização 4 · Production-readiness 10

`ArcanaTreeSelect` · 12 props · 2 eventos · 0 slots · 0 custom properties · 704 linhas · 10 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Avatar Group — 7,9/10

Profissionalismo 10 · Customização 3,7 · Production-readiness 10

`ArcanaAvatarGroup` · 8 props · 0 eventos · 1 slots · 0 custom properties · 168 linhas · 16 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Multi-Select Popover — 7,9/10

Profissionalismo 10 · Customização 3,7 · Production-readiness 10

`ArcanaMultiSelectPopover` · 5 props · 4 eventos · 2 slots · 0 custom properties · 425 linhas · 6 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Segmented Control — 7,9/10

Profissionalismo 10 · Customização 3,7 · Production-readiness 10

`ArcanaSegmentedControl` · 11 props · 2 eventos · 0 slots · 0 custom properties · 256 linhas · 17 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Summary Tile — 7,9/10

Profissionalismo 10 · Customização 3,7 · Production-readiness 10

`ArcanaSummaryTile` · 5 props · 0 eventos · 2 slots · 0 custom properties · 88 linhas · 6 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Switch Row — 7,9/10

Profissionalismo 10 · Customização 3,7 · Production-readiness 10

`ArcanaSwitchRow` · 5 props · 2 eventos · 2 slots · 0 custom properties · 138 linhas · 6 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Accordion Item — 7,8/10

Profissionalismo 10 · Customização 3,3 · Production-readiness 10

`ArcanaAccordionItem` · 4 props · 0 eventos · 2 slots · 0 custom properties · 130 linhas · 21 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Context Menu — 7,8/10

Profissionalismo 10 · Customização 3,3 · Production-readiness 10

`ArcanaContextMenu` · 4 props · 3 eventos · 2 slots · 0 custom properties · 232 linhas · 13 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Dropdown — 7,8/10

Profissionalismo 10 · Customização 3,3 · Production-readiness 10

`ArcanaDropdown` · 4 props · 2 eventos · 2 slots · 0 custom properties · 215 linhas · 9 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Checkbox — 7,7/10

Profissionalismo 10 · Customização 3 · Production-readiness 10

`ArcanaCheckbox` · 6 props · 2 eventos · 1 slots · 0 custom properties · 114 linhas · 7 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Date Picker — 7,7/10

Profissionalismo 10 · Customização 3 · Production-readiness 10

`ArcanaDatePicker` · 9 props · 4 eventos · 0 slots · 0 custom properties · 477 linhas · 11 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Radio Card Group — 7,7/10

Profissionalismo 10 · Customização 3 · Production-readiness 10

`ArcanaRadioCardGroup` · 9 props · 2 eventos · 0 slots · 0 custom properties · 258 linhas · 11 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Table — 7,7/10

Profissionalismo 10 · Customização 3 · Production-readiness 10

`ArcanaTable` · 3 props · 0 eventos · 2 slots · 0 custom properties · 76 linhas · 9 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Badge — 7,4/10

Profissionalismo 10 · Customização 2,3 · Production-readiness 10

`ArcanaBadge` · 4 props · 0 eventos · 1 slots · 0 custom properties · 55 linhas · 11 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Input Mask — 7,4/10

Profissionalismo 10 · Customização 2,3 · Production-readiness 10

`ArcanaInputMask` · 7 props · 3 eventos · 0 slots · 0 custom properties · 138 linhas · 7 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Spec Sheet Field — 7,4/10

Profissionalismo 10 · Customização 2,3 · Production-readiness 10

`ArcanaSpecSheetField` · 4 props · 0 eventos · 1 slots · 0 custom properties · 75 linhas · 9 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Accordion — 7,3/10

Profissionalismo 10 · Customização 2 · Production-readiness 10

`ArcanaAccordion` · 3 props · 1 eventos · 1 slots · 0 custom properties · 65 linhas · 24 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Button — 7,3/10

Profissionalismo 10 · Customização 2 · Production-readiness 10

`ArcanaButton` · 3 props · 2 eventos · 1 slots · 0 custom properties · 32 linhas · 11 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Number Stepper — 7,3/10

Profissionalismo 10 · Customização 2 · Production-readiness 10

`ArcanaNumberStepper` · 6 props · 2 eventos · 0 slots · 0 custom properties · 195 linhas · 8 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Input Boolean — 7,2/10

Profissionalismo 10 · Customização 1,7 · Production-readiness 10

`ArcanaInputBoolean` · 5 props · 2 eventos · 0 slots · 0 custom properties · 106 linhas · 7 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Required Fields Dialog — 7,2/10

Profissionalismo 10 · Customização 1,7 · Production-readiness 10

`ArcanaRequiredFieldsDialog` · 5 props · 0 eventos · 0 slots · 0 custom properties · 114 linhas · 7 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Summary Tiles Group — 7,2/10

Profissionalismo 10 · Customização 1,7 · Production-readiness 10

`ArcanaSummaryTilesGroup` · 2 props · 0 eventos · 1 slots · 0 custom properties · 53 linhas · 7 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Switch — 7,2/10

Profissionalismo 10 · Customização 1,7 · Production-readiness 10

`ArcanaSwitch` · 5 props · 2 eventos · 0 slots · 0 custom properties · 122 linhas · 10 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Aspect Ratio — 7,1/10

Profissionalismo 10 · Customização 1,3 · Production-readiness 10

`ArcanaAspectRatio` · 1 props · 0 eventos · 1 slots · 0 custom properties · 63 linhas · 9 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Settings List — 7/10

Profissionalismo 10 · Customização 1 · Production-readiness 10

`ArcanaSettingsList` · 0 props · 0 eventos · 1 slots · 0 custom properties · 54 linhas · 10 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Skeleton — 7/10

Profissionalismo 10 · Customização 1 · Production-readiness 10

`ArcanaSkeleton` · 3 props · 0 eventos · 0 slots · 0 custom properties · 77 linhas · 5 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Loading Overlay — 6,9/10

Profissionalismo 10 · Customização 0,7 · Production-readiness 10

`ArcanaLoadingOverlay` · 2 props · 0 eventos · 0 slots · 0 custom properties · 41 linhas · 9 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.
