# Análise de qualidade — @arcanalabs/ui-components v1.8.0

Gerado em 2026-07-25 · 51 componentes · notas de 0 a 10

## Como a nota é calculada

Rubrica explícita, aplicada por script sobre métricas extraídas do código — a intenção é que se possa recalcular e discordar de um peso, em vez de confiar em impressão.

**Profissionalismo** parte de 10 e desconta: defeito de acessibilidade confirmado (−4); interativo sem cobertura de a11y por via nenhuma (−2); props públicas ausentes da tabela da docs (até −3, proporcional); eventos não documentados (−1,5); fora do catálogo (−4); menos de 3 snippets de framework (−1,5).

**Customização** soma o que o consumidor consegue adaptar: props (até 5 pontos), slots (até 3) e custom properties CSS (até 2). É medida absoluta, não comparativa — nota baixa aqui descreve um componente simples, não um componente ruim.

**Production-readiness** parte de 10 e desconta: sem teste algum (−4) ou cobertura rasa (−2); defeito de acessibilidade confirmado (−3); paridade incompleta entre frameworks (−3); API pública maior que a documentada (−1).

### Ressalva sobre a nota de customização

A média de customização (3,8) subestima a realidade. A lib ganhou na v1.7.0 um sistema de tokens semânticos que se aplica aos **51** componentes de uma vez — trocar acento, neutro ou modo escuro é uma classe no elemento raiz. A métrica de custom properties conta apenas os ganchos *por componente*, que são mesmo poucos (7 de 51). São eixos diferentes: o tema global é forte, o ajuste fino por componente é fraco.

## Médias

| Dimensão | Média |
|---|---|
| Profissionalismo | 9,5 |
| Customização | 3,8 |
| Production-readiness | 9,1 |
| **Geral** | **7,5** |

## Tabela geral

