# Changelog

## 1.2.0 — 2026-07-24

### Novos recursos
- **`ArcanaTreeSelect`**: novo componente de seleção hierárquica (portado do tree-select de centros de custo do ERP e tornado agnóstico de domínio). A hierarquia entra por `options` (`TreeSelectNode[]`); suporta seleção única ou `multiple` (com tags removíveis), busca que filtra preservando os ancestrais e destaca o termo, `allowParentSelection` (por padrão só folhas selecionam — clicar num nó-pai apenas expande), auto-expansão do caminho até o valor e `clearable`. Disponível nos quatro frameworks.

## 1.1.0 — 2026-07-24

### Novos recursos
- **DatePicker com calendário próprio** (`ArcanaDatePicker`): popover de calendário auto-contido, sem Element Plus — o clique no ícone agora abre o calendário. Cinco modos via `type`: `date` (`YYYY-MM-DD`), `month` (`YYYY-MM`), `year` (`YYYY`), `daterange` (`[YYYY-MM-DD, YYYY-MM-DD]`) e `datetime` (`YYYY-MM-DD HH:mm`, confirma no botão). Multilíngue via `locale` (nomes de mês/dia por Intl) e customizável via `messages`.
- **`ArcanaSettingsEditableField`**: nova prop `editLabel` (default `'Alterar'`) para o rótulo do botão de edição/prefixo do título (permite i18n); o input de moeda (`type="currency"`) agora usa o estilo arcana.

### Alterações que exigem atenção
- **`ArcanaEditFieldModal` renomeado para `ArcanaEditFieldDialog`** (arquivo, export e selector Angular `arcanaEditFieldDialog`). Os botões do rodapé agora são Cancelar `outline-danger` + ícone e Salvar `success` (verde) + ícone.

### Correções
- Alinhamento vertical de ícone + título nos cabeçalhos do `ArcanaSpecSheet`/`ArcanaOnboardingPanel` (blindado contra margens globais de `h*` do app consumidor).

## 1.0.0 — 2026-07-24

Primeira versão pública da biblioteca de componentes.

- **39 componentes** estilo shadcn com prefixo `Arcana*`, portados nativamente para **Vue 3, React, Angular e Svelte 5** — mesma marcação, mesmas classes (`arcana-*`) e mesmo comportamento em todos.
- **Folha de estilos única e independente de framework** (`@arcanalabs/ui-components/styles.css`), compartilhada pelos quatro adaptadores.
- **Entrypoints separados**: `/vue`, `/react`, `/angular`, `/svelte` e `/styles.css`. Os peers de cada framework são opcionais — instala-se apenas o que se usa.
- **Máscaras e moeda** (`ArcanaInputMask`, `ArcanaInputCurrency`, `ArcanaDatePicker`) sem dependências específicas de framework: máscara via núcleo do `maska`, moeda BRL própria e campo de data nativo.
- **Ícones** via Font Awesome Free (classes `fa-solid fa-*`) — peer dependency opcional `@fortawesome/fontawesome-free`.
- **Portais** para escapar de `overflow` (diálogos, selects, tooltips) implementados nativamente em cada framework.
- No Vue, a diretiva de máscara exige `app.use(Maska)` no app consumidor; nos demais frameworks a máscara já vem embutida.
- **Documentação completa** dos 39 componentes em 8 idiomas, com demos ao vivo e snippets de uso para os 4 frameworks: https://arcana-labs-org.github.io/ui-components/
