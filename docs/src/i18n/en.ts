import type { Messages } from "./types";

export const en: Messages = {
  meta: { htmlLang: "en", locale: "en-US" },
  langName: "English",

  shell: {
    kicker: "Documentation · v{version}",
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
    npmPackage: "@arcanalabs/ui-components on npm",
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
      p1: "The library ships as a single npm package with no runtime dependencies. Install it with your package manager of choice; framework packages are optional peers, so provide only the framework you use.",
      p2: "Every component ships for all four frameworks under a matching subpath — <c>@arcanalabs/ui-components/vue</c>, <c>/react</c>, <c>/angular</c> and <c>/svelte</c>; import just the ones you use. Icons use Font Awesome Free — install <c>@fortawesome/fontawesome-free</c> and import its CSS once."
    },
    usage: {
      title: "Usage",
      p1: "Import a component and drop it into your template. Every component follows the same conventions: <c>v-model</c> for two-way values, kebab-case props, and a matching <c>change</c> event next to <c>update:modelValue</c>.",
      p2: "Colour comes from 12-step scales in the Radix model, with the accent and the neutral swappable through a class on the root element — see <b>Colors</b> below."
    },
    styles: {
      title: "Styles",
      p1: "Import the stylesheet once, at the root of your application: <c>import '@arcanalabs/ui-components/styles.css'</c>. It carries every component's visual tokens.",
      p2: "Styles are plain CSS scoped per component — there is no runtime style engine and no Tailwind requirement in the consumer."
    },
    palette: {
      title: "Colors",
      p1: "Colour is a 12-step system in the Radix model: every step has a fixed job — step 1 is the app background, step 9 the solid fill a component paints itself with, step 12 the highest-contrast text. The library ships 31 scales in light and dark, each with an alpha variant, so a token always means the same thing wherever it lands.",
      p2: "Switching palettes is a class on the root element: <c>.arcana-accent-violet</c> picks the accent, <c>.arcana-gray-slate</c> the neutral and <c>.arcana-dark</c> the dark mode. Components only ever read semantic tokens, so every one of them follows along without you touching a single component style."
    },
    deps: {
      title: "Dependencies",
      p1: "This library has <b>no runtime dependencies</b>: installing it adds nothing to your bundle. Everything below is a <b>peer</b> — provided by your app, declared here so you know what a given component expects.",
      p2: "Every peer is <b>optional</b>: install only the framework you actually use, plus the extras for the features you render. Nothing breaks at install time if you skip one — the component that needs it is simply the one that requires it."
    },
    maska: {
      title: "Masking",
      p1: "Input masking is available in <b>all four frameworks</b> through the <c>maska</c> package, an <b>optional peer dependency</b> — install it when you render an <c>ArcanaInputMask</c>. Only Vue has one extra step: register the <c>v-maska</c> directive globally once when you create the app.",
      p2: "Components that don't use masking need no extra setup — this step is only required if you render a masked input."
    }
  },

  palette: {
    accentLabel: "Accent",
    grayLabel: "Neutral",
    darkLabel: "Dark mode",
    scaleCaption: "The 12 steps of {scale}",
    previewTitle: "Real components under the selected palette",
    hint: "Every component reads semantic tokens, so switching the root class re-themes the whole page.",
    stepRoles: ["App background", "Subtle background", "Component background", "Component hover", "Component active", "Subtle border", "Border", "Border hover", "Solid", "Solid hover", "Secondary text", "High-contrast text"]
  },

  dependencies: {
    colPackage: "Package",
    colVersion: "Version",
    colKind: "Kind",
    colPurpose: "Used for",
    kindRuntime: "runtime",
    kindPeer: "peer",
    kindPeerOptional: "peer · optional",
    note: "Nothing here is downloaded unless you ask for it — optional peers only matter if you render the component that uses them."
  },

  propsTable: {
    name: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
    caption: "Props",
    eventsTitle: "Emitted events",
    slotsTitle: "Named slots"
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
      blurb: "A select whose panel is a searchable hierarchy — pick a node from a tree (departments, categories), single or multiple, with leaf-only selection by default."
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
      blurb: "A masked text input on <c>v-maska</c> whose <c>v-model</c> always holds the <b>raw</b> value (phone, card number, postcode…); requires <c>v-maska</c> registered globally."
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
    radio: {
      blurb: "Single radio button: native <c>&lt;input type=\"radio\"&gt;</c> with the design-system circle and an optional label. Group several via a shared <c>name</c> and <c>v-model</c>."
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
      blurb: "A currency input that formats right-to-left as you type, with configurable decimals and <c>min</c>/<c>max</c> clamping; BRL by default."
    },
    accordion: {
      blurb: "The container for collapsible <c>ArcanaAccordionItem</c>s, binding a <c>v-model</c> for single- or multiple-open mode."
    },
    accordionItem: {
      blurb: "A single collapsible panel inside a <c>ArcanaAccordion</c>, identified by a <c>name</c>, with a <c>title</c> header and slot body."
    },
    dropdown: {
      blurb: "A shadcn dropdown menu that teleports to <c>&lt;body&gt;</c>, auto-positions and closes on outside click, Escape or selection. The second example shows the <c>quick date filter</c> recipe (Today / Yesterday / Last N days + More options)."
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
    },

    // ── Batch 4 ──
    rate: {
      blurb: "A star rating driven by <c>v-model</c> — <c>allowHalf</c> for half steps, <c>showScore</c> or <c>texts</c> for a caption, and <c>readonly</c> for averages."
    },
    avatar: {
      blurb: "A single user avatar with a four-step fallback — image, <c>initials</c>, <c>icon</c>, silhouette — in five named sizes or an exact pixel value."
    },
    avatarGroup: {
      blurb: "Overlapping avatars from an <c>avatars</c> array or from children, with a <c>+N</c> overflow bubble and <c>spacing</c> instead of overlap when you need it."
    },
    statistic: {
      blurb: "A formatted KPI number with <c>precision</c>, locale-aware separators, <c>prefix</c>/<c>suffix</c>, an icon and five semantic <c>tone</c>s."
    },
    countdown: {
      blurb: "A live countdown to a timestamp with a token-based <c>format</c> (<c>D H m s S</c>), a <c>paused</c> control and a <c>finish</c> event."
    },
    progress: {
      blurb: "A progress bar in <c>solid</c> or <c>soft</c>; pass <c>null</c> as the value for an indeterminate loop, or take over the label through the <c>value</c> slot."
    },
    aspectRatio: {
      blurb: "A pure-CSS box that keeps any child at a fixed <c>ratio</c> — images, iframes, maps or video — with no JavaScript at all."
    },
    scrollArea: {
      blurb: "A scroll container with styled, auto-hiding scrollbars on either axis, bounded by <c>height</c> or <c>maxHeight</c>."
    },
    hoverCard: {
      blurb: "A rich preview panel that opens on hover or focus after <c>openDelay</c>, positioned by <c>side</c>/<c>align</c> or a single <c>placement</c> shorthand."
    },
    tooltip: {
      blurb: "A short text bubble that opens on hover or focus of the trigger, with an arrow and <c>side</c>/<c>align</c> positioning (auto-flip). Pass the text via <c>label</c>."
    },
    contextMenu: {
      blurb: "A right-click menu built from an <c>items</c> array (icons, suffixes, <c>danger</c> variants, dividers) or composed from children."
    },
    contextMenuItem: {
      blurb: "One entry of an <c>ArcanaContextMenu</c> in composition mode — icon, right-aligned <c>suffix</c> for the shortcut, semantic <c>variant</c> and a <c>divided</c> separator drawn above it."
    },  },

  demos: {
    depMaska: "Input masking in ArcanaInputMask — used by all four frameworks. Vue additionally registers the v-maska directive.",
    depVue: "Required only for the /vue entrypoint.",
    depReact: "Required only for the /react entrypoint.",
    depReactDom: "Required only for the /react entrypoint.",
    depAngular: "Required only for the /angular entrypoint.",
    depSvelte: "Required only for the /svelte entrypoint.",
    depFontAwesome: "Icon classes (fa-solid fa-*) used by icon props across the library.",
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
    maskCard: "Card number",
    phoneRaw: "phone (raw)",
    cardRaw: "card (raw)",

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
    payBankTransfer: "Bank transfer",
    payBankTransferDesc: "Instant, no fees.",
    payBankTransferBadge: "Recommended",
    payInvoice: "Invoice",
    payInvoiceDesc: "Due in 3 business days.",
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
    qdfToday: "Today",
    qdfYesterday: "Yesterday",
    qdfLast7: "Last 7 days",
    qdfLast30: "Last 30 days",

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
    specSheetRegistrationData: "Company details",
    specSheetLegalName: "Legal name",
    specSheetRegistrationNo: "Registration no.",
    specSheetContact: "Contact",
    specSheetPhone: "Phone",
    specSheetEmail: "Email",
    specSheetChangeData: "Change data",
    specSheetBilling: "Billing",
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
    noticeManualPaymentBody: "Bank transfer and invoice generate a new charge link each cycle.",
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
    requiredTaxIdHint: "Step 1 · Company details",
    requiredPhoneHint: "Step 2 · Contact",
    requiredDeliveryAddress: "Shipping address",
    requiredDeliveryAddressHint: "Step 3 · Shipping",

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
    treeEngineering: "Engineering",
    treeFrontend: "Frontend",
    treeBackend: "Backend",
    treeMarketing: "Marketing",
    treeContent: "Content",
    treeGrowth: "Growth",
    treeBrand: "Brand",
    treeSales: "Sales",
    treePickOne: "Pick a department",
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
    statusTodo: "To do",
    statusInProgress: "In progress",
    statusInReview: "In review",
    statusDone: "Done",
    statusBlocked: "Blocked",
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
    rcPersonalAccount: "Personal account",
    rcPersonalAccountDesc: "For individual use",
    rcBusinessAccount: "Business account",
    rcBusinessAccountDesc: "For teams and companies",
    rcShippingStandard: "Standard shipping",
    rcShippingStandardDesc: "Arrives in 5–7 business days",
    rcShippingExpress: "Express shipping",
    rcShippingExpressDesc: "Arrives next business day",

    // ── rate ──
    rateValueLabel: "Your rating",
    rateText1: "Terrible",
    rateText2: "Poor",
    rateText3: "Average",
    rateText4: "Good",
    rateText5: "Excellent",
    rateAverageNote: "Average of 128 reviews",
    rateSizeSm: "Small",
    rateSizeMd: "Medium",
    rateSizeLg: "Large",
    rateDisabledNote: "Disabled",

    // ── avatar ──
    avatarFallbackNote: "A broken image falls back to the next step, automatically.",
    avatarShapeCircle: "Circle",
    avatarShapeSquare: "Square",
    avatarSizesNote: "Named steps or an exact pixel value",

    // ── avatar group ──
    avatarGroupTeamLabel: "Project team",
    avatarGroupOverlapNote: "Overlapping (default)",
    avatarGroupSpacingNote: "Spaced apart",
    avatarGroupCompositionNote: "Composed children with an explicit overflow count",

    // ── statistic ──
    statActiveUsers: "Active users",
    statRevenue: "Monthly revenue",
    statConversion: "Conversion rate",
    statOrders: "Orders",
    statChurn: "Churn",
    statUptime: "Uptime",
    statPending: "Pending reviews",
    statTickets: "Open tickets",
    statLocaleNote: "Same number, pt-BR separators",

    // ── countdown ──
    countdownFlashSale: "Flash sale ends in",
    countdownSessionExpires: "Session expires in",
    countdownMaintenance: "Maintenance window",
    countdownToggle: "Pause / resume",
    countdownFinishedNote: "Fires the finish event when it reaches zero.",

    // ── progress ──
    progressUploading: "Uploading",
    progressStorage: "Storage used",
    progressComplete: "Complete",
    progressIndeterminateNote: "No known total — the bar loops.",
    progressCustomLabel: "3 of 5 steps",

    // ── aspect ratio ──
    aspectCoverAlt: "Landscape photograph",
    aspectSquareNote: "1 / 1",
    aspectPortraitNote: "3 / 4",
    aspectClassicNote: "4 / 3",
    aspectEmbedNote: "Works with iframes, maps and video too",

    // ── scroll area ──
    scrollVerticalNote: "Vertical, capped height",
    scrollHorizontalNote: "Horizontal",
    scrollBothNote: "Both axes",
    scrollTypeAlways: "Scrollbar always visible",
    scrollTypeHover: "Scrollbar appears on hover",
    scrollItemPrefix: "Item",

    // ── hover card ──
    hoverProfileName: "Dana Whitfield",
    hoverProfileHandle: "@danaw",
    hoverProfileBio: "Design systems lead. Writes about accessibility and colour.",
    hoverProfileFollowers: "1.2k followers",
    hoverSideNote: "One trigger per side",
    hoverDelayInstant: "Instant",
    hoverDelaySlow: "Slow (600 ms)",
    hoverDisabledNote: "Disabled — nothing opens",

    // ── shared demo accessibility + Select/Tooltip customisation ──
    selectCustomizationTitle: "Slots · prefix / suffix · groups",
    inputSearchPlaceholder: "Search…",
    tabsAria: "Demo tabs",
    paymentMethodAria: "Payment method",
    sizeSmallAria: "Small",
    sizeMediumAria: "Medium",
    sizeLargeAria: "Large",
    disabledAria: "Disabled",
    selectGroupedPlaceholder: "Grouped fruit",
    selectCatalog: "Catalog",
    selectGroupCommon: "Common",
    selectGroupSeasonal: "Seasonal",
    selectDisabled: "Disabled",
    selectSelected: "Selected",
    selectCustomizationNote: "Open the field to see option slots, group labels, separators and the disabled item.",
    avatarPortraitAlt: "Team member portrait",
    profilePictureAlt: "Profile picture",
    tooltipDraftLabel: "Saves without publishing",
    tooltipDraftButton: "Save draft",
    tooltipCopyLink: "Copy link",
    tooltipSideTop: "top",
    tooltipSideRight: "right",
    tooltipSideBottom: "bottom",
    tooltipSideLeft: "left",
    tooltipNoArrow: "No arrow",
    tooltipNoArrowTrigger: "arrow = false",
    tooltipCustomTrigger: "custom content",
    tooltipUndo: "Undo",

    // ── context menu ──
    contextTriggerNote: "Right-click this area",
    contextOpen: "Open",
    contextRename: "Rename",
    contextDuplicate: "Duplicate",
    contextShare: "Share",
    contextDelete: "Delete",
    contextArchive: "Archive",
    contextDisabledItem: "Move to folder",
    contextLastAction: "Last action",
    contextNoneYet: "none yet",
    contextDisabledNote: "Disabled — the browser menu shows instead"

  }
};