| # | Componente | Geral | Prof. | Custom. | Prod. | props | slots | CSS | testes |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Statistic | **9** | 9,8 | 8,3 | 9 | 14 | 3 | 1 | 5 |
| 2 | Action Panel | **8,8** | 10 | 6,3 | 10 | 10 | 3 | 0 | 7 |
| 3 | Rate | **8,7** | 10 | 6 | 10 | 12 | 0 | 3 | 26 |
| 4 | Countdown | **8,6** | 9,7 | 7 | 9 | 10 | 3 | 1 | 5 |
| 5 | Settings List Group | **8,6** | 10 | 5,7 | 10 | 8 | 3 | 0 | 6 |
| 6 | Progress | **8,4** | 10 | 5,3 | 10 | 9 | 1 | 2 | 5 |
| 7 | Scroll Area | **8,4** | 10 | 5,3 | 10 | 7 | 1 | 3 | 9 |
| 8 | Hover Card | **8,2** | 10 | 4,7 | 10 | 8 | 2 | 0 | 8 |
| 9 | Input Currency | **8,2** | 9,5 | 6 | 9 | 12 | 2 | 0 | 6 |
| 10 | Avatar | **8,1** | 10 | 4,3 | 10 | 7 | 0 | 3 | 19 |
| 11 | Dialog | **8,1** | 8,6 | 6,7 | 9 | 11 | 3 | 0 | 7 |
| 12 | Spec Sheet | **8,1** | 10 | 4,3 | 10 | 4 | 5 | 0 | 6 |
| 13 | Tabs | **8** | 9,3 | 5,7 | 9 | 8 | 1 | 8 | 14 |
| 14 | Avatar Group | **7,9** | 10 | 3,7 | 10 | 8 | 1 | 0 | 16 |
| 15 | Multi-Select Popover | **7,9** | 10 | 3,7 | 10 | 5 | 2 | 0 | 6 |
| 16 | Segmented Control | **7,9** | 10 | 3,7 | 10 | 11 | 0 | 0 | 17 |
| 17 | Select | **7,9** | 9,8 | 5 | 9 | 15 | 0 | 0 | 10 |
| 18 | Summary Tile | **7,9** | 10 | 3,7 | 10 | 5 | 2 | 0 | 6 |
| 19 | Switch Segmented | **7,9** | 9,5 | 5,3 | 9 | 13 | 1 | 0 | 15 |
| 20 | Context Menu | **7,8** | 10 | 3,3 | 10 | 4 | 2 | 0 | 13 |
| 21 | Dropdown | **7,8** | 10 | 3,3 | 10 | 4 | 2 | 0 | 6 |
| 22 | Spec Sheet Section | **7,8** | 10 | 5,3 | 8 | 7 | 3 | 0 | 3 |
| 23 | Checkbox | **7,7** | 10 | 3 | 10 | 6 | 1 | 0 | 7 |
| 24 | Radio Card Group | **7,7** | 10 | 3 | 10 | 9 | 0 | 0 | 11 |
| 25 | Table | **7,7** | 10 | 3 | 10 | 3 | 2 | 0 | 9 |
| 26 | Notice | **7,6** | 10 | 4,7 | 8 | 5 | 3 | 0 | 1 |
| 27 | Tree Select | **7,6** | 9,8 | 4 | 9 | 12 | 0 | 0 | 10 |
| 28 | Badge | **7,4** | 10 | 2,3 | 10 | 4 | 1 | 0 | 11 |
| 29 | Dropdown Item | **7,4** | 10 | 4,3 | 8 | 7 | 2 | 0 | 3 |
| 30 | Input Mask | **7,4** | 10 | 2,3 | 10 | 7 | 0 | 0 | 7 |
| 31 | Settings List Item | **7,4** | 10 | 4,3 | 8 | 4 | 3 | 0 | 4 |
| 32 | Button | **7,3** | 10 | 2 | 10 | 3 | 1 | 0 | 11 |
| 33 | Number Stepper | **7,3** | 10 | 2 | 10 | 6 | 0 | 0 | 8 |
| 34 | Date Picker | **7,2** | 9,7 | 3 | 9 | 9 | 0 | 0 | 11 |
| 35 | Input | **7,2** | 8,5 | 4 | 9 | 12 | 0 | 0 | 13 |
| 36 | Input Boolean | **7,2** | 10 | 1,7 | 10 | 5 | 0 | 0 | 7 |
| 37 | Required Fields Dialog | **7,2** | 10 | 1,7 | 10 | 5 | 0 | 0 | 7 |
| 38 | Summary Tiles Group | **7,2** | 10 | 1,7 | 10 | 2 | 1 | 0 | 7 |
| 39 | Switch | **7,2** | 10 | 1,7 | 10 | 5 | 0 | 0 | 10 |
| 40 | Aspect Ratio | **7,1** | 10 | 1,3 | 10 | 1 | 1 | 0 | 9 |
| 41 | Switch Card | **7,1** | 10 | 5,3 | 6 | 7 | 3 | 0 | 0 |
| 42 | Settings List | **7** | 10 | 1 | 10 | 0 | 1 | 0 | 6 |
| 43 | Loading Overlay | **6,9** | 10 | 0,7 | 10 | 2 | 0 | 0 | 9 |
| 44 | Spec Sheet Field | **6,8** | 10 | 2,3 | 8 | 4 | 1 | 0 | 3 |
| 45 | Accordion | **6,7** | 8 | 2 | 10 | 3 | 1 | 0 | 20 |
| 46 | Edit Field Dialog | **6,6** | 8,7 | 4 | 7 | 9 | 1 | 0 | 4 |
| 47 | Switch Row | **6,6** | 10 | 3,7 | 6 | 5 | 2 | 0 | 0 |
| 48 | Settings Editable Field | **5,7** | 5,1 | 6 | 6 | 16 | 1 | 0 | 9 |
| 49 | Skeleton | **5,7** | 10 | 1 | 6 | 3 | 0 | 0 | 0 |
| 50 | Accordion Item | **4,9** | 5,3 | 3,3 | 6 | 4 | 2 | 0 | 17 |
| 51 | ContextMenuItem | **4,8** | 1,5 | 4 | 9 | 6 | 2 | 0 | 5 |

## Componente a componente

### Statistic — 9/10

Profissionalismo 9,8 · Customização 8,3 · Production-readiness 9

`ArcanaStatistic` · 14 props · 0 eventos · 3 slots · 1 custom properties · 163 linhas · 5 referências em teste · 4/4 frameworks

Descontos:
- 1 prop(s) sem documentação (−0.2)
- API pública maior que a documentada (−1)

### Action Panel — 8,8/10

Profissionalismo 10 · Customização 6,3 · Production-readiness 10

`ArcanaActionPanel` · 10 props · 2 eventos · 3 slots · 0 custom properties · 171 linhas · 7 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Rate — 8,7/10

