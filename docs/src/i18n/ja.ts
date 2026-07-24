import type { Messages } from "./types";

export const ja: Messages = {
  meta: { htmlLang: "ja", locale: "ja-JP" },
  langName: "日本語",

  shell: {
    kicker: "ドキュメント · v0.x",
    lead: "型付きの shadcn スタイルのコンポーネントライブラリです — Vue 3・React・Angular・Svelte で、同じ API、同じ見た目を、どのフレームワークでも。",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "コンポーネントを検索…（⌘K）",
    searchAria: "ドキュメントを検索",
    chooseFramework: "フレームワークを選択",
    chooseLanguage: "言語を選択",
    openNav: "ナビゲーションを開く",
    closeNav: "ナビゲーションを閉じる",
    sidebarAria: "ドキュメントのナビゲーション",
    noSectionsFound: "コンポーネントが見つかりません。",
    previewTab: "プレビュー",
    codeTab: "コード",
    referenceTab: "Props とイベント",
    codeOnlyLabel: "コード",
    defaultPreviewCaption: "ライブコンポーネント · 操作できます",
    sectionExampleAria: "{title} の例",
    githubStars: "GitHub で {count} スター",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "コピー",
    copied: "コピーしました！"
  },

  categories: {
    gettingStarted: "はじめに",
    forms: "フォーム",
    dataDisplay: "データ表示",
    overlay: "オーバーレイ",
    layoutNav: "レイアウトとナビゲーション",
    feedback: "フィードバック"
  },

  gettingStarted: {
    install: {
      title: "インストール",
      p1: "このライブラリは単一の npm パッケージとして提供されます。お好みのパッケージマネージャーでインストールしてください — <c>vue</c>（3.4+）が唯一の peer dependency です。",
      p2: "各コンポーネントは 4 つのフレームワーク向けに、対応するサブパスで公開されています — <c>@arcanalabs/ui-components/vue</c>、<c>/react</c>、<c>/angular</c>、<c>/svelte</c>。使うものだけをインポートしてください。 アイコンは Font Awesome Free を使用します。<c>@fortawesome/fontawesome-free</c> をインストールし、その CSS を一度読み込んでください。"
    },
    usage: {
      title: "使い方",
      p1: "コンポーネントをインポートしてテンプレートに置くだけです。すべて同じ規約に従います。双方向の値には <c>v-model</c>、props は kebab-case、そして <c>update:modelValue</c> と並んで対応する <c>change</c> イベントを発行します。",
      p2: "パレットはニュートラルな shadcn の <i>zinc</i> スケールなので、テーマ設定なしでもコンポーネントを並べて心地よく共存します。"
    },
    styles: {
      title: "スタイル",
      p1: "スタイルシートはアプリのルートで一度だけインポートします：<c>import '@arcanalabs/ui-components/styles.css'</c>。すべてのコンポーネントの視覚トークンを含みます。",
      p2: "スタイルはコンポーネントごとにスコープされた素の CSS です — ランタイムのスタイルエンジンも、利用側での Tailwind 要件もありません。"
    },
    maska: {
      title: "v-maska の登録",
      p1: "一部のコンポーネント（<c>ArcanaInputMask</c>、<c>ArcanaDatePicker</c>）は <c>maska</c> パッケージの <c>v-maska</c> ディレクティブに依存します。アプリ作成時に一度グローバル登録してください。",
      p2: "マスクを使わないコンポーネントに追加設定は不要です — この手順はマスク付き入力をレンダリングする場合にのみ必要です。"
    }
  },

  propsTable: {
    name: "プロパティ",
    type: "型",
    default: "デフォルト",
    description: "説明",
    caption: "プロパティ",
    eventsTitle: "発行イベント"
  },

  demoCaption: "ライブコンポーネント · 操作できます",
  comingSoon: "このコンポーネントの完全なドキュメントは今後のバッチで提供されます。すでに Vue・React・Angular・Svelte 向けに公開されており、そのまま利用できます。",
  frameworkSoon: "// Vue・React・Angular・Svelte は同じコンポーネントを提供します — 上部でフレームワークを選ぶと使い方を確認できます。",

  components: {
    button: {
      blurb: "15 種類のセマンティックなバリアントを持つ押下可能なボタンで、ラベルはデフォルトスロット、クリックは <c>click</c> イベントで扱います。"
    },
    badge: {
      blurb: "カウント・ステータス・タグ用のコンパクトなピルで、6 色・2 サイズに、任意の <c>dot</c> と <c>clickable</c> モードを備えます。"
    },
    input: {
      blurb: "shadcn スタイルと数値対応の <c>v-model</c> を備えたネイティブ <c>&lt;input&gt;</c> で、標準の HTML 属性はそのまま透過します。"
    },
    select: {
      blurb: "<c>&lt;body&gt;</c> にテレポートする完全カスタムなセレクト（Element Plus 不使用）で、単一/<c>multiple</c>、<c>searchable</c>、<c>clearable</c>、キーボード操作をサポートします。"
    },
    checkbox: {
      blurb: "本物のネイティブ <c>&lt;input type=\"checkbox\"&gt;</c> をラップし <c>indeterminate</c> 状態を持つ二値チェックボックスで、設定のオン/オフには <c>ArcanaSwitch</c> を使います。"
    },
    switch: {
      blurb: "赤/緑で色分けされた二値オン/オフトグル（WAI-ARIA スイッチ）で、ネイティブフォーム用の任意の隠しチェックボックスを備えます。"
    },
    tabs: {
      blurb: "<c>tabs</c> 配列と <c>v-model</c> で駆動するカスタムタブで、ピルからフルサイドバーナビゲーションまで 6 種類のバリアントを備えます。"
    },
    dialog: {
      blurb: "ref ベースの <c>show()</c>/<c>hide()</c> API を持つ shadcn モーダルで、<c>&lt;body&gt;</c> にテレポートし、フォーカスをトラップし、Escape で閉じます。"
    },
    inputMask: {
      blurb: "<c>v-maska</c> 上に構築され、<c>v-model</c> が常に <b>raw</b> の値（CPF・CNPJ・電話番号…）を保持するマスク付きテキスト入力で、<c>v-maska</c> のグローバル登録が必要です。"
    },
    inputBoolean: {
      blurb: "<c>true</c>/<c>false</c>/<c>null</c> を正規化するブール値フィールド向けの「はい/いいえ」セレクトで、status や SQL ライクなラベルのバリエーションを備えます。"
    },
    numberStepper: {
      blurb: "<c>min</c>/<c>max</c>/<c>step</c> と矢印キーを尊重する <c>−</c>/<c>+</c> ボタンを両脇に備えた数値入力です。"
    },
    multiSelectPopover: {
      blurb: "body にテレポートし、タブ付きチェックボックスで複数選択するポップオーバーで、<c>v-model</c> は <c>{ [tabKey]: number[] }</c> のマップ、各タブは非同期 <c>fetch()</c> で供給されます。"
    },
    radioCardGroup: {
      blurb: "本物の <c>&lt;input type=\"radio\"&gt;</c> に支えられた選択可能なカード群で、各カードに説明・アイコン・バッジを持ち、積み重ね・<c>inline</c>・<c>columns</c> で配置できます。"
    },
    segmentedOptions: {
      blurb: "ピル内に N 個の相互排他オプションを並べるセグメンテッドコントロールで、オプションごとのアイコンと無効化に対応します。"
    },
    datePicker: {
      blurb: "マスク付きの <c>DD/MM/AAAA</c> 入力とカレンダーポップオーバーを組み合わせた shadcn 日付フィールドで、<c>v-model</c> は ISO の <c>YYYY-MM-DD</c> 文字列です。"
    },
    inputCurrency: {
      blurb: "入力に合わせて整形する通貨入力（<c>v-money3</c> 上に構築）で、小数桁数の設定と <c>min</c>/<c>max</c> の制限を備え、デフォルトは BRL です。"
    },
    accordion: {
      blurb: "折りたたみ可能な <c>ArcanaAccordionItem</c> 群のコンテナで、単一または複数開けるモード向けに <c>v-model</c> をバインドします。"
    },
    accordionItem: {
      blurb: "<c>ArcanaAccordion</c> 内の単一の折りたたみパネルで、<c>name</c> で識別され、<c>title</c> ヘッダーとスロット本文を持ちます。"
    },
    dropdown: {
      blurb: "<c>&lt;body&gt;</c> にテレポートする shadcn ドロップダウンメニューで、自動配置し、外側クリック・Escape・選択で閉じます。"
    },
    dropdownItem: {
      blurb: "<c>ArcanaDropdown</c> 内の 1 行で、任意の <c>icon</c>・ラベル・<c>suffix</c> を持ち、色付け可能で、破壊的操作向けに <c>divided</c> の区切り線を備えます。"
    },
    table: {
      blurb: "メモリ上の配列向けの静的な shadcn テーブルで、列は <c>{ key, label, width?, align?, valueGetter? }</c> で宣言し、セルとフッターのスロットを備えます。"
    },
    specSheet: {
      blurb: "正式な記録のための読み取り専用・エディトリアルな\"スペックシート\"で、<c>docNum</c> のアイブロウ、<c>title</c>、セクションの子を備えます。"
    },
    specSheetSection: {
      blurb: "<c>ArcanaSpecSheet</c> 内のセクションで、アクセント <c>icon</c>・<c>title</c>・<c>sectionNum</c> が、フィールドの <c>columns</c> グリッドの上に並びます。"
    },
    specSheetField: {
      blurb: "単一のラベル/値ペアで、空の値は <c>emptyText</c> を表示して空白が意図的であることを示し、<c>span</c> で幅を広げます。"
    },
    summaryTiles: {
      blurb: "KPI タイル向けのレスポンシブなグリッドコンテナで、<c>columns</c>（デフォルト 3）を設定でき、880px 未満では 1 列に折りたたまれます。"
    },
    summaryTile: {
      blurb: "<c>[icon] [label + sub] [value]</c> のレイアウトのコンパクトな KPI スタットで、視認しやすい 4 種類の <c>tone</c> を備えます。"
    },
    settingsList: {
      blurb: "iOS 設定風の、ヘアラインで区切られた行のコンテナで、各行は左にラベル + キャプション、右寄せのコントロールを持ちます。"
    },
    settingsListGroup: {
      blurb: "<c>ArcanaSettingsList</c> 内のタイトル付きで任意に <c>collapsible</c> なセクションで、アイコン・<c>sectionNum</c>・<c>meta</c> を備えます。"
    },
    settingsListItem: {
      blurb: "単一の設定行で、左に <c>label</c> + <c>caption</c>、右にコントロールを置きます。"
    },
    settingsEditableField: {
      blurb: "読み取り専用の値・\"Alterar\"ボタン・編集モーダルを 1 つのタグにまとめたスマートな行です（<c>text</c>/<c>currency</c>/<c>number</c>/<c>select</c>）。"
    },
    notice: {
      blurb: "対応アイコン付きの 6 種類のセマンティックなバリアントを持つインラインバナーで、任意で <c>dismissible</c> にでき、注意喚起や非ブロッキングのエラーに使います。"
    },
    editFieldModal: {
      blurb: "枠を提供し、フィールド入力をスロットで受け取る、ref 駆動の汎用的な\"Alterar X\"モーダルラッパーです。"
    },
    requiredFieldsDialog: {
      blurb: "マルチステップフォームでまだ欠けている必須フィールドを列挙する琥珀色のダイアログで、各ヒントが修正すべきステップを示します。"
    },
    onboardingPanel: {
      blurb: "初回設定のための洗練された空状態 / CTA パネルで、グラデーションアイコン・タイトル・説明・主 CTA を備えます。"
    },
    loadingOverlay: {
      blurb: "ぼかした背景の上にスコープを限定したスピナーオーバーレイで、最も近い位置指定された祖先を覆い、<c>visible</c> で切り替えます。"
    },
    skeleton: {
      blurb: "ローディング状態向けのシマーアニメーション付きプレースホルダーブロックで、<c>width</c>/<c>height</c> を設定し、<c>rounded</c> プリセットを選べ、reduced-motion を尊重します。"
    },
    switchCard: {
      blurb: "オンにするとカード全体がエメラルドになる存在感の強いフル幅トグルで、重要な設定向けに取っておきましょう。"
    },
    switchRow: {
      blurb: "フル幅の設定行トグルで、左にタイトル + 説明、右にコンパクトなスイッチを置き、行全体がクリック可能です。"
    },
    switchSegmented: {
      blurb: "スライドするインジケーター付きのセグメンテッドカプセル形の二値トグルで、オン/オフではなく\"A か B\"として読めます。"
    }
  },

  demos: {
    // ── shared ──
    lastAction: "最後の操作",
    timesSuffix: "回",
    disabledLabel: "無効",

    // ── button ──
    btnPrimary: "プライマリ",
    btnSecondary: "セカンダリ",
    btnOutline: "アウトライン",
    btnGhost: "ゴースト",
    btnSuccess: "成功",
    btnIndigo: "インディゴ",
    btnDestructive: "破壊的",
    btnOutlineDanger: "アウトライン（危険）",
    primaryClickedPrefix: "クリック",

    // ── badge ──
    badgeNeutral: "ニュートラル",
    badgeBlue: "青",
    badgeGreen: "緑",
    badgeRed: "赤",
    badgeAmber: "アンバー",
    badgeViolet: "バイオレット",
    badgeActive: "アクティブ",
    badgeOffline: "オフライン",
    badgeSmSize: "smサイズ",
    badgeClickable: "クリック可能",

    // ── input ──
    quantity: "数量",
    inputReadonly: "読み取り専用",
    inputLockedValue: "ロックされた値",
    inputEmailLabel: "メール",
    inputQtyLabel: "数量",

    // ── select ──
    selectPickFruit: "フルーツを選択",
    selectPickSeveral: "複数選択",
    fruitApple: "りんご",
    fruitBanana: "バナナ",
    fruitCherry: "さくらんぼ",
    fruitCherryDesc: "季節限定",
    fruitDurian: "ドリアン",
    fruitElderberry: "エルダーベリー",
    selectSingleLabel: "単一",
    selectMultipleLabel: "複数",

    // ── checkbox ──
    checkboxSelectAll: "すべて選択",
    checkboxInvoices: "請求書",
    checkboxReceipts: "領収書",
    checkboxStatements: "明細書",
    checkboxArchivedDisabled: "アーカイブ済み（無効）",

    // ── switch ──
    switchNotifications: "通知",
    switchBetaFeatures: "ベータ機能",

    // ── tabs ──
    tabOverview: "概要",
    tabActivity: "アクティビティ",
    tabSettings: "設定",
    tabOverviewPanel: "概要パネルがアクティブです。",
    tabActivityPanel: "アクティビティに新着3件。",
    tabSettingsPanel: "ここで設定を調整します。",

    // ── dialog ──
    dialogOpen: "ダイアログを開く",
    dialogTitle: "ワークスペースを削除",
    dialogDescription: "この操作は取り消せません。",
    dialogBody: "このワークスペースを削除すると、内部のすべてのプロジェクトと招待が削除されます。実際のフォームでは名前を入力して確認しますが、ここではダイアログを閉じるだけです。",
    dialogCancel: "キャンセル",
    dialogDelete: "削除",

    // ── input mask ──
    maskPhone: "電話番号",
    cpfRaw: "cpf（生値）",
    phoneRaw: "電話番号（生値）",

    // ── input boolean ──
    boolYesNo: "はい / いいえ",
    boolHasValue: "値がありますか？",
    boolYesNoLabel: "はい/いいえ",
    boolStatusLabel: "ステータス",
    boolNullableLabel: "null許容",

    // ── number stepper ──
    stepperQtyLabel: "数量 (0–10)",
    stepperWeightLabel: "重量（5刻み）",

    // ── multi-select popover ──
    mspUsers: "ユーザー",
    mspDepartments: "部門",
    mspSales: "営業",
    mspSupport: "サポート",
    mspEmptyLabel: "ユーザーまたは部門を選択",
    mspUsersLabel: "ユーザー",
    mspDepartmentsLabel: "部門",

    // ── radio card group ──
    payCreditCard: "クレジットカード",
    payCreditCardDesc: "自動継続課金。",
    payPix: "Pix",
    payPixDesc: "即時、手数料無料。",
    payPixBadge: "おすすめ",
    payBoleto: "Boleto",
    payBoletoDesc: "3営業日以内に支払い。",
    payCash: "代金引換",
    selectedLabel: "選択済み",

    // ── segmented options ──
    segList: "リスト",
    segGrid: "グリッド",
    segBoard: "ボード",
    viewLabel: "表示",

    // ── date picker ──
    datePickerValueLabel: "値 (YYYY-MM-DD)",
    datePickerTypeHint: "DD/MM/AAAA を入力",

    // ── input currency ──
    priceRaw: "価格（生値）",

    // ── accordion ──
    accShipping: "配送",
    accShippingBody: "2～3営業日で発送します。",
    accReturns: "返品",
    accReturnsBody: "30日間、無条件で無料返品。",
    accWarranty: "保証（無効）",
    accWarrantyBody: "近日公開。",
    accOpenSingleLabel: "開く（単一モード）",

    // ── accordion item ──
    accSpecifications: "仕様",
    accSpecificationsBody: "重量、寸法、素材。",
    accCareTitle: "お手入れ方法",
    accCareBody: "冷水で手洗い、乾燥機不可。",
    accOpenMultipleLabel: "開く（複数モード）",

    // ── dropdown ──
    dropdownActions: "アクション",
    ddRename: "名前を変更",
    ddDuplicate: "複製",
    ddDelete: "削除",

    // ── dropdown item ──
    dropdownOpenMenu: "メニューを開く",
    ddProfile: "プロフィール",
    ddApprove: "承認",
    ddFlag: "フラグ",
    ddFlagLabel: "レビュー用にフラグを立てる",

    // ── table ──
    colSku: "SKU",
    colProduct: "商品",
    colQty: "数量",
    colTotal: "合計",
    tableLow: "残りわずか",
    tableInStock: "在庫あり",
    tableTotalItems: "合計（3点）",

    // ── settings editable field ──
    editableFieldHintPrefix: "クリック",
    editableFieldHintSuffix: "して、任意の行の編集モーダルを開きます。",

    // ── notice ──
    noticeDismissedHint: "破壊的な通知は閉じられました。プレビューを再読み込みすると再表示されます。",

    // ── edit field modal ──
    savedValue: "保存された値",

    // ── onboarding panel ──
    onboardingPrimary: "プライマリ",
    onboardingSecondary: "セカンダリ",

    // ── loading overlay ──
    loadingOverlayHint: "「Salvar」をクリックすると、約1.6秒間このカードがオーバーレイで覆われます。",

    // ── switch card ──
    switchCard2faLabel: "2FA",
    switchCardMaintenanceLabel: "メンテナンス",

    // ── switch row ──
    switchRowEmailLabel: "メール",
    switchRowPushLabel: "プッシュ",

    // ── switch segmented ──
    switchSegCycleLabel: "サイクル",
    switchSegEnvLabel: "環境",

    // ── added: previously-hardcoded PT demo strings ──
    statusActive: "有効",
    statusLabel: "ステータス",
    actionChange: "変更",

    btnNew: "新規",
    btnExport: "エクスポート",
    btnDelete: "削除",
    btnSave: "保存",
    btnSettings: "設定",
    btnMoreOptions: "その他のオプション",
    btnAdd: "追加",

    specSheetDocNum: "レコード No. 042 · 更新 14.Mar.2026",
    specSheetRegistrationData: "登録情報",
    specSheetLegalName: "正式名称",
    specSheetStateRegistration: "州登録番号",
    specSheetContact: "連絡先",
    specSheetPhone: "電話番号",
    specSheetEmail: "メール",
    specSheetChangeData: "情報を変更",
    specSheetFinancial: "財務",
    specSheetLimit: "限度額",
    specSheetBalance: "残高",
    specSheetDueDate: "支払期日",
    specSheetDueDateValue: "10日",
    specSheetNotes: "メモ",
    specSheetNotesLabel: "メモ",
    specSheetNotesValue: "2019年からの優良顧客。",
    specSheetName: "名前",
    specSheetNickname: "ニックネーム",
    specSheetNotProvided: "未入力",

    tileIncome: "収入",
    tileIncomeSub: "4件の方法",
    tileExpenses: "支出",
    tileExpensesSub: "3件の項目",
    tileTotal: "合計",
    tileOrders: "注文",
    tileToday: "本日",
    tileApproved: "承認済み",
    tileCanceled: "キャンセル済み",
    tileConversion: "コンバージョン",

    settingsAdvancedFeatures: "詳細機能",
    settingsAdvancedFeaturesCaption: "内部機能を有効にします。",
    settingsEmailNotifications: "メール通知",
    settingsEmailNotificationsCaption: "運用アクティビティの日次サマリー。",
    settingsPlan: "プラン",
    settingsPlanCaption: "組織で有効な機能。",
    settingsPlanShortCaption: "有効な機能。",
    settingsTwoConfigs: "2件の設定",
    settingsAcceptOrders: "注文を受け付ける",
    settingsAcceptOrdersCaption: "アプリ経由で新規注文を受け取ります。",
    settingsAutoConfirm: "自動確認",
    settingsAutoConfirmCaption: "手動レビューなしで確認します。",
    settingsDelivery: "配送",
    settingsRealtimeTracking: "リアルタイム追跡",
    settingsSaasCaption: "SaaSシステム — サブスクリプションテーブルでプラン設定。",
    settingsSubscriptionV2: "サブスクリプション V2",
    settingsShowWebApp: "Web Appを表示",
    settingsShowWebAppCaption: "クレジットカードのサブ設定。",
    settingsUnavailableFeature: "利用できない機能",
    settingsUnavailableFeatureCaption: "上位プランが必要です。",

    planBasic: "ベーシック",
    planProfessional: "プロフェッショナル",
    planEnterprise: "エンタープライズ",

    editableUnitName: "拠点名",
    editableUnitNameCaption: "レポートに表示されます。",
    editableFirstPurchaseDiscount: "初回購入割引",
    editableFirstPurchaseDiscountCaption: "適用される単価。",

    noticeInfoTitle: "お知らせ",
    noticeInfoBody: "設定は自動的に保存されました。",
    noticeNewTitle: "新着情報",
    noticeNewBody: "新しいルートパネルが利用可能になりました。",
    noticeActivatedTitle: "有効化されました",
    noticeActivatedBody: "連携が正常に完了しました。",
    noticeManualPaymentTitle: "手動支払い",
    noticeManualPaymentBody: "PixとBoletoは、サイクルごとに新しい請求リンクを生成します。",
    noticePendingTitle: "Stripeでの有効化を待機中",
    noticePendingBody: "「同期」をクリックして、ゲートウェイでサブスクリプションを作成します。",
    noticeErrorTitle: "読み込みに失敗しました",
    noticeErrorBody: "データを取得できませんでした。",

    editDialogChangeName: "名前を変更",
    editDialogTitle: "名前を変更",
    editDialogDescription: "拠点名を更新します。",
    editDialogPlaceholder: "拠点名",

    requiredValidateForm: "フォームを検証",
    requiredDescription: "顧客を作成する前に、以下の項目を入力する必要があります。",
    requiredCnpjHint: "ステップ1 · 登録情報",
    requiredPhoneHint: "ステップ2 · 連絡先",
    requiredDeliveryAddress: "配送先住所",
    requiredDeliveryAddressHint: "ステップ3 · 物流",

    onboardingTitle: "プロジェクトがまだありません",
    onboardingDescription: "最初のプロジェクトを作成して、作業の整理を始めましょう。",
    onboardingActionLabel: "プロジェクトを作成",
    onboardingSecondaryLabel: "例を見る",
    onboardingSubHint: "チームは後から招待できます。",

    loadingOrderSummary: "注文サマリー",
    loadingSavingText: "保存中…",

    switchCard2faTitle: "2FA認証",
    switchCard2faStatusOn: "オン · TOTP",
    switchCard2faStatusOff: "オフ",
    switchCardMaintenanceTitle: "メンテナンスモード",

    switchRowEmailDesc: "組織のアクティビティの日次サマリー。",
    switchRowPushTitle: "プッシュ通知",
    switchRowPushDesc: "デバイスへのリアルタイムアラート。",

    switchSegMonthly: "月額",
    switchSegAnnual: "年額 · −20%",
    switchSegSandbox: "サンドボックス",
    switchSegProduction: "本番"
  }
};
