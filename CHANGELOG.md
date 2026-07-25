# Changelog

## 1.4.0 — 2026-07-25

### Alterações que exigem atenção
- **`ArcanaOnboardingPanel` renomeado para `ArcanaActionPanel`** (seletor Angular `arcanaActionPanel`; classes CSS `.arcana-onboarding*` → `.arcana-action-panel*`). Quem importa o nome antigo — ou estiliza as classes antigas — precisa atualizar.

### Novos recursos
- **`ArcanaSelect` cobre o padrão de filtro rápido por status**: `color` na opção desenha uma bolinha colorida, `triggerMode="dots"` faz o gatilho exibir apenas as bolinhas do que está selecionado (em vez das etiquetas), `icon`/`iconColor` colocam um ícone no gatilho e `showFooter` adiciona um rodapé com a contagem e o botão de limpar (`footerCountLabel`, `clearLabel`). Todas as props são opcionais e o visual atual permanece intacto.
- **`ArcanaAccordion` com abertura animada**: nova prop `animated` (transição de altura + fade, ~200ms), também aceita no item — que tem precedência sobre o contêiner. Respeita `prefers-reduced-motion`.
- **`ArcanaSegmentedOptions`**: a opção passa a aceitar `iconColor`, permitindo ícones com cor própria (ex.: verde/âmbar/vermelho para níveis de prioridade).

## 1.3.0 — 2026-07-25

### Novos recursos
- **`ArcanaTreeSelect` agora é tematizável**: as cores dos ícones (pasta/documento), do item selecionado, do item sob o cursor e do realce da busca passaram a ser custom properties CSS (`--arcana-tree-select-*`), como no componente original do ERP. Nova prop **`panelClass`** para escopar o tema a uma instância — necessária porque o painel é renderizado no `<body>` e não herda estilos do wrapper do campo.

### Documentação
- A demonstração do Tree Select agora separa **seleção única**, **seleção múltipla** e **tema customizado**, e os exemplos de código dos quatro frameworks mostram os três casos, incluindo os tokens de cor disponíveis.

## 1.2.1 — 2026-07-25

### Correções
- **Documentação**: a aba "Código" do `ArcanaTreeSelect` quebrava a página (os exemplos de React, Angular e Svelte não haviam sido incluídos). Os três foram adicionados, e a verificação de tipos passou a cobrir o site de documentação para que essa classe de erro falhe no build em vez de chegar à tela.

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