Profissionalismo 10 · Customização 6 · Production-readiness 10

`ArcanaRate` · 12 props · 2 eventos · 0 slots · 3 custom properties · 308 linhas · 26 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Countdown — 8,6/10

Profissionalismo 9,7 · Customização 7 · Production-readiness 9

`ArcanaCountdown` · 10 props · 2 eventos · 3 slots · 1 custom properties · 242 linhas · 5 referências em teste · 4/4 frameworks

Descontos:
- 1 prop(s) sem documentação (−0.3)
- API pública maior que a documentada (−1)

### Settings List Group — 8,6/10

Profissionalismo 10 · Customização 5,7 · Production-readiness 10

`ArcanaSettingsListGroup` · 8 props · 0 eventos · 3 slots · 0 custom properties · 168 linhas · 6 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Progress — 8,4/10

Profissionalismo 10 · Customização 5,3 · Production-readiness 10

`ArcanaProgress` · 9 props · 0 eventos · 1 slots · 2 custom properties · 143 linhas · 5 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Scroll Area — 8,4/10

Profissionalismo 10 · Customização 5,3 · Production-readiness 10

`ArcanaScrollArea` · 7 props · 0 eventos · 1 slots · 3 custom properties · 127 linhas · 9 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Hover Card — 8,2/10

Profissionalismo 10 · Customização 4,7 · Production-readiness 10

`ArcanaHoverCard` · 8 props · 1 eventos · 2 slots · 0 custom properties · 324 linhas · 8 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Input Currency — 8,2/10

Profissionalismo 9,5 · Customização 6 · Production-readiness 9

`ArcanaInputCurrency` · 12 props · 4 eventos · 2 slots · 0 custom properties · 142 linhas · 6 referências em teste · 4/4 frameworks

Descontos:
- 2 prop(s) sem documentação (−0.5)
- API pública maior que a documentada (−1)

### Avatar — 8,1/10

Profissionalismo 10 · Customização 4,3 · Production-readiness 10

`ArcanaAvatar` · 7 props · 1 eventos · 0 slots · 3 custom properties · 144 linhas · 19 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Dialog — 8,1/10

Profissionalismo 8,6 · Customização 6,7 · Production-readiness 9

`ArcanaDialog` · 11 props · 2 eventos · 3 slots · 0 custom properties · 261 linhas · 7 referências em teste · 4/4 frameworks

Descontos:
- 5 prop(s) sem documentação (−1.4)
- API pública maior que a documentada (−1)

### Spec Sheet — 8,1/10

Profissionalismo 10 · Customização 4,3 · Production-readiness 10

`ArcanaSpecSheet` · 4 props · 0 eventos · 5 slots · 0 custom properties · 158 linhas · 6 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Tabs — 8/10

Profissionalismo 9,3 · Customização 5,7 · Production-readiness 9

`ArcanaTabs` · 8 props · 2 eventos · 1 slots · 8 custom properties · 429 linhas · 14 referências em teste · 4/4 frameworks

Descontos:
- 2 prop(s) sem documentação (−0.8)
- API pública maior que a documentada (−1)

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

### Select — 7,9/10

Profissionalismo 9,8 · Customização 5 · Production-readiness 9

`ArcanaSelect` · 15 props · 2 eventos · 0 slots · 0 custom properties · 735 linhas · 10 referências em teste · 4/4 frameworks

Descontos:
- 1 prop(s) sem documentação (−0.2)
- API pública maior que a documentada (−1)

### Summary Tile — 7,9/10

Profissionalismo 10 · Customização 3,7 · Production-readiness 10

`ArcanaSummaryTile` · 5 props · 0 eventos · 2 slots · 0 custom properties · 88 linhas · 6 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Switch Segmented — 7,9/10

Profissionalismo 9,5 · Customização 5,3 · Production-readiness 9

`ArcanaSwitchSegmented` · 13 props · 2 eventos · 1 slots · 0 custom properties · 227 linhas · 15 referências em teste · 4/4 frameworks

Descontos:
- 2 prop(s) sem documentação (−0.5)
- API pública maior que a documentada (−1)

### Context Menu — 7,8/10

Profissionalismo 10 · Customização 3,3 · Production-readiness 10

