import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
    type KeyboardEvent as ReactKeyboardEvent,
    type MouseEvent as ReactMouseEvent,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
    CONTEXT_MENU_PANEL_ESTIMATE,
    handleContextMenuKey,
    placeAtPointer,
    registerOpenContextMenu,
    unregisterOpenContextMenu,
    type ArcanaContextMenuItemSpec,
    type ArcanaContextMenuVariant,
} from "../core/context-menu";

/**
 * `<ArcanaContextMenu>` + `<ArcanaContextMenuItem>` — React port dos SFCs Vue.
 * Menu de contexto (botão direito): um `ArcanaDropdown` cujo gatilho é o evento
 * `contextmenu` e cuja âncora são as COORDENADAS DO CURSOR (via `placeAtPointer`,
 * que delega o flip/shift ao `placePanel`).
 *
 * Equivalências Vue → React (mesmas do ArcanaDropdown):
 * - `<Teleport to="body">` → `createPortal(..., document.body)`
 * - `provide`/`inject` → React Context (`ContextMenuContext`), que atravessa o portal
 * - slot `#trigger` → prop `trigger`; slot default → `children`
 * - `emit('open'|'close'|'select')` → `onOpen` / `onClose` / `onSelect`
 */

interface ContextMenuContextValue {
    close: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue>({ close: () => {} });

export interface ArcanaContextMenuProps {
    /** Não abre o menu — deixa o menu nativo do navegador aparecer. */
    disabled?: boolean;
    /** Classe extra no painel em portal (usada pra tematizar portais, como no TreeSelect). */
    panelClass?: string;
    /** Rótulo acessível do `role="menu"`. */
    ariaLabel?: string;
    /** Modo data-driven — ignorado quando há `children`. */
    items?: ArcanaContextMenuItemSpec[];
    /** Área que responde ao clique direito. */
    trigger?: ReactNode | ((ctx: { open: boolean; close: () => void }) => ReactNode);
    /** Itens do menu. */
    children?: ReactNode | ((ctx: { close: () => void }) => ReactNode);
    onOpen?: () => void;
    onClose?: () => void;
    /** Só no modo `items`. */
    onSelect?: (item: ArcanaContextMenuItemSpec, index: number) => void;
}

export function ArcanaContextMenu({
    disabled = false,
    panelClass,
    ariaLabel,
    items,
    trigger,
    children,
    onOpen,
    onClose,
    onSelect,
}: ArcanaContextMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    // Nasce fora da tela: o painel precisa existir pra ser medido e não deve
    // piscar no canto antes do posicionamento real.
    const [panelStyle, setPanelStyle] = useState<CSSProperties>({
        position: "fixed",
        left: "-9999px",
        top: "-9999px",
    });
    const rootRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const pointRef = useRef({ x: 0, y: 0 });

    const close = useCallback(() => {
        setIsOpen((wasOpen) => {
            if (!wasOpen) return wasOpen;
            onClose?.();
            return false;
        });
    }, [onClose]);

    const closeAndRestoreFocus = useCallback(() => {
        close();
        rootRef.current?.focus();
    }, [close]);

    const position = useCallback(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const place = placeAtPointer(
            pointRef.current,
            {
                width: panel.offsetWidth || CONTEXT_MENU_PANEL_ESTIMATE.width,
                height: panel.offsetHeight || CONTEXT_MENU_PANEL_ESTIMATE.height,
            },
            { width: window.innerWidth, height: window.innerHeight }
        );
        setPanelStyle({ position: "fixed", left: `${place.left}px`, top: `${place.top}px` });
    }, []);

    const onContextMenu = (event: ReactMouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        // Menus aninhados: só o gatilho mais interno responde.
        event.preventDefault();
        event.stopPropagation();
        pointRef.current = { x: event.clientX, y: event.clientY };
        setIsOpen((wasOpen) => {
            if (!wasOpen) onOpen?.();
            return true;
        });
        // Já aberto (novo botão direito na mesma área): só reposiciona.
        if (panelRef.current) position();
    };

    // Posiciona antes do paint e joga o foco no painel (o teclado passa a valer).
    useLayoutEffect(() => {
        if (!isOpen) return;
        position();
        panelRef.current?.focus();
    }, [isOpen, position]);

