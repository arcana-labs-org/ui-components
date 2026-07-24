import { useEffect, useRef } from "react";
import { createApp, defineComponent, type Component as VueComponent } from "vue";
// The maska plugin registers the global `v-maska` directive, so any demo (now or
// in a future batch) that renders ShadcnInputMask / ShadcnDatePicker just works.
import Maska from "maska";

/**
 * A tiny stand-in for Element Plus's `<el-tooltip>` — ShadcnTabs references it in
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
 * Mounts a REAL Vue component inside the React docs.
 *
 * The `component` is a Vue component definition (typically a small `{ template,
 * components, setup }` object authored in `componentDocs.tsx`). On mount we spin
 * up a dedicated Vue app rooted at a `<div>`, register the shared plugins, and
 * unmount it on cleanup — so each preview is an isolated, genuinely-running Vue
 * instance. The library's SFC styles come along automatically via the Vue plugin
 * (see `docs/vite.config.ts`), so no separate CSS import is needed here.
 */
export function VueDemo({ component, className }: { component: VueComponent; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hostRef.current) return;
    const app = createApp(component);
    app.use(Maska);
    app.component("el-tooltip", ElTooltipStub);
    app.mount(hostRef.current);
    return () => app.unmount();
  }, [component]);

  return <div ref={hostRef} className={className ? `vue-demo ${className}` : "vue-demo"} />;
}