`ArcanaContextMenu` · 4 props · 3 eventos · 2 slots · 0 custom properties · 232 linhas · 13 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Dropdown — 7,8/10

Profissionalismo 10 · Customização 3,3 · Production-readiness 10

`ArcanaDropdown` · 4 props · 2 eventos · 2 slots · 0 custom properties · 215 linhas · 6 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Spec Sheet Section — 7,8/10

Profissionalismo 10 · Customização 5,3 · Production-readiness 8

`ArcanaSpecSheetSection` · 7 props · 0 eventos · 3 slots · 0 custom properties · 126 linhas · 3 referências em teste · 4/4 frameworks

Descontos:
- cobertura rasa, 3 referências em teste (−2)

### Checkbox — 7,7/10

Profissionalismo 10 · Customização 3 · Production-readiness 10

`ArcanaCheckbox` · 6 props · 2 eventos · 1 slots · 0 custom properties · 114 linhas · 7 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Radio Card Group — 7,7/10

Profissionalismo 10 · Customização 3 · Production-readiness 10

`ArcanaRadioCardGroup` · 9 props · 2 eventos · 0 slots · 0 custom properties · 258 linhas · 11 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Table — 7,7/10

Profissionalismo 10 · Customização 3 · Production-readiness 10

`ArcanaTable` · 3 props · 0 eventos · 2 slots · 0 custom properties · 76 linhas · 9 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Notice — 7,6/10

Profissionalismo 10 · Customização 4,7 · Production-readiness 8

`ArcanaNotice` · 5 props · 1 eventos · 3 slots · 0 custom properties · 126 linhas · 1 referências em teste · 4/4 frameworks

Descontos:
- cobertura rasa, 1 referências em teste (−2)

### Tree Select — 7,6/10

Profissionalismo 9,8 · Customização 4 · Production-readiness 9

`ArcanaTreeSelect` · 12 props · 2 eventos · 0 slots · 0 custom properties · 704 linhas · 10 referências em teste · 4/4 frameworks

Descontos:
- 1 prop(s) sem documentação (−0.3)
- API pública maior que a documentada (−1)

### Badge — 7,4/10

Profissionalismo 10 · Customização 2,3 · Production-readiness 10

`ArcanaBadge` · 4 props · 0 eventos · 1 slots · 0 custom properties · 55 linhas · 11 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Dropdown Item — 7,4/10

Profissionalismo 10 · Customização 4,3 · Production-readiness 8

`ArcanaDropdownItem` · 7 props · 1 eventos · 2 slots · 0 custom properties · 96 linhas · 3 referências em teste · 4/4 frameworks

Descontos:
- cobertura rasa, 3 referências em teste (−2)

### Input Mask — 7,4/10

Profissionalismo 10 · Customização 2,3 · Production-readiness 10

`ArcanaInputMask` · 7 props · 3 eventos · 0 slots · 0 custom properties · 138 linhas · 7 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Settings List Item — 7,4/10

Profissionalismo 10 · Customização 4,3 · Production-readiness 8

`ArcanaSettingsListItem` · 4 props · 0 eventos · 3 slots · 0 custom properties · 94 linhas · 4 referências em teste · 4/4 frameworks

Descontos:
- cobertura rasa, 4 referências em teste (−2)

### Button — 7,3/10

Profissionalismo 10 · Customização 2 · Production-readiness 10

`ArcanaButton` · 3 props · 2 eventos · 1 slots · 0 custom properties · 32 linhas · 11 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Number Stepper — 7,3/10

Profissionalismo 10 · Customização 2 · Production-readiness 10

`ArcanaNumberStepper` · 6 props · 2 eventos · 0 slots · 0 custom properties · 195 linhas · 8 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Date Picker — 7,2/10

Profissionalismo 9,7 · Customização 3 · Production-readiness 9

`ArcanaDatePicker` · 9 props · 4 eventos · 0 slots · 0 custom properties · 477 linhas · 11 referências em teste · 4/4 frameworks

Descontos:
- 1 prop(s) sem documentação (−0.3)
- API pública maior que a documentada (−1)

### Input — 7,2/10

Profissionalismo 8,5 · Customização 4 · Production-readiness 9

`ArcanaInput` · 12 props · 6 eventos · 0 slots · 0 custom properties · 139 linhas · 13 referências em teste · 4/4 frameworks

Descontos:
- 6 prop(s) sem documentação (−1.5)
- API pública maior que a documentada (−1)

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

