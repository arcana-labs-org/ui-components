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
      p2: "Cada componente é publicado para os quatro frameworks em um subpath correspondente — <c>@arcanalabs/ui-components/vue</c>, <c>/react</c>, <c>/angular</c> e <c>/svelte</c>; importe apenas os que você usa. Os ícones usam o Font Awesome Free — instale <c>@fortawesome/fontawesome-free</c> e importe o CSS uma vez."
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
      p1: "Alguns componentes (<c>ArcanaInputMask</c>, <c>ArcanaDatePicker</c>) dependem da diretiva <c>v-maska</c> do pacote <c>maska</c>. Registre-a globalmente uma vez ao criar o app.",
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
    treeSelect: {
      blurb: "Um select cujo painel é uma hierarquia buscável — escolha um nó da árvore (centros de custo, categorias), único ou múltiplo, selecionando só folhas por padrão."
    },
    checkbox: {
      blurb: "Um checkbox binário que envolve um <c>&lt;input type=\"checkbox\"&gt;</c> nativo real com estado <c>indeterminate</c>; use <c>ArcanaSwitch</c> para alternar uma configuração."
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
    accordion: {
      blurb: "O contêiner para <c>ArcanaAccordionItem</c>s colapsáveis, com um <c>v-model</c> para modo de abertura única ou múltipla."
    },
    accordionItem: {
      blurb: "Um único painel colapsável dentro de um <c>ArcanaAccordion</c>, identificado por um <c>name</c>, com cabeçalho <c>title</c> e corpo via slot."
    },
    dropdown: {
      blurb: "Um menu dropdown shadcn que teleporta para <c>&lt;body&gt;</c>, se posiciona sozinho e fecha ao clicar fora, no Escape ou na seleção."
    },
    dropdownItem: {
      blurb: "Uma linha dentro de um <c>ArcanaDropdown</c> — <c>icon</c>, rótulo e <c>suffix</c> opcionais — colorível, com um separador <c>divided</c> para ações destrutivas."
    },
    table: {
      blurb: "Uma tabela shadcn estática para arrays em memória; colunas declaram <c>{ key, label, width?, align?, valueGetter? }</c>, com slots de célula e rodapé."
    },
    specSheet: {
      blurb: "Uma \"ficha técnica\" editorial e somente leitura para registros formais, com um sobretítulo <c>docNum</c>, um <c>title</c> e seções filhas."
    },
    specSheetSection: {
      blurb: "Uma seção dentro de um <c>ArcanaSpecSheet</c> — <c>icon</c> de destaque, <c>title</c> e <c>sectionNum</c> sobre um grid de campos em <c>columns</c>."
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
      blurb: "Uma seção com título, opcionalmente <c>collapsible</c>, dentro de um <c>ArcanaSettingsList</c>, com um ícone, <c>sectionNum</c> e <c>meta</c>."
    },
    settingsListItem: {
      blurb: "Uma única linha de configuração — <c>label</c> + <c>caption</c> à esquerda, seu controle à direita."
    },
    settingsEditableField: {
      blurb: "Uma linha inteligente que reúne um valor somente leitura, um botão \"Alterar\" e seu modal de edição em uma só tag (<c>text</c>/<c>currency</c>/<c>number</c>/<c>select</c>)."
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
  },

  demos: {
    // ── shared ──
    lastAction: "última ação",
    timesSuffix: "vez(es)",
    disabledLabel: "Desabilitado",

    // ── button ──
    btnPrimary: "Primário",
    btnSecondary: "Secundário",
    btnOutline: "Contorno",
    btnGhost: "Fantasma",
    btnSuccess: "Sucesso",
    btnIndigo: "Índigo",
    btnDestructive: "Destrutivo",
    btnOutlineDanger: "Contorno perigo",
    primaryClickedPrefix: "Clicado",

    // ── badge ──
    badgeNeutral: "neutro",
    badgeBlue: "azul",
    badgeGreen: "verde",
    badgeRed: "vermelho",
    badgeAmber: "âmbar",
    badgeViolet: "violeta",
    badgeActive: "Ativo",
    badgeOffline: "Offline",
    badgeSmSize: "tamanho sm",
    badgeClickable: "clicável",

    // ── input ──
    quantity: "Quantidade",
    inputReadonly: "Somente leitura",
    inputLockedValue: "Valor bloqueado",
    inputEmailLabel: "e-mail",
    inputQtyLabel: "qtd",

    // ── select ──
    selectPickFruit: "Escolha uma fruta",
    selectPickSeveral: "Escolha várias",
    fruitApple: "Maçã",
    fruitBanana: "Banana",
    fruitCherry: "Cereja",
    fruitCherryDesc: "sazonal",
    fruitDurian: "Durião",
    fruitElderberry: "Sabugueiro",
    selectSingleLabel: "único",
    selectMultipleLabel: "múltiplo",

    // ── checkbox ──
    checkboxSelectAll: "Selecionar todos",
    checkboxInvoices: "Faturas",
    checkboxReceipts: "Recibos",
    checkboxStatements: "Extratos",
    checkboxArchivedDisabled: "Arquivados (desabilitado)",

    // ── switch ──
    switchNotifications: "Notificações",
    switchBetaFeatures: "Recursos beta",

    // ── tabs ──
    tabOverview: "Visão geral",
    tabActivity: "Atividade",
    tabSettings: "Ajustes",
    tabOverviewPanel: "O painel Visão geral está ativo.",
    tabActivityPanel: "3 novos itens em Atividade.",
    tabSettingsPanel: "Ajuste suas configurações aqui.",

    // ── dialog ──
    dialogOpen: "Abrir modal",
    dialogTitle: "Excluir workspace",
    dialogDescription: "Esta ação não pode ser desfeita.",
    dialogBody: "Remover este workspace exclui todos os projetos e convites dentro dele. Digite o nome para confirmar em um formulário real — aqui, apenas feche o modal.",
    dialogCancel: "Cancelar",
    dialogDelete: "Excluir",

    // ── input mask ──
    maskPhone: "Telefone",
    cpfRaw: "cpf (cru)",
    phoneRaw: "telefone (cru)",

    // ── input boolean ──
    boolYesNo: "Sim / Não",
    boolHasValue: "Tem valor?",
    boolYesNoLabel: "sim/não",
    boolStatusLabel: "status",
    boolNullableLabel: "anulável",

    // ── number stepper ──
    stepperQtyLabel: "qtd (0–10)",
    stepperWeightLabel: "peso (passo 5)",

    // ── multi-select popover ──
    mspUsers: "Usuários",
    mspDepartments: "Departamentos",
    mspSales: "Vendas",
    mspSupport: "Suporte",
    mspEmptyLabel: "Selecione pessoas ou departamentos",
    mspUsersLabel: "usuários",
    mspDepartmentsLabel: "departamentos",

    // ── radio card group ──
    payCreditCard: "Cartão de crédito",
    payCreditCardDesc: "Cobrança recorrente automática.",
    payPix: "Pix",
    payPixDesc: "Instantâneo, sem taxas.",
    payPixBadge: "Recomendado",
    payBoleto: "Boleto",
    payBoletoDesc: "Vence em 3 dias úteis.",
    payCash: "Pagamento na entrega",
    selectedLabel: "selecionado",

    // ── segmented options ──
    segList: "Lista",
    segGrid: "Grade",
    segBoard: "Quadro",
    viewLabel: "visualização",

    // ── date picker ──
    datePickerValueLabel: "valor (YYYY-MM-DD)",
    datePickerTypeHint: "digite DD/MM/AAAA",

    // ── input currency ──
    priceRaw: "preço (cru)",

    // ── accordion ──
    accShipping: "Envio",
    accShippingBody: "Envio em 2–3 dias úteis.",
    accReturns: "Devoluções",
    accReturnsBody: "Devolução grátis em 30 dias, sem perguntas.",
    accWarranty: "Garantia (desabilitado)",
    accWarrantyBody: "Em breve.",
    accOpenSingleLabel: "aberto (modo único)",

    // ── accordion item ──
    accSpecifications: "Especificações",
    accSpecificationsBody: "Peso, dimensões e materiais.",
    accCareTitle: "Instruções de cuidado",
    accCareBody: "Lave à mão com água fria, não seque na secadora.",
    accOpenMultipleLabel: "aberto (modo múltiplo)",

    // ── dropdown ──
    dropdownActions: "Ações",
    ddRename: "Renomear",
    ddDuplicate: "Duplicar",
    ddDelete: "Excluir",

    // ── dropdown item ──
    dropdownOpenMenu: "Abrir menu",
    ddProfile: "Perfil",
    ddApprove: "Aprovar",
    ddFlag: "Sinalizar",
    ddFlagLabel: "Sinalizar para revisão",

    // ── table ──
    colSku: "SKU",
    colProduct: "Produto",
    colQty: "Qtd",
    colTotal: "Total",
    tableLow: "baixo",
    tableInStock: "em estoque",
    tableTotalItems: "Total (3 itens)",

    // ── settings editable field ──
    editableFieldHintPrefix: "Clique",
    editableFieldHintSuffix: "em qualquer linha para abrir o modal de edição.",

    // ── notice ──
    noticeDismissedHint: "O aviso destrutivo foi dispensado — recarregue a prévia para trazê-lo de volta.",

    // ── edit field modal ──
    savedValue: "valor salvo",

    // ── onboarding panel ──
    onboardingPrimary: "primário",
    onboardingSecondary: "secundário",

    // ── loading overlay ──
    loadingOverlayHint: "Clique em \"Salvar\" para cobrir este card com o overlay por ~1,6s.",

    // ── switch card ──
    switchCard2faLabel: "2FA",
    switchCardMaintenanceLabel: "manutenção",

    // ── switch row ──
    switchRowEmailLabel: "e-mail",
    switchRowPushLabel: "push",

    // ── switch segmented ──
    switchSegCycleLabel: "ciclo",
    switchSegEnvLabel: "ambiente",

    // ── added: previously-hardcoded PT demo strings ──
    statusActive: "Ativo",
    statusLabel: "Status",
    actionChange: "Alterar",

    btnNew: "Novo",
    btnExport: "Exportar",
    btnDelete: "Excluir",
    btnSave: "Salvar",
    btnSettings: "Configurações",
    btnMoreOptions: "Mais opções",
    btnAdd: "Adicionar",

    specSheetDocNum: "Cadastro Nº 042 · Atualizado 14.Mar.2026",
    specSheetRegistrationData: "Dados Cadastrais",
    specSheetLegalName: "Razão Social",
    specSheetStateRegistration: "Inscrição Estadual",
    specSheetContact: "Contato",
    specSheetPhone: "Telefone",
    specSheetEmail: "E-mail",
    specSheetChangeData: "Alterar Dados",
    specSheetFinancial: "Financeiro",
    specSheetLimit: "Limite",
    specSheetBalance: "Saldo",
    specSheetDueDate: "Vencimento",
    specSheetDueDateValue: "Dia 10",
    specSheetNotes: "Observações",
    specSheetNotesLabel: "Notas",
    specSheetNotesValue: "Cliente preferencial desde 2019.",
    specSheetName: "Nome",
    specSheetNickname: "Apelido",
    specSheetNotProvided: "Não informado",

    tileIncome: "Entradas",
    tileIncomeSub: "4 formas",
    tileExpenses: "Despesas",
    tileExpensesSub: "3 lançamentos",
    tileTotal: "Total",
    tileOrders: "Pedidos",
    tileToday: "hoje",
    tileApproved: "Aprovados",
    tileCanceled: "Cancelados",
    tileConversion: "Conversão",

    settingsAdvancedFeatures: "Recursos avançados",
    settingsAdvancedFeaturesCaption: "Habilita funcionalidades internas.",
    settingsEmailNotifications: "Notificações por e-mail",
    settingsEmailNotificationsCaption: "Resumo diário das atividades operacionais.",
    settingsPlan: "Plano",
    settingsPlanCaption: "Recursos habilitados para a organização.",
    settingsPlanShortCaption: "Recursos habilitados.",
    settingsTwoConfigs: "2 configs",
    settingsAcceptOrders: "Aceitar pedidos",
    settingsAcceptOrdersCaption: "Recebe novos pedidos pelo app.",
    settingsAutoConfirm: "Confirmação automática",
    settingsAutoConfirmCaption: "Confirma sem revisão manual.",
    settingsDelivery: "Entrega",
    settingsRealtimeTracking: "Rastreio em tempo real",
    settingsSaasCaption: "Sistema SaaS — plano via tabela de assinaturas.",
    settingsSubscriptionV2: "Assinatura V2",
    settingsShowWebApp: "Exibir App Web",
    settingsShowWebAppCaption: "Sub-config do cartão de crédito.",
    settingsUnavailableFeature: "Recurso indisponível",
    settingsUnavailableFeatureCaption: "Requer plano superior.",

    planBasic: "Básico",
    planProfessional: "Profissional",
    planEnterprise: "Enterprise",

    editableUnitName: "Nome da unidade",
    editableUnitNameCaption: "Exibido em relatórios.",
    editableFirstPurchaseDiscount: "Desconto 1ª compra",
    editableFirstPurchaseDiscountCaption: "Valor unitário aplicado.",

    noticeInfoTitle: "Informação",
    noticeInfoBody: "Configuração salva automaticamente.",
    noticeNewTitle: "Novidade",
    noticeNewBody: "O novo painel de rotas já está disponível.",
    noticeActivatedTitle: "Ativado",
    noticeActivatedBody: "Integração concluída com sucesso.",
    noticeManualPaymentTitle: "Pagamento manual",
    noticeManualPaymentBody: "Pix e Boleto geram um link novo de cobrança a cada ciclo.",
    noticePendingTitle: "Aguardando ativação no Stripe",
    noticePendingBody: "Clique em \"Sincronizar\" para criar a assinatura no gateway.",
    noticeErrorTitle: "Falha ao carregar",
    noticeErrorBody: "Não foi possível buscar os dados.",

    editDialogChangeName: "Alterar nome",
    editDialogTitle: "Alterar Nome",
    editDialogDescription: "Atualize o nome da unidade.",
    editDialogPlaceholder: "Nome da unidade",

    requiredValidateForm: "Validar formulário",
    requiredDescription: "Os campos abaixo precisam ser preenchidos antes de criar o cliente.",
    requiredCnpjHint: "Passo 1 · Dados cadastrais",
    requiredPhoneHint: "Passo 2 · Contato",
    requiredDeliveryAddress: "Endereço de entrega",
    requiredDeliveryAddressHint: "Passo 3 · Logística",

    onboardingTitle: "Nenhum projeto por aqui",
    onboardingDescription: "Crie seu primeiro projeto para começar a organizar seu trabalho.",
    onboardingActionLabel: "Criar projeto",
    onboardingSecondaryLabel: "Ver exemplos",
    onboardingSubHint: "Você pode convidar sua equipe depois.",

    loadingOrderSummary: "Resumo do pedido",
    loadingSavingText: "Salvando…",

    switchCard2faTitle: "Autenticação 2FA",
    switchCard2faStatusOn: "ATIVO · TOTP",
    switchCard2faStatusOff: "DESLIGADO",
    switchCardMaintenanceTitle: "Modo manutenção",

    switchRowEmailDesc: "Resumo diário das atividades da organização.",
    switchRowPushTitle: "Notificações push",
    switchRowPushDesc: "Alertas em tempo real no dispositivo.",

    switchSegMonthly: "Mensal",
    switchSegAnnual: "Anual · −20%",
    switchSegSandbox: "Sandbox",
    switchSegProduction: "Produção",

    // ── tree select ──
    treeAdministrative: "Administrativo",
    treeHr: "RH",
    treeFinance: "Financeiro",
    treeOperations: "Operações",
    treeLogistics: "Logística",
    treeFleet: "Frota",
    treeWarehouse: "Almoxarifado",
    treeCommercial: "Comercial",
    treePickOne: "Escolha um centro de custo",
    treePickSeveral: "Escolha vários"

  }
};
