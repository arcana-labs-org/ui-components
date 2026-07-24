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
    },
    table: {
      blurb: "Uma tabela estática no padrão shadcn pra arrays que você já tem em mãos (diferente do <c>SparkGrid</c>, que faz fetch e paginação via backend). As colunas declaram <c>{ key, label, width?, align?, valueGetter? }</c>; um slot <c>#cell-&lt;key&gt;</c> assume a renderização de qualquer célula, e um slot <c>#footer</c> preenche um <c>&lt;tfoot&gt;</c> pra totais."
    },
    specSheet: {
      blurb: "Um \"spec sheet\" read-only e editorial pra registros formais — pense em cadastros oficiais e datasheets. Um eyebrow mono <c>docNum</c> fica sobre o <c>title</c> e um badge <c>meta</c> opcional; os filhos <c>&lt;ShadcnSpecSheetSection&gt;</c> carregam os campos e um slot <c>#footer</c> leva as ações de edição. Use <c>flat</c> pra remover o chrome do card ao embuti-lo dentro de outro card."
    },
    specSheetSection: {
      blurb: "Uma seção dentro de um <c>ShadcnSpecSheet</c>: um <c>icon</c> boxed de accent opcional (oito cores) + <c>title</c> + um <c>sectionNum</c> à direita, sobre um grid de <c>columns</c> configurável de <c>&lt;ShadcnSpecSheetField&gt;</c>s. Um slot <c>#actions</c> hospeda botões no header; <c>noRowDividers</c> e <c>compact</c> ajustam o layout."
    },
    specSheetField: {
      blurb: "Um par label/valor dentro de uma seção. O <c>label</c> renderiza em mono uppercase, o <c>value</c> em Inter; um valor vazio (<c>null</c>/<c>undefined</c>/'') mostra <c>emptyText</c> em itálico muted pra deixar claro que o vazio é intencional. Use <c>span</c> pra alargar um campo, ou o slot default pra badges, links e outros valores ricos."
    },
    summaryTiles: {
      blurb: "O container em grid responsivo pra uma linha de tiles de KPI. Defina <c>columns</c> (padrão 3); abaixo de 880px ele sempre colapsa pra uma única coluna. Coloque quantos <c>&lt;ShadcnSummaryTile&gt;</c> quiser."
    },
    summaryTile: {
      blurb: "Um stat de KPI compacto no layout <c>[ícone] [label + sub] [valor]</c> em ~52px de altura. Quatro <c>tone</c>s — <c>neutral</c>, <c>positive</c>, <c>negative</c>, <c>indigo</c> — o colorem pra leitura rápida. Os slots <c>#value</c> e <c>#sub</c> sobrepõem as props simples pra badges inline ou conteúdo mais rico."
    },
    settingsList: {
      blurb: "Um container no estilo Ajustes do iOS: linhas separadas por hairlines, cada uma com label + caption à esquerda e um controle à direita. Preencha com <c>&lt;ShadcnSettingsListItem&gt;</c>, <c>&lt;ShadcnSettingsListGroup&gt;</c> ou o inteligente <c>&lt;ShadcnSettingsEditableField&gt;</c>."
    },
    settingsListGroup: {
      blurb: "Uma seção titulada dentro de um <c>ShadcnSettingsList</c> pra agrupar linhas relacionadas. O header traz um <c>icon</c> boxed opcional (oito cores), um <c>sectionNum</c> e um <c>meta</c> à direita. Use <c>collapsible</c> pra transformar o header num toggle (com <c>defaultCollapsed</c>) e <c>compact</c> pra densidade maior."
    },
    settingsListItem: {
      blurb: "Uma linha de um <c>ShadcnSettingsList</c>: <c>label</c> + <c>caption</c> à esquerda, seu controle no slot default à direita. O slot <c>#label</c> permite embutir um badge de status; <c>nested</c> aplica o estilo de sub-item pra toggles que só importam quando um pai está ligado; <c>disabled</c> apaga e trava a linha."
    },
    settingsEditableField: {
      blurb: "Uma linha inteligente que junta o valor read-only, um botão \"Alterar\" e seu modal de edição numa única tag. Escolha um <c>type</c> — <c>text</c>, <c>currency</c>, <c>number</c> ou <c>select</c> — e ela renderiza o input certo dentro de um modal teleportado. As edições são bufferizadas: cancelar descarta, salvar emite tanto <c>update:modelValue</c> quanto <c>save</c> (pra auto-save)."
    },
    sparkGridEmptyState: {
      blurb: "Um wrapper que troca o conteúdo de um grid por um <c>ShadcnOnboardingPanel</c> quando realmente não há nada a mostrar. Ele espera o <c>loading</c> assentar (true → false) e só revela o painel quando <c>total</c> é 0 e nenhum filtro está ativo — então uma lista filtrada até ficar vazia mantém sua toolbar. Emite <c>panel-visible</c> pro host esconder as ações do header."
    },
    notice: {
      blurb: "Um banner inline com variantes semânticas — <c>info</c>, <c>blue</c>, <c>success</c>, <c>warning</c>, <c>pending</c> e <c>destructive</c> — cada uma com um ícone padrão correspondente. Use pra avisos contextuais, status cards e erros não-bloqueantes. Adicione <c>dismissible</c> pra um botão de fechar que emite <c>dismiss</c>; título, corpo e ícone são todos sobrepostos por slot."
    },
    editFieldModal: {
      blurb: "Um wrapper de modal \"Alterar X\" genérico pra listas de configurações. Ele fornece o chrome (header, footer, salvar/cancelar) e recebe o input do campo pelo slot default, então um único componente serve toda linha editável em vez de um arquivo por modal. É guiado por ref (<c>show()</c> / <c>hide()</c>) e emite <c>save</c> sem fechar sozinho, pra você validar antes."
    },
    requiredFieldsDialog: {
      blurb: "Um dialog de aviso âmbar que lista os campos obrigatórios ainda faltando num formulário multi-step. Passe um array <c>fields</c> de <c>{ key, label, hint }</c> — cada <c>hint</c> aponta o passo a corrigir — e abra com uma ref (<c>show()</c>). Substitui o antigo padrão de \"um <c>Alert.info</c> por vez\" por uma lista única e escaneável."
    },
    onboardingPanel: {
      blurb: "Um painel de empty-state / CTA caprichado pra primeira configuração: um ícone em gradient dentro de rings pulsando, título + descrição, uma CTA primária e um botão secundário e sub-hint opcionais. Controle tudo por props, ou use os slots <c>#action</c> e <c>#sub-hint</c> pra botões custom e texto rico. Emite <c>action</c> / <c>secondary-action</c>."
    },
    loadingOverlay: {
      blurb: "Um overlay de carregamento escopado — spinner + texto sobre um backdrop translúcido com blur que cobre o ancestral posicionado mais próximo (o pai precisa de <c>position: relative</c>). Alterne com <c>visible</c> pra feedback assíncrono a nível de card/seção em vez de um loader full-screen."
    },
    skeleton: {
      blurb: "Um bloco placeholder com shimmer pra estados de loading. Defina <c>width</c> / <c>height</c> com qualquer valor CSS e escolha um preset <c>rounded</c> (<c>full</c> pra avatares). É <c>aria-hidden</c> (visual-only) e respeita <c>prefers-reduced-motion</c> — o shimmer para mas o bloco fica. Prefira-o a placeholders falsos que piscam quando os dados reais chegam."
    },
    switchCard: {
      blurb: "Um toggle full-width de alto impacto: quando ligado, o card inteiro fica esmeralda com um switch interno invertido — dá pra ler o estado à distância. Reserve pra configs de peso (2FA, modo manutenção, recursos premium). Um <c>icon</c> boxed, <c>title</c> e as linhas mono <c>statusOn</c>/<c>statusOff</c> o descrevem."
    },
    switchRow: {
      blurb: "Um toggle \"linha de configuração\" full-width: título + descrição opcional à esquerda, um switch compacto à direita, e a row inteira é clicável pra uma área de toque generosa. É o meio-termo calmo entre um <c>ShadcnSwitch</c> puro e o chamativo <c>ShadcnSwitchCard</c> — ideal pra listas de preferências relacionadas."
    },
    switchSegmented: {
      blurb: "Um toggle binário em formato de cápsula segmentada: duas metades clicáveis com um indicador deslizante, então lê-se como \"A ou B\" em vez de on/off. Ótimo pra escolhas either/or com labels (mensal / anual, sandbox / produção). <c>compact</c> e <c>squared</c> ajustam a geometria, <c>activeColor</c> recolore o indicador, e as setas navegam entre os lados."
    }
  }
};
