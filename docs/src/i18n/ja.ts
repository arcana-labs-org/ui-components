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
      p2: "各コンポーネントは 4 つのフレームワーク向けに、対応するサブパスで公開されています — <c>@arcanalabs/ui-components/vue</c>、<c>/react</c>、<c>/angular</c>、<c>/svelte</c>。使うものだけをインポートしてください。"
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
      p1: "一部のコンポーネント（<c>ShadcnInputMask</c>、<c>ShadcnDatePicker</c>）は <c>maska</c> パッケージの <c>v-maska</c> ディレクティブに依存します。アプリ作成時に一度グローバル登録してください。",
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
      blurb: "shadcn ボタンの寸法（13px / ウェイト 500 / 半径 6）を踏襲した押下可能なボタンです。15 種類のセマンティックなバリアントが、主要アクション・破壊的フロー・ニュートラルなアウトライン・ステータスアクセントをカバーします。ラベルはデフォルトスロットで渡し、クリックは <c>click</c> イベントで公開されます。"
    },
    badge: {
      blurb: "カウント・ステータス・タグ用のコンパクトなピルです。6 種類のカラーバリアントに、任意の先頭 <c>dot</c> インジケーター、2 つのサイズ、そして操作可能なバッジにポインターのアフォーダンスを加える <c>clickable</c> モードを組み合わせられます。内容はデフォルトスロットから渡します。"
    },
    input: {
      blurb: "shadcn スタイルのネイティブ <c>&lt;input&gt;</c> で、数値対応の <c>v-model</c> を備えます（空の <c>type=\"number\"</c> は <c>null</c> を、正しい値は本物の数値を発行します）。標準の HTML 属性 — <c>placeholder</c>、<c>readonly</c>、<c>min/max/step</c>、<c>maxlength</c>、<c>autocomplete</c> — はそのまま透過します。"
    },
    select: {
      blurb: "完全にカスタムなセレクトです — 内部で Element Plus を使いません。ドロップダウンは自動フリップ配置で <c>&lt;body&gt;</c> にテレポートされ、単一選択または <c>multiple</c>、組み込みの <c>searchable</c> フィルター、ホバー時の <c>clearable</c> アフォーダンス、完全なキーボード操作をサポートします。オプションは単なる文字列、または <c>{ label, value, disabled?, description? }</c> オブジェクトを受け付けます。"
    },
    checkbox: {
      blurb: "<b>本物の</b>ネイティブ <c>&lt;input type=\"checkbox\"&gt;</c> をラップした二値チェックボックスです — そのためキーボードやテストドライバーに優しく、Dusk の <c>check()</c>/<c>uncheck()</c> が動作します。リストから項目を選ぶのに使います。<c>indeterminate</c> 状態では、おなじみの「一部選択」のダッシュが表示されます。設定のオン/オフには <c>ShadcnSwitch</c> を使ってください。"
    },
    switch: {
      blurb: "WAI-ARIA のスイッチパターンに従う二値オン/オフトグルです（<c>role=\"switch\"</c> + <c>aria-checked</c>、Space/Enter で切替）。トラックは素早く読み取れるよう色分けされ — オフは赤、オンは緑 — 任意の隠しチェックボックス（<c>name</c>）がネイティブフォーム送信と統合します。"
    },
    tabs: {
      blurb: "<c>tabs</c> 配列とアクティブタブ名を保持する <c>v-model</c> で駆動するカスタムタブです。各タブは名前付きスロットになります。6 つの視覚バリアント — <c>pills</c>、<c>underline</c>、<c>boxed</c>、<c>sidebar</c>、<c>sidebar-soft</c>、<c>segmented</c> — が、モーダル内のコンパクトなタブから完全なサイドバーナビゲーションまでをカバーし、任意のアイコンやバッジ、非アクティブパネルを保持する <c>keepAlive</c> モードも備えます。"
    },
    dialog: {
      blurb: "ref ベース API の shadcn スタイルのモーダルです — <c>v-model</c> をバインドする代わりに、コンポーネントの ref で <c>show()</c> / <c>hide()</c> を呼び出します。<c>&lt;body&gt;</c> にテレポートし、フォーカスをトラップし、Escape で閉じ（任意でオーバーレイクリックでも）、ネスト時も正しく重なります。サイズプリセットは <c>sm → full</c>。<c>header</c> と <c>footer</c> のスロットは任意です（footer スロットは <c>{ hide }</c> を受け取ります）。"
    },
    inputMask: {
      blurb: "<c>v-maska</c> ディレクティブ上に構築され、<c>ShadcnInput</c> と同じスタイルのマスク付きテキスト入力です。<c>mask</c> に文字列を渡すか、長さに応じて切り替わる動的マスク用に文字列の配列を渡します（例: 固定電話と携帯電話）。<c>v-model</c> は常に<b>raw</b> の値（マスク文字なし）を保持するため、CPF・CNPJ・CEP・電話番号は未整形のままバックエンドに届き、フィールドには整形済みの表示が出ます。<c>v-maska</c> をグローバル登録しておく必要があります。"
    },
    inputBoolean: {
      blurb: "ブール値フィールド向けの「はい/いいえ」セレクトで、<c>ShadcnSelect</c> としてレンダリングされます。よくあるブール表現 — <c>true</c>/<c>1</c>、<c>false</c>/<c>0</c>、<c>null</c> — を正規化します。<c>variation</c> でラベルを <c>status</c>（Ativo/Inativo）に、またはフィルター用の SQL ライクな <c>nullable</c> 値（<c>IS_NOT_NULL</c>/<c>IS_NULL</c>）に切り替えられます。<c>clearable</c>（デフォルト）のときは先頭の「Todos」オプションで値を <c>null</c> にリセットします。"
    },
    numberStepper: {
      blurb: "数量の微調整用に、両脇に <c>−</c> / <c>+</c> ボタンを備えた数値入力です。ボタンは <c>min</c> / <c>max</c> / <c>step</c> を尊重し、上限・下限で無効化されます。上下の矢印キーで操作でき、空または不正な入力は blur 時に <c>min</c> に丸められます。ネイティブのスピナーは非表示にし、カスタムボタンを使います。"
    },
    multiSelectPopover: {
      blurb: "設定可能なタブとチェックボックスによる複数選択を備えた、body にテレポートする汎用ポップオーバーです — 複数のバケット（ユーザー + 部署、支店、機械…）にまたがるピッカーの再利用可能な土台になります。<c>v-model</c> は <c>{ [tabKey]: number[] }</c> のマップで、タブごとに選択済み id の配列を持ちます。各タブは非同期の <c>fetch()</c> を提供し、その結果はコンポーネントのライフタイム中キャッシュされます。パネルはビューポート内に収まるよう反転・シフトします。<c>trigger</c> と <c>item</c> スロットで描画をカスタマイズできます。"
    },
    radioCardGroup: {
      blurb: "本物の <c>&lt;input type=\"radio\"&gt;</c> 要素に支えられた選択可能なカードのグループです — 選択肢が数個で、それぞれに説明・アイコン・バッジがある場合、セレクトより触感があります。オプションは <c>{ label, value, description?, icon?, badge?, disabled? }</c> オブジェクトです。積み重ね、<c>inline</c>、または固定の <c>columns</c> 列数で配置でき、左のアイコンに視覚的な重みを持たせたいときはラジオを <c>end</c> に移動できます。"
    },
    segmentedOptions: {
      blurb: "カプセル内に描画される、N 個の相互排他オプション用のセグメンテッドコントロールです — 二値の <c>ShadcnSwitchSegmented</c> の複数オプション版です。アクティブなセグメントが強調されます。オプションは任意の <c>icon</c> とオプションごとの <c>disabled</c> を受け取ります。<c>compact</c> と <c>squared</c> で形状を調整し、<c>activeColor</c> でアクティブの塗りを上書きし、<c>autoSelectFirst</c> は何も選択されていないとき最初の有効なオプションを選びます（動的リストに便利）。"
    },
    datePicker: {
      blurb: "shadcn スタイルの日付フィールドです。<c>type=\"date\"</c> では、ライブマスクされた <c>DD/MM/AAAA</c> のテキスト入力（<c>v-maska</c> 経由）と、カレンダーアイコンで開く Element Plus のカレンダーポップオーバーを組み合わせます。他の type（<c>daterange</c>、<c>month</c>、<c>year</c>）はカレンダーを直接使います。<c>v-model</c> は ISO の <c>YYYY-MM-DD</c> 文字列（範囲の場合はタプル）で、入力された日付は厳密に検証されます（31/02 は却下）。"
    },
    inputCurrency: {
      blurb: "<c>v-money3</c> 上に構築された通貨入力で、ユーザーの入力に合わせてリアルタイムに整形します — 桁区切り、小数点のカンマ、そして設定可能な小数桁数 <c>fraction</c>（デフォルトは BRL）。<c>shadcn</c> フラグを有効にすると、左に通貨アイコンを備えた zinc スタイルのフィールドになります。<c>min</c> / <c>max</c> が値を制限し、<c>allowBlank</c> は空のフィールドを許可します。<c>v-model</c> は整形済みの文字列を保持し、無効状態では読み取り専用の整形済みの値を表示します。"
    },
    labeledButton: {
      blurb: "より高レベルのボタンラッパーの背後にあるベースボタンです。<c>label</c>、任意の左側 <c>icon</c>（FontAwesome クラス）、そしてアイコンをスピナーに差し替えてボタンを無効化する <c>loading</c> 状態を持ちます。<c>shadcn</c> フラグを設定すると、レガシーな <c>color</c> プロパティを意味的な shadcn バリアントにマッピングします（danger → destructive、grey → ghost、blue → info…）。設定しない場合はレガシーな Bootstrap スタイルのままです。<c>centerLabel</c> / <c>centerContent</c> は full-width ボタンでの配置を制御します。"
    },
    accordion: {
      blurb: "折りたたみ可能な <c>ShadcnAccordionItem</c> 群のコンテナです。provide/inject を通じて開閉状態を子に提供し、<c>v-model</c> にバインドします。デフォルトの単一（<c>accordion</c>）モードでは、モデルは開いている項目の <c>name</c>（または <c>null</c>）です。<c>:accordion=\"false\"</c> にすると複数開けるモードになり、モデルは開いている name の配列になります。"
    },
    accordionItem: {
      blurb: "<c>ShadcnAccordion</c> 内の単一の折りたたみパネルで、必須の <c>name</c> で識別されます。ヘッダーは <c>title</c> プロパティ（リッチなヘッダー用の <c>title</c> スロットも可）と、開いたときに回転するシェブロンを表示します。デフォルトスロットは折りたたみ可能な本文です。<c>disabled</c> は切り替えをブロックします。開閉状態は親の accordion から読み取り — その中にネストした場合のみ動作します。"
    },
    dropdown: {
      blurb: "<c>el-dropdown</c> を置き換える shadcn スタイルのドロップダウンメニューです。<c>trigger</c> スロットは開くための要素を保持し、デフォルトスロットは <c>ShadcnDropdownItem</c> を保持します（<c>close</c> ヘルパーを受け取ります）。メニューは祖先の <c>overflow:hidden</c> を回避するため <c>&lt;body&gt;</c> にテレポートし、自動の反転/シフトで位置決めし、外側クリック・Escape・項目選択で閉じます。<c>placement</c> と（項目に伝播する）<c>size</c> 密度で調整できます。"
    },
    dropdownItem: {
      blurb: "<c>ShadcnDropdown</c> 内の 1 行です。任意の <c>icon</c>、ラベル（デフォルトスロット）、任意の <c>suffix</c> スロット（例: ショートカット）を持ちます。<c>variant</c> は <c>default</c>、<c>danger</c>、<c>success</c>、<c>warning</c> に色付けします。<c>divided</c> はその上に区切り線を引いて破壊的な操作を隔離します。クリック時に <c>click</c> を発行し、<c>closeOnClick</c> が false でない限り、バブリングするカスタムイベントで親ドロップダウンに閉じるよう依頼します。"
    },
    table: {
      blurb: "すでにメモリ上に持っている配列向けの静的な shadcn スタイルのテーブルです（バックエンドで fetch とページングを行う <c>SparkGrid</c> とは異なります）。列は <c>{ key, label, width?, align?, valueGetter? }</c> で宣言します。<c>#cell-&lt;key&gt;</c> スロットは任意のセルの描画を引き受け、<c>#footer</c> スロットは合計用の <c>&lt;tfoot&gt;</c> を埋めます。"
    },
    specSheet: {
      blurb: "正式な記録のための読み取り専用・エディトリアルな\"スペックシート\"です（公式文書やデータシートを想像してください）。等幅の <c>docNum</c> アイブロウが <c>title</c> と任意の <c>meta</c> バッジの上に置かれます。<c>&lt;ShadcnSpecSheetSection&gt;</c> の子がフィールドを保持し、<c>#footer</c> スロットが編集アクションを担います。別のカードに埋め込む際は <c>flat</c> を設定してカードの枠を外します。"
    },
    specSheetSection: {
      blurb: "<c>ShadcnSpecSheet</c> 内のセクションです。任意のボックス型アクセント <c>icon</c>（8色）+ <c>title</c> + 右寄せの <c>sectionNum</c> が、設定可能な <c>columns</c> の <c>&lt;ShadcnSpecSheetField&gt;</c> グリッドの上に並びます。<c>#actions</c> スロットはヘッダーのボタンを収め、<c>noRowDividers</c> と <c>compact</c> がレイアウトを調整します。"
    },
    specSheetField: {
      blurb: "セクション内の単一のラベル/値ペアです。<c>label</c> は大文字等幅で、<c>value</c> は Inter で描画されます。空の値（<c>null</c>/<c>undefined</c>/''）は <c>emptyText</c> をイタリックの淡色で表示し、空白が意図的であることを示します。フィールドを広げるには <c>span</c> を、バッジ・リンク・その他のリッチな値にはデフォルトスロットを使います。"
    },
    summaryTiles: {
      blurb: "KPI タイルの 1 行のためのレスポンシブなグリッドコンテナです。<c>columns</c>（デフォルト 3）を設定します。幅 880px 未満では常に 1 列に折りたたまれます。必要なだけ <c>&lt;ShadcnSummaryTile&gt;</c> の子を入れてください。"
    },
    summaryTile: {
      blurb: "<c>[アイコン] [label + sub] [値]</c> のレイアウトで高さ約 52px のコンパクトな KPI スタットです。4 つの <c>tone</c>——<c>neutral</c>、<c>positive</c>、<c>negative</c>、<c>indigo</c>——が視認性のために色付けします。<c>#value</c> と <c>#sub</c> スロットは、インラインバッジやよりリッチな内容のために単純な prop を上書きします。"
    },
    settingsList: {
      blurb: "iOS 設定風のコンテナです。行はヘアラインで区切られ、各行は左にラベル + キャプション、右にコントロールを持ちます。<c>&lt;ShadcnSettingsListItem&gt;</c>、<c>&lt;ShadcnSettingsListGroup&gt;</c>、またはスマートな <c>&lt;ShadcnSettingsEditableField&gt;</c> で埋めてください。"
    },
    settingsListGroup: {
      blurb: "関連する行をまとめるための、<c>ShadcnSettingsList</c> 内のタイトル付きセクションです。ヘッダーは任意のボックス型 <c>icon</c>（8色）、<c>sectionNum</c>、右寄せの <c>meta</c> を持ちます。<c>collapsible</c> を設定するとヘッダーがトグルになり（<c>defaultCollapsed</c> と併用）、<c>compact</c> で密度を高めます。"
    },
    settingsListItem: {
      blurb: "<c>ShadcnSettingsList</c> の単一行です。左に <c>label</c> + <c>caption</c>、右のデフォルトスロットにコントロールを置きます。<c>#label</c> スロットではステータスバッジをインラインで挿入できます。<c>nested</c> は、親がオンのときだけ意味を持つトグル向けのサブ項目スタイルを適用します。<c>disabled</c> は行を淡色化してロックします。"
    },
    settingsEditableField: {
      blurb: "読み取り専用の値、\"Alterar\"ボタン、その編集モーダルを 1 つのタグにまとめたスマートな行です。<c>type</c>——<c>text</c>、<c>currency</c>、<c>number</c>、<c>select</c>——を選ぶと、body へテレポートしたモーダル内に適切な入力を描画します。編集はバッファリングされ、キャンセルで破棄、保存で <c>update:modelValue</c> と <c>save</c> の両方を発行します（自動保存用）。"
    },
    sparkGridEmptyState: {
      blurb: "本当に表示するものが何もないとき、グリッドの内容を <c>ShadcnOnboardingPanel</c> に差し替えるラッパーです。<c>loading</c> が落ち着く（true → false）のを待ち、<c>total</c> が 0 でフィルタが無効なときのみパネルを表示します——そのためフィルタで空になったリストはツールバーを保持します。<c>panel-visible</c> を発行し、ホストがヘッダーのアクションを隠せるようにします。"
    },
    notice: {
      blurb: "セマンティックなバリアント——<c>info</c>、<c>blue</c>、<c>success</c>、<c>warning</c>、<c>pending</c>、<c>destructive</c>——を持つインラインバナーで、それぞれに対応するデフォルトアイコンがあります。文脈的な注意喚起、ステータスカード、非ブロッキングのエラーに使います。<c>dismissible</c> を追加すると <c>dismiss</c> を発行する閉じるボタンが付きます。タイトル・本文・アイコンはすべてスロットで上書きできます。"
    },
    editFieldModal: {
      blurb: "設定リスト向けの汎用的な\"Alterar X\"モーダルラッパーです。枠（ヘッダー・フッター・保存/キャンセル）を提供し、フィールド入力をデフォルトスロットで受け取るため、モーダルごとにファイルを作る代わりに 1 つのコンポーネントで全ての編集行に対応できます。ref 駆動（<c>show()</c> / <c>hide()</c>）で、自動で閉じずに <c>save</c> を発行するので、先にバリデーションできます。"
    },
    requiredFieldsDialog: {
      blurb: "マルチステップフォームでまだ欠けている必須フィールドを列挙する、琥珀色の警告ダイアログです。<c>{ key, label, hint }</c> の <c>fields</c> 配列を渡し（各 <c>hint</c> が修正すべきステップを示します）、ref（<c>show()</c>）で開きます。従来の\"1 つずつ <c>Alert.info</c>\"パターンを、一目で読める単一のリストに置き換えます。"
    },
    onboardingPanel: {
      blurb: "初回設定のための洗練された空状態 / CTA パネルです。脈動するリングの中のグラデーションアイコン、タイトル + 説明、主 CTA、そして任意の二次ボタンとフッターヒントを備えます。すべて prop で制御するか、<c>#action</c> と <c>#sub-hint</c> スロットでカスタムボタンやリッチな文言を使えます。<c>action</c> / <c>secondary-action</c> を発行します。"
    },
    loadingOverlay: {
      blurb: "スコープを限定したローディングオーバーレイです。半透明でぼかしの入った背景の上にスピナー + テキストを表示し、最も近い位置指定された祖先を覆います（親に <c>position: relative</c> が必要）。<c>visible</c> で切り替え、全画面ローダーの代わりにカード/セクション単位の非同期フィードバックに使います。"
    },
    skeleton: {
      blurb: "ローディング状態向けの、シマーアニメーション付きプレースホルダーブロックです。<c>width</c> / <c>height</c> に任意の CSS 値を設定し、<c>rounded</c> プリセット（アバターには <c>full</c>）を選びます。<c>aria-hidden</c>（視覚のみ）で、<c>prefers-reduced-motion</c> を尊重します——シマーは止まりますがブロックは残ります。実データ到着時にちらつく偽のプレースホルダーより、こちらを推奨します。"
    },
    switchCard: {
      blurb: "存在感の強いフル幅トグルです。オンにするとカード全体がエメラルドになり、内部スイッチが反転色になります——離れていても状態が読み取れます。重要な設定（2FA、メンテナンスモード、プレミアム機能）向けに取っておきましょう。ボックス型 <c>icon</c>、<c>title</c>、等幅の <c>statusOn</c>/<c>statusOff</c> 行が説明します。"
    },
    switchRow: {
      blurb: "フル幅の\"設定行\"トグルです。左にタイトル + 任意の説明、右にコンパクトなスイッチがあり、行全体がクリック可能で余裕あるタッチ領域になります。素の <c>ShadcnSwitch</c> と派手な <c>ShadcnSwitchCard</c> の穏やかな中間で、関連する設定のリストに最適です。"
    },
    switchSegmented: {
      blurb: "分割されたカプセル形の二値トグルです。クリック可能な 2 つの半分とスライドするインジケーターにより、オン/オフではなく\"A か B\"として読めます。ラベル付きの二者択一（月次 / 年次、サンドボックス / 本番）に最適です。<c>compact</c> と <c>squared</c> が形状を、<c>activeColor</c> がインジケーターの色を調整し、矢印キーで左右を移動できます。"
    }
  }
};
