import type { Messages } from "./types";

export const zh: Messages = {
  meta: { htmlLang: "zh-CN", locale: "zh-CN" },
  langName: "中文",

  shell: {
    kicker: "文档 · v0.x",
    lead: "一个带类型、shadcn 风格的组件库——Vue 3、React、Angular 和 Svelte，在任何框架中都拥有相同的 API 和相同的外观。",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "搜索组件…（⌘K）",
    searchAria: "搜索文档",
    chooseFramework: "选择框架",
    chooseLanguage: "选择语言",
    openNav: "打开导航",
    closeNav: "关闭导航",
    sidebarAria: "文档导航",
    noSectionsFound: "未找到组件。",
    previewTab: "预览",
    codeTab: "代码",
    referenceTab: "属性与事件",
    codeOnlyLabel: "代码",
    defaultPreviewCaption: "实时组件 · 可交互",
    sectionExampleAria: "{title} 示例",
    githubStars: "GitHub 上 {count} 个星标",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "复制",
    copied: "已复制！"
  },

  categories: {
    gettingStarted: "开始使用",
    forms: "表单",
    dataDisplay: "数据展示",
    overlay: "浮层",
    layoutNav: "布局与导航",
    feedback: "反馈"
  },

  gettingStarted: {
    install: {
      title: "安装",
      p1: "该库以单个 npm 包的形式发布。用你喜欢的包管理器安装即可——<c>vue</c>（3.4+）是唯一的 peer dependency。",
      p2: "每个组件都为四个框架发布在相应的子路径下——<c>@arcanalabs/ui-components/vue</c>、<c>/react</c>、<c>/angular</c> 和 <c>/svelte</c>；只导入你需要的即可。 图标使用 Font Awesome Free —— 安装 <c>@fortawesome/fontawesome-free</c> 并引入一次其 CSS。"
    },
    usage: {
      title: "用法",
      p1: "导入一个组件并放入模板即可。所有组件遵循相同约定：用 <c>v-model</c> 进行双向绑定、prop 使用 kebab-case，并在 <c>update:modelValue</c> 旁提供对应的 <c>change</c> 事件。",
      p2: "调色板采用中性的 shadcn <i>zinc</i> 色阶，因此组件彼此并列时无需任何主题配置也很协调。"
    },
    styles: {
      title: "样式",
      p1: "在应用根部导入一次样式表：<c>import '@arcanalabs/ui-components/styles.css'</c>。它包含每个组件的视觉令牌。",
      p2: "样式是按组件作用域的纯 CSS——没有运行时样式引擎，也不要求使用方引入 Tailwind。"
    },
    maska: {
      title: "注册 v-maska",
      p1: "少数组件（<c>ArcanaInputMask</c>、<c>ArcanaDatePicker</c>）依赖来自 <c>maska</c> 包的 <c>v-maska</c> 指令。创建应用时全局注册一次即可。",
      p2: "不使用掩码的组件无需额外设置——只有渲染带掩码的输入框时才需要此步骤。"
    }
  },

  propsTable: {
    name: "属性",
    type: "类型",
    default: "默认值",
    description: "说明",
    caption: "属性",
    eventsTitle: "触发的事件"
  },

  demoCaption: "实时组件 · 可交互",
  comingSoon: "该组件的完整文档将在后续批次中提供。它已经为 Vue、React、Angular 和 Svelte 发布，可直接使用。",
  frameworkSoon: "// Vue、React、Angular 和 Svelte 提供相同的组件——在上方选择一个框架即可查看其用法。",

  components: {
    button: {
      blurb: "可点击按钮，提供十五种语义变体；通过默认插槽设置文字，通过 <c>click</c> 事件处理点击。"
    },
    badge: {
      blurb: "用于计数、状态和标签的紧凑药丸，六种颜色、两种尺寸，可选 <c>dot</c> 和 <c>clickable</c> 模式。"
    },
    input: {
      blurb: "采用 shadcn 样式、支持数字的 <c>v-model</c> 的原生 <c>&lt;input&gt;</c>；标准 HTML 属性可直接透传。"
    },
    select: {
      blurb: "完全自定义的选择框（无 Element Plus），传送到 <c>&lt;body&gt;</c>，支持单选/<c>multiple</c>、<c>searchable</c>、<c>clearable</c> 和键盘导航。"
    },
    treeSelect: {
      blurb: "面板为可搜索层级结构的选择器 —— 从树中选择节点（成本中心、分类），支持单选或多选，默认仅可选叶子节点。"
    },
    checkbox: {
      blurb: "包裹真实原生 <c>&lt;input type=\"checkbox\"&gt;</c> 的二元复选框，带 <c>indeterminate</c> 状态；如需切换设置项请用 <c>ArcanaSwitch</c>。"
    },
    switch: {
      blurb: "二元开/关切换（WAI-ARIA switch），以红/绿配色，并可选隐藏复选框以适配原生表单。"
    },
    tabs: {
      blurb: "由 <c>tabs</c> 数组和 <c>v-model</c> 驱动的自定义标签页，提供从药丸到完整侧栏导航的六种变体。"
    },
    dialog: {
      blurb: "基于 ref 的 shadcn 模态框，提供 <c>show()</c>/<c>hide()</c> API——传送到 <c>&lt;body&gt;</c>、锁定焦点并在按 Escape 时关闭。"
    },
    inputMask: {
      blurb: "基于 <c>v-maska</c> 的带掩码文本输入框，其 <c>v-model</c> 始终保存<b>原始</b>值（CPF、CNPJ、电话……）；需全局注册 <c>v-maska</c>。"
    },
    inputBoolean: {
      blurb: "用于布尔字段的是/否选择框，可归一化 <c>true</c>/<c>false</c>/<c>null</c>，并带状态和类 SQL 的标签变体。"
    },
    numberStepper: {
      blurb: "两侧带 <c>−</c>/<c>+</c> 按钮的数字输入框，遵循 <c>min</c>/<c>max</c>/<c>step</c> 及键盘方向键。"
    },
    multiSelectPopover: {
      blurb: "传送到 body 的弹出层，支持分标签的复选框多选；<c>v-model</c> 为 <c>{ [tabKey]: number[] }</c> 映射，每个标签由异步 <c>fetch()</c> 提供数据。"
    },
    radioCardGroup: {
      blurb: "由真实 <c>&lt;input type=\"radio\"&gt;</c> 支撑的可选卡片，每张带描述、图标或徽章；可堆叠、<c>inline</c> 或按 <c>columns</c> 布局。"
    },
    segmentedOptions: {
      blurb: "用于 N 个互斥选项的分段控件，置于药丸内，支持每项图标和禁用。"
    },
    datePicker: {
      blurb: "将带掩码的 <c>DD/MM/AAAA</c> 输入框与日历弹出层配对的 shadcn 日期字段；<c>v-model</c> 为 ISO <c>YYYY-MM-DD</c> 字符串。"
    },
    inputCurrency: {
      blurb: "基于 <c>v-money3</c> 的货币输入框，输入时即时格式化，小数位可配置并按 <c>min</c>/<c>max</c> 钳制；默认 BRL。"
    },
    accordion: {
      blurb: "可折叠 <c>ArcanaAccordionItem</c> 的容器，通过 <c>v-model</c> 绑定单开或多开模式。"
    },
    accordionItem: {
      blurb: "<c>ArcanaAccordion</c> 内的单个可折叠面板，由 <c>name</c> 标识，带 <c>title</c> 标题头和插槽内容。"
    },
    dropdown: {
      blurb: "传送到 <c>&lt;body&gt;</c> 的 shadcn 下拉菜单，自动定位并在外部点击、按 Escape 或选择后关闭。"
    },
    dropdownItem: {
      blurb: "<c>ArcanaDropdown</c> 内的一行——可选 <c>icon</c>、标签和 <c>suffix</c>——可着色，并带 <c>divided</c> 分隔线用于危险操作。"
    },
    table: {
      blurb: "用于内存数组的静态 shadcn 表格；列声明 <c>{ key, label, width?, align?, valueGetter? }</c>，带单元格和表尾插槽。"
    },
    specSheet: {
      blurb: "用于正式记录的只读编辑式\"规格表\"，带 <c>docNum</c> 眉标、<c>title</c> 和分区子项。"
    },
    specSheetSection: {
      blurb: "<c>ArcanaSpecSheet</c> 内的一个分区——强调 <c>icon</c>、<c>title</c> 和 <c>sectionNum</c>，置于字段的 <c>columns</c> 网格之上。"
    },
    specSheetField: {
      blurb: "单个标签/值对；值为空时显示 <c>emptyText</c>，使空缺看起来是刻意的，<c>span</c> 可加宽它。"
    },
    summaryTiles: {
      blurb: "KPI 磁贴的响应式网格容器；设置 <c>columns</c>（默认 3），在 880px 以下折叠为单列。"
    },
    summaryTile: {
      blurb: "以 <c>[icon] [label + sub] [value]</c> 排布的紧凑 KPI 统计，提供四种易读 <c>tone</c>。"
    },
    settingsList: {
      blurb: "iOS 设置风格的细线分隔行容器，每行带标签 + 说明和右对齐控件。"
    },
    settingsListGroup: {
      blurb: "<c>ArcanaSettingsList</c> 内带标题、可选 <c>collapsible</c> 的分区，带图标、<c>sectionNum</c> 和 <c>meta</c>。"
    },
    settingsListItem: {
      blurb: "单个设置行——左侧 <c>label</c> + <c>caption</c>，右侧为你的控件。"
    },
    settingsEditableField: {
      blurb: "将只读值、\"Alterar\"按钮及其编辑模态框折叠进一个标签的智能行（<c>text</c>/<c>currency</c>/<c>number</c>/<c>select</c>）。"
    },
    notice: {
      blurb: "六种语义变体的内联横幅，配对应图标，可选 <c>dismissible</c>，用于提示和非阻断性错误。"
    },
    editFieldModal: {
      blurb: "通用的基于 ref 的\"Alterar X\"模态框包装器，提供外框并通过其插槽接收字段输入。"
    },
    requiredFieldsDialog: {
      blurb: "一个琥珀色对话框，列出多步表单中仍缺失的必填字段，每条提示指向需修正的步骤。"
    },
    onboardingPanel: {
      blurb: "用于首次设置的精致空状态/CTA 面板——渐变图标、标题、描述和主要行动号召。"
    },
    loadingOverlay: {
      blurb: "覆盖在模糊背景之上的作用域加载动画层，覆盖其最近的定位祖先；用 <c>visible</c> 切换。"
    },
    skeleton: {
      blurb: "用于加载状态的微光占位块；设置 <c>width</c>/<c>height</c>，选择 <c>rounded</c> 预设，并遵循减弱动效偏好。"
    },
    switchCard: {
      blurb: "高冲击力的全宽切换，开启时整张卡片变为翠绿色——请保留给重要设置。"
    },
    switchRow: {
      blurb: "全宽的设置行切换——左侧标题 + 描述，右侧紧凑开关，整行可点击。"
    },
    switchSegmented: {
      blurb: "形似分段胶囊、带滑动指示器的二元切换，读起来像\"A 或 B\"而非开/关。"
    }
  },

  demos: {
    // ── shared ──
    lastAction: "最近操作",
    timesSuffix: "次",
    disabledLabel: "已禁用",

    // ── button ──
    btnPrimary: "主要",
    btnSecondary: "次要",
    btnOutline: "描边",
    btnGhost: "幽灵",
    btnSuccess: "成功",
    btnIndigo: "靛蓝",
    btnDestructive: "危险",
    btnOutlineDanger: "描边危险",
    primaryClickedPrefix: "已点击",

    // ── badge ──
    badgeNeutral: "中性",
    badgeBlue: "蓝色",
    badgeGreen: "绿色",
    badgeRed: "红色",
    badgeAmber: "琥珀色",
    badgeViolet: "紫罗兰",
    badgeActive: "启用",
    badgeOffline: "离线",
    badgeSmSize: "小尺寸",
    badgeClickable: "可点击",

    // ── input ──
    quantity: "数量",
    inputReadonly: "只读",
    inputLockedValue: "锁定值",
    inputEmailLabel: "邮箱",
    inputQtyLabel: "数量",

    // ── select ──
    selectPickFruit: "选择一种水果",
    selectPickSeveral: "选择多个",
    fruitApple: "苹果",
    fruitBanana: "香蕉",
    fruitCherry: "樱桃",
    fruitCherryDesc: "应季",
    fruitDurian: "榴莲",
    fruitElderberry: "接骨木莓",
    selectSingleLabel: "单选",
    selectMultipleLabel: "多选",

    // ── checkbox ──
    checkboxSelectAll: "全选",
    checkboxInvoices: "发票",
    checkboxReceipts: "收据",
    checkboxStatements: "对账单",
    checkboxArchivedDisabled: "已归档（禁用）",

    // ── switch ──
    switchNotifications: "通知",
    switchBetaFeatures: "测试功能",

    // ── tabs ──
    tabOverview: "概览",
    tabActivity: "活动",
    tabSettings: "设置",
    tabOverviewPanel: "概览面板已激活。",
    tabActivityPanel: "活动中有 3 个新项目。",
    tabSettingsPanel: "在此调整您的设置。",

    // ── dialog ──
    dialogOpen: "打开对话框",
    dialogTitle: "删除工作区",
    dialogDescription: "此操作无法撤销。",
    dialogBody: "删除此工作区将删除其中的所有项目和邀请。在真实表单中需输入名称以确认——此处只需关闭对话框。",
    dialogCancel: "取消",
    dialogDelete: "删除",

    // ── input mask ──
    maskPhone: "电话",
    cpfRaw: "CPF（原始值）",
    phoneRaw: "电话（原始值）",

    // ── input boolean ──
    boolYesNo: "是 / 否",
    boolHasValue: "有值吗？",
    boolYesNoLabel: "是/否",
    boolStatusLabel: "状态",
    boolNullableLabel: "可为空",

    // ── number stepper ──
    stepperQtyLabel: "数量（0–10）",
    stepperWeightLabel: "重量（步长 5）",

    // ── multi-select popover ──
    mspUsers: "用户",
    mspDepartments: "部门",
    mspSales: "销售",
    mspSupport: "支持",
    mspEmptyLabel: "选择人员或部门",
    mspUsersLabel: "用户",
    mspDepartmentsLabel: "部门",

    // ── radio card group ──
    payCreditCard: "信用卡",
    payCreditCardDesc: "自动定期扣款。",
    payPix: "Pix",
    payPixDesc: "即时到账，免手续费。",
    payPixBadge: "推荐",
    payBoleto: "Boleto",
    payBoletoDesc: "3 个工作日内到期。",
    payCash: "货到付款",
    selectedLabel: "已选择",

    // ── segmented options ──
    segList: "列表",
    segGrid: "网格",
    segBoard: "看板",
    viewLabel: "视图",

    // ── date picker ──
    datePickerValueLabel: "值（YYYY-MM-DD）",
    datePickerTypeHint: "输入 DD/MM/AAAA",

    // ── input currency ──
    priceRaw: "价格（原始值）",

    // ── accordion ──
    accShipping: "配送",
    accShippingBody: "2–3 个工作日内发货。",
    accReturns: "退货",
    accReturnsBody: "30 天免费退货，无需理由。",
    accWarranty: "保修（禁用）",
    accWarrantyBody: "即将推出。",
    accOpenSingleLabel: "展开（单个模式）",

    // ── accordion item ──
    accSpecifications: "规格",
    accSpecificationsBody: "重量、尺寸和材质。",
    accCareTitle: "护理说明",
    accCareBody: "冷水手洗，请勿烘干。",
    accOpenMultipleLabel: "展开（多个模式）",

    // ── dropdown ──
    dropdownActions: "操作",
    ddRename: "重命名",
    ddDuplicate: "复制",
    ddDelete: "删除",

    // ── dropdown item ──
    dropdownOpenMenu: "打开菜单",
    ddProfile: "个人资料",
    ddApprove: "批准",
    ddFlag: "标记",
    ddFlagLabel: "标记以供审核",

    // ── table ──
    colSku: "SKU",
    colProduct: "产品",
    colQty: "数量",
    colTotal: "合计",
    tableLow: "库存不足",
    tableInStock: "有货",
    tableTotalItems: "合计（3 项）",

    // ── settings editable field ──
    editableFieldHintPrefix: "点击",
    editableFieldHintSuffix: "任意行以打开其编辑弹窗。",

    // ── notice ──
    noticeDismissedHint: "危险提示已被关闭——重新加载预览以恢复。",

    // ── edit field modal ──
    savedValue: "已保存的值",

    // ── onboarding panel ──
    onboardingPrimary: "主要",
    onboardingSecondary: "次要",

    // ── loading overlay ──
    loadingOverlayHint: "点击 \"Salvar\" 用遮罩覆盖此卡片约 1.6 秒。",

    // ── switch card ──
    switchCard2faLabel: "双重验证",
    switchCardMaintenanceLabel: "维护",

    // ── switch row ──
    switchRowEmailLabel: "电子邮件",
    switchRowPushLabel: "推送",

    // ── switch segmented ──
    switchSegCycleLabel: "周期",
    switchSegEnvLabel: "环境",

    // ── added: previously-hardcoded PT demo strings ──
    statusActive: "已启用",
    statusLabel: "状态",
    actionChange: "修改",

    btnNew: "新建",
    btnExport: "导出",
    btnDelete: "删除",
    btnSave: "保存",
    btnSettings: "设置",
    btnMoreOptions: "更多选项",
    btnAdd: "添加",

    specSheetDocNum: "记录编号 042 · 更新于 14.Mar.2026",
    specSheetRegistrationData: "注册资料",
    specSheetLegalName: "法定名称",
    specSheetStateRegistration: "州注册号",
    specSheetContact: "联系方式",
    specSheetPhone: "电话",
    specSheetEmail: "邮箱",
    specSheetChangeData: "修改资料",
    specSheetFinancial: "财务",
    specSheetLimit: "额度",
    specSheetBalance: "余额",
    specSheetDueDate: "到期日",
    specSheetDueDateValue: "每月 10 日",
    specSheetNotes: "备注",
    specSheetNotesLabel: "备注",
    specSheetNotesValue: "自 2019 年起的优质客户。",
    specSheetName: "名称",
    specSheetNickname: "昵称",
    specSheetNotProvided: "未提供",

    tileIncome: "收入",
    tileIncomeSub: "4 种方式",
    tileExpenses: "支出",
    tileExpensesSub: "3 条记录",
    tileTotal: "合计",
    tileOrders: "订单",
    tileToday: "今日",
    tileApproved: "已批准",
    tileCanceled: "已取消",
    tileConversion: "转化率",

    settingsAdvancedFeatures: "高级功能",
    settingsAdvancedFeaturesCaption: "启用内部功能。",
    settingsEmailNotifications: "邮件通知",
    settingsEmailNotificationsCaption: "每日运营活动摘要。",
    settingsPlan: "套餐",
    settingsPlanCaption: "为组织启用的功能。",
    settingsPlanShortCaption: "已启用的功能。",
    settingsTwoConfigs: "2 项设置",
    settingsAcceptOrders: "接受订单",
    settingsAcceptOrdersCaption: "通过应用接收新订单。",
    settingsAutoConfirm: "自动确认",
    settingsAutoConfirmCaption: "无需人工审核即确认。",
    settingsDelivery: "配送",
    settingsRealtimeTracking: "实时追踪",
    settingsSaasCaption: "SaaS 系统——通过订阅表管理套餐。",
    settingsSubscriptionV2: "订阅 V2",
    settingsShowWebApp: "显示 Web 应用",
    settingsShowWebAppCaption: "信用卡的子设置。",
    settingsUnavailableFeature: "不可用功能",
    settingsUnavailableFeatureCaption: "需要更高级的套餐。",

    planBasic: "基础版",
    planProfessional: "专业版",
    planEnterprise: "企业版",

    editableUnitName: "单位名称",
    editableUnitNameCaption: "显示在报表中。",
    editableFirstPurchaseDiscount: "首购折扣",
    editableFirstPurchaseDiscountCaption: "应用的单位金额。",

    noticeInfoTitle: "信息",
    noticeInfoBody: "设置已自动保存。",
    noticeNewTitle: "新功能",
    noticeNewBody: "全新的路线面板现已可用。",
    noticeActivatedTitle: "已激活",
    noticeActivatedBody: "集成已成功完成。",
    noticeManualPaymentTitle: "手动付款",
    noticeManualPaymentBody: "Pix 和 Boleto 每个周期都会生成新的付款链接。",
    noticePendingTitle: "等待在 Stripe 上激活",
    noticePendingBody: "点击 \"Sync\" 在网关上创建订阅。",
    noticeErrorTitle: "加载失败",
    noticeErrorBody: "无法获取数据。",

    editDialogChangeName: "修改名称",
    editDialogTitle: "修改名称",
    editDialogDescription: "更新单位名称。",
    editDialogPlaceholder: "单位名称",

    requiredValidateForm: "验证表单",
    requiredDescription: "创建客户前必须填写以下字段。",
    requiredCnpjHint: "步骤 1 · 注册资料",
    requiredPhoneHint: "步骤 2 · 联系方式",
    requiredDeliveryAddress: "配送地址",
    requiredDeliveryAddressHint: "步骤 3 · 物流",

    onboardingTitle: "暂无项目",
    onboardingDescription: "创建您的第一个项目，开始组织您的工作。",
    onboardingActionLabel: "创建项目",
    onboardingSecondaryLabel: "查看示例",
    onboardingSubHint: "您稍后可以邀请团队成员。",

    loadingOrderSummary: "订单摘要",
    loadingSavingText: "保存中…",

    switchCard2faTitle: "2FA 身份验证",
    switchCard2faStatusOn: "开 · TOTP",
    switchCard2faStatusOff: "关",
    switchCardMaintenanceTitle: "维护模式",

    switchRowEmailDesc: "组织活动的每日摘要。",
    switchRowPushTitle: "推送通知",
    switchRowPushDesc: "设备上的实时提醒。",

    switchSegMonthly: "按月",
    switchSegAnnual: "按年 · −20%",
    switchSegSandbox: "沙盒",
    switchSegProduction: "生产环境",

    // ── tree select ──
    treeAdministrative: "行政",
    treeHr: "人力资源",
    treeFinance: "财务",
    treeOperations: "运营",
    treeLogistics: "物流",
    treeFleet: "车队",
    treeWarehouse: "仓库",
    treeCommercial: "商务",
    treePickOne: "选择成本中心",
    treePickSeveral: "选择多个",
    treeSingleTitle: "单选",
    treeMultipleTitle: "多选",
    treeThemedTitle: "自定义主题",
    treeThemedHint: "通过 CSS 自定义属性设置图标与选中项颜色",
    segWithIcons: "带图标",
    segColoredIcons: "彩色图标",
    segLow: "低",
    segMedium: "中",
    segHigh: "高",
    segPriorityLabel: "优先级",
    selectQuickFilterTitle: "快速筛选（彩色圆点）",
    selectStatusPlaceholder: "状态",
    selectFooterCount: "已选 {count} 项",
    selectClearLabel: "清除",
    selectStatusLabel: "状态",
    statusOpen: "待处理",
    statusConfirmed: "已确认",
    statusShipped: "已发货",
    statusDelivered: "已送达",
    statusCanceled: "已取消",
    accAnimatedTitle: "带动画",
    accAnimatedHint: "平滑的高度过渡；遵循 reduced-motion"

  }
};
