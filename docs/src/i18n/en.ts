import type { Messages } from "./types";

export const en: Messages = {
  meta: { htmlLang: "en", locale: "en-US" },
  langName: "English",

  shell: {
    kicker: "Documentation · v0.x",
    lead: "A typed, arcana-style component library — Vue 3, React, Angular and Svelte, with the same API and the same look in every framework.",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "Search components… (⌘K)",
    searchAria: "Search the documentation",
    chooseFramework: "Choose framework",
    chooseLanguage: "Choose language",
    openNav: "Open navigation",
    closeNav: "Close navigation",
    sidebarAria: "Documentation navigation",
    noSectionsFound: "No components found.",
    previewTab: "Preview",
    codeTab: "Code",
    referenceTab: "Props & Events",
    codeOnlyLabel: "Code",
    defaultPreviewCaption: "live component · interact with it",
    sectionExampleAria: "{title} example",
    githubStars: "{count} stars on GitHub",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "Copy",
    copied: "Copied!"
  },

  categories: {
    gettingStarted: "Getting started",
    forms: "Forms",
    dataDisplay: "Data display",
    overlay: "Overlay",
    layoutNav: "Layout & navigation",
    feedback: "Feedback"
  },

  gettingStarted: {
    install: {
      title: "Installation",
      p1: "The library ships as a single npm package. Install it with your package manager of choice — <c>vue</c> (3.4+) is the only peer dependency.",
      p2: "Every component ships for all four frameworks under a matching subpath — <c>@arcanalabs/ui-components/vue</c>, <c>/react</c>, <c>/angular</c> and <c>/svelte</c>; import just the ones you use. Icons use Font Awesome Free — install <c>@fortawesome/fontawesome-free</c> and import its CSS once."
    },
    usage: {
      title: "Usage",
      p1: "Import a component and drop it into your template. Every component follows the same conventions: <c>v-model</c> for two-way values, kebab-case props, and a matching <c>change</c> event next to <c>update:modelValue</c>.",
      p2: "The palette is the neutral shadcn <i>zinc</i> scale, so components sit comfortably next to each other with no theme configuration."
    },
    styles: {
      title: "Styles",
      p1: "Import the stylesheet once, at the root of your application: <c>import '@arcanalabs/ui-components/styles.css'</c>. It carries every component's visual tokens.",
      p2: "Styles are plain CSS scoped per component — there is no runtime style engine and no Tailwind requirement in the consumer."
    },
    maska: {
      title: "Registering v-maska",
      p1: "A few components (<c>ArcanaInputMask</c>, <c>ArcanaDatePicker</c>) rely on the <c>v-maska</c> directive from the <c>maska</c> package. Register it globally once when you create the app.",
      p2: "Components that don't use masking need no extra setup — this step is only required if you render a masked input."
    }
  },

  propsTable: {
    name: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
    caption: "Props",
    eventsTitle: "Emitted events"
  },

  demoCaption: "live component · interact with it",
  comingSoon: "Full documentation for this component is coming in a future batch. It already ships for Vue, React, Angular and Svelte and is ready to use.",
  frameworkSoon: "// Vue, React, Angular and Svelte all ship the same component — pick a framework above to see its usage.",

  components: {
    button: {
      blurb: "A pressable button in fifteen semantic variants; label via the default slot, clicks via the <c>click</c> event."
    },
    badge: {
      blurb: "A compact pill for counts, statuses and tags — six colours, two sizes, optional <c>dot</c> and <c>clickable</c> mode."
    },
    input: {
      blurb: "A native <c>&lt;input&gt;</c> with shadcn styling and a number-aware <c>v-model</c>; standard HTML attributes pass straight through."
    },
    select: {
      blurb: "A fully custom select (no Element Plus) teleported to <c>&lt;body&gt;</c>, with single/<c>multiple</c>, <c>searchable</c>, <c>clearable</c> and keyboard navigation."
    },
    treeSelect: {
      blurb: "A select whose panel is a searchable hierarchy — pick a node from a tree (cost centres, categories), single or multiple, with leaf-only selection by default."
    },
    checkbox: {
      blurb: "A binary checkbox wrapping a real native <c>&lt;input type=\"checkbox\"&gt;</c> with an <c>indeterminate</c> state; use <c>ArcanaSwitch</c> to toggle a setting."
    },
    switch: {
      blurb: "A binary on/off toggle (WAI-ARIA switch), colour-coded red/green, with an optional hidden checkbox for native forms."
    },
    tabs: {
      blurb: "Custom tabs driven by a <c>tabs</c> array and <c>v-model</c>, with six variants from pills to full sidebar navigation."
    },
    dialog: {
      blurb: "A shadcn modal with a ref-based <c>show()</c>/<c>hide()</c> API — teleports to <c>&lt;body&gt;</c>, traps focus and closes on Escape."
    },
    inputMask: {
      blurb: "A masked text input on <c>v-maska</c> whose <c>v-model</c> always holds the <b>raw</b> value (CPF, CNPJ, phone…); requires <c>v-maska</c> registered globally."
    },
    inputBoolean: {
      blurb: "A yes/no select for boolean fields that normalises <c>true</c>/<c>false</c>/<c>null</c>, with status and SQL-like label variations."
    },
    numberStepper: {
      blurb: "A numeric input flanked by <c>−</c>/<c>+</c> buttons that respect <c>min</c>/<c>max</c>/<c>step</c> and the keyboard arrows."
    },
    multiSelectPopover: {
      blurb: "A body-teleported popover with tabbed checkbox multi-selection; the <c>v-model</c> is a <c>{ [tabKey]: number[] }</c> map, each tab fed by an async <c>fetch()</c>."
    },
    radioCardGroup: {
      blurb: "Selectable cards backed by real <c>&lt;input type=\"radio\"&gt;</c>, each with a description, icon or badge; lay out stacked, <c>inline</c> or in <c>columns</c>."
    },
    segmentedOptions: {
      blurb: "A segmented control for N mutually-exclusive options inside a pill — per-option icons (with their own colour), icon-only segments, four sizes plus CSS tokens for a custom one."
    },
    datePicker: {
      blurb: "A self-contained calendar field (no Element Plus) with five <c>type</c>s — <c>date</c>, <c>month</c>, <c>year</c>, <c>daterange</c> and <c>datetime</c> — with Intl-based month/weekday names via the <c>locale</c> prop."
    },
    inputCurrency: {
      blurb: "A currency input (on <c>v-money3</c>) that formats as you type, with configurable decimals and <c>min</c>/<c>max</c> clamping; BRL by default."
    },
    accordion: {
      blurb: "The container for collapsible <c>ArcanaAccordionItem</c>s, binding a <c>v-model</c> for single- or multiple-open mode."
    },
    accordionItem: {
      blurb: "A single collapsible panel inside a <c>ArcanaAccordion</c>, identified by a <c>name</c>, with a <c>title</c> header and slot body."
    },
    dropdown: {
      blurb: "A shadcn dropdown menu that teleports to <c>&lt;body&gt;</c>, auto-positions and closes on outside click, Escape or selection."
    },
    dropdownItem: {
      blurb: "A row inside a <c>ArcanaDropdown</c> — optional <c>icon</c>, label and <c>suffix</c> — colourable, with a <c>divided</c> separator for destructive actions."
    },
    table: {
      blurb: "A static shadcn table for in-memory arrays; columns declare <c>{ key, label, width?, align?, valueGetter? }</c>, with cell and footer slots."
    },
    specSheet: {
      blurb: "A read-only, editorial \"spec sheet\" for formal records, with a <c>docNum</c> eyebrow, a <c>title</c> and section children."
    },
    specSheetSection: {
      blurb: "A section inside a <c>ArcanaSpecSheet</c> — accent <c>icon</c>, <c>title</c> and <c>sectionNum</c> over a <c>columns</c> grid of fields."
    },
    specSheetField: {
      blurb: "A single label/value pair; an empty value shows <c>emptyText</c> so gaps read as intentional, and <c>span</c> widens it."
    },
    summaryTiles: {
      blurb: "The responsive grid container for KPI tiles; set <c>columns</c> (default 3), collapsing to one below 880px."
    },
    summaryTile: {
      blurb: "A compact KPI stat laid out as <c>[icon] [label + sub] [value]</c>, in four scannable <c>tone</c>s."
    },
    settingsList: {
      blurb: "An iOS-Settings-style container of hairline-separated rows, each with a label + caption and a right-aligned control."
    },
    settingsListGroup: {
      blurb: "A titled, optionally <c>collapsible</c> section inside a <c>ArcanaSettingsList</c>, with an icon, <c>sectionNum</c> and <c>meta</c>."
    },
    settingsListItem: {
      blurb: "A single settings row — <c>label</c> + <c>caption</c> on the left, your control on the right."
    },
    settingsEditableField: {
      blurb: "A smart row folding a read-only value, an \"Alterar\" button and its edit modal into one tag (<c>text</c>/<c>currency</c>/<c>number</c>/<c>select</c>)."
    },
    notice: {
      blurb: "An inline banner in six semantic variants with matching icons, optionally <c>dismissible</c>, for advisories and non-blocking errors."
    },
    editFieldModal: {
      blurb: "A generic ref-driven \"Alterar X\" modal wrapper that supplies the chrome and takes the field input through its slot."
    },
    requiredFieldsDialog: {
      blurb: "An amber dialog listing the required fields still missing from a multi-step form, each hint pointing to the step to fix."
    },
    onboardingPanel: {
      blurb: "A polished empty-state / CTA panel for first-time setup — gradient icon, title, description and a primary call to action."
    },
    loadingOverlay: {
      blurb: "A scoped spinner overlay over a blurred backdrop, covering its nearest positioned ancestor; toggle it with <c>visible</c>."
    },
    skeleton: {
      blurb: "A shimmering placeholder block for loading states; set <c>width</c>/<c>height</c>, pick a <c>rounded</c> preset, honours reduced-motion."
    },
    switchCard: {
      blurb: "A high-impact full-width toggle that turns the whole card emerald when on — reserve it for weighty settings."
    },
    switchRow: {
      blurb: "A full-width settings-row toggle — title + description on the left, a compact switch on the right, whole row clickable."
    },
    switchSegmented: {
      blurb: "A binary toggle shaped like a segmented capsule with a sliding indicator, reading as \"A or B\" rather than on/off."
    }
  },

  demos: {
    // ── shared ──
    lastAction: "last action",
    timesSuffix: "time(s)",
    disabledLabel: "Disabled",

    // ── button ──
    btnPrimary: "Primary",
    btnSecondary: "Secondary",
    btnOutline: "Outline",
    btnGhost: "Ghost",
    btnSuccess: "Success",
    btnIndigo: "Indigo",
    btnDestructive: "Destructive",
    btnOutlineDanger: "Outline danger",
    primaryClickedPrefix: "Primary clicked",

    // ── badge ──
    badgeNeutral: "neutral",
    badgeBlue: "blue",
    badgeGreen: "green",
    badgeRed: "red",
    badgeAmber: "amber",
    badgeViolet: "violet",
    badgeActive: "Active",
    badgeOffline: "Offline",
    badgeSmSize: "sm size",
    badgeClickable: "clickable",

    // ── input ──
    quantity: "Quantity",
    inputReadonly: "Read-only",
    inputLockedValue: "Locked value",
    inputEmailLabel: "email",
    inputQtyLabel: "qty",

    // ── select ──
    selectPickFruit: "Pick a fruit",
    selectPickSeveral: "Pick several",
    fruitApple: "Apple",
    fruitBanana: "Banana",
    fruitCherry: "Cherry",
    fruitCherryDesc: "seasonal",
    fruitDurian: "Durian",
    fruitElderberry: "Elderberry",
    selectSingleLabel: "single",
    selectMultipleLabel: "multiple",

    // ── checkbox ──
    checkboxSelectAll: "Select all",
    checkboxInvoices: "Invoices",
    checkboxReceipts: "Receipts",
    checkboxStatements: "Statements",
    checkboxArchivedDisabled: "Archived (disabled)",

    // ── switch ──
    switchNotifications: "Notifications",
    switchBetaFeatures: "Beta features",

    // ── tabs ──
    tabOverview: "Overview",
    tabActivity: "Activity",
    tabSettings: "Settings",
    tabOverviewPanel: "The Overview panel is active.",
    tabActivityPanel: "3 new items in Activity.",
    tabSettingsPanel: "Adjust your Settings here.",

    // ── dialog ──
    dialogOpen: "Open dialog",
    dialogTitle: "Delete workspace",
    dialogDescription: "This action cannot be undone.",
    dialogBody: "Removing this workspace deletes every project and invite inside it. Type the name to confirm in a real form — here, just close the dialog.",
    dialogCancel: "Cancel",
    dialogDelete: "Delete",

    // ── input mask ──
    maskPhone: "Phone",
    cpfRaw: "cpf (raw)",
    phoneRaw: "phone (raw)",

    // ── input boolean ──
    boolYesNo: "Yes / No",
    boolHasValue: "Has value?",
    boolYesNoLabel: "yes/no",
    boolStatusLabel: "status",
    boolNullableLabel: "nullable",

    // ── number stepper ──
    stepperQtyLabel: "qty (0–10)",
    stepperWeightLabel: "weight (step 5)",

    // ── multi-select popover ──
    mspUsers: "Users",
    mspDepartments: "Departments",
    mspSales: "Sales",
    mspSupport: "Support",
    mspEmptyLabel: "Select people or departments",
    mspUsersLabel: "users",
    mspDepartmentsLabel: "departments",

    // ── radio card group ──
    payCreditCard: "Credit card",
    payCreditCardDesc: "Automatic recurring charge.",
    payPix: "Pix",
    payPixDesc: "Instant, no fees.",
    payPixBadge: "Recommended",
    payBoleto: "Boleto",
    payBoletoDesc: "Due in 3 business days.",
    payCash: "Cash on delivery",
    selectedLabel: "selected",

    // ── segmented options ──
    segList: "List",
    segGrid: "Grid",
    segBoard: "Board",
    viewLabel: "view",

    // ── date picker ──
    datePickerValueLabel: "value (YYYY-MM-DD)",
    datePickerTypeHint: "type DD/MM/AAAA",

    // ── input currency ──
    priceRaw: "price (raw)",

    // ── accordion ──
    accShipping: "Shipping",
    accShippingBody: "Ships in 2–3 business days.",
    accReturns: "Returns",
    accReturnsBody: "30-day free returns, no questions asked.",
    accWarranty: "Warranty (disabled)",
    accWarrantyBody: "Coming soon.",
    accOpenSingleLabel: "open (single mode)",

    // ── accordion item ──
    accSpecifications: "Specifications",
    accSpecificationsBody: "Weight, dimensions and materials.",
    accCareTitle: "Care instructions",
    accCareBody: "Hand wash cold, do not tumble dry.",
    accOpenMultipleLabel: "open (multiple mode)",

    // ── dropdown ──
    dropdownActions: "Actions",
    ddRename: "Rename",
    ddDuplicate: "Duplicate",
    ddDelete: "Delete",

    // ── dropdown item ──
    dropdownOpenMenu: "Open menu",
    ddProfile: "Profile",
    ddApprove: "Approve",
    ddFlag: "Flag",
    ddFlagLabel: "Flag for review",

    // ── table ──
    colSku: "SKU",
    colProduct: "Product",
    colQty: "Qty",
    colTotal: "Total",
    tableLow: "low",
    tableInStock: "in stock",
    tableTotalItems: "Total (3 items)",

    // ── settings editable field ──
    editableFieldHintPrefix: "Click",
    editableFieldHintSuffix: "on any row to open its edit modal.",

    // ── notice ──
    noticeDismissedHint: "The destructive notice was dismissed — reload the preview to bring it back.",

    // ── edit field modal ──
    savedValue: "saved value",

    // ── onboarding panel ──
    onboardingPrimary: "primary",
    onboardingSecondary: "secondary",

    // ── loading overlay ──
    loadingOverlayHint: "Click \"Salvar\" to cover this card with the overlay for ~1.6s.",

    // ── switch card ──
    switchCard2faLabel: "2FA",
    switchCardMaintenanceLabel: "maintenance",

    // ── switch row ──
    switchRowEmailLabel: "e-mail",
    switchRowPushLabel: "push",

    // ── switch segmented ──
    switchSegCycleLabel: "cycle",
    switchSegEnvLabel: "env",

    // ── added: previously-hardcoded PT demo strings ──
    statusActive: "Active",
    statusLabel: "Status",
    actionChange: "Change",

    btnNew: "New",
    btnExport: "Export",
    btnDelete: "Delete",
    btnSave: "Save",
    btnSettings: "Settings",
    btnMoreOptions: "More options",
    btnAdd: "Add",

    specSheetDocNum: "Record No. 042 · Updated 14.Mar.2026",
    specSheetRegistrationData: "Registration data",
    specSheetLegalName: "Legal name",
    specSheetStateRegistration: "State registration",
    specSheetContact: "Contact",
    specSheetPhone: "Phone",
    specSheetEmail: "Email",
    specSheetChangeData: "Change data",
    specSheetFinancial: "Financial",
    specSheetLimit: "Limit",
    specSheetBalance: "Balance",
    specSheetDueDate: "Due date",
    specSheetDueDateValue: "Day 10",
    specSheetNotes: "Notes",
    specSheetNotesLabel: "Notes",
    specSheetNotesValue: "Preferred customer since 2019.",
    specSheetName: "Name",
    specSheetNickname: "Nickname",
    specSheetNotProvided: "Not provided",

    tileIncome: "Income",
    tileIncomeSub: "4 methods",
    tileExpenses: "Expenses",
    tileExpensesSub: "3 entries",
    tileTotal: "Total",
    tileOrders: "Orders",
    tileToday: "today",
    tileApproved: "Approved",
    tileCanceled: "Canceled",
    tileConversion: "Conversion",

    settingsAdvancedFeatures: "Advanced features",
    settingsAdvancedFeaturesCaption: "Enables internal functionality.",
    settingsEmailNotifications: "Email notifications",
    settingsEmailNotificationsCaption: "Daily summary of operational activities.",
    settingsPlan: "Plan",
    settingsPlanCaption: "Features enabled for the organization.",
    settingsPlanShortCaption: "Enabled features.",
    settingsTwoConfigs: "2 settings",
    settingsAcceptOrders: "Accept orders",
    settingsAcceptOrdersCaption: "Receives new orders through the app.",
    settingsAutoConfirm: "Automatic confirmation",
    settingsAutoConfirmCaption: "Confirms without manual review.",
    settingsDelivery: "Delivery",
    settingsRealtimeTracking: "Real-time tracking",
    settingsSaasCaption: "SaaS system — plan via subscription table.",
    settingsSubscriptionV2: "Subscription V2",
    settingsShowWebApp: "Show Web App",
    settingsShowWebAppCaption: "Sub-setting of credit card.",
    settingsUnavailableFeature: "Unavailable feature",
    settingsUnavailableFeatureCaption: "Requires a higher plan.",

    planBasic: "Basic",
    planProfessional: "Professional",
    planEnterprise: "Enterprise",

    editableUnitName: "Unit name",
    editableUnitNameCaption: "Shown in reports.",
    editableFirstPurchaseDiscount: "First-purchase discount",
    editableFirstPurchaseDiscountCaption: "Unit value applied.",

    noticeInfoTitle: "Information",
    noticeInfoBody: "Setting saved automatically.",
    noticeNewTitle: "What's new",
    noticeNewBody: "The new routes panel is now available.",
    noticeActivatedTitle: "Activated",
    noticeActivatedBody: "Integration completed successfully.",
    noticeManualPaymentTitle: "Manual payment",
    noticeManualPaymentBody: "Pix and Boleto generate a new charge link each cycle.",
    noticePendingTitle: "Waiting for activation on Stripe",
    noticePendingBody: "Click \"Sync\" to create the subscription on the gateway.",
    noticeErrorTitle: "Failed to load",
    noticeErrorBody: "Could not fetch the data.",

    editDialogChangeName: "Change name",
    editDialogTitle: "Change Name",
    editDialogDescription: "Update the unit name.",
    editDialogPlaceholder: "Unit name",

    requiredValidateForm: "Validate form",
    requiredDescription: "The fields below must be filled in before creating the customer.",
    requiredCnpjHint: "Step 1 · Registration data",
    requiredPhoneHint: "Step 2 · Contact",
    requiredDeliveryAddress: "Delivery address",
    requiredDeliveryAddressHint: "Step 3 · Logistics",

    onboardingTitle: "No projects here yet",
    onboardingDescription: "Create your first project to start organizing your work.",
    onboardingActionLabel: "Create project",
    onboardingSecondaryLabel: "See examples",
    onboardingSubHint: "You can invite your team later.",

    loadingOrderSummary: "Order summary",
    loadingSavingText: "Saving…",

    switchCard2faTitle: "2FA authentication",
    switchCard2faStatusOn: "ON · TOTP",
    switchCard2faStatusOff: "OFF",
    switchCardMaintenanceTitle: "Maintenance mode",

    switchRowEmailDesc: "Daily summary of the organization's activities.",
    switchRowPushTitle: "Push notifications",
    switchRowPushDesc: "Real-time alerts on the device.",

    switchSegMonthly: "Monthly",
    switchSegAnnual: "Annual · −20%",
    switchSegSandbox: "Sandbox",
    switchSegProduction: "Production",

    // ── tree select ──
    treeAdministrative: "Administrative",
    treeHr: "HR",
    treeFinance: "Finance",
    treeOperations: "Operations",
    treeLogistics: "Logistics",
    treeFleet: "Fleet",
    treeWarehouse: "Warehouse",
    treeCommercial: "Commercial",
    treePickOne: "Pick a cost centre",
    treePickSeveral: "Pick several",
    treeSingleTitle: "Single selection",
    treeMultipleTitle: "Multiple selection",
    treeThemedTitle: "Custom theme",
    treeThemedHint: "Icon and selection colours via CSS custom properties",
    segWithIcons: "With icons",
    segColoredIcons: "Coloured icons",
    segLow: "Low",
    segMedium: "Medium",
    segHigh: "High",
    segPriorityLabel: "priority",
    selectQuickFilterTitle: "Quick filter (colour dots)",
    selectStatusPlaceholder: "Status",
    selectFooterCount: "{count} selected",
    selectClearLabel: "Clear",
    selectStatusLabel: "status",
    statusOpen: "Open",
    statusConfirmed: "Confirmed",
    statusShipped: "Shipped",
    statusDelivered: "Delivered",
    statusCanceled: "Canceled",
    accAnimatedTitle: "Animated",
    accAnimatedHint: "Smooth height transition; respects reduced-motion",
    segIconOnly: "Icons only",
    segSizes: "Sizes (sm · md · lg · xl)",
    segCustomSize: "Custom size",
    segCustomSizeHint: "CSS custom properties override any size",
    switchSegWithIcons: "With icons",
    switchSegIconOnly: "Icons only",
    switchSegLight: "Light",
    switchSegDark: "Dark",
    rcIconStart: "Icon at the start",
    rcIconEnd: "Icon at the end",
    rcRadioEnd: "Radio at the end",
    rcNfeModel: "NF-e",
    rcNfeModelDesc: "Goods invoice",
    rcNfceModel: "NFC-e",
    rcNfceModelDesc: "Consumer receipt",
    rcFreightSender: "Sender",
    rcFreightSenderDesc: "Freight paid by the seller",
    rcFreightRecipient: "Recipient",
    rcFreightRecipientDesc: "Freight paid on delivery"

  }
};
