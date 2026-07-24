import type { Component } from "vue";
import type { DocumentedKey } from "../i18n/types";

import ShadcnButton from "../../../src/vue/components/ShadcnButton.vue";
import ShadcnBadge from "../../../src/vue/components/ShadcnBadge.vue";
import ShadcnInput from "../../../src/vue/components/ShadcnInput.vue";
import ShadcnSelect from "../../../src/vue/components/ShadcnSelect.vue";
import ShadcnCheckbox from "../../../src/vue/components/ShadcnCheckbox.vue";
import ShadcnSwitch from "../../../src/vue/components/ShadcnSwitch.vue";
import ShadcnTabs from "../../../src/vue/components/ShadcnTabs.vue";
import ShadcnDialog from "../../../src/vue/components/ShadcnDialog.vue";

export interface PropRow {
  name: string;
  type: string;
  default: string;
  /** Short technical description (English; language-neutral reference text). */
  description: string;
}

export interface ComponentDoc {
  /** A real Vue component definition, mounted live in the preview. */
  demo: Component;
  props: PropRow[];
  /** Emitted events, shown as a small list under the props table. */
  events?: string[];
  /** The Vue `<script setup>` + template snippet shown in the Code tab. */
  vueSnippet: string;
}

/* ─────────────────────────── ShadcnButton ─────────────────────────── */

const ButtonDemo: Component = {
  components: { ShadcnButton },
  data: () => ({ clicks: 0 }),
  template: /* html */ `
    <div class="demo-stack">
      <div class="demo-row">
        <ShadcnButton @click="clicks++">Primary</ShadcnButton>
        <ShadcnButton variant="secondary">Secondary</ShadcnButton>
        <ShadcnButton variant="outline">Outline</ShadcnButton>
        <ShadcnButton variant="ghost">Ghost</ShadcnButton>
        <ShadcnButton variant="success">Success</ShadcnButton>
        <ShadcnButton variant="indigo">Indigo</ShadcnButton>
        <ShadcnButton variant="destructive">Destructive</ShadcnButton>
        <ShadcnButton variant="outline-danger">Outline danger</ShadcnButton>
        <ShadcnButton :disabled="true">Disabled</ShadcnButton>
      </div>
      <p class="demo-note">Primary clicked <strong>{{ clicks }}</strong> time(s)</p>
    </div>
  `
};

/* ─────────────────────────── ShadcnBadge ──────────────────────────── */

const BadgeDemo: Component = {
  components: { ShadcnBadge },
  template: /* html */ `
    <div class="demo-stack">
      <div class="demo-row">
        <ShadcnBadge>neutral</ShadcnBadge>
        <ShadcnBadge variant="blue">blue</ShadcnBadge>
        <ShadcnBadge variant="green">green</ShadcnBadge>
        <ShadcnBadge variant="red">red</ShadcnBadge>
        <ShadcnBadge variant="amber">amber</ShadcnBadge>
        <ShadcnBadge variant="violet">violet</ShadcnBadge>
      </div>
      <div class="demo-row">
        <ShadcnBadge variant="green" :dot="true">Active</ShadcnBadge>
        <ShadcnBadge variant="red" :dot="true">Offline</ShadcnBadge>
        <ShadcnBadge variant="blue" size="sm">sm size</ShadcnBadge>
        <ShadcnBadge variant="violet" :clickable="true">clickable</ShadcnBadge>
      </div>
    </div>
  `
};

/* ─────────────────────────── ShadcnInput ──────────────────────────── */

