import type { Messages } from "./types";

export const pt: Messages = {
  meta: { htmlLang: "pt-BR", locale: "pt-BR" },
  langName: "Português",

  shell: {
    kicker: "Documentação · v0.x",
    lead: "Uma biblioteca de componentes tipada, no estilo shadcn — Vue 3, React, Angular e Svelte, com a mesma API e o mesmo visual em qualquer framework.",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "Buscar componentes… (⌘K)",
    searchAria: "Buscar na documentação",
    chooseFramework: "Escolher framework",
    chooseLanguage: "Escolher idioma",
    openNav: "Abrir navegação",
    closeNav: "Fechar navegação",
    sidebarAria: "Navegação da documentação",
    noSectionsFound: "Nenhum componente encontrado.",
    previewTab: "Prévia",
    codeTab: "Código",
    referenceTab: "Props + Eventos",
    codeOnlyLabel: "Código",
    defaultPreviewCaption: "componente ao vivo · interaja com ele",
    sectionExampleAria: "Exemplo de {title}",
    githubStars: "{count} estrelas no GitHub",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "Copiar",
    copied: "Copiado!"
  },

  categories: {
    gettingStarted: "Começando",
    forms: "Formulários",
    dataDisplay: "Exibição de dados",
    overlay: "Sobreposição",
    layoutNav: "Layout & navegação",
    feedback: "Feedback"
  },

  gettingStarted: {
    install: {
      title: "Instalação",
      p1: "A biblioteca é distribuída como um único pacote npm. Instale com o gerenciador de sua preferência — <c>vue</c> (3.4+) é a única peer dependency.",
      p2: "Cada componente é publicado para os quatro frameworks em um subpath correspondente — <c>@arcanalabs/ui-components/vue</c>, <c>/react</c>, <c>/angular</c> e <c>/svelte</c>; importe apenas os que você usa."
    },
    usage: {
      title: "Uso",
      p1: "Importe um componente e use no seu template. Todos seguem as mesmas convenções: <c>v-model</c> para valores bidirecionais, props em kebab-case e um evento <c>change</c> ao lado do <c>update:modelValue</c>.",
      p2: "A paleta é a escala neutra shadcn <i>zinc</i>, então os componentes convivem bem lado a lado sem nenhuma configuração de tema."
    },
    styles: {
      title: "Estilos",
      p1: "Importe a folha de estilos uma vez, na raiz da aplicação: <c>import '@arcanalabs/ui-components/styles.css'</c>. Ela carrega os tokens visuais de todos os componentes.",
      p2: "Os estilos são CSS puro, escopado por componente — não há engine de estilo em runtime nem exigência de Tailwind no consumidor."
    },
    maska: {
      title: "Registrando o v-maska",
      p1: "Alguns componentes (<c>ShadcnInputMask</c>, <c>ShadcnDatePicker</c>) dependem da diretiva <c>v-maska</c> do pacote <c>maska</c>. Registre-a globalmente uma vez ao criar o app.",
      p2: "Componentes que não usam máscara não exigem setup extra — este passo só é necessário se você renderizar um input com máscara."
    }
  },

  propsTable: {
    name: "Prop",
    type: "Tipo",
    default: "Padrão",
    description: "Descrição",
    caption: "Props",
    eventsTitle: "Eventos emitidos"
  },

  demoCaption: "componente ao vivo · interaja com ele",
  comingSoon: "A documentação completa deste componente chega num próximo lote. Ele já é publicado para Vue, React, Angular e Svelte e está pronto para uso.",
  frameworkSoon: "// Vue, React, Angular e Svelte entregam o mesmo componente — escolha um framework acima para ver o uso.",

  components: {
    button: {
      blurb: "Um botão clicável em quinze variantes semânticas; rótulo pelo slot default, cliques pelo evento <c>click</c>."
    },
    badge: {
      blurb: "Uma pílula compacta para contadores, status e tags — seis cores, dois tamanhos, <c>dot</c> opcional e modo <c>clickable</c>."
    },
    input: {
      blurb: "Um <c>&lt;input&gt;</c> nativo com estilo shadcn e um <c>v-model</c> ciente de números; atributos HTML padrão passam direto."
    },
    select: {
      blurb: "Um select totalmente customizado (sem Element Plus) teleportado para <c>&lt;body&gt;</c>, com single/<c>multiple</c>, <c>searchable</c>, <c>clearable</c> e navegação por teclado."
    },
    checkbox: {
      blurb: "Um checkbox binário que envolve um <c>&lt;input type=\"checkbox\"&gt;</c> nativo real com estado <c>indeterminate</c>; use <c>ShadcnSwitch</c> para alternar uma configuração."
    },
    switch: {
      blurb: "Um toggle binário liga/desliga (switch WAI-ARIA), com cores vermelho/verde, e um checkbox oculto opcional para formulários nativos."
    },
    tabs: {
      blurb: "Abas customizadas guiadas por um array <c>tabs</c> e <c>v-model</c>, com seis variantes, de pills a navegação lateral completa."
    },
    dialog: {
      blurb: "Um modal shadcn com API <c>show()</c>/<c>hide()</c> via ref — teleporta para <c>&lt;body&gt;</c>, prende o foco e fecha no Escape."
    },
    inputMask: {
      blurb: "Um input de texto mascarado sobre <c>v-maska</c> cujo <c>v-model</c> guarda sempre o valor <b>cru</b> (CPF, CNPJ, telefone…); exige <c>v-maska</c> registrado globalmente."
    },
    inputBoolean: {
      blurb: "Um select sim/não para campos booleanos que normaliza <c>true</c>/<c>false</c>/<c>null</c>, com variações de rótulo de status e estilo SQL."
    },
    numberStepper: {
      blurb: "Um input numérico ladeado por botões <c>−</c>/<c>+</c> que respeitam <c>min</c>/<c>max</c>/<c>step</c> e as setas do teclado."
    },
    multiSelectPopover: {
      blurb: "Um popover teleportado ao body com multisseleção por checkbox em abas; o <c>v-model</c> é um mapa <c>{ [tabKey]: number[] }</c>, cada aba alimentada por um <c>fetch()</c> assíncrono."
    },
    radioCardGroup: {
      blurb: "Cards selecionáveis apoiados em <c>&lt;input type=\"radio\"&gt;</c> real, cada um com descrição, ícone ou badge; dispostos empilhados, <c>inline</c> ou em <c>columns</c>."
    },
    segmentedOptions: {
      blurb: "Um controle segmentado para N opções mutuamente exclusivas dentro de uma pílula, com ícones e desabilitação por opção."
    },
    datePicker: {
      blurb: "Um campo de data shadcn que combina um input mascarado <c>DD/MM/AAAA</c> com um popover de calendário; o <c>v-model</c> é uma string ISO <c>YYYY-MM-DD</c>."
    },
    inputCurrency: {
      blurb: "Um input de moeda (sobre <c>v-money3</c>) que formata enquanto você digita, com decimais configuráveis e limites <c>min</c>/<c>max</c>; BRL por padrão."
    },
    labeledButton: {
      blurb: "O botão base com um <c>label</c>, <c>icon</c> opcional e um estado de spinner <c>loading</c>; a flag <c>shadcn</c> mapeia cores legadas para variantes semânticas."
    },
    accordion: {
      blurb: "O contêiner para <c>ShadcnAccordionItem</c>s colapsáveis, com um <c>v-model</c> para modo de abertura única ou múltipla."
    },
    accordionItem: {
      blurb: "Um único painel colapsável dentro de um <c>ShadcnAccordion</c>, identificado por um <c>name</c>, com cabeçalho <c>title</c> e corpo via slot."
    },
    dropdown: {
      blurb: "Um menu dropdown shadcn que teleporta para <c>&lt;body&gt;</c>, se posiciona sozinho e fecha ao clicar fora, no Escape ou na seleção."
    },
    dropdownItem: {
      blurb: "Uma linha dentro de um <c>ShadcnDropdown</c> — <c>icon</c>, rótulo e <c>suffix</c> opcionais — colorível, com um separador <c>divided</c> para ações destrutivas."
    },
    table: {
      blurb: "Uma tabela shadcn estática para arrays em memória; colunas declaram <c>{ key, label, width?, align?, valueGetter? }</c>, com slots de célula e rodapé."
    },
    specSheet: {
      blurb: "Uma \"ficha técnica\" editorial e somente leitura para registros formais, com um sobretítulo <c>docNum</c>, um <c>title</c> e seções filhas."
    },
    specSheetSection: {
      blurb: "Uma seção dentro de um <c>ShadcnSpecSheet</c> — <c>icon</c> de destaque, <c>title</c> e <c>sectionNum</c> sobre um grid de campos em <c>columns</c>."
    },
    specSheetField: {
      blurb: "Um único par rótulo/valor; um valor vazio mostra <c>emptyText</c> para que lacunas pareçam intencionais, e <c>span</c> o alarga."
    },
    summaryTiles: {
      blurb: "O contêiner de grid responsivo para tiles de KPI; defina <c>columns</c> (padrão 3), colapsando para um abaixo de 880px."
    },
    summaryTile: {
      blurb: "Uma métrica de KPI compacta disposta como <c>[icon] [label + sub] [value]</c>, em quatro <c>tone</c>s de leitura rápida."
    },
    settingsList: {
      blurb: "Um contêiner ao estilo Ajustes do iOS com linhas separadas por fios finos, cada uma com rótulo + legenda e um controle alinhado à direita."
    },
    settingsListGroup: {
      blurb: "Uma seção com título, opcionalmente <c>collapsible</c>, dentro de um <c>ShadcnSettingsList</c>, com um ícone, <c>sectionNum</c> e <c>meta</c>."
    },
    settingsListItem: {
      blurb: "Uma única linha de configuração — <c>label</c> + <c>caption</c> à esquerda, seu controle à direita."
    },
    settingsEditableField: {
      blurb: "Uma linha inteligente que reúne um valor somente leitura, um botão \"Alterar\" e seu modal de edição em uma só tag (<c>text</c>/<c>currency</c>/<c>number</c>/<c>select</c>)."
    },
    sparkGridEmptyState: {
      blurb: "Um wrapper que troca o conteúdo de um grid por um painel de onboarding somente quando <c>total</c> é 0 e nenhum filtro está ativo."
    },
    notice: {
      blurb: "Um banner inline em seis variantes semânticas com ícones correspondentes, opcionalmente <c>dismissible</c>, para avisos e erros não bloqueantes."
    },
    editFieldModal: {
      blurb: "Um wrapper de modal genérico \"Alterar X\" guiado por ref que fornece a moldura e recebe o input do campo pelo seu slot."
    },
    requiredFieldsDialog: {
      blurb: "Um diálogo âmbar que lista os campos obrigatórios ainda faltando em um formulário multietapas, cada dica apontando para o passo a corrigir."
    },
    onboardingPanel: {
      blurb: "Um painel refinado de estado vazio / CTA para a primeira configuração — ícone com gradiente, título, descrição e uma chamada de ação principal."
    },
    loadingOverlay: {
      blurb: "Um overlay de spinner escopado sobre um fundo desfocado, cobrindo o ancestral posicionado mais próximo; alterne com <c>visible</c>."
    },
    skeleton: {
      blurb: "Um bloco placeholder cintilante para estados de carregamento; defina <c>width</c>/<c>height</c>, escolha um preset <c>rounded</c>, respeita reduced-motion."
    },
    switchCard: {
      blurb: "Um toggle de alto impacto em largura total que deixa o card inteiro esmeralda quando ligado — reserve-o para configurações de peso."
    },
    switchRow: {
      blurb: "Um toggle de linha de configuração em largura total — título + descrição à esquerda, um switch compacto à direita, linha toda clicável."
    },
    switchSegmented: {
      blurb: "Um toggle binário no formato de cápsula segmentada com um indicador deslizante, lido como \"A ou B\" em vez de liga/desliga."
    }
  }
};
