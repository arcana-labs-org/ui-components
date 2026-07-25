import {
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
    type FocusEvent as ReactFocusEvent,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { placeHoverCard, resolveHoverCardPlacement } from "../core/hover-card";
import type { HoverCardAlign, HoverCardPlacement, HoverCardSide } from "../core/hover-card";

/**
 * `<ArcanaHoverCard>` — React port. Cartão de preview que abre ao passar o mouse
 * pelo gatilho (e ao focá-lo pelo teclado). Reproduz o MESMO markup do SFC Vue:
 * `<span class="arcana-hover-card"><span class="arcana-hover-card__trigger">` +
 * o `.arcana-hover-card__panel` em portal no `<body>` (`--{side}` efetivo).
 *
 * Posicionamento por `placeHoverCard` (`core/hover-card`, que estende o
 * `placePanel` usado por Select/TreeSelect), com flip automático quando não cabe
 * do lado pedido.
 *
 * Equivalências Vue → React:
 * - slot `trigger` → prop `trigger`; slot default → `children`
 * - `<Teleport to="body">` → `createPortal(..., document.body)`
 * - `emit('open-change')` → `onOpenChange`
 *
 * Acessibilidade: o gatilho recebe `aria-describedby` apontando pro cartão
 * enquanto ele está aberto e o cartão é `role="tooltip"` — NÃO recebe foco (é
 * hover, não popover modal). `Escape` fecha. Ponha um elemento naturalmente
 * focável (link/botão) no `trigger` pra que a abertura por teclado funcione.
 */
export interface ArcanaHoverCardProps {
    /** ms até abrir depois do `mouseenter` (o foco por teclado abre na hora). Default `300`. */
    openDelay?: number;
    /**
     * ms de **carência** antes de fechar (default `150`). É essa carência que
     * permite ir do gatilho ATÉ o cartão sem ele fechar: o `mouseenter` do painel
     * cancela o timer agendado pelo `mouseleave` do gatilho.
     */
    closeDelay?: number;
    side?: HoverCardSide;
    align?: HoverCardAlign;
    /** Atalho `"{side}-{align}"` (ex: `"bottom-start"`); vence `side`/`align`. */
    placement?: HoverCardPlacement;
    /** Distância entre gatilho e cartão em px. Default `8`. */
    offset?: number;
    disabled?: boolean;
    /**
     * Classe extra no cartão. Como ele é renderizado em portal no `<body>`, um
     * seletor no wrapper não o alcança — é assim que se tematiza uma instância
     * (mesmo contrato do `panelClass` do `ArcanaTreeSelect`).
     */
    panelClass?: string;
    /** O gatilho (slot `trigger` do Vue). */
    trigger?: ReactNode;
    /** O conteúdo do cartão (slot default do Vue). */
    children?: ReactNode;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

/** Tamanho presumido antes da 1ª medição (evita flip errado no 1º frame). */
const PANEL_ESTIMATE = { width: 280, height: 120 };

export function ArcanaHoverCard({
    openDelay = 300,
    closeDelay = 150,
    side = "bottom",
    align = "center",
    placement,
    offset = 8,
    disabled = false,
    panelClass,
    trigger,
    children,
    onOpenChange,
    className,
}: ArcanaHoverCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
    const [resolvedSide, setResolvedSide] = useState<HoverCardSide>("bottom");

    const triggerRef = useRef<HTMLSpanElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const panelId = `arcana-hover-card-${useId()}`;

    const emitOpenChange = useRef(onOpenChange);
    emitOpenChange.current = onOpenChange;

    /* ─────────────────────────── posicionamento ────────────────────────────── */

    const reposition = useCallback(() => {
        const triggerEl = triggerRef.current;
        if (!triggerEl) return;
        const panelEl = panelRef.current;

        const parts = resolveHoverCardPlacement(placement, side, align);
        const place = placeHoverCard(
            triggerEl.getBoundingClientRect(),
            {
                width: panelEl?.offsetWidth || PANEL_ESTIMATE.width,
                height: panelEl?.offsetHeight || PANEL_ESTIMATE.height,
            },
            { width: window.innerWidth, height: window.innerHeight },
            { ...parts, gap: offset },
        );

        setResolvedSide(place.side);
        setPanelStyle({ position: "fixed", left: `${place.left}px`, top: `${place.top}px` });
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
        const onScroll = (event: Event) => {
            // Rolagem DENTRO do cartão não o desloca.
            if (event.target instanceof Node && panelRef.current?.contains(event.target)) return;
            reposition();
        };
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

    /* ─────────────────────────── handlers ──────────────────────────────────── */

    const onTriggerFocusOut = (event: ReactFocusEvent<HTMLSpanElement>) => {
        // Foco que caminhou PRA DENTRO do cartão (link no conteúdo) não fecha.
        const next = event.relatedTarget as Node | null;
        if (next && panelRef.current?.contains(next)) return;
        scheduleClose();
    };

    return (
        <span
            className={[
                "arcana-hover-card",
                isOpen ? "is-open" : "",
                disabled ? "is-disabled" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <span
                ref={triggerRef}
                className="arcana-hover-card__trigger"
                aria-describedby={isOpen ? panelId : undefined}
                onMouseEnter={() => scheduleOpen(openDelay)}
                onMouseLeave={() => scheduleClose()}
                // Teclado não tem "trajeto do mouse": abrir com atraso só atrapalharia.
                onFocus={() => scheduleOpen(0)}
                onBlur={onTriggerFocusOut}
            >
                {trigger}
            </span>

            {/*
                Cartão em portal no <body> (position: fixed via `placeHoverCard`) pra
                escapar de qualquer ancestral com overflow:hidden / z-index restritivo.
            */}
            {isOpen
                ? createPortal(
                      <div
                          id={panelId}
                          ref={panelRef}
                          className={[
                              "arcana-hover-card__panel",
                              `arcana-hover-card__panel--${resolvedSide}`,
                              panelClass,
                          ]
                              .filter(Boolean)
                              .join(" ")}
                          style={panelStyle}
                          role="tooltip"
                          /*
                            O ponto que costuma quebrar num hover card: ao sair do
                            gatilho rumo ao cartão, o `mouseleave` do gatilho já
                            agendou o fechamento. Este `mouseenter` (dentro da
                            carência de `closeDelay`) CANCELA esse timer.
                          */
                          onMouseEnter={cancelClose}
                          onMouseLeave={() => scheduleClose()}
                          onFocus={cancelClose}
                          onBlur={() => scheduleClose()}
                      >
                          {children}
                      </div>,
                      document.body,
                  )
                : null}
        </span>
    );
}
