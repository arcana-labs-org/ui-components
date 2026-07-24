import { useEffect, useRef } from "react";
import { createApp, defineComponent, h, type Component as VueComponent } from "vue";
import { useLang } from "../i18n";
// The maska plugin registers the global `v-maska` directive, so any demo (now or
// in a future batch) that renders ArcanaInputMask / ArcanaDatePicker just works.
import Maska from "maska";
// ArcanaInputBoolean renders `<ArcanaSelect>` by GLOBAL name (its SFC does not
// import it locally — in the host app it is registered globally). We mirror that
// here so the boolean-select demo resolves the component.
import ArcanaSelect from "../../../src/vue/components/ArcanaSelect.vue";

/**
 * A tiny stand-in for Element Plus's `<el-tooltip>` — ArcanaTabs references it in
 * its template (only active when `tooltipPlacement` is set). We are not shipping
 * Element Plus into the docs, so we register a transparent stub that simply
 * renders its default slot. That keeps the tabs demo warning-free.
 */
const ElTooltipStub = defineComponent({
  name: "el-tooltip",
  setup(_props, { slots }) {
    return () => slots.default?.();
  }
});

/**
 * A stand-in for Element Plus's `<el-date-picker>`. ArcanaDatePicker's composite
 * `type="date"` mode layers an invisible `<el-date-picker>` behind a masked text
 * input purely to host the calendar popover — the visible, interactive part is the
 * masked input, which works on its own. We are not shipping Element Plus into the
 * docs, so we register a transparent stub (renders nothing) to keep the date-picker
 * demo warning-free; the masked field remains fully live.
 */
const ElDatePickerStub = defineComponent({
  name: "el-date-picker",
  props: { modelValue: {}, type: {}, disabled: {}, clearable: {}, editable: {}, placeholder: {}, format: {}, valueFormat: {} },
  emits: ["update:modelValue", "change"],
  setup() {
    return () => null;
  }
});

/**
 * A stand-in for the host app's `<FormGroup>` — a labelled field wrapper.
 * `ArcanaSettingsEditableField` renders `<FormGroup md="12" :label="…">` inside its
 * teleported edit modal by GLOBAL name (the SFC does not import it locally). We are not
 * shipping the host's form kit into the docs, so we register a small transparent wrapper
 * that renders the label above its default slot — enough to make the editable-field demo
 * (and its modal) resolve and look right.
 */
const FormGroupStub = defineComponent({
  name: "FormGroup",
  props: { label: { type: String, default: "" }, md: { default: "12" } },
  setup(props, { slots }) {
    return () =>
      h("div", { class: "demo-form-group" }, [
        props.label ? h("label", { class: "demo-form-group__label" }, props.label) : null,
        slots.default?.()
      ]);
  }
});

/**
 * Mounts a REAL Vue component inside the React docs.
 *
 * The `component` is a Vue component definition (typically a small `{ template,
 * components, setup }` object authored in `componentDocs.tsx`). On mount we spin
 * up a dedicated Vue app rooted at a `<div>`, register the shared plugins, and
 * unmount it on cleanup — so each preview is an isolated, genuinely-running Vue
 * instance. The library's component styles are the shared, framework-agnostic
 * stylesheet (`src/styles/components.scss`), imported once in `docs/src/main.tsx`.
 */
export function VueDemo({ component, className }: { component: VueComponent; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  // Demo "chrome" strings (status lines, notes, affordance labels) live in the
  // i18n dictionaries under `demos`; templates read them via the global `$dt`.
  const { msg } = useLang();
  const demoStrings = msg.demos;

  useEffect(() => {
    if (!hostRef.current) return;
    const app = createApp(component);
    app.config.globalProperties.$dt = demoStrings;
    app.use(Maska);
    app.component("el-tooltip", ElTooltipStub);
    app.component("el-date-picker", ElDatePickerStub);
    app.component("ArcanaSelect", ArcanaSelect);
    app.component("FormGroup", FormGroupStub);
    app.mount(hostRef.current);
    return () => app.unmount();
  }, [component, demoStrings]);

  return <div ref={hostRef} className={className ? `vue-demo ${className}` : "vue-demo"} />;
}