### Switch Card — 7,1/10

Profissionalismo 10 · Customização 5,3 · Production-readiness 6

`ArcanaSwitchCard` · 7 props · 2 eventos · 3 slots · 0 custom properties · 164 linhas · 0 referências em teste · 4/4 frameworks

Descontos:
- nenhum teste (−4)

### Settings List — 7/10

Profissionalismo 10 · Customização 1 · Production-readiness 10

`ArcanaSettingsList` · 0 props · 0 eventos · 1 slots · 0 custom properties · 54 linhas · 6 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Loading Overlay — 6,9/10

Profissionalismo 10 · Customização 0,7 · Production-readiness 10

`ArcanaLoadingOverlay` · 2 props · 0 eventos · 0 slots · 0 custom properties · 41 linhas · 9 referências em teste · 4/4 frameworks

Sem descontos: documentação completa, paridade nos quatro frameworks e cobertura de teste.

### Spec Sheet Field — 6,8/10

Profissionalismo 10 · Customização 2,3 · Production-readiness 8

`ArcanaSpecSheetField` · 4 props · 0 eventos · 1 slots · 0 custom properties · 75 linhas · 3 referências em teste · 4/4 frameworks

Descontos:
- cobertura rasa, 3 referências em teste (−2)

### Accordion — 6,7/10

Profissionalismo 8 · Customização 2 · Production-readiness 10

`ArcanaAccordion` · 3 props · 1 eventos · 1 slots · 0 custom properties · 65 linhas · 20 referências em teste · 4/4 frameworks

Descontos:
- interativo sem cobertura de a11y por nenhuma via (−2)

### Edit Field Dialog — 6,6/10

Profissionalismo 8,7 · Customização 4 · Production-readiness 7

`ArcanaEditFieldDialog` · 9 props · 1 eventos · 1 slots · 0 custom properties · 149 linhas · 4 referências em teste · 4/4 frameworks

Descontos:
- 4 prop(s) sem documentação (−1.3)
- cobertura rasa, 4 referências em teste (−2)
- API pública maior que a documentada (−1)

### Switch Row — 6,6/10

Profissionalismo 10 · Customização 3,7 · Production-readiness 6

`ArcanaSwitchRow` · 5 props · 2 eventos · 2 slots · 0 custom properties · 138 linhas · 0 referências em teste · 4/4 frameworks

Descontos:
- nenhum teste (−4)

### Settings Editable Field — 5,7/10

Profissionalismo 5,1 · Customização 6 · Production-readiness 6

`ArcanaSettingsEditableField` · 16 props · 2 eventos · 1 slots · 0 custom properties · 257 linhas · 9 referências em teste · 4/4 frameworks

Descontos:
- abre por @click num <div> sem tabindex/role/teclado — inalcançável por teclado (WCAG 2.1.1 A) (−4)
- 5 prop(s) sem documentação (−0.9)
- defeito de acessibilidade confirmado (−3)
- API pública maior que a documentada (−1)

### Skeleton — 5,7/10

Profissionalismo 10 · Customização 1 · Production-readiness 6

`ArcanaSkeleton` · 3 props · 0 eventos · 0 slots · 0 custom properties · 77 linhas · 0 referências em teste · 4/4 frameworks

Descontos:
- nenhum teste (−4)

### Accordion Item — 4,9/10

Profissionalismo 5,3 · Customização 3,3 · Production-readiness 6

`ArcanaAccordionItem` · 4 props · 0 eventos · 2 slots · 0 custom properties · 112 linhas · 17 referências em teste · 4/4 frameworks

Descontos:
- gatilho <button> sem aria-expanded — estado não anunciado (WCAG 4.1.2 A) (−4)
- 1 prop(s) sem documentação (−0.8)
- defeito de acessibilidade confirmado (−3)
- API pública maior que a documentada (−1)

### ContextMenuItem — 4,8/10

Profissionalismo 1,5 · Customização 4 · Production-readiness 9

`ArcanaContextMenuItem` · 6 props · 2 eventos · 2 slots · 0 custom properties · 79 linhas · 5 referências em teste · 4/4 frameworks

Descontos:
- 6 prop(s) sem documentação (−3)
- eventos não documentados (−1,5)
- fora do catálogo da docs (−4)
- API pública maior que a documentada (−1)
