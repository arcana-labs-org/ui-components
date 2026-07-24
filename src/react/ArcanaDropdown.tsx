import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
    type MouseEvent as ReactMouseEvent,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/**
 * `<ArcanaDropdown>` + `<ArcanaDropdownItem>` — React port dos SFCs Vue. Dropdown menu
 * arcana-style (palette zinc) que substitui `<el-dropdown>`.
 *
 * Equivalências Vue → React:
 * - `<Teleport to="body">` → `createPortal(..., document.body)`
 * - `provide('shadcnDropdownSize')` + `inject` → React Context (`DropdownContext`).
 *   Context propaga através do portal (parent-child React), igual ao provide/inject Vue
 *   que atravessa Teleport.
 * - CustomEvent `arcana-dropdown-close` (bubble) → `close()` chamado direto via Context
 *   quando o item tem `closeOnClick`.
 * - slot `#trigger` (scope `{ open, toggle }`) → prop `trigger` (ReactNode OU render prop)
 * - slot default (scope `{ close }`) → `children` (ReactNode OU render prop)
 * - `emit('open'|'close')` → `onOpen` / `onClose`
 *
 * Posicionamento via `getBoundingClientRect` + flip/shift replica o SFC. A transição
 * fade+slide é omitida (mesma decisão dos outros ports com Transition).
 */

export type ArcanaDropdownPlacement =
    | "bottom-end"
    | "bottom-start"
    | "top-end"
    | "top-start";

export type ArcanaDropdownSize = "default" | "comfortable";

interface DropdownContextValue {
    size: ArcanaDropdownSize;
    close: () => void;
}

const DropdownContext = createContext<DropdownContextValue>({
    size: "default",
    close: () => {},
});

export interface ArcanaDropdownProps {
    placement?: ArcanaDropdownPlacement;
    offset?: number;
    disabled?: boolean;
    size?: ArcanaDropdownSize;
    trigger?:
        | ReactNode
        | ((ctx: { open: boolean; toggle: () => void }) => ReactNode);
    children?: ReactNode | ((ctx: { close: () => void }) => ReactNode);
    onOpen?: () => void;
    onClose?: () => void;
}

export function ArcanaDropdown({
    placement = "bottom-end",
    offset = 4,
    disabled = false,
    size = "default",
    trigger,
    children,
    onOpen,
    onClose,
}: ArcanaDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
    const containerRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const positionMenu = useCallback(() => {
        const container = containerRef.current;
        const menu = menuRef.current;
        if (!container || !menu) return;

        const triggerRect = container.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const margin = 8;

        const wantsTop = placement.startsWith("top");
        const wantsEnd = placement.endsWith("end");

        let top: number;
        if (wantsTop) {
            top = triggerRect.top - menuRect.height - offset;
            if (top < margin) top = triggerRect.bottom + offset;
        } else {
            top = triggerRect.bottom + offset;
            if (top + menuRect.height > vh - margin) {
                top = triggerRect.top - menuRect.height - offset;
            }
        }

        let left = wantsEnd
            ? triggerRect.right - menuRect.width
            : triggerRect.left;
        if (left < margin) left = margin;
        if (left + menuRect.width > vw - margin) left = vw - menuRect.width - margin;

        setMenuStyle({ position: "fixed", top: `${top}px`, left: `${left}px` });
    }, [placement, offset]);

    const close = useCallback(() => {
        setIsOpen((wasOpen) => {
            if (!wasOpen) return wasOpen;
            onClose?.();
            return false;
        });
    }, [onClose]);

    const toggle = useCallback(() => {
        if (disabled) return;
        setIsOpen((wasOpen) => {
            if (wasOpen) {
                onClose?.();
                return false;
            }
            onOpen?.();
            return true;
        });
    }, [disabled, onOpen, onClose]);

    // Posiciona o menu logo após abrir (antes do paint) e reage a resize/scroll.
    useLayoutEffect(() => {
        if (!isOpen) return;
        positionMenu();
    }, [isOpen, positionMenu]);

    useEffect(() => {
        if (!isOpen) return;

        const handleOutsideClick = (e: MouseEvent) => {
            const container = containerRef.current;
            const menu = menuRef.current;
            const target = e.target as Node;
            if (container?.contains(target)) return;
            if (menu?.contains(target)) return;
            close();
        };
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.stopPropagation();
                close();
            }
        };

        document.addEventListener("click", handleOutsideClick, true);
        document.addEventListener("keydown", handleKeydown);
        window.addEventListener("resize", positionMenu);
        window.addEventListener("scroll", positionMenu, true);
        return () => {
            document.removeEventListener("click", handleOutsideClick, true);
            document.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("resize", positionMenu);
            window.removeEventListener("scroll", positionMenu, true);
        };
    }, [isOpen, close, positionMenu]);

    const menuClasses = ["arcana-dropdown__menu"];
    if (size === "comfortable") menuClasses.push("arcana-dropdown__menu--comfortable");

    return (
        <div className="arcana-dropdown" ref={containerRef}>
            <span
                className="arcana-dropdown__trigger"
                onClick={(e) => {
                    e.stopPropagation();
                    toggle();
                }}
            >
                {typeof trigger === "function"
                    ? trigger({ open: isOpen, toggle })
                    : trigger}
            </span>

            {isOpen &&
                createPortal(
                    <DropdownContext.Provider value={{ size, close }}>
                        <div
                            className={menuClasses.join(" ")}
                            style={menuStyle}
                            ref={menuRef}
                            role="menu"
                        >
                            {typeof children === "function"
                                ? children({ close })
                                : children}
                        </div>
                    </DropdownContext.Provider>,
                    document.body
                )}
        </div>
    );
}

export interface ArcanaDropdownItemProps {
    icon?: string;
    iconColor?: string;
    variant?: "default" | "danger" | "success" | "warning";
    disabled?: boolean;
    divided?: boolean;
    closeOnClick?: boolean;
    size?: ArcanaDropdownSize | null;
    suffix?: ReactNode;
    children?: ReactNode;
    onClick?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
}

export function ArcanaDropdownItem({
    icon,
    iconColor = "",
    variant = "default",
    disabled = false,
    divided = false,
    closeOnClick = true,
    size = null,
    suffix,
    children,
    onClick,
}: ArcanaDropdownItemProps) {
    const ctx = useContext(DropdownContext);
    const effectiveSize = size ?? ctx.size;

    const classes = ["arcana-dropdown-item"];
    if (variant) classes.push(`arcana-dropdown-item--${variant}`);
    if (effectiveSize === "comfortable") classes.push("arcana-dropdown-item--comfortable");
    if (disabled) classes.push("is-disabled");

    const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        onClick?.(e);
        if (closeOnClick) ctx.close();
    };

    return (
        <>
            {divided && <div className="arcana-dropdown-item__separator" />}
            <button
                type="button"
                className={classes.join(" ")}
                disabled={disabled}
                role="menuitem"
                onClick={handleClick}
            >
                {icon && (
                    <i
                        className={`arcana-dropdown-item__icon ${icon}`}
                        style={iconColor ? { color: iconColor } : undefined}
                        aria-hidden="true"
                    />
                )}
                <span className="arcana-dropdown-item__label">{children}</span>
                {suffix != null && (
                    <span className="arcana-dropdown-item__suffix">{suffix}</span>
                )}
            </button>
        </>
    );
}
