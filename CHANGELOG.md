# Changelog

## 1.8.0 — 2026-07-25

### Alterações que exigem atenção
- **`maska` deixou de ser dependência de runtime e passou a ser _peer dependency_ opcional.** Antes ela vinha junto, automaticamente, ao instalar a lib; agora quem usa **`ArcanaInputMask` precisa instalá-la explicitamente**:

  ```bash
  npm i maska
  ```

  Como o peer é declarado opcional, **o npm não avisa na instalação**: se o pacote faltar, a falha aparece só quando o componente é renderizado, como módulo não encontrado. Quem não usa `ArcanaInputMask` não precisa fazer nada. No Vue, o registro da diretiva (`app.use(Maska)`) continua igual.

### Documentação
- **Nova seção "Dependencies"** no guia de início, listando cada pacote com faixa de versão, tipo (runtime / peer / peer opcional) e para que serve. A tabela é gerada a partir do próprio `package.json` no build, então não tem como ficar desatualizada.
- Corrigido um erro que estava no README e nos 8 idiomas da documentação: ambos afirmavam que o `ArcanaDatePicker` dependia de `maska`. Ele nunca usou.

## 1.7.0 — 2026-07-25

### Novos recursos
- **Dez componentes novos**, nos quatro frameworks, com documentação, tabela de props e exemplos: `ArcanaRate`, `ArcanaAvatar`, `ArcanaAvatarGroup`, `ArcanaStatistic`, `ArcanaCountdown`, `ArcanaProgress`, `ArcanaAspectRatio`, `ArcanaHoverCard`, `ArcanaScrollArea` e `ArcanaContextMenu`.
- **Sistema de cores no modelo Radix**: 31 escalas de 12 degraus, em claro e escuro, com variantes alpha. Trocar a paleta é uma classe no elemento raiz — `.arcana-accent-violet` para o acento, `.arcana-gray-slate` para o neutro, `.arcana-dark` para o modo escuro. Os componentes só leem tokens semânticos, então todos acompanham.

### Alterações que exigem atenção
- **O tom neutro mudou** do `zinc` (Tailwind) para o `gray` do Radix. O deslocamento é sutil e uniforme (`#18181b` → `#202020` no texto principal, `#71717a` → `#646464` no secundário). Os botões de estado seguem os degraus do Radix e ficam visivelmente diferentes: o `warning` passou a ser âmbar claro com texto escuro.

### Correções
- **Modo escuro passou a funcionar de fato.** Os tokens de uso viviam apenas no `:root` e eram substituídos com os valores claros; redefinir as escalas em `.arcana-dark` não os alcançava, e o resultado era texto quase-preto sobre fundo escuro.
- **Contraste**: o anel de foco subiu de 1,9:1 para 16,3:1 (o mínimo do WCAG 1.4.11 é 3:1); o texto do botão `warning` no escuro subiu de 1,3:1 para 7,2:1; o botão `ghost` saiu de 3,3:1 para 5,9:1.
- A versão exibida no cabeçalho da documentação passou a vir do `package.json` — estava congelada em "v0.x".

> As versões 1.6.0 e 1.6.1 não têm entrada aqui.

## 1.5.0 — 2026-07-25

### Alterações que exigem atenção
- **`ArcanaSegmentedOptions` renomeado para `ArcanaSegmentedControl`** (seletor Angular `arcanaSegmentedControl`, classe Angular `ArcanaSegmentedControlComponent`, tipo de props `ArcanaSegmentedControlProps`; classes CSS `.arcana-segmented-options*` → `.arcana-segmented-control*`). O tipo da opção continua se chamando `SegmentedOption`. Quem importa o nome antigo — ou estiliza as classes antigas — precisa atualizar.

### Novos recursos
- **`ArcanaSegmentedControl` ganhou a prop `size`** (`'sm' | 'md' | 'lg' | 'xl'`, default `'md'`), que controla altura, padding, fonte e tamanho do ícone. `sm` equivale ao antigo `compact` — que continua funcionando, **deprecado**: sem `size`, `compact` mapeia para `sm`; com `size`, o `size` vence. Para tamanhos fora da escala, sobrescreva as custom properties CSS `--arcana-segmented-control-height`, `--arcana-segmented-control-padding`, `--arcana-segmented-control-padding-x`, `--arcana-segmented-control-font-size` e `--arcana-segmented-control-icon-size` (os valores de cada `size` são apenas os defaults).

## 1.4.1 — 2026-07-25

### Documentação
- **Todo exemplo do preview passou a ter equivalente na aba "Código"**. Vários componentes exibiam várias variações na demonstração ao vivo, mas o código mostrava apenas um caso mínimo (o Button tinha 17 exemplos no preview e 6 no código; Notice, 6 contra 2), e alguns previews usavam componentes que sequer apareciam no snippet. Os quatro frameworks foram sincronizados.

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