const InputDemo: Component = {
  components: { ShadcnInput },
  data: () => ({ email: "", qty: null as number | null }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ShadcnInput v-model="email" type="email" placeholder="email@company.com" />
      <ShadcnInput v-model="qty" type="number" placeholder="Quantity" :min="0" :max="99" />
      <ShadcnInput placeholder="Read-only" model-value="Locked value" :readonly="true" />
      <p class="demo-note">email: <strong>{{ email || "—" }}</strong> · qty: <strong>{{ qty === null ? "null" : qty }}</strong> ({{ qty === null ? "empty" : typeof qty }})</p>
    </div>
  `
};

/* ─────────────────────────── ShadcnSelect ─────────────────────────── */

const SelectDemo: Component = {
  components: { ShadcnSelect },
  data: () => ({
    single: null as string | null,
    many: [] as string[],
    fruits: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Cherry", value: "cherry", description: "seasonal" },
      { label: "Durian", value: "durian", disabled: true },
      { label: "Elderberry", value: "elderberry" }
    ]
  }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ShadcnSelect v-model="single" :options="fruits" placeholder="Pick a fruit" searchable />
      <ShadcnSelect v-model="many" :options="fruits" placeholder="Pick several" multiple />
      <p class="demo-note">single: <strong>{{ single ?? "null" }}</strong> · multiple: <strong>[{{ many.join(", ") }}]</strong></p>
    </div>
  `
};

/* ────────────────────────── ShadcnCheckbox ────────────────────────── */

const CheckboxDemo: Component = {
  components: { ShadcnCheckbox },
  data: () => ({ items: { a: true, b: false, c: false } as Record<string, boolean> }),
  computed: {
    allChecked(): boolean {
      const v = (this as unknown as { items: Record<string, boolean> }).items;
      return v.a && v.b && v.c;
    },
    someChecked(): boolean {
      const v = (this as unknown as { items: Record<string, boolean> }).items;
      const n = [v.a, v.b, v.c].filter(Boolean).length;
      return n > 0 && n < 3;
    }
  },
  methods: {
    toggleAll(value: boolean) {
      (this as unknown as { items: Record<string, boolean> }).items = { a: value, b: value, c: value };
    }
  },
  template: /* html */ `
    <div class="demo-stack">
      <ShadcnCheckbox
        :model-value="allChecked"
        :indeterminate="someChecked"
        label="Select all"
        @update:modelValue="toggleAll"
      />
      <div class="demo-stack" style="padding-left: 22px; gap: 6px">
        <ShadcnCheckbox v-model="items.a" label="Invoices" />
        <ShadcnCheckbox v-model="items.b" label="Receipts" />
        <ShadcnCheckbox v-model="items.c" label="Statements" />
        <ShadcnCheckbox :model-value="false" :disabled="true" label="Archived (disabled)" />
      </div>
    </div>
  `
};

/* ─────────────────────────── ShadcnSwitch ─────────────────────────── */

const SwitchDemo: Component = {
  components: { ShadcnSwitch },
  data: () => ({ on: true, off: false }),
  template: /* html */ `
    <div class="demo-stack">
      <label class="demo-switch-row"><ShadcnSwitch v-model="on" aria-label="Notifications" /> <span>Notifications ({{ on ? "on" : "off" }})</span></label>
      <label class="demo-switch-row"><ShadcnSwitch v-model="off" aria-label="Beta features" /> <span>Beta features ({{ off ? "on" : "off" }})</span></label>
      <div class="demo-row" style="align-items: center">
        <ShadcnSwitch v-model="on" size="sm" aria-label="small" />
        <ShadcnSwitch v-model="on" size="md" aria-label="medium" />
        <ShadcnSwitch v-model="on" size="lg" aria-label="large" />
        <ShadcnSwitch :model-value="true" :disabled="true" aria-label="disabled" />
      </div>
    </div>
  `
};

/* ──────────────────────────── ShadcnTabs ──────────────────────────── */

const TabsDemo: Component = {
  components: { ShadcnTabs },
  data: () => ({
    active: "overview",
    variant: "pills" as string,
    tabs: [
      { name: "overview", label: "Overview" },
      { name: "activity", label: "Activity", badge: 3 },
      { name: "settings", label: "Settings" }
    ]
  }),
  template: /* html */ `
    <div class="demo-stack">
      <div class="demo-row">
        <button
          v-for="v in ['pills','underline','boxed','segmented']"
          :key="v"
          type="button"
          class="demo-chip"
          :class="{ 'is-on': variant === v }"
          @click="variant = v"
        >{{ v }}</button>
      </div>
      <ShadcnTabs v-model="active" :tabs="tabs" :variant="variant" aria-label="Demo tabs">
        <template #overview><div class="demo-panel">The <strong>Overview</strong> panel is active.</div></template>
        <template #activity><div class="demo-panel">3 new items in <strong>Activity</strong>.</div></template>
        <template #settings><div class="demo-panel">Adjust your <strong>Settings</strong> here.</div></template>
      </ShadcnTabs>
    </div>
  `
};

/* ─────────────────────────── ShadcnDialog ─────────────────────────── */

const DialogDemo: Component = {
  components: { ShadcnButton, ShadcnDialog },
  methods: {
    open() {
      (this.$refs.dialog as unknown as { show: () => void }).show();
    }
  },
  template: /* html */ `
    <div>
      <ShadcnButton @click="open">Open dialog</ShadcnButton>
      <ShadcnDialog ref="dialog" title="Delete workspace" description="This action cannot be undone.">
        <p style="font-size: 13px; color: #52525b; line-height: 1.6">
          Removing this workspace deletes every project and invite inside it.
          Type the name to confirm in a real form — here, just close the dialog.
        </p>
        <template #footer="{ hide }">
          <ShadcnButton variant="outline" @click="hide">Cancel</ShadcnButton>
          <ShadcnButton variant="destructive" @click="hide">Delete</ShadcnButton>
        </template>
      </ShadcnDialog>
    </div>
  `
};

/* ─────────────────────────── The registry ─────────────────────────── */

export const COMPONENT_DOCS: Record<DocumentedKey, ComponentDoc> = {
  button: {
    demo: ButtonDemo,
    props: [
      { name: "variant", type: "primary | secondary | outline | ghost | success | teal | info | warning | indigo | alert | danger | destructive | outline-danger | destructive-outline | dark", default: "primary", description: "Colour/emphasis of the button." },
      { name: "type", type: "button | submit", default: "button", description: "Native button type." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button and dims it to 50% opacity." }
    ],
    events: ["click(ev: MouseEvent) — emitted on click"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnButton } from '@arcanalabs/ui-components/vue'",
      "",
      "function save() {",
      "  // …persist changes",
      "}",
      "</script>",
      "",
      "<template>",
      "  <ShadcnButton variant=\"primary\" @click=\"save\">Save</ShadcnButton>",
      "  <ShadcnButton variant=\"outline\">Cancel</ShadcnButton>",
      "  <ShadcnButton variant=\"destructive\" :disabled=\"busy\">Delete</ShadcnButton>",
      "</template>"
    ].join("\n")
  },

  badge: {
    demo: BadgeDemo,
    props: [
      { name: "variant", type: "neutral | blue | green | red | amber | violet", default: "neutral", description: "Colour palette of the pill." },
      { name: "dot", type: "boolean", default: "false", description: "Shows a leading coloured status dot." },
      { name: "size", type: "sm | md", default: "md", description: "Compact (sm) or default (md) sizing." },
      { name: "clickable", type: "boolean", default: "false", description: "Adds pointer cursor + hover for actionable badges." }
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnBadge } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnBadge variant=\"green\" dot>Active</ShadcnBadge>",
      "  <ShadcnBadge variant=\"blue\">12 records</ShadcnBadge>",
      "  <ShadcnBadge variant=\"red\" size=\"sm\">Overdue</ShadcnBadge>",
      "</template>"
    ].join("\n")
  },

  input: {
    demo: InputDemo,
    props: [
      { name: "modelValue", type: "string | number | null", default: "''", description: "The bound value (v-model). type=\"number\" emits a real number or null." },
      { name: "type", type: "string", default: "text", description: "HTML input type (text, email, password, number, …)." },
      { name: "placeholder", type: "string", default: "''", description: "Placeholder text." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
      { name: "readonly", type: "boolean", default: "false", description: "Renders the input read-only." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Control height/padding." }
    ],
    events: [
      "update:modelValue(value) — v-model update",
      "change / blur / focus / keydown / keyup — forwarded native events"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnInput } from '@arcanalabs/ui-components/vue'",
      "",
      "const email = ref('')",
      "const qty = ref<number | null>(null)",
      "</script>",
      "",
      "<template>",
      "  <ShadcnInput v-model=\"email\" type=\"email\" placeholder=\"email@company.com\" />",
      "  <ShadcnInput v-model=\"qty\" type=\"number\" :min=\"0\" :max=\"99\" />",
      "</template>"
    ].join("\n")
  },

  select: {
    demo: SelectDemo,
    props: [
      { name: "modelValue", type: "any", default: "null", description: "Selected value (single) or array of values (multiple)." },
      { name: "options", type: "Array<{ label, value, disabled?, description? }> | string[] | number[]", default: "[]", description: "The choices; plain strings/numbers are normalised." },
      { name: "placeholder", type: "string", default: "'Selecione…'", description: "Shown when nothing is selected." },
      { name: "multiple", type: "boolean", default: "false", description: "Enables multi-select (value becomes an array; panel stays open)." },
      { name: "searchable", type: "boolean", default: "false", description: "Adds a filter input at the top of the dropdown." },
      { name: "clearable", type: "boolean", default: "true", description: "Shows an X on hover to clear the value." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the select." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Trigger height/padding." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — same payload, on selection"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnSelect } from '@arcanalabs/ui-components/vue'",
      "",
      "const fruit = ref<string | null>(null)",
      "const options = [",
      "  { label: 'Apple', value: 'apple' },",
      "  { label: 'Banana', value: 'banana' },",
      "  { label: 'Cherry', value: 'cherry', description: 'seasonal' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSelect v-model=\"fruit\" :options=\"options\" searchable placeholder=\"Pick a fruit\" />",
      "</template>"
    ].join("\n")
  },

  checkbox: {
    demo: CheckboxDemo,
    props: [
      { name: "modelValue", type: "boolean", default: "false", description: "Checked state (v-model)." },
      { name: "indeterminate", type: "boolean", default: "false", description: "Renders the \"some selected\" dash; does not change the emitted value." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the checkbox." },
      { name: "label", type: "string", default: "''", description: "Inline label (or use the default slot)." },
      { name: "name", type: "string", default: "''", description: "name attribute of the underlying input." },
      { name: "ariaLabel", type: "string", default: "''", description: "aria-label when there is no visible label." }
    ],
    events: ["update:modelValue(checked) — v-model update", "change(checked) — on toggle"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnCheckbox } from '@arcanalabs/ui-components/vue'",
      "",
      "const accepted = ref(false)",
      "</script>",
      "",
      "<template>",
      "  <ShadcnCheckbox v-model=\"accepted\" label=\"I accept the terms\" />",
      "</template>"
    ].join("\n")
  },

  switch: {
    demo: SwitchDemo,
    props: [
      { name: "modelValue", type: "boolean", default: "false", description: "On/off state (v-model)." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the switch." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Track/thumb sizing." },
      { name: "name", type: "string", default: "''", description: "When set, renders a hidden checkbox for native form submission." },
      { name: "ariaLabel", type: "string", default: "''", description: "aria-label for screen readers (recommended)." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — on toggle"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnSwitch } from '@arcanalabs/ui-components/vue'",
      "",
      "const autoRenew = ref(true)",
      "</script>",
      "",
      "<template>",
      "  <label class=\"form-row\">",
      "    <span>Auto-renew</span>",
      "    <ShadcnSwitch v-model=\"autoRenew\" aria-label=\"Auto-renew\" />",
      "  </label>",
      "</template>"
    ].join("\n")
  },

  tabs: {
    demo: TabsDemo,
    props: [
      { name: "modelValue", type: "string | number", default: "— (required)", description: "Name of the active tab (v-model)." },
      { name: "tabs", type: "Array<{ name, label, disabled?, icon?, badge?, group?, tone? }>", default: "— (required)", description: "Tab definitions; each name becomes a matching slot." },
      { name: "variant", type: "pills | underline | boxed | sidebar | sidebar-soft | segmented", default: "pills", description: "Visual style of the tablist." },
      { name: "orientation", type: "horizontal | vertical", default: "horizontal", description: "Tablist placement (sidebar variants force vertical)." },
      { name: "keepAlive", type: "boolean", default: "false", description: "Keeps inactive panels mounted (preserves their state)." },
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name of the tablist." }
    ],
    events: ["update:modelValue(name) — v-model update", "change(name) — on tab change"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnTabs } from '@arcanalabs/ui-components/vue'",
      "",
      "const active = ref('overview')",
      "const tabs = [",
      "  { name: 'overview', label: 'Overview' },",
      "  { name: 'activity', label: 'Activity', badge: 3 },",
      "  { name: 'settings', label: 'Settings' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ShadcnTabs v-model=\"active\" :tabs=\"tabs\" variant=\"pills\">",
      "    <template #overview>…</template>",
      "    <template #activity>…</template>",
      "    <template #settings>…</template>",
      "  </ShadcnTabs>",
      "</template>"
    ].join("\n")
  },

  dialog: {
    demo: DialogDemo,
    props: [
      { name: "title", type: "string", default: "''", description: "Header title (ignored if the header slot is used)." },
      { name: "description", type: "string", default: "''", description: "Sub-title under the header title." },
      { name: "size", type: "sm | md | lg | xl | full | number", default: "md", description: "Max width preset (md = 580px) or a px number." },
      { name: "closeable", type: "boolean", default: "true", description: "Shows the X close button in the header." },
      { name: "closeOnOverlayClick", type: "boolean", default: "false", description: "Close when the backdrop is clicked." },
      { name: "closeOnEscape", type: "boolean", default: "true", description: "Close when Escape is pressed." }
    ],
    events: [
      "show — emitted from show()",
      "hide — emitted from hide()",
      "Methods (via ref): show(), hide()"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnDialog, ShadcnButton } from '@arcanalabs/ui-components/vue'",
      "",
      "const dialog = ref()",
      "</script>",
      "",
      "<template>",
      "  <ShadcnButton @click=\"dialog.show()\">Open</ShadcnButton>",
      "",
      "  <ShadcnDialog ref=\"dialog\" title=\"Delete workspace\" description=\"This cannot be undone.\">",
      "    <p>Body content…</p>",
      "    <template #footer=\"{ hide }\">",
      "      <ShadcnButton variant=\"outline\" @click=\"hide\">Cancel</ShadcnButton>",
      "      <ShadcnButton variant=\"destructive\" @click=\"hide\">Delete</ShadcnButton>",
      "    </template>",
      "  </ShadcnDialog>",
      "</template>"
    ].join("\n")
  }
};