    useEffect(() => {
        if (!isOpen) return;

        registerOpenContextMenu(close);

        const onOutsidePointerDown = (event: MouseEvent) => {
            const target = event.target as Node;
            if (rootRef.current?.contains(target)) return;
            if (panelRef.current?.contains(target)) return;
            close();
        };
        const onDocumentKeydown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            event.stopPropagation();
            closeAndRestoreFocus();
        };
        const onScroll = (event: Event) => {
            const panel = panelRef.current;
            if (panel && event.target instanceof Node && panel.contains(event.target)) return;
            close();
        };

        document.addEventListener("mousedown", onOutsidePointerDown, true);
        document.addEventListener("keydown", onDocumentKeydown, true);
        window.addEventListener("resize", close);
        window.addEventListener("scroll", onScroll, true);
        return () => {
            unregisterOpenContextMenu(close);
            document.removeEventListener("mousedown", onOutsidePointerDown, true);
            document.removeEventListener("keydown", onDocumentKeydown, true);
            window.removeEventListener("resize", close);
            window.removeEventListener("scroll", onScroll, true);
        };
    }, [isOpen, close, closeAndRestoreFocus]);

    const onPanelKeydown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        const result = handleContextMenuKey(event.nativeEvent, panelRef.current);
        if (result === "close") {
            event.preventDefault();
            event.stopPropagation();
            closeAndRestoreFocus();
        }
    };

    const content =
        children != null
            ? typeof children === "function"
                ? children({ close })
                : children
            : (items ?? []).map((item, index) => (
                  <ArcanaContextMenuItem
                      key={index}
                      icon={item.icon}
                      suffix={item.suffix}
                      variant={item.variant ?? "default"}
                      disabled={item.disabled === true}
                      divided={item.divided === true}
                      closeOnClick={item.closeOnClick !== false}
                      onSelect={() => onSelect?.(item, index)}
                  >
                      {item.label}
                  </ArcanaContextMenuItem>
              ));

    return (
        <div
            className="arcana-context-menu"
            ref={rootRef}
            tabIndex={-1}
            onContextMenu={onContextMenu}
        >
            {typeof trigger === "function" ? trigger({ open: isOpen, close }) : trigger}

            {isOpen &&
                createPortal(
                    <ContextMenuContext.Provider value={{ close }}>
                        <div
                            ref={panelRef}
                            className={["arcana-context-menu__panel", panelClass]
                                .filter(Boolean)
                                .join(" ")}
                            style={panelStyle}
                            role="menu"
                            aria-label={ariaLabel}
                            tabIndex={-1}
                            onKeyDown={onPanelKeydown}
                            onContextMenu={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                            }}
                        >
                            {content}
                        </div>
                    </ContextMenuContext.Provider>,
                    document.body
                )}
        </div>
    );
}

export interface ArcanaContextMenuItemProps {
    icon?: string;
    /** Atalho exibido à direita (ex: "⌘C"). */
    suffix?: ReactNode;
    variant?: ArcanaContextMenuVariant;
    disabled?: boolean;
    /** Separador acima deste item. */
    divided?: boolean;
    closeOnClick?: boolean;
    children?: ReactNode;
    onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    /** Ativação semântica — também dispara pelo Enter/Espaço. */
    onSelect?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
}

export function ArcanaContextMenuItem({
    icon,
    suffix,
    variant = "default",
    disabled = false,
    divided = false,
    closeOnClick = true,
    children,
    onClick,
    onSelect,
}: ArcanaContextMenuItemProps) {
    const ctx = useContext(ContextMenuContext);

    const classes = ["arcana-context-menu-item"];
    if (variant) classes.push(`arcana-context-menu-item--${variant}`);
    if (disabled) classes.push("is-disabled");

    const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        onClick?.(event);
        onSelect?.(event);
        if (closeOnClick) ctx.close();
    };

    return (
        <>
            {divided && <div className="arcana-context-menu-item__separator" />}
            <button
                type="button"
                className={classes.join(" ")}
                disabled={disabled}
                role="menuitem"
                tabIndex={-1}
                onClick={handleClick}
            >
                {icon && <i className={`arcana-context-menu-item__icon ${icon}`} aria-hidden="true" />}
                <span className="arcana-context-menu-item__label">{children}</span>
                {suffix != null && suffix !== "" && (
                    <span className="arcana-context-menu-item__suffix">{suffix}</span>
                )}
            </button>
        </>
    );
}
