import {
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { placeHoverCard, resolveHoverCardPlacement } from "../core/hover-card";
import type { HoverCardAlign, HoverCardPlacement, HoverCardSide } from "../core/hover-card";

/**
 * `<ArcanaTooltip>` — React port. Balão de texto curto que abre ao passar o mouse
 * pelo gatilho (e ao focá-lo pelo teclado). Versão enxuta e opinativa do
 * `<ArcanaHoverCard>`: conteúdo textual, balão escuro com setinha, e nunca
 * interativo. Reproduz o MESMO markup do SFC Vue:
 * `<span class="arcana-tooltip"><span class="arcana-tooltip__trigger">` +
 * o `.arcana-tooltip__panel` em portal no `<body>` (`--{side}` efetivo).
 *
 * Posicionamento por `placeHoverCard` (`core/hover-card`), com flip automático
 * quando não cabe do lado pedido. O balão tem `pointer-events: none` (no CSS) —
 * nunca é alvo do mouse, então não precisa de handlers próprios.
 *
 * Equivalências Vue → React:
 * - slot `trigger` → prop `trigger`; slot default → `children` (vence `label`)
 * - `<Teleport to="body">` → `createPortal(..., document.body)`
 * - `emit('open-change')` → `onOpenChange`
 *
 * Acessibilidade: o gatilho recebe `aria-describedby` apontando pro balão
 * enquanto aberto e o balão é `role="tooltip"`. `Escape` fecha. Ponha um elemento
 * naturalmente focável (botão/link) no `trigger` pra que a abertura por teclado
 * funcione.
 */
export interface ArcanaTooltipProps {
    /** Texto do tooltip. Use `children` pra conteúdo custom (ele vence). */
    label?: string;
    /** O conteúdo do balão (slot default do Vue). Sobrepõe `label` quando presente. */
    children?: ReactNode;
    /** O gatilho (slot `trigger` do Vue). */
    trigger: ReactNode;
    side?: HoverCardSide;
    align?: HoverCardAlign;
    /** Atalho `"{side}-{align}"` (ex: `"top-start"`); vence `side`/`align`. */
    placement?: HoverCardPlacement;
    /** Distância entre gatilho e balão em px. Default `6`. */
    offset?: number;
    /** ms até abrir depois do `mouseenter` (o foco por teclado abre na hora). Default `200`. */
    openDelay?: number;
    /** ms de carência antes de fechar (default `0`). */
    closeDelay?: number;
    /** Mostra a setinha apontando pro gatilho. Default `true`. */
    arrow?: boolean;
    disabled?: boolean;
    /**
     * Classe extra no balão. Como ele é renderizado em portal no `<body>`, um
     * seletor no wrapper não o alcança — é assim que se tematiza uma instância.
     */
    panelClass?: string;
    onOpenChange?: (open: boolean) => void;
}

/** Tamanho presumido antes da 1ª medição (evita flip errado no 1º frame). */
const PANEL_ESTIMATE = { width: 160, height: 32 };
/** Folga mínima entre a seta e o canto do balão. */
const ARROW_EDGE = 10;

const clampArrow = (value: number, size: number): number =>
    Math.max(ARROW_EDGE, Math.min(value, size - ARROW_EDGE));

export function ArcanaTooltip({
    label = "",
    children,
    trigger,
    side = "top",
    align = "center",
    placement,
    offset = 6,
    openDelay = 200,
    closeDelay = 0,
    arrow = true,
    disabled = false,
    panelClass,
    onOpenChange,
}: ArcanaTooltipProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
    const [resolvedSide, setResolvedSide] = useState<HoverCardSide>("top");

    const triggerRef = useRef<HTMLSpanElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const panelId = `arcana-tooltip-${useId()}`;

    const emitOpenChange = useRef(onOpenChange);
    emitOpenChange.current = onOpenChange;

    /* ─────────────────────────── posicionamento ────────────────────────────── */

    const reposition = useCallback(() => {
        const triggerEl = triggerRef.current;
        if (!triggerEl) return;
        const panelEl = panelRef.current;

        const rect = triggerEl.getBoundingClientRect();
        const panelWidth = panelEl?.offsetWidth || PANEL_ESTIMATE.width;
        const panelHeight = panelEl?.offsetHeight || PANEL_ESTIMATE.height;

        const parts = resolveHoverCardPlacement(placement, side, align);
        const place = placeHoverCard(
            rect,
            { width: panelWidth, height: panelHeight },
            { width: window.innerWidth, height: window.innerHeight },
            { ...parts, gap: offset },
        );

        // Posição da seta ao longo da borda do balão, apontando pro centro do
        // gatilho. Nos lados verticais (top/bottom) é um X; nos horizontais, um Y.
        const vertical = place.side === "top" || place.side === "bottom";
        const arrowOffset = vertical
            ? clampArrow(rect.left + rect.width / 2 - place.left, panelWidth)
            : clampArrow(rect.top + rect.height / 2 - place.top, panelHeight);

        setResolvedSide(place.side);
        setPanelStyle({
            position: "fixed",
            left: `${place.left}px`,
            top: `${place.top}px`,
            "--arcana-tooltip-arrow-offset": `${arrowOffset}px`,
        } as CSSProperties);
    }, [placement, side, align, offset]);

    /* ─────────────────────── abertura / fechamento ─────────────────────────── */

    const clearOpenTimer = () => {
        if (!openTimer.current) return;
        clearTimeout(openTimer.current);
        openTimer.current = undefined;
    };

    const cancelClose = useCallback(() => {
        if (!closeTimer.current) return;
        clearTimeout(closeTimer.current);
        closeTimer.current = undefined;
    }, []);

    const open = useCallback(() => {
        setIsOpen((prev) => {
            if (prev) return prev;
            emitOpenChange.current?.(true);
            return true;
        });
    }, []);

    const close = useCallback(() => {
        clearOpenTimer();
        cancelClose();
        setIsOpen((prev) => {
            if (!prev) return prev;
            emitOpenChange.current?.(false);
            return false;
        });
    }, [cancelClose]);

    const scheduleOpen = useCallback(
        (delay: number) => {
            cancelClose();
            if (disabled) return;
            clearOpenTimer();
            if (delay <= 0) {
                open();
                return;
            }
            openTimer.current = setTimeout(() => {
                openTimer.current = undefined;
                open();
            }, delay);
        },
        [cancelClose, disabled, open],
    );

    const scheduleClose = useCallback(() => {
        clearOpenTimer();
        if (closeDelay <= 0) {
            close();
            return;
        }
        if (closeTimer.current) return;
        closeTimer.current = setTimeout(() => {
            closeTimer.current = undefined;
            close();
        }, closeDelay);
    }, [close, closeDelay]);

    // `disabled` ligado no meio do caminho fecha o que estiver aberto.
    useEffect(() => {
        if (disabled) close();
    }, [disabled, close]);

    // Limpa timers pendentes no unmount (evita setState em componente desmontado).
    useEffect(
        () => () => {
            clearOpenTimer();
            if (closeTimer.current) clearTimeout(closeTimer.current);
        },
        [],
    );

    /* ─────────────────────────── listeners globais ─────────────────────────── */

    // Mede DEPOIS que o painel entrou no DOM, antes do paint (sem flicker).
    useLayoutEffect(() => {
        if (!isOpen) return;
        reposition();
    }, [isOpen, reposition]);

    useEffect(() => {
        if (!isOpen) return;

        const onKeydown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };
        const onScroll = () => reposition();
        const onResize = () => reposition();

        document.addEventListener("keydown", onKeydown);
        window.addEventListener("scroll", onScroll, true);
        window.addEventListener("resize", onResize);
        return () => {
            document.removeEventListener("keydown", onKeydown);
            window.removeEventListener("scroll", onScroll, true);
            window.removeEventListener("resize", onResize);
        };
    }, [isOpen, close, reposition]);

    /* ─────────────────────────────── render ────────────────────────────────── */

    return (
        <span
            className={[
                "arcana-tooltip",
                isOpen ? "is-open" : "",
                disabled ? "is-disabled" : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <span
                ref={triggerRef}
                className="arcana-tooltip__trigger"
                aria-describedby={isOpen ? panelId : undefined}
                onMouseEnter={() => scheduleOpen(openDelay)}
                onMouseLeave={() => scheduleClose()}
                // Teclado não tem "trajeto do mouse": abrir com atraso só atrapalharia.
                onFocus={() => scheduleOpen(0)}
                onBlur={() => scheduleClose()}
            >
                {trigger}
            </span>

            {/*
                Balão em portal no <body> (position: fixed via `placeHoverCard`) pra
                escapar de qualquer ancestral com overflow:hidden / z-index restritivo.
                `pointer-events: none` (no CSS) — nunca é alvo do mouse.
            */}
            {isOpen
                ? createPortal(
                      <div
                          id={panelId}
                          ref={panelRef}
                          className={[
                              "arcana-tooltip__panel",
                              `arcana-tooltip__panel--${resolvedSide}`,
                              panelClass,
                          ]
                              .filter(Boolean)
                              .join(" ")}
                          style={panelStyle}
                          role="tooltip"
                      >
                          {children ?? label}
                          {arrow ? <span className="arcana-tooltip__arrow" aria-hidden="true" /> : null}
                      </div>,
                      document.body,
                  )
                : null}
        </span>
    );
}
