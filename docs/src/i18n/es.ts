import type { Messages } from "./types";

export const es: Messages = {
  meta: { htmlLang: "es", locale: "es-ES" },
  langName: "Español",

  shell: {
    kicker: "Documentación · v0.x",
    lead: "Una biblioteca de componentes tipada, al estilo shadcn — Vue 3, React, Angular y Svelte, con la misma API y el mismo aspecto en cualquier framework.",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "Buscar componentes… (⌘K)",
    searchAria: "Buscar en la documentación",
    chooseFramework: "Elegir framework",
    chooseLanguage: "Elegir idioma",
    openNav: "Abrir navegación",
    closeNav: "Cerrar navegación",
    sidebarAria: "Navegación de la documentación",
    noSectionsFound: "No se encontraron componentes.",
    previewTab: "Vista previa",
    codeTab: "Código",
    referenceTab: "Props y Eventos",
    codeOnlyLabel: "Código",
    defaultPreviewCaption: "componente en vivo · interactúa con él",
    sectionExampleAria: "Ejemplo de {title}",
    githubStars: "{count} estrellas en GitHub",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "Copiar",
    copied: "¡Copiado!"
  },

  categories: {
    gettingStarted: "Primeros pasos",
    forms: "Formularios",
    dataDisplay: "Presentación de datos",
    overlay: "Superposición",
    layoutNav: "Diseño y navegación",
    feedback: "Feedback"
  },

  gettingStarted: {
    install: {
      title: "Instalación",
      p1: "La biblioteca se distribuye como un único paquete npm. Instálalo con el gestor de tu preferencia — <c>vue</c> (3.4+) es la única peer dependency.",
      p2: "Cada componente se publica para los cuatro frameworks en un subpath correspondiente — <c>@arcanalabs/ui-components/vue</c>, <c>/react</c>, <c>/angular</c> y <c>/svelte</c>; importa solo los que uses. Los iconos usan Font Awesome Free — instala <c>@fortawesome/fontawesome-free</c> e importa su CSS una vez."
    },
    usage: {
      title: "Uso",
      p1: "Importa un componente y colócalo en tu plantilla. Todos siguen las mismas convenciones: <c>v-model</c> para valores bidireccionales, props en kebab-case y un evento <c>change</c> junto a <c>update:modelValue</c>.",
      p2: "La paleta es la escala neutra shadcn <i>zinc</i>, así que los componentes conviven bien entre sí sin configurar ningún tema."
    },
    styles: {
      title: "Estilos",
      p1: "Importa la hoja de estilos una vez, en la raíz de tu aplicación: <c>import '@arcanalabs/ui-components/styles.css'</c>. Contiene los tokens visuales de todos los componentes.",
      p2: "Los estilos son CSS puro, con scope por componente — no hay motor de estilos en runtime ni requisito de Tailwind en el consumidor."
    },
    maska: {
      title: "Registrar v-maska",
      p1: "Algunos componentes (<c>ArcanaInputMask</c>, <c>ArcanaDatePicker</c>) dependen de la directiva <c>v-maska</c> del paquete <c>maska</c>. Regístrala globalmente una vez al crear la app.",
      p2: "Los componentes que no usan máscara no necesitan configuración extra — este paso solo hace falta si renderizas un input con máscara."
    }
  },

  propsTable: {
    name: "Prop",
    type: "Tipo",
    default: "Por defecto",
    description: "Descripción",
    caption: "Props",
    eventsTitle: "Eventos emitidos"
  },

  demoCaption: "componente en vivo · interactúa con él",
  comingSoon: "La documentación completa de este componente llegará en un próximo lote. Ya se publica para Vue, React, Angular y Svelte y está lista para usar.",
  frameworkSoon: "// Vue, React, Angular y Svelte ofrecen el mismo componente — elige un framework arriba para ver su uso.",

  components: {
    button: {
      blurb: "Un botón pulsable en quince variantes semánticas; la etiqueta va por el slot por defecto y los clics por el evento <c>click</c>."
    },
    badge: {
      blurb: "Una píldora compacta para contadores, estados y etiquetas — seis colores, dos tamaños y modo <c>dot</c> y <c>clickable</c> opcionales."
    },
    input: {
      blurb: "Un <c>&lt;input&gt;</c> nativo con estilo shadcn y un <c>v-model</c> consciente de números; los atributos HTML estándar pasan directamente."
    },
    select: {
      blurb: "Un select totalmente personalizado (sin Element Plus) teletransportado a <c>&lt;body&gt;</c>, con selección única/<c>multiple</c>, <c>searchable</c>, <c>clearable</c> y navegación por teclado."
    },
    treeSelect: {
      blurb: "Un select cuyo panel es una jerarquía con búsqueda — elige un nodo del árbol (centros de coste, categorías), único o múltiple, seleccionando solo hojas por defecto."
    },
    checkbox: {
      blurb: "Un checkbox binario que envuelve un <c>&lt;input type=\"checkbox\"&gt;</c> nativo real con estado <c>indeterminate</c>; usa <c>ArcanaSwitch</c> para activar un ajuste."
    },
    switch: {
      blurb: "Un toggle binario on/off (switch WAI-ARIA), codificado por color rojo/verde, con un checkbox oculto opcional para formularios nativos."
    },
    tabs: {
      blurb: "Pestañas personalizadas gobernadas por un array <c>tabs</c> y <c>v-model</c>, con seis variantes desde píldoras hasta navegación lateral completa."
    },
    dialog: {
      blurb: "Un modal shadcn con API <c>show()</c>/<c>hide()</c> basada en ref — se teletransporta a <c>&lt;body&gt;</c>, atrapa el foco y cierra con Escape."
    },
    inputMask: {
      blurb: "Un input de texto con máscara sobre <c>v-maska</c> cuyo <c>v-model</c> siempre guarda el valor <b>crudo</b> (CPF, CNPJ, teléfono…); requiere <c>v-maska</c> registrado globalmente."
    },
    inputBoolean: {
      blurb: "Un select sí/no para campos booleanos que normaliza <c>true</c>/<c>false</c>/<c>null</c>, con variaciones de etiqueta de estado y tipo SQL."
    },
    numberStepper: {
      blurb: "Un input numérico flanqueado por botones <c>−</c>/<c>+</c> que respetan <c>min</c>/<c>max</c>/<c>step</c> y las flechas del teclado."
    },
    multiSelectPopover: {
      blurb: "Un popover teletransportado al body con multiselección por checkbox en pestañas; el <c>v-model</c> es un mapa <c>{ [tabKey]: number[] }</c>, cada pestaña alimentada por un <c>fetch()</c> asíncrono."
    },
    radioCardGroup: {
      blurb: "Tarjetas seleccionables respaldadas por <c>&lt;input type=\"radio\"&gt;</c> reales, cada una con descripción, icono o badge; dispuestas apiladas, <c>inline</c> o en <c>columns</c>."
    },
    segmentedOptions: {
      blurb: "Un control segmentado para N opciones mutuamente excluyentes dentro de una píldora, con iconos y desactivación por opción."
    },
    datePicker: {
      blurb: "Un campo de fecha shadcn que combina un input con máscara <c>DD/MM/AAAA</c> y un popover de calendario; el <c>v-model</c> es una cadena ISO <c>YYYY-MM-DD</c>."
    },
    inputCurrency: {
      blurb: "Un input de moneda (sobre <c>v-money3</c>) que formatea mientras escribes, con decimales configurables y límites <c>min</c>/<c>max</c>; BRL por defecto."
    },
    accordion: {
      blurb: "El contenedor de <c>ArcanaAccordionItem</c>s plegables, que vincula un <c>v-model</c> para el modo de apertura única o múltiple."
    },
    accordionItem: {
      blurb: "Un único panel plegable dentro de un <c>ArcanaAccordion</c>, identificado por un <c>name</c>, con cabecera <c>title</c> y cuerpo por slot."
    },
    dropdown: {
      blurb: "Un menú desplegable shadcn que se teletransporta a <c>&lt;body&gt;</c>, se autoposiciona y cierra al clicar fuera, con Escape o al seleccionar."
    },
    dropdownItem: {
      blurb: "Una fila dentro de un <c>ArcanaDropdown</c> — <c>icon</c>, etiqueta y <c>suffix</c> opcionales — coloreable, con separador <c>divided</c> para acciones destructivas."
    },
    table: {
      blurb: "Una tabla shadcn estática para arrays en memoria; las columnas declaran <c>{ key, label, width?, align?, valueGetter? }</c>, con slots de celda y pie."
    },
    specSheet: {
      blurb: "Una \"ficha técnica\" editorial de solo lectura para registros formales, con antetítulo <c>docNum</c>, un <c>title</c> y secciones hijas."
    },
    specSheetSection: {
      blurb: "Una sección dentro de un <c>ArcanaSpecSheet</c> — <c>icon</c> de acento, <c>title</c> y <c>sectionNum</c> sobre una cuadrícula <c>columns</c> de campos."
    },
    specSheetField: {
      blurb: "Un único par etiqueta/valor; un valor vacío muestra <c>emptyText</c> para que los huecos parezcan intencionales, y <c>span</c> lo ensancha."
    },
    summaryTiles: {
      blurb: "El contenedor de cuadrícula responsiva para tiles de KPI; ajusta <c>columns</c> (3 por defecto), colapsando a una por debajo de 880px."
    },
    summaryTile: {
      blurb: "Una estadística KPI compacta dispuesta como <c>[icon] [label + sub] [value]</c>, en cuatro <c>tone</c>s fáciles de escanear."
    },
    settingsList: {
      blurb: "Un contenedor estilo Ajustes de iOS con filas separadas por líneas finas, cada una con etiqueta + subtítulo y un control alineado a la derecha."
    },
    settingsListGroup: {
      blurb: "Una sección titulada, opcionalmente <c>collapsible</c>, dentro de un <c>ArcanaSettingsList</c>, con un icono, <c>sectionNum</c> y <c>meta</c>."
    },
    settingsListItem: {
      blurb: "Una única fila de ajustes — <c>label</c> + <c>caption</c> a la izquierda, tu control a la derecha."
    },
    settingsEditableField: {
      blurb: "Una fila inteligente que agrupa un valor de solo lectura, un botón \"Alterar\" y su modal de edición en una etiqueta (<c>text</c>/<c>currency</c>/<c>number</c>/<c>select</c>)."
    },
    notice: {
      blurb: "Un banner en línea en seis variantes semánticas con iconos a juego, opcionalmente <c>dismissible</c>, para avisos y errores no bloqueantes."
    },
    editFieldModal: {
      blurb: "Un envoltorio de modal genérico \"Alterar X\" gobernado por ref que aporta el marco y recibe el input del campo por su slot."
    },
    requiredFieldsDialog: {
      blurb: "Un diálogo ámbar que lista los campos obligatorios que aún faltan en un formulario multipaso, cada pista apuntando al paso a corregir."
    },
    onboardingPanel: {
      blurb: "Un panel pulido de estado vacío / CTA para la configuración inicial — icono con degradado, título, descripción y una llamada a la acción principal."
    },
    loadingOverlay: {
      blurb: "Una superposición de spinner acotada sobre un fondo difuminado, que cubre su ancestro posicionado más cercano; se alterna con <c>visible</c>."
    },
    skeleton: {
      blurb: "Un bloque marcador de posición con brillo para estados de carga; ajusta <c>width</c>/<c>height</c>, elige un preset <c>rounded</c> y respeta reduced-motion."
    },
    switchCard: {
      blurb: "Un toggle de alto impacto a todo el ancho que pone toda la tarjeta esmeralda al activarse — resérvalo para ajustes importantes."
    },
    switchRow: {
      blurb: "Un toggle de fila de ajustes a todo el ancho — título + descripción a la izquierda, un switch compacto a la derecha, toda la fila clicable."
    },
    switchSegmented: {
      blurb: "Un toggle binario con forma de cápsula segmentada con un indicador deslizante, que se lee como \"A o B\" en lugar de on/off."
    }
  },

  demos: {
    // ── shared ──
    lastAction: "última acción",
    timesSuffix: "vez(ces)",
    disabledLabel: "Deshabilitado",

    // ── button ──
    btnPrimary: "Primario",
    btnSecondary: "Secundario",
    btnOutline: "Contorno",
    btnGhost: "Fantasma",
    btnSuccess: "Éxito",
    btnIndigo: "Índigo",
    btnDestructive: "Destructivo",
    btnOutlineDanger: "Contorno peligro",
    primaryClickedPrefix: "Clicado",

    // ── badge ──
    badgeNeutral: "neutral",
    badgeBlue: "azul",
    badgeGreen: "verde",
    badgeRed: "rojo",
    badgeAmber: "ámbar",
    badgeViolet: "violeta",
    badgeActive: "Activo",
    badgeOffline: "Desconectado",
    badgeSmSize: "tamaño sm",
    badgeClickable: "clicable",

    // ── input ──
    quantity: "Cantidad",
    inputReadonly: "Solo lectura",
    inputLockedValue: "Valor bloqueado",
    inputEmailLabel: "email",
    inputQtyLabel: "cant.",

    // ── select ──
    selectPickFruit: "Elige una fruta",
    selectPickSeveral: "Elige varias",
    fruitApple: "Manzana",
    fruitBanana: "Plátano",
    fruitCherry: "Cereza",
    fruitCherryDesc: "de temporada",
    fruitDurian: "Durián",
    fruitElderberry: "Saúco",
    selectSingleLabel: "único",
    selectMultipleLabel: "múltiple",

    // ── checkbox ──
    checkboxSelectAll: "Seleccionar todo",
    checkboxInvoices: "Facturas",
    checkboxReceipts: "Recibos",
    checkboxStatements: "Extractos",
    checkboxArchivedDisabled: "Archivado (deshabilitado)",

    // ── switch ──
    switchNotifications: "Notificaciones",
    switchBetaFeatures: "Funciones beta",

    // ── tabs ──
    tabOverview: "Resumen",
    tabActivity: "Actividad",
    tabSettings: "Ajustes",
    tabOverviewPanel: "El panel de Resumen está activo.",
    tabActivityPanel: "3 elementos nuevos en Actividad.",
    tabSettingsPanel: "Ajusta tus Ajustes aquí.",

    // ── dialog ──
    dialogOpen: "Abrir modal",
    dialogTitle: "Eliminar espacio de trabajo",
    dialogDescription: "Esta acción no se puede deshacer.",
    dialogBody: "Eliminar este espacio de trabajo borra todos los proyectos e invitaciones que contiene. Escribe el nombre para confirmar en un formulario real — aquí, solo cierra el modal.",
    dialogCancel: "Cancelar",
    dialogDelete: "Eliminar",

    // ── input mask ──
    maskPhone: "Teléfono",
    cpfRaw: "cpf (crudo)",
    phoneRaw: "teléfono (crudo)",

    // ── input boolean ──
    boolYesNo: "Sí / No",
    boolHasValue: "¿Tiene valor?",
    boolYesNoLabel: "sí/no",
    boolStatusLabel: "estado",
    boolNullableLabel: "anulable",

    // ── number stepper ──
    stepperQtyLabel: "cant. (0–10)",
    stepperWeightLabel: "peso (paso 5)",

    // ── multi-select popover ──
    mspUsers: "Usuarios",
    mspDepartments: "Departamentos",
    mspSales: "Ventas",
    mspSupport: "Soporte",
    mspEmptyLabel: "Selecciona personas o departamentos",
    mspUsersLabel: "usuarios",
    mspDepartmentsLabel: "departamentos",

    // ── radio card group ──
    payCreditCard: "Tarjeta de crédito",
    payCreditCardDesc: "Cargo recurrente automático.",
    payPix: "Pix",
    payPixDesc: "Instantáneo, sin comisiones.",
    payPixBadge: "Recomendado",
    payBoleto: "Boleto",
    payBoletoDesc: "Vence en 3 días hábiles.",
    payCash: "Pago contra entrega",
    selectedLabel: "seleccionado",

    // ── segmented options ──
    segList: "Lista",
    segGrid: "Cuadrícula",
    segBoard: "Tablero",
    viewLabel: "vista",

    // ── date picker ──
    datePickerValueLabel: "valor (YYYY-MM-DD)",
    datePickerTypeHint: "escribe DD/MM/AAAA",

    // ── input currency ──
    priceRaw: "precio (crudo)",

    // ── accordion ──
    accShipping: "Envío",
    accShippingBody: "Se envía en 2–3 días hábiles.",
    accReturns: "Devoluciones",
    accReturnsBody: "Devoluciones gratuitas en 30 días, sin preguntas.",
    accWarranty: "Garantía (deshabilitada)",
    accWarrantyBody: "Próximamente.",
    accOpenSingleLabel: "abierto (modo único)",

    // ── accordion item ──
    accSpecifications: "Especificaciones",
    accSpecificationsBody: "Peso, dimensiones y materiales.",
    accCareTitle: "Instrucciones de cuidado",
    accCareBody: "Lavar a mano en frío, no usar secadora.",
    accOpenMultipleLabel: "abierto (modo múltiple)",

    // ── dropdown ──
    dropdownActions: "Acciones",
    ddRename: "Renombrar",
    ddDuplicate: "Duplicar",
    ddDelete: "Eliminar",

    // ── dropdown item ──
    dropdownOpenMenu: "Abrir menú",
    ddProfile: "Perfil",
    ddApprove: "Aprobar",
    ddFlag: "Marcar",
    ddFlagLabel: "Marcar para revisión",

    // ── table ──
    colSku: "SKU",
    colProduct: "Producto",
    colQty: "Cant.",
    colTotal: "Total",
    tableLow: "bajo",
    tableInStock: "en stock",
    tableTotalItems: "Total (3 artículos)",

    // ── settings editable field ──
    editableFieldHintPrefix: "Haz clic",
    editableFieldHintSuffix: "en cualquier fila para abrir su modal de edición.",

    // ── notice ──
    noticeDismissedHint: "El aviso destructivo se descartó — recarga la vista previa para recuperarlo.",

    // ── edit field modal ──
    savedValue: "valor guardado",

    // ── onboarding panel ──
    onboardingPrimary: "primario",
    onboardingSecondary: "secundario",

    // ── loading overlay ──
    loadingOverlayHint: "Haz clic en \"Salvar\" para cubrir esta tarjeta con la superposición durante ~1,6s.",

    // ── switch card ──
    switchCard2faLabel: "2FA",
    switchCardMaintenanceLabel: "mantenimiento",

    // ── switch row ──
    switchRowEmailLabel: "e-mail",
    switchRowPushLabel: "push",

    // ── switch segmented ──
    switchSegCycleLabel: "ciclo",
    switchSegEnvLabel: "entorno",

    // ── added: previously-hardcoded PT demo strings ──
    statusActive: "Activo",
    statusLabel: "Estado",
    actionChange: "Cambiar",

    btnNew: "Nuevo",
    btnExport: "Exportar",
    btnDelete: "Eliminar",
    btnSave: "Guardar",
    btnSettings: "Ajustes",
    btnMoreOptions: "Más opciones",
    btnAdd: "Añadir",

    specSheetDocNum: "Registro N.º 042 · Actualizado 14.Mar.2026",
    specSheetRegistrationData: "Datos de registro",
    specSheetLegalName: "Razón social",
    specSheetStateRegistration: "Inscripción estatal",
    specSheetContact: "Contacto",
    specSheetPhone: "Teléfono",
    specSheetEmail: "Correo electrónico",
    specSheetChangeData: "Cambiar datos",
    specSheetFinancial: "Financiero",
    specSheetLimit: "Límite",
    specSheetBalance: "Saldo",
    specSheetDueDate: "Fecha de vencimiento",
    specSheetDueDateValue: "Día 10",
    specSheetNotes: "Notas",
    specSheetNotesLabel: "Notas",
    specSheetNotesValue: "Cliente preferente desde 2019.",
    specSheetName: "Nombre",
    specSheetNickname: "Apodo",
    specSheetNotProvided: "No proporcionado",

    tileIncome: "Ingresos",
    tileIncomeSub: "4 métodos",
    tileExpenses: "Gastos",
    tileExpensesSub: "3 entradas",
    tileTotal: "Total",
    tileOrders: "Pedidos",
    tileToday: "hoy",
    tileApproved: "Aprobados",
    tileCanceled: "Cancelados",
    tileConversion: "Conversión",

    settingsAdvancedFeatures: "Funciones avanzadas",
    settingsAdvancedFeaturesCaption: "Habilita la funcionalidad interna.",
    settingsEmailNotifications: "Notificaciones por correo",
    settingsEmailNotificationsCaption: "Resumen diario de las actividades operativas.",
    settingsPlan: "Plan",
    settingsPlanCaption: "Funciones habilitadas para la organización.",
    settingsPlanShortCaption: "Funciones habilitadas.",
    settingsTwoConfigs: "2 ajustes",
    settingsAcceptOrders: "Aceptar pedidos",
    settingsAcceptOrdersCaption: "Recibe nuevos pedidos a través de la app.",
    settingsAutoConfirm: "Confirmación automática",
    settingsAutoConfirmCaption: "Confirma sin revisión manual.",
    settingsDelivery: "Entrega",
    settingsRealtimeTracking: "Seguimiento en tiempo real",
    settingsSaasCaption: "Sistema SaaS — plan mediante tabla de suscripción.",
    settingsSubscriptionV2: "Suscripción V2",
    settingsShowWebApp: "Mostrar Web App",
    settingsShowWebAppCaption: "Subajuste de tarjeta de crédito.",
    settingsUnavailableFeature: "Función no disponible",
    settingsUnavailableFeatureCaption: "Requiere un plan superior.",

    planBasic: "Básico",
    planProfessional: "Profesional",
    planEnterprise: "Empresarial",

    editableUnitName: "Nombre de la unidad",
    editableUnitNameCaption: "Se muestra en los informes.",
    editableFirstPurchaseDiscount: "Descuento en la primera compra",
    editableFirstPurchaseDiscountCaption: "Valor unitario aplicado.",

    noticeInfoTitle: "Información",
    noticeInfoBody: "Ajuste guardado automáticamente.",
    noticeNewTitle: "Novedades",
    noticeNewBody: "El nuevo panel de rutas ya está disponible.",
    noticeActivatedTitle: "Activado",
    noticeActivatedBody: "Integración completada con éxito.",
    noticeManualPaymentTitle: "Pago manual",
    noticeManualPaymentBody: "Pix y Boleto generan un nuevo enlace de cobro en cada ciclo.",
    noticePendingTitle: "Esperando activación en Stripe",
    noticePendingBody: "Haz clic en \"Sincronizar\" para crear la suscripción en la pasarela.",
    noticeErrorTitle: "Error al cargar",
    noticeErrorBody: "No se pudieron obtener los datos.",

    editDialogChangeName: "Cambiar nombre",
    editDialogTitle: "Cambiar nombre",
    editDialogDescription: "Actualiza el nombre de la unidad.",
    editDialogPlaceholder: "Nombre de la unidad",

    requiredValidateForm: "Validar formulario",
    requiredDescription: "Los campos de abajo deben completarse antes de crear el cliente.",
    requiredCnpjHint: "Paso 1 · Datos de registro",
    requiredPhoneHint: "Paso 2 · Contacto",
    requiredDeliveryAddress: "Dirección de entrega",
    requiredDeliveryAddressHint: "Paso 3 · Logística",

    onboardingTitle: "Aún no hay proyectos aquí",
    onboardingDescription: "Crea tu primer proyecto para empezar a organizar tu trabajo.",
    onboardingActionLabel: "Crear proyecto",
    onboardingSecondaryLabel: "Ver ejemplos",
    onboardingSubHint: "Puedes invitar a tu equipo más tarde.",

    loadingOrderSummary: "Resumen del pedido",
    loadingSavingText: "Guardando…",

    switchCard2faTitle: "Autenticación 2FA",
    switchCard2faStatusOn: "ACTIVO · TOTP",
    switchCard2faStatusOff: "INACTIVO",
    switchCardMaintenanceTitle: "Modo de mantenimiento",

    switchRowEmailDesc: "Resumen diario de las actividades de la organización.",
    switchRowPushTitle: "Notificaciones push",
    switchRowPushDesc: "Alertas en tiempo real en el dispositivo.",

    switchSegMonthly: "Mensual",
    switchSegAnnual: "Anual · −20%",
    switchSegSandbox: "Sandbox",
    switchSegProduction: "Producción",

    // ── tree select ──
    treeAdministrative: "Administrativo",
    treeHr: "RR. HH.",
    treeFinance: "Finanzas",
    treeOperations: "Operaciones",
    treeLogistics: "Logística",
    treeFleet: "Flota",
    treeWarehouse: "Almacén",
    treeCommercial: "Comercial",
    treePickOne: "Elige un centro de coste",
    treePickSeveral: "Elige varios"

  }
};
