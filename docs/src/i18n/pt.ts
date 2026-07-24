import type { Messages } from "./types";

export const pt: Messages = {
  meta: { htmlLang: "pt-BR", locale: "pt-BR" },
  langName: "Português",

  shell: {
    kicker: "Documentação · v0.x",
    lead: "Uma biblioteca de componentes tipada, no estilo shadcn. Vue 3 já hoje; adaptadores React, Angular e Svelte estão a caminho — mesma API, mesmo visual, em qualquer framework.",
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
      p2: "Todos os componentes Vue são exportados pelo subpath <c>@arcanalabs/ui-components/vue</c> como SFCs autocontidos; importe apenas os que você usa."
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
  comingSoon: "A documentação completa deste componente chega num próximo lote. Ele já é exportado por <c>@arcanalabs/ui-components/vue</c> e está pronto para uso.",
  frameworkSoon: "// Adaptadores React · Angular · Svelte em breve.\n// Vue 3 já está disponível — troque o seletor de framework para Vue.",

  components: {
    button: {
      blurb: "Um botão clicável que espelha a geometria do botão shadcn (13px / peso 500 / raio 6). Quinze variantes semânticas cobrem ações primárias, fluxos destrutivos, contornos neutros e destaques de status. O rótulo vem pelo slot default; os cliques são expostos pelo evento <c>click</c>."
    },
    badge: {
      blurb: "Uma pílula compacta para contadores, status e tags. Seis variantes de cor combinam com um <c>dot</c> indicador opcional à esquerda, dois tamanhos e um modo <c>clickable</c> que adiciona affordance de ponteiro para badges acionáveis. O conteúdo vem do slot default."
    },
    input: {
      blurb: "Um <c>&lt;input&gt;</c> nativo com estilo shadcn e um <c>v-model</c> ciente de números (um <c>type=\"number\"</c> vazio emite <c>null</c>; um válido emite um número de verdade). Atributos HTML padrão — <c>placeholder</c>, <c>readonly</c>, <c>min/max/step</c>, <c>maxlength</c>, <c>autocomplete</c> — passam direto."
    },
    select: {
      blurb: "Um select totalmente custom — sem Element Plus por baixo. O dropdown é teleportado pro <c>&lt;body&gt;</c> com posicionamento auto-flip e suporta seleção única ou <c>multiple</c>, filtro <c>searchable</c> embutido, affordance <c>clearable</c> no hover e navegação completa por teclado. As opções aceitam strings simples ou objetos <c>{ label, value, disabled?, description? }</c>."
    },
    checkbox: {
      blurb: "Um checkbox binário que envolve um <c>&lt;input type=\"checkbox\"&gt;</c> nativo <b>de verdade</b> — logo é amigável a teclado e a drivers de teste (o <c>check()</c>/<c>uncheck()</c> do Dusk funciona). Use para escolher itens de uma lista; um estado <c>indeterminate</c> mostra o clássico traço de \"alguns selecionados\". Prefira o <c>ShadcnSwitch</c> para ligar/desligar uma configuração."
    },
    switch: {
      blurb: "Um toggle binário liga/desliga que segue o padrão WAI-ARIA de switch (<c>role=\"switch\"</c> + <c>aria-checked</c>, Space/Enter ativam). O trilho é colorido por semântica para leitura rápida — vermelho quando off, verde quando on — e um checkbox escondido opcional (<c>name</c>) integra com o submit de formulários nativos."
    },
    tabs: {
      blurb: "Tabs custom guiadas por um array <c>tabs</c> e um <c>v-model</c> com o nome da aba ativa. Cada aba vira um slot nomeado. Seis variantes visuais — <c>pills</c>, <c>underline</c>, <c>boxed</c>, <c>sidebar</c>, <c>sidebar-soft</c>, <c>segmented</c> — cobrem desde abas compactas em modais até navegação lateral completa, com ícones e badges opcionais e um modo <c>keepAlive</c> que preserva os painéis inativos."
    },
    dialog: {
      blurb: "Um modal no estilo shadcn com API baseada em ref — chame <c>show()</c> / <c>hide()</c> no ref do componente em vez de usar <c>v-model</c>. Ele teleporta pro <c>&lt;body&gt;</c>, prende o foco, fecha no Escape (e opcionalmente no clique do overlay) e empilha corretamente quando aninhado. Presets de tamanho vão de <c>sm → full</c>; os slots <c>header</c> e <c>footer</c> são opcionais (o slot footer recebe <c>{ hide }</c>)."
    },
    inputMask: {
      blurb: "Um input de texto com máscara construído sobre a diretiva <c>v-maska</c> e estilizado igual ao <c>ShadcnInput</c>. Passe uma string em <c>mask</c>, ou um array de strings para máscaras dinâmicas por tamanho (ex.: fixo vs. celular). O <c>v-model</c> sempre guarda o valor <b>raw</b> — sem os caracteres da máscara —, então CPF, CNPJ, CEP ou telefone chegam sem formatação no backend enquanto o campo mostra o display formatado. Exige o <c>v-maska</c> registrado globalmente."
    },
    inputBoolean: {
      blurb: "Um select sim/não para campos booleanos, renderizado como um <c>ShadcnSelect</c>. Ele normaliza os formatos booleanos usuais — <c>true</c>/<c>1</c>, <c>false</c>/<c>0</c>, <c>null</c>. Uma <c>variation</c> troca os rótulos para <c>status</c> (Ativo/Inativo) ou para valores tipo SQL <c>nullable</c> (<c>IS_NOT_NULL</c>/<c>IS_NULL</c>) em filtros. Quando <c>clearable</c> (padrão), uma opção \"Todos\" no topo zera o valor para <c>null</c>."
    },
    numberStepper: {
      blurb: "Um input numérico ladeado por botões <c>−</c> / <c>+</c> para ajustes finos de quantidade. Os botões respeitam <c>min</c> / <c>max</c> / <c>step</c> e ficam desativados nos limites; as setas Cima/Baixo funcionam pelo teclado, e um valor vazio ou inválido é coagido para <c>min</c> no blur. Os spinners nativos ficam escondidos em favor dos botões custom."
    },
    multiSelectPopover: {
      blurb: "Um popover genérico teleportado pro body com abas configuráveis e multi-seleção por checkbox — uma base reutilizável para pickers que abrangem vários buckets (usuários + departamentos, filiais, máquinas…). O <c>v-model</c> é um mapa <c>{ [tabKey]: number[] }</c>, um array de ids selecionados por aba. Cada aba fornece um <c>fetch()</c> async cujo resultado é cacheado pelo lifetime do componente; o painel faz flip e shift para caber na viewport. Os slots <c>trigger</c> e <c>item</c> customizam a renderização."
    },
    radioCardGroup: {
      blurb: "Um grupo de cards selecionáveis apoiados por elementos <c>&lt;input type=\"radio\"&gt;</c> reais — mais tátil que um select quando há poucas opções e cada uma carrega descrição, ícone ou badge. As opções são objetos <c>{ label, value, description?, icon?, badge?, disabled? }</c>. Disponha-as empilhadas, <c>inline</c>, ou num número fixo de <c>columns</c>, e mova o radio para o <c>end</c> quando um ícone à esquerda deve carregar o peso visual."
    },
    segmentedOptions: {
      blurb: "Um segmented control para N opções mutuamente exclusivas dentro de uma cápsula — o irmão multi-opção do binário <c>ShadcnSwitchSegmented</c>. O segmento ativo fica destacado; as opções aceitam um <c>icon</c> opcional e um <c>disabled</c> por opção. <c>compact</c> e <c>squared</c> ajustam a geometria, <c>activeColor</c> sobrescreve a cor do ativo, e <c>autoSelectFirst</c> seleciona a primeira opção habilitada quando nada está selecionado (útil em listas dinâmicas)."
    },
    datePicker: {
      blurb: "Um campo de data estilizado shadcn. Para <c>type=\"date\"</c> ele compõe um input de texto mascarado ao vivo <c>DD/MM/AAAA</c> (via <c>v-maska</c>) com um popover de calendário do Element Plus aberto pelo ícone de calendário; os outros types (<c>daterange</c>, <c>month</c>, <c>year</c>) usam o calendário direto. O <c>v-model</c> é uma string ISO <c>YYYY-MM-DD</c> (ou uma tupla para ranges), e datas digitadas são validadas estritamente (31/02 é rejeitado)."
    },
    inputCurrency: {
      blurb: "Um input de moeda construído sobre o <c>v-money3</c> que formata enquanto o usuário digita — separador de milhar, vírgula decimal e uma <c>fraction</c> configurável de casas decimais (BRL por padrão). Ative a flag <c>shadcn</c> para o campo com estilo zinc e ícone de moeda à esquerda; <c>min</c> / <c>max</c> limitam o valor e <c>allowBlank</c> permite um campo vazio. O <c>v-model</c> carrega a string formatada; o estado disabled mostra um valor formatado somente-leitura."
    },
    labeledButton: {
      blurb: "O botão base por trás dos wrappers de botão de nível mais alto: um <c>label</c>, um <c>icon</c> opcional à esquerda (classe FontAwesome) e um estado <c>loading</c> que troca o ícone por um spinner e desativa o botão. Ative a flag <c>shadcn</c> para mapear a prop legada <c>color</c> numa variant semântica shadcn (danger → destructive, grey → ghost, blue → info, …); sem ela, o estilo Bootstrap legado é mantido. <c>centerLabel</c> / <c>centerContent</c> controlam o alinhamento em botões full-width."
    },
    accordion: {
      blurb: "O container de um conjunto de <c>ShadcnAccordionItem</c>s colapsáveis. Ele fornece o estado aberto/fechado aos filhos via provide/inject e liga a um <c>v-model</c>. No modo single padrão (<c>accordion</c>) o model é o <c>name</c> do item aberto (ou <c>null</c>); passe <c>:accordion=\"false\"</c> para o modo múltiplo, onde o model vira um array de names abertos."
    },
    accordionItem: {
      blurb: "Um único painel colapsável dentro de um <c>ShadcnAccordion</c>, identificado por um <c>name</c> obrigatório. O cabeçalho mostra a prop <c>title</c> (ou um slot <c>title</c> para cabeçalhos ricos) mais um chevron que gira ao abrir; o slot default é o corpo colapsável. <c>disabled</c> bloqueia o toggle. Ele lê seu estado aberto do accordion pai — só funciona aninhado dentro de um."
    },
    dropdown: {
      blurb: "Um menu dropdown no estilo shadcn que substitui o <c>el-dropdown</c>. O slot <c>trigger</c> segura o que abre o menu; o slot default segura os <c>ShadcnDropdownItem</c>s (e recebe um helper <c>close</c>). O menu teleporta pro <c>&lt;body&gt;</c> para escapar do <c>overflow:hidden</c> de ancestrais, se posiciona com flip/shift automático e fecha no clique externo, Escape ou seleção de item. <c>placement</c> e uma densidade <c>size</c> (propagada aos itens) o ajustam."
    },
    dropdownItem: {
      blurb: "Uma linha dentro de um <c>ShadcnDropdown</c>: um <c>icon</c> opcional, o rótulo (slot default) e um slot <c>suffix</c> opcional (ex.: um atalho). <c>variant</c> o colore como <c>default</c>, <c>danger</c>, <c>success</c> ou <c>warning</c>; <c>divided</c> desenha um separador acima dele para isolar ações destrutivas. No clique ele emite <c>click</c> e — a menos que <c>closeOnClick</c> seja false — pede pro dropdown pai fechar via um evento customizado que sobe por bubble."
    }
  }
};
