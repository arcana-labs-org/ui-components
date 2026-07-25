import type { Messages } from "./types";

export const ru: Messages = {
  meta: { htmlLang: "ru", locale: "ru-RU" },
  langName: "Русский",

  shell: {
    kicker: "Документация · v0.x",
    lead: "Типизированная библиотека компонентов в стиле shadcn — Vue 3, React, Angular и Svelte, с одинаковым API и одинаковым видом в любом фреймворке.",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "Поиск компонентов… (⌘K)",
    searchAria: "Поиск по документации",
    chooseFramework: "Выбрать фреймворк",
    chooseLanguage: "Выбрать язык",
    openNav: "Открыть навигацию",
    closeNav: "Закрыть навигацию",
    sidebarAria: "Навигация по документации",
    noSectionsFound: "Компоненты не найдены.",
    previewTab: "Превью",
    codeTab: "Код",
    referenceTab: "Свойства и события",
    codeOnlyLabel: "Код",
    defaultPreviewCaption: "живой компонент · взаимодействуйте с ним",
    sectionExampleAria: "Пример {title}",
    githubStars: "{count} звёзд на GitHub",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "Копировать",
    copied: "Скопировано!"
  },

  categories: {
    gettingStarted: "Начало работы",
    forms: "Формы",
    dataDisplay: "Отображение данных",
    overlay: "Оверлеи",
    layoutNav: "Макет и навигация",
    feedback: "Обратная связь"
  },

  gettingStarted: {
    install: {
      title: "Установка",
      p1: "Библиотека поставляется одним npm-пакетом. Установите её вашим менеджером пакетов — <c>vue</c> (3.4+) является единственной peer-зависимостью.",
      p2: "Каждый компонент публикуется для всех четырёх фреймворков в соответствующем подпути — <c>@arcanalabs/ui-components/vue</c>, <c>/react</c>, <c>/angular</c> и <c>/svelte</c>; импортируйте только те, что используете. Иконки используют Font Awesome Free — установите <c>@fortawesome/fontawesome-free</c> и один раз подключите его CSS."
    },
    usage: {
      title: "Использование",
      p1: "Импортируйте компонент и поместите его в шаблон. Все они следуют одним соглашениям: <c>v-model</c> для двусторонних значений, props в kebab-case и событие <c>change</c> рядом с <c>update:modelValue</c>.",
      p2: "Палитра — нейтральная шкала shadcn <i>zinc</i>, поэтому компоненты хорошо сочетаются друг с другом без какой-либо настройки темы."
    },
    styles: {
      title: "Стили",
      p1: "Импортируйте таблицу стилей один раз, в корне приложения: <c>import '@arcanalabs/ui-components/styles.css'</c>. Она содержит визуальные токены всех компонентов.",
      p2: "Стили — это чистый CSS со скоупом на компонент — нет ни движка стилей во время выполнения, ни требования Tailwind на стороне потребителя."
    },
    maska: {
      title: "Регистрация v-maska",
      p1: "Несколько компонентов (<c>ArcanaInputMask</c>, <c>ArcanaDatePicker</c>) используют директиву <c>v-maska</c> из пакета <c>maska</c>. Зарегистрируйте её глобально один раз при создании приложения.",
      p2: "Компонентам без маски дополнительная настройка не нужна — этот шаг требуется только при отрисовке поля ввода с маской."
    }
  },

  propsTable: {
    name: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description: "Описание",
    caption: "Пропсы",
    eventsTitle: "Испускаемые события"
  },

  demoCaption: "живой компонент · взаимодействуйте с ним",
  comingSoon: "Полная документация для этого компонента появится в одном из следующих выпусков. Он уже публикуется для Vue, React, Angular и Svelte и готов к использованию.",
  frameworkSoon: "// Vue, React, Angular и Svelte предоставляют один и тот же компонент — выберите фреймворк выше, чтобы увидеть пример использования.",

  components: {
    button: {
      blurb: "Кликабельная кнопка в пятнадцати семантических вариантах; метка — через слот по умолчанию, клики — через событие <c>click</c>."
    },
    badge: {
      blurb: "Компактная «пилюля» для счётчиков, статусов и тегов — шесть цветов, два размера, необязательный <c>dot</c> и режим <c>clickable</c>."
    },
    input: {
      blurb: "Нативный <c>&lt;input&gt;</c> со стилем shadcn и учитывающим числа <c>v-model</c>; стандартные HTML-атрибуты пробрасываются напрямую."
    },
    select: {
      blurb: "Полностью самописный select (без Element Plus), телепортируемый в <c>&lt;body&gt;</c>, с одиночным/<c>multiple</c> выбором, <c>searchable</c>, <c>clearable</c> и навигацией с клавиатуры."
    },
    treeSelect: {
      blurb: "Селект, панель которого — иерархия с поиском: выберите узел дерева (центры затрат, категории), одиночно или множественно; по умолчанию выбираются только листья."
    },
    checkbox: {
      blurb: "Бинарный чекбокс, оборачивающий настоящий нативный <c>&lt;input type=\"checkbox\"&gt;</c> с состоянием <c>indeterminate</c>; для переключения настройки используйте <c>ArcanaSwitch</c>."
    },
    switch: {
      blurb: "Бинарный переключатель вкл/выкл (WAI-ARIA switch) с цветовой индикацией красный/зелёный и необязательным скрытым чекбоксом для нативных форм."
    },
    tabs: {
      blurb: "Самописные вкладки, управляемые массивом <c>tabs</c> и <c>v-model</c>, с шестью вариантами — от pills до полноценной боковой навигации."
    },
    dialog: {
      blurb: "Модальное окно shadcn с API на основе ref <c>show()</c>/<c>hide()</c> — телепортируется в <c>&lt;body&gt;</c>, удерживает фокус и закрывается по Escape."
    },
    inputMask: {
      blurb: "Текстовое поле с маской на <c>v-maska</c>, чей <c>v-model</c> всегда хранит <b>сырое</b> значение (CPF, CNPJ, телефон…); требует глобально зарегистрированный <c>v-maska</c>."
    },
    inputBoolean: {
      blurb: "Селект «да/нет» для булевых полей, нормализующий <c>true</c>/<c>false</c>/<c>null</c>, с вариациями подписей status и SQL-подобными."
    },
    numberStepper: {
      blurb: "Числовое поле с кнопками <c>−</c>/<c>+</c> по бокам, учитывающими <c>min</c>/<c>max</c>/<c>step</c> и стрелки клавиатуры."
    },
    multiSelectPopover: {
      blurb: "Попап, телепортируемый в body, со множественным выбором через чекбоксы по вкладкам; <c>v-model</c> — карта <c>{ [tabKey]: number[] }</c>, каждая вкладка питается асинхронным <c>fetch()</c>."
    },
    radioCardGroup: {
      blurb: "Выбираемые карточки на основе настоящих <c>&lt;input type=\"radio\"&gt;</c>, каждая с описанием, иконкой или бейджем; размещайте стопкой, <c>inline</c> или в <c>columns</c>."
    },
    segmentedOptions: {
      blurb: "Сегментированный контрол для N взаимоисключающих опций внутри капсулы, с иконками и отключением по каждой опции."
    },
    datePicker: {
      blurb: "Поле даты shadcn, объединяющее поле с маской <c>DD/MM/AAAA</c> и всплывающий календарь; <c>v-model</c> — ISO-строка <c>YYYY-MM-DD</c>."
    },
    inputCurrency: {
      blurb: "Поле ввода валюты (на <c>v-money3</c>), форматирующее по мере ввода, с настраиваемым числом знаков и ограничением <c>min</c>/<c>max</c>; по умолчанию BRL."
    },
    accordion: {
      blurb: "Контейнер для сворачиваемых <c>ArcanaAccordionItem</c>, привязывающий <c>v-model</c> для режима одного или нескольких открытых."
    },
    accordionItem: {
      blurb: "Одна сворачиваемая панель внутри <c>ArcanaAccordion</c>, определяемая по <c>name</c>, с заголовком <c>title</c> и телом-слотом."
    },
    dropdown: {
      blurb: "Выпадающее меню shadcn, телепортируемое в <c>&lt;body&gt;</c>, авто-позиционируемое и закрывающееся по клику снаружи, Escape или выбору."
    },
    dropdownItem: {
      blurb: "Строка внутри <c>ArcanaDropdown</c> — необязательная <c>icon</c>, подпись и <c>suffix</c> — с настройкой цвета и разделителем <c>divided</c> для деструктивных действий."
    },
    table: {
      blurb: "Статическая таблица shadcn для массивов в памяти; колонки объявляются как <c>{ key, label, width?, align?, valueGetter? }</c>, со слотами ячеек и футера."
    },
    specSheet: {
      blurb: "Редакционная «спецификация» только для чтения для формальных записей, с эйбровом <c>docNum</c>, заголовком <c>title</c> и дочерними секциями."
    },
    specSheetSection: {
      blurb: "Секция внутри <c>ArcanaSpecSheet</c> — акцентная <c>icon</c>, <c>title</c> и <c>sectionNum</c> над сеткой полей <c>columns</c>."
    },
    specSheetField: {
      blurb: "Одна пара метка/значение; пустое значение показывает <c>emptyText</c>, чтобы пропуски читались как намеренные, а <c>span</c> расширяет поле."
    },
    summaryTiles: {
      blurb: "Адаптивный контейнер-сетка для KPI-плиток; задайте <c>columns</c> (по умолчанию 3), ниже 880px сворачивается в один столбец."
    },
    summaryTile: {
      blurb: "Компактный KPI-показатель в раскладке <c>[icon] [label + sub] [value]</c>, в четырёх легко считываемых <c>tone</c>."
    },
    settingsList: {
      blurb: "Контейнер в стиле «Настройки» iOS из строк, разделённых тонкими линиями, у каждой метка + подпись и выровненный по правому краю контрол."
    },
    settingsListGroup: {
      blurb: "Озаглавленная, при желании <c>collapsible</c>, секция внутри <c>ArcanaSettingsList</c>, с иконкой, <c>sectionNum</c> и <c>meta</c>."
    },
    settingsListItem: {
      blurb: "Одна строка настроек — <c>label</c> + <c>caption</c> слева, ваш контрол справа."
    },
    settingsEditableField: {
      blurb: "Умная строка, объединяющая значение только для чтения, кнопку «Alterar» и её модальное окно редактирования в один тег (<c>text</c>/<c>currency</c>/<c>number</c>/<c>select</c>)."
    },
    notice: {
      blurb: "Инлайновый баннер в шести семантических вариантах с подходящими иконками, при желании <c>dismissible</c>, для уведомлений и неблокирующих ошибок."
    },
    editFieldModal: {
      blurb: "Универсальная обёртка модального окна «Alterar X» на основе ref, дающая оформление и принимающая ввод поля через слот."
    },
    requiredFieldsDialog: {
      blurb: "Янтарный диалог, перечисляющий обязательные поля, всё ещё не заполненные в многошаговой форме, каждая подсказка указывает на шаг для исправления."
    },
    onboardingPanel: {
      blurb: "Отточенная панель пустого состояния / CTA для первичной настройки — градиентная иконка, заголовок, описание и основной призыв к действию."
    },
    loadingOverlay: {
      blurb: "Спиннер-оверлей с ограниченной областью поверх размытого фона, покрывающий ближайшего позиционированного предка; переключается через <c>visible</c>."
    },
    skeleton: {
      blurb: "Мерцающий блок-заполнитель для состояний загрузки; задайте <c>width</c>/<c>height</c>, выберите пресет <c>rounded</c>, уважает reduced-motion."
    },
    switchCard: {
      blurb: "Заметный переключатель во всю ширину, делающий всю карточку изумрудной во включённом состоянии — приберегите его для весомых настроек."
    },
    switchRow: {
      blurb: "Переключатель-строка настроек во всю ширину — заголовок + описание слева, компактный переключатель справа, вся строка кликабельна."
    },
    switchSegmented: {
      blurb: "Бинарный переключатель в форме сегментированной капсулы со скользящим индикатором, читающийся как «A или B», а не вкл/выкл."
    }
  },

  demos: {
    // ── shared ──
    lastAction: "последнее действие",
    timesSuffix: "раз",
    disabledLabel: "Отключено",

    // ── button ──
    btnPrimary: "Основная",
    btnSecondary: "Вторичная",
    btnOutline: "Контурная",
    btnGhost: "Прозрачная",
    btnSuccess: "Успех",
    btnIndigo: "Индиго",
    btnDestructive: "Опасная",
    btnOutlineDanger: "Контурная опасная",
    primaryClickedPrefix: "Нажато",

    // ── badge ──
    badgeNeutral: "нейтральный",
    badgeBlue: "синий",
    badgeGreen: "зелёный",
    badgeRed: "красный",
    badgeAmber: "янтарный",
    badgeViolet: "фиолетовый",
    badgeActive: "Активен",
    badgeOffline: "Не в сети",
    badgeSmSize: "размер sm",
    badgeClickable: "кликабельный",

    // ── input ──
    quantity: "Количество",
    inputReadonly: "Только чтение",
    inputLockedValue: "Заблокированное значение",
    inputEmailLabel: "эл. почта",
    inputQtyLabel: "кол-во",

    // ── select ──
    selectPickFruit: "Выберите фрукт",
    selectPickSeveral: "Выберите несколько",
    fruitApple: "Яблоко",
    fruitBanana: "Банан",
    fruitCherry: "Вишня",
    fruitCherryDesc: "сезонный",
    fruitDurian: "Дуриан",
    fruitElderberry: "Бузина",
    selectSingleLabel: "одиночный",
    selectMultipleLabel: "множественный",

    // ── checkbox ──
    checkboxSelectAll: "Выбрать всё",
    checkboxInvoices: "Счета",
    checkboxReceipts: "Квитанции",
    checkboxStatements: "Выписки",
    checkboxArchivedDisabled: "Архивные (отключено)",

    // ── switch ──
    switchNotifications: "Уведомления",
    switchBetaFeatures: "Бета-функции",

    // ── tabs ──
    tabOverview: "Обзор",
    tabActivity: "Активность",
    tabSettings: "Настройки",
    tabOverviewPanel: "Панель «Обзор» активна.",
    tabActivityPanel: "3 новых элемента в Активности.",
    tabSettingsPanel: "Настройте параметры здесь.",

    // ── dialog ──
    dialogOpen: "Открыть диалог",
    dialogTitle: "Удалить рабочее пространство",
    dialogDescription: "Это действие нельзя отменить.",
    dialogBody: "Удаление этого рабочего пространства удалит все проекты и приглашения внутри него. В реальной форме введите имя для подтверждения — здесь просто закройте диалог.",
    dialogCancel: "Отмена",
    dialogDelete: "Удалить",

    // ── input mask ──
    maskPhone: "Телефон",
    cpfRaw: "cpf (без маски)",
    phoneRaw: "телефон (без маски)",

    // ── input boolean ──
    boolYesNo: "Да / Нет",
    boolHasValue: "Есть значение?",
    boolYesNoLabel: "да/нет",
    boolStatusLabel: "статус",
    boolNullableLabel: "обнуляемый",

    // ── number stepper ──
    stepperQtyLabel: "кол-во (0–10)",
    stepperWeightLabel: "вес (шаг 5)",

    // ── multi-select popover ──
    mspUsers: "Пользователи",
    mspDepartments: "Отделы",
    mspSales: "Продажи",
    mspSupport: "Поддержка",
    mspEmptyLabel: "Выберите людей или отделы",
    mspUsersLabel: "пользователи",
    mspDepartmentsLabel: "отделы",

    // ── radio card group ──
    payCreditCard: "Кредитная карта",
    payCreditCardDesc: "Автоматическое регулярное списание.",
    payPix: "Pix",
    payPixDesc: "Мгновенно, без комиссии.",
    payPixBadge: "Рекомендуется",
    payBoleto: "Boleto",
    payBoletoDesc: "Срок оплаты — 3 рабочих дня.",
    payCash: "Оплата при доставке",
    selectedLabel: "выбрано",

    // ── segmented options ──
    segList: "Список",
    segGrid: "Сетка",
    segBoard: "Доска",
    viewLabel: "вид",

    // ── date picker ──
    datePickerValueLabel: "значение (YYYY-MM-DD)",
    datePickerTypeHint: "введите DD/MM/AAAA",

    // ── input currency ──
    priceRaw: "цена (без маски)",

    // ── accordion ──
    accShipping: "Доставка",
    accShippingBody: "Отправка в течение 2–3 рабочих дней.",
    accReturns: "Возврат",
    accReturnsBody: "Бесплатный возврат в течение 30 дней, без вопросов.",
    accWarranty: "Гарантия (отключено)",
    accWarrantyBody: "Скоро.",
    accOpenSingleLabel: "открыто (одиночный режим)",

    // ── accordion item ──
    accSpecifications: "Характеристики",
    accSpecificationsBody: "Вес, размеры и материалы.",
    accCareTitle: "Инструкция по уходу",
    accCareBody: "Ручная стирка в холодной воде, не сушить в барабане.",
    accOpenMultipleLabel: "открыто (множественный режим)",

    // ── dropdown ──
    dropdownActions: "Действия",
    ddRename: "Переименовать",
    ddDuplicate: "Дублировать",
    ddDelete: "Удалить",

    // ── dropdown item ──
    dropdownOpenMenu: "Открыть меню",
    ddProfile: "Профиль",
    ddApprove: "Одобрить",
    ddFlag: "Отметить",
    ddFlagLabel: "Отметить на проверку",

    // ── table ──
    colSku: "SKU",
    colProduct: "Товар",
    colQty: "Кол-во",
    colTotal: "Итого",
    tableLow: "мало",
    tableInStock: "в наличии",
    tableTotalItems: "Итого (3 позиции)",

    // ── settings editable field ──
    editableFieldHintPrefix: "Нажмите",
    editableFieldHintSuffix: "в любой строке, чтобы открыть окно редактирования.",

    // ── notice ──
    noticeDismissedHint: "Уведомление об опасном действии было закрыто — перезагрузите предпросмотр, чтобы вернуть его.",

    // ── edit field modal ──
    savedValue: "сохранённое значение",

    // ── onboarding panel ──
    onboardingPrimary: "основной",
    onboardingSecondary: "вторичный",

    // ── loading overlay ──
    loadingOverlayHint: "Нажмите «Salvar», чтобы накрыть эту карточку оверлеем на ~1,6 с.",

    // ── switch card ──
    switchCard2faLabel: "2FA",
    switchCardMaintenanceLabel: "обслуживание",

    // ── switch row ──
    switchRowEmailLabel: "эл. почта",
    switchRowPushLabel: "push",

    // ── switch segmented ──
    switchSegCycleLabel: "цикл",
    switchSegEnvLabel: "окружение",

    // ── added: previously-hardcoded PT demo strings ──
    statusActive: "Активно",
    statusLabel: "Статус",
    actionChange: "Изменить",

    btnNew: "Создать",
    btnExport: "Экспорт",
    btnDelete: "Удалить",
    btnSave: "Сохранить",
    btnSettings: "Настройки",
    btnMoreOptions: "Ещё",
    btnAdd: "Добавить",

    specSheetDocNum: "Запись № 042 · Обновлено 14.Mar.2026",
    specSheetRegistrationData: "Регистрационные данные",
    specSheetLegalName: "Юридическое наименование",
    specSheetStateRegistration: "Гос. регистрация",
    specSheetContact: "Контакт",
    specSheetPhone: "Телефон",
    specSheetEmail: "Эл. почта",
    specSheetChangeData: "Изменить данные",
    specSheetFinancial: "Финансы",
    specSheetLimit: "Лимит",
    specSheetBalance: "Баланс",
    specSheetDueDate: "Срок оплаты",
    specSheetDueDateValue: "10-е число",
    specSheetNotes: "Заметки",
    specSheetNotesLabel: "Заметки",
    specSheetNotesValue: "Приоритетный клиент с 2019 года.",
    specSheetName: "Имя",
    specSheetNickname: "Псевдоним",
    specSheetNotProvided: "Не указано",

    tileIncome: "Доход",
    tileIncomeSub: "4 способа",
    tileExpenses: "Расходы",
    tileExpensesSub: "3 записи",
    tileTotal: "Итого",
    tileOrders: "Заказы",
    tileToday: "сегодня",
    tileApproved: "Одобрено",
    tileCanceled: "Отменено",
    tileConversion: "Конверсия",

    settingsAdvancedFeatures: "Расширенные функции",
    settingsAdvancedFeaturesCaption: "Включает внутренние возможности.",
    settingsEmailNotifications: "Уведомления по эл. почте",
    settingsEmailNotificationsCaption: "Ежедневная сводка операционной активности.",
    settingsPlan: "Тариф",
    settingsPlanCaption: "Функции, включённые для организации.",
    settingsPlanShortCaption: "Включённые функции.",
    settingsTwoConfigs: "2 настройки",
    settingsAcceptOrders: "Принимать заказы",
    settingsAcceptOrdersCaption: "Получает новые заказы через приложение.",
    settingsAutoConfirm: "Автоматическое подтверждение",
    settingsAutoConfirmCaption: "Подтверждает без ручной проверки.",
    settingsDelivery: "Доставка",
    settingsRealtimeTracking: "Отслеживание в реальном времени",
    settingsSaasCaption: "SaaS-система — тариф через таблицу подписки.",
    settingsSubscriptionV2: "Подписка V2",
    settingsShowWebApp: "Показать веб-приложение",
    settingsShowWebAppCaption: "Подпараметр кредитной карты.",
    settingsUnavailableFeature: "Недоступная функция",
    settingsUnavailableFeatureCaption: "Требуется более высокий тариф.",

    planBasic: "Базовый",
    planProfessional: "Профессиональный",
    planEnterprise: "Корпоративный",

    editableUnitName: "Название подразделения",
    editableUnitNameCaption: "Отображается в отчётах.",
    editableFirstPurchaseDiscount: "Скидка на первую покупку",
    editableFirstPurchaseDiscountCaption: "Применяется значение за единицу.",

    noticeInfoTitle: "Информация",
    noticeInfoBody: "Настройка сохранена автоматически.",
    noticeNewTitle: "Что нового",
    noticeNewBody: "Новая панель маршрутов теперь доступна.",
    noticeActivatedTitle: "Активировано",
    noticeActivatedBody: "Интеграция успешно завершена.",
    noticeManualPaymentTitle: "Ручная оплата",
    noticeManualPaymentBody: "Pix и Boleto создают новую ссылку для оплаты каждый цикл.",
    noticePendingTitle: "Ожидание активации в Stripe",
    noticePendingBody: "Нажмите «Sync», чтобы создать подписку в шлюзе.",
    noticeErrorTitle: "Не удалось загрузить",
    noticeErrorBody: "Не удалось получить данные.",

    editDialogChangeName: "Изменить имя",
    editDialogTitle: "Изменить имя",
    editDialogDescription: "Обновите название подразделения.",
    editDialogPlaceholder: "Название подразделения",

    requiredValidateForm: "Проверить форму",
    requiredDescription: "Поля ниже должны быть заполнены перед созданием клиента.",
    requiredCnpjHint: "Шаг 1 · Регистрационные данные",
    requiredPhoneHint: "Шаг 2 · Контакт",
    requiredDeliveryAddress: "Адрес доставки",
    requiredDeliveryAddressHint: "Шаг 3 · Логистика",

    onboardingTitle: "Пока нет проектов",
    onboardingDescription: "Создайте свой первый проект, чтобы начать организовывать работу.",
    onboardingActionLabel: "Создать проект",
    onboardingSecondaryLabel: "Посмотреть примеры",
    onboardingSubHint: "Вы можете пригласить команду позже.",

    loadingOrderSummary: "Сводка заказа",
    loadingSavingText: "Сохранение…",

    switchCard2faTitle: "Аутентификация 2FA",
    switchCard2faStatusOn: "ВКЛ · TOTP",
    switchCard2faStatusOff: "ВЫКЛ",
    switchCardMaintenanceTitle: "Режим обслуживания",

    switchRowEmailDesc: "Ежедневная сводка активности организации.",
    switchRowPushTitle: "Push-уведомления",
    switchRowPushDesc: "Оповещения в реальном времени на устройстве.",

    switchSegMonthly: "Ежемесячно",
    switchSegAnnual: "Ежегодно · −20%",
    switchSegSandbox: "Песочница",
    switchSegProduction: "Продакшн",

    // ── tree select ──
    treeAdministrative: "Администрация",
    treeHr: "Кадры",
    treeFinance: "Финансы",
    treeOperations: "Операции",
    treeLogistics: "Логистика",
    treeFleet: "Автопарк",
    treeWarehouse: "Склад",
    treeCommercial: "Коммерция",
    treePickOne: "Выберите центр затрат",
    treePickSeveral: "Выберите несколько"

  }
};
