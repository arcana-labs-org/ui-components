/**
 * Shared expand/collapse animation used by `<ArcanaAccordion animated>` (and the
 * React/Angular/Svelte ports).
 *
 * `height: auto` is not animatable, so the transition is driven imperatively:
 * the element is measured (`offsetHeight`, a border-box measure) and then
 * animated between `0px` and the measured pixel height while `opacity` fades.
 * The transition itself lives in CSS (`.arcana-accordion-content--animated`) —
 * this module only writes the inline `height`/`opacity`/`overflow`/`display`
 * values and cleans them up when the transition settles, so the content goes
 * back to `height: auto` and reflows naturally afterwards.
 *
 * Keeping the math here guarantees the four adapters animate identically.
 *
 * Accessibility: when the user asks for reduced motion
 * (`prefers-reduced-motion: reduce`) the animation is skipped entirely and the
 * final state is applied synchronously — same policy as `ArcanaSkeleton`.
 */

/** Duration of the expand/collapse transition. Must match `components.scss`. */
export const COLLAPSE_DURATION_MS = 200;

/** Transitions running per element, so a re-toggle mid-flight settles the old one first. */
const RUNNING = new WeakMap<HTMLElement, () => void>();

/** `true` when the OS/browser asks for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * Applies the resting state without animating (initial mount, reduced motion,
 * or when `animated` is turned off): visible, or `display: none`, with no
 * leftover inline height/opacity.
 */
export function applyCollapsedState(el: HTMLElement, open: boolean): void {
  RUNNING.get(el)?.();
  el.style.height = "";
  el.style.opacity = "";
  el.style.overflow = "";
  el.style.display = open ? "" : "none";
}

/**
 * Animates `el` open or closed and returns a `settle()` that finishes the
 * transition immediately (used as the cleanup hook on unmount / re-toggle).
 *
 * `onDone` fires once, after the resting state has been applied.
 */
export function animateCollapse(el: HTMLElement, open: boolean, onDone?: () => void): () => void {
  // Uma transição pendente é finalizada antes de medir — senão a medição pegaria
  // uma altura intermediária da animação anterior.
  RUNNING.get(el)?.();

  if (typeof window === "undefined" || prefersReducedMotion()) {
    applyCollapsedState(el, open);
    onDone?.();
    return () => {};
  }

  let finished = false;
  let timer = 0;

  const settle = () => {
    if (finished) return;
    finished = true;
    window.clearTimeout(timer);
    el.removeEventListener("transitionend", onTransitionEnd);
    RUNNING.delete(el);
    applyCollapsedState(el, open);
    onDone?.();
  };

  const onTransitionEnd = (event: Event) => {
    const transition = event as TransitionEvent;
    if (transition.target !== el || transition.propertyName !== "height") return;
    settle();
  };

  el.style.display = "";
  el.style.overflow = "hidden";

  let from: string;
  let to: string;
  if (open) {
    // Mede a altura real do conteúdo: `auto` + `offsetHeight` (inclui padding/borda,
    // que é exatamente o que a classe animada usa via `box-sizing: border-box`).
    el.style.height = "auto";
    el.style.opacity = "";
    from = "0px";
    to = `${el.offsetHeight}px`;
  } else {
    from = `${el.offsetHeight}px`;
    to = "0px";
  }

  el.style.height = from;
  el.style.opacity = open ? "0" : "1";
  // Leitura forçada: garante que o browser registre `from` antes de aplicar `to`.
  void el.offsetHeight;
  el.style.height = to;
  el.style.opacity = open ? "1" : "0";

  el.addEventListener("transitionend", onTransitionEnd);
  // Fallback: ambientes sem transições reais (jsdom/happy-dom, transição suprimida
  // por CSS do consumidor) nunca disparam `transitionend`.
  timer = window.setTimeout(settle, COLLAPSE_DURATION_MS + 50);
  RUNNING.set(el, settle);

  return settle;
}
