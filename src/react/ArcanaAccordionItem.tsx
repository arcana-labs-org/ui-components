import { useContext, useLayoutEffect, useRef, type ReactNode } from "react";
import { animateCollapse, applyCollapsedState } from "../core/collapse";
import { AccordionContext } from "./ArcanaAccordion";

/**
 * `<ArcanaAccordionItem>` — React port. Reproduz o item (`arcana-accordion-item` +
 * `open`/`disabled`, `arcana-accordion-trigger`, `arcana-accordion-title`,
 * `arcana-accordion-chevron`, `arcana-accordion-content`), idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `inject('accordionApi')` → `useContext(AccordionContext)`
 * - slots default/`#title` → `children` / prop `title`
 * - `watch` + `$refs` da animação → `useLayoutEffect` + `useRef`
 *
 * Props:
 * - `name` (obrigatório), `title`, `disabled`
 * - `animated` — opcional. Quando **não** informada, herda o `animated` do
 *   `<ArcanaAccordion>` (default `false`); quando informada, tem **precedência**
 *   sobre a do container. `true` = slide de altura (0 → altura real medida) + fade (~200ms).
 *
 * A animação é imperativa (`core/collapse.ts`), porque `height: auto` não anima: o
 * conteúdo é medido e a altura em px é escrita inline; a transição está no CSS
 * (`.arcana-accordion-content--animated`). Com `prefers-reduced-motion: reduce` a
 * animação é ignorada e o estado final é aplicado direto.
 */
export interface ArcanaAccordionItemProps {
    name: string;
    title?: ReactNode;
    disabled?: boolean;
    /** `undefined` = herda do `<ArcanaAccordion>`; informado = tem precedência. */
    animated?: boolean;
    className?: string;
    children?: ReactNode;
}

export function ArcanaAccordionItem({
    name,
    title = "",
    disabled = false,
    animated,
    className,
    children,
}: ArcanaAccordionItemProps) {
    const api = useContext(AccordionContext);
    if (!api) {
        throw new Error("ArcanaAccordionItem must be used within a ArcanaAccordion");
    }

    const open = api.isOpen(name);
    const isAnimated = animated ?? api.animated;

    const contentRef = useRef<HTMLDivElement>(null);
    const prevOpen = useRef(open);
    const initialized = useRef(false);

    // `useLayoutEffect`: o estado inicial (fechado ⇒ `display: none`) é aplicado antes
    // do paint, sem flash de conteúdo aberto.
    useLayoutEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        if (!isAnimated) {
            initialized.current = false;
            prevOpen.current = open;
            return;
        }
        if (!initialized.current) {
            initialized.current = true;
            prevOpen.current = open;
            applyCollapsedState(el, open);
            return;
        }
        if (prevOpen.current === open) return;
        prevOpen.current = open;
        // O cleanup finaliza a transição (re-toggle no meio do caminho / unmount).
        return animateCollapse(el, open);
    }, [open, isAnimated]);

    const rootClasses = [
        "arcana-accordion-item",
        open ? "open" : "",
        disabled ? "disabled" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const contentClasses = [
        "arcana-accordion-content",
        isAnimated ? "arcana-accordion-content--animated" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={rootClasses}>
            <button
                type="button"
                className="arcana-accordion-trigger"
                disabled={disabled}
                onClick={() => {
                    if (disabled) return;
                    api.toggle(name);
                }}
            >
                <span className="arcana-accordion-title">{title}</span>
                <i className="fa-solid fa-chevron-down arcana-accordion-chevron" />
            </button>
            {/*
                Modo estático: Vue usa `v-show` — o content fica montado e alterna via
                `display` (preserva estado). Modo animado: `style` fica `undefined` de
                propósito; quem escreve `display`/`height`/`opacity` é o `core/collapse`.
            */}
            <div
                ref={contentRef}
                className={contentClasses}
                style={isAnimated || open ? undefined : { display: "none" }}
            >
                {children}
            </div>
        </div>
    );
}
