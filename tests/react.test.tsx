import { describe, it, expect, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { useRef, useState } from "react";
import {
    ArcanaDialog,
    type ArcanaDialogHandle,
    ArcanaDropdown,
    ArcanaDropdownItem,
    ArcanaEditFieldDialog,
    type ArcanaEditFieldDialogHandle,
    ArcanaRequiredFieldsDialog,
    type ArcanaRequiredFieldsDialogHandle,
    ArcanaActionPanel,
    ArcanaSettingsList,
    ArcanaSettingsListGroup,
    ArcanaSettingsListItem,
    ArcanaSettingsEditableField,
    ArcanaSpecSheet,
    ArcanaSpecSheetSection,
    ArcanaSpecSheetField,
    ArcanaButton,
    ArcanaBadge,
    ArcanaInput,
    ArcanaSwitch,
    ArcanaTabs,
    ArcanaCheckbox,
    ArcanaSelect,
    ArcanaTreeSelect,
    ArcanaInputBoolean,
    ArcanaNumberStepper,
    ArcanaRadioCardGroup,
    ArcanaSwitchSegmented,
    ArcanaMultiSelectPopover,
    ArcanaInputMask,
    ArcanaInputCurrency,
    ArcanaDatePicker,
    ArcanaTable,
    ArcanaSummaryTile,
    ArcanaSummaryTilesGroup,
    ArcanaLoadingOverlay,
    ArcanaAccordion,
    ArcanaAccordionItem,
} from "../src/react";

/**
 * happy-dom não roda transições CSS (`transitionend` nunca dispara), então a animação do
 * accordion só assenta pelo fallback por timeout do `core/collapse` — daí o polling.
 */
const waitForStyle = async (predicate: () => boolean, timeoutMs = 1500) => {
    const started = Date.now();
    while (!predicate()) {
        if (Date.now() - started > timeoutMs) throw new Error("waitForStyle: timeout");
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
};

// Smoke test do port React (lote 1): monta uma amostra dos componentes e garante que
// emitem as MESMAS classes shadcn do equivalente Vue (reuso do CSS compartilhado), além
// de um teste de interação por reatividade (click/toggle).
describe("@arcanalabs/ui-components — React smoke", () => {
    it("ArcanaButton renderiza com as classes shadcn e dispara onClick", () => {
        const onClick = vi.fn();
        const { container, getByText } = render(
            <ArcanaButton variant="primary" onClick={onClick}>
                Salvar
            </ArcanaButton>
        );
        const btn = container.querySelector("button")!;
        expect(btn.classList.contains("arcana-button")).toBe(true);
        expect(btn.classList.contains("arcana-button--primary")).toBe(true);
        expect(getByText("Salvar")).toBeTruthy();
        fireEvent.click(btn);
        expect(onClick).toHaveBeenCalledOnce();
    });

    it("ArcanaBadge renderiza com variant e slot (children)", () => {
        const { container, getByText } = render(
            <ArcanaBadge variant="green">Ativo</ArcanaBadge>
        );
        const span = container.querySelector("span.arcana-badge")!;
        expect(span.classList.contains("arcana-badge--green")).toBe(true);
        expect(getByText("Ativo")).toBeTruthy();
    });

    it("ArcanaInput renderiza um input controlado com a classe arcana-input", () => {
        const { container } = render(<ArcanaInput value="olá" />);
        const input = container.querySelector("input.arcana-input") as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.classList.contains("arcana-input--md")).toBe(true);
        expect(input.value).toBe("olá");
    });

    it("ArcanaInput emite onValueChange ao digitar", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ArcanaInput value="" onValueChange={onValueChange} />
        );
        const input = container.querySelector("input.arcana-input") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "abc" } });
        expect(onValueChange).toHaveBeenCalledWith("abc");
    });

    it("ArcanaSwitch renderiza role=switch e emite o novo valor ao alternar", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ArcanaSwitch value={false} onValueChange={onValueChange} />
        );
        const btn = container.querySelector("button.arcana-switch")!;
        expect(btn.getAttribute("role")).toBe("switch");
        expect(btn.getAttribute("aria-checked")).toBe("false");
        fireEvent.click(btn);
        expect(onValueChange).toHaveBeenCalledWith(true);
    });

    it("ArcanaCheckbox usa input nativo e emite ao marcar", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ArcanaCheckbox value={false} label="Aceito" onValueChange={onValueChange} />
        );
        const label = container.querySelector("label.arcana-checkbox")!;
        const input = label.querySelector("input.arcana-checkbox__input") as HTMLInputElement;
        expect(input.type).toBe("checkbox");
        fireEvent.click(input);
        expect(onValueChange).toHaveBeenCalledWith(true);
    });

    it("ArcanaTabs renderiza triggers e troca o painel ativo (controlado)", () => {
        function Harness() {
            const [tab, setTab] = useState("a");
            return (
                <ArcanaTabs
                    value={tab}
                    onValueChange={(name) => setTab(String(name))}
                    tabs={[
                        { name: "a", label: "Aba A" },
                        { name: "b", label: "Aba B" },
                    ]}
                    panels={{ a: <div>Painel A</div>, b: <div>Painel B</div> }}
                />
            );
        }
        const { container, getByText, queryByText } = render(<Harness />);
        expect(container.querySelector(".arcana-tabs__list")).toBeTruthy();
        expect(getByText("Aba A")).toBeTruthy();
        expect(getByText("Aba B")).toBeTruthy();
        expect(getByText("Painel A")).toBeTruthy();
        expect(queryByText("Painel B")).toBeNull();
        fireEvent.click(getByText("Aba B"));
        expect(getByText("Painel B")).toBeTruthy();
    });
});

// ── React lote 2 ────────────────────────────────────────────────────────────
describe("@arcanalabs/ui-components — React lote 2", () => {
    it("ArcanaSelect abre o panel teleportado e seleciona uma opção", () => {
        function Harness() {
            const [v, setV] = useState<unknown>(null);
            return (
                <ArcanaSelect
                    value={v}
                    onValueChange={setV}
                    options={[
                        { label: "Um", value: 1 },
                        { label: "Dois", value: 2 },
                    ]}
                />
            );
        }
        const { container } = render(<Harness />);
        const trigger = container.querySelector("button.arcana-select__trigger")!;
        expect(container.querySelector(".arcana-select")).toBeTruthy();
        // fechado: sem panel
        expect(document.body.querySelector(".arcana-select__panel")).toBeNull();
        fireEvent.click(trigger);
        const panel = document.body.querySelector(".arcana-select__panel")!;
        expect(panel).toBeTruthy();
        const items = panel.querySelectorAll(".arcana-select__item");
        expect(items.length).toBe(2);
        fireEvent.click(items[1]);
        // após seleção fecha e mostra o label
        expect(document.body.querySelector(".arcana-select__panel")).toBeNull();
        expect(
            container.querySelector(".arcana-select__label")!.textContent
        ).toContain("Dois");
    });

    it("ArcanaSelect triggerMode=dots mostra bolinhas e o rodapé limpa a seleção", () => {
        const onValueChange = vi.fn();
        const options = [
            { label: "Aberto", value: 1, color: "#10b981" },
            { label: "Confirmado", value: 2, color: "#6366f1" },
            { label: "Cancelado", value: 3, color: "#ef4444" },
        ];
        const { container, rerender } = render(
            <ArcanaSelect
                value={[1, 2]}
                options={options}
                multiple
                triggerMode="dots"
                icon="fa-solid fa-flag"
                placeholder="Situação"
                showFooter
                footerCountLabel="{count} selecionada(s)"
                clearLabel="Limpar"
                onValueChange={onValueChange}
            />
        );

        // Trigger: ícone + uma bolinha por selecionado, sem texto de labels.
        const trigger = container.querySelector("button.arcana-select__trigger")!;
        expect(trigger.querySelector("i.arcana-select__icon")!.className).toContain(
            "fa-flag"
        );
        expect(container.querySelector(".arcana-select__label")).toBeNull();
        const dots = container.querySelectorAll(
            ".arcana-select__dots .arcana-select__dot"
        );
        expect(dots).toHaveLength(2);
        expect((dots[0] as HTMLElement).style.background).toBe("#10b981");
        expect(dots[0].getAttribute("title")).toBe("Aberto");

        // Panel: bolinha por item + rodapé com a contagem.
        fireEvent.click(trigger);
        const panel = document.body.querySelector(".arcana-select__panel")!;
        expect(
            panel.querySelectorAll(".arcana-select__item .arcana-select__dot")
        ).toHaveLength(3);
        expect(
            panel.querySelector(".arcana-select__footer-count")!.textContent
        ).toBe("2 selecionada(s)");

        // Limpar: emite [] e mantém o panel aberto.
        const clearBtn = panel.querySelector(".arcana-select__footer-clear")!;
        expect(clearBtn.textContent).toBe("Limpar");
        fireEvent.click(clearBtn);
        expect(onValueChange).toHaveBeenCalledWith([]);
        expect(document.body.querySelector(".arcana-select__panel")).toBeTruthy();

        // Sem seleção o trigger volta pro placeholder.
        rerender(
            <ArcanaSelect
                value={[]}
                options={options}
                multiple
                triggerMode="dots"
                placeholder="Situação"
                showFooter
            />
        );
        const label = container.querySelector(".arcana-select__label")!;
        expect(label.className).toContain("arcana-select__label--placeholder");
        expect(label.textContent).toBe("Situação");
        expect(
            document.body.querySelector(".arcana-select__footer-count")!.textContent
        ).toBe("0 selecionada(s)");
    });

    it("ArcanaTreeSelect abre o panel, expande o pai e seleciona a folha", () => {
        const onValueChange = vi.fn();
        const tree = [
            {
                id: 1,
                name: "Administrativo",
                children: [
                    { id: 11, name: "RH" },
                    { id: 12, name: "Financeiro" },
                ],
            },
            { id: 2, name: "Operacional" },
        ];
        const { container } = render(
            <ArcanaTreeSelect
                value={null}
                options={tree}
                onValueChange={onValueChange}
            />
        );
        const trigger = container.querySelector(
            "button.arcana-tree-select__trigger"
        )!;
        expect(document.body.querySelector(".arcana-tree-select__panel")).toBeNull();

        fireEvent.click(trigger);
        const panel = document.body.querySelector(".arcana-tree-select__panel")!;
        expect(panel).toBeTruthy();
        // Recolhido: só as duas raízes aparecem.
        expect(panel.querySelectorAll(".arcana-tree-select__node").length).toBe(2);

        // Clicar no pai (allowParentSelection=false) apenas expande.
        const parentRow = panel.querySelectorAll(".arcana-tree-select__node")[0];
        fireEvent.click(parentRow);
        expect(onValueChange).not.toHaveBeenCalled();
        const rows = Array.from(
            document.body.querySelectorAll(".arcana-tree-select__node-label")
        ).map((el) => el.textContent);
        expect(rows).toEqual(["Administrativo", "RH", "Financeiro", "Operacional"]);

        // Folha seleciona, emite o id e fecha o painel.
        fireEvent.click(
            document.body.querySelectorAll(".arcana-tree-select__node")[2]
        );
        expect(onValueChange).toHaveBeenCalledWith(12);
        expect(document.body.querySelector(".arcana-tree-select__panel")).toBeNull();
    });

    it("ArcanaTreeSelect filtra pela busca preservando ancestrais e destaca o match", () => {
        const { container } = render(
            <ArcanaTreeSelect
                value={null}
                options={[
                    {
                        id: 1,
                        name: "Administrativo",
                        children: [
                            { id: 11, name: "RH" },
                            { id: 12, name: "Financeiro" },
                        ],
                    },
                    { id: 2, name: "Operacional" },
                ]}
            />
        );
        fireEvent.click(
            container.querySelector("button.arcana-tree-select__trigger")!
        );
        const input = document.body.querySelector<HTMLInputElement>(
            ".arcana-tree-select__search-input"
        )!;
        fireEvent.change(input, { target: { value: "finan" } });

        const rows = Array.from(
            document.body.querySelectorAll(".arcana-tree-select__node-label")
        ).map((el) => el.textContent);
        expect(rows).toEqual(["Administrativo", "Financeiro"]);
        expect(
            document.body.querySelector(".arcana-tree-select__mark")!.textContent
        ).toBe("Finan");

        fireEvent.change(input, { target: { value: "zzz" } });
        expect(
            document.body.querySelector(".arcana-tree-select__empty")!.textContent
        ).toBe("Nenhum resultado encontrado");
    });

    it("ArcanaInputBoolean renderiza como arcana-select com opção Todos", () => {
        const { container } = render(<ArcanaInputBoolean value={null} />);
        const trigger = container.querySelector("button.arcana-select__trigger")!;
        fireEvent.click(trigger);
        const labels = Array.from(
            document.body.querySelectorAll(".arcana-select__item-label")
        ).map((el) => el.textContent);
        expect(labels).toEqual(["Todos", "Sim", "Não"]);
    });

    it("ArcanaNumberStepper incrementa e respeita o max", () => {
        const onValueChange = vi.fn();
        function Harness() {
            const [v, setV] = useState(2);
            return (
                <ArcanaNumberStepper
                    value={v}
                    max={3}
                    onValueChange={(n) => {
                        setV(n ?? 0);
                        onValueChange(n);
                    }}
                />
            );
        }
        const { container } = render(<Harness />);
        expect(container.querySelector(".arcana-number-stepper")).toBeTruthy();
        const inc = container.querySelector(
            ".arcana-number-stepper__btn--increment"
        ) as HTMLButtonElement;
        fireEvent.click(inc);
        expect(onValueChange).toHaveBeenLastCalledWith(3);
        // agora está no max → botão disabled
        expect(inc.disabled).toBe(true);
    });

    it("ArcanaRadioCardGroup emite ao trocar de opção", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ArcanaRadioCardGroup
                value="a"
                onValueChange={onValueChange}
                options={[
                    { label: "A", value: "a" },
                    { label: "B", value: "b" },
                ]}
            />
        );
        const cards = container.querySelectorAll(".arcana-radio-card");
        expect(cards.length).toBe(2);
        expect(cards[0].classList.contains("is-selected")).toBe(true);
        const inputB = cards[1].querySelector(
            "input.arcana-radio-card__input"
        ) as HTMLInputElement;
        fireEvent.click(inputB);
        expect(onValueChange).toHaveBeenCalledWith("b");
    });

    it("ArcanaSwitchSegmented alterna e reflete is-on", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ArcanaSwitchSegmented value={false} onValueChange={onValueChange} />
        );
        const root = container.querySelector(".arcana-switch-segmented")!;
        expect(root.getAttribute("role")).toBe("switch");
        expect(root.classList.contains("is-on")).toBe(false);
        fireEvent.click(root);
        expect(onValueChange).toHaveBeenCalledWith(true);
    });

    it("ArcanaMultiSelectPopover renderiza o trigger com o summary vazio", () => {
        const { container } = render(
            <ArcanaMultiSelectPopover
                value={{}}
                emptyLabel="Selecione pessoas"
                tabs={[
                    {
                        key: "USER",
                        label: "Usuários",
                        fetch: async () => [{ id: 1, name: "Ana" }],
                    },
                ]}
            />
        );
        const trigger = container.querySelector("button.msp-trigger")!;
        expect(trigger.classList.contains("msp-trigger--empty")).toBe(true);
        expect(
            container.querySelector(".msp-trigger__summary")!.textContent
        ).toBe("Selecione pessoas");
    });

    it("ArcanaInputMask formata o valor conforme a máscara e emite o raw", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ArcanaInputMask
                value=""
                mask="##.###.###/####-##"
                onValueChange={onValueChange}
            />
        );
        const input = container.querySelector("input.arcana-input") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "11222333000181" } });
        expect(input.value).toBe("11.222.333/0001-81");
        expect(onValueChange).toHaveBeenLastCalledWith("11222333000181");
    });

    it("ArcanaInputCurrency formata BRL enquanto digita (modo shadcn)", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ArcanaInputCurrency value="" shadcn onValueChange={onValueChange} />
        );
        expect(container.querySelector(".icur-arcana-field")).toBeTruthy();
        const input = container.querySelector(
            "input.icur-arcana-input"
        ) as HTMLInputElement;
        fireEvent.change(input, { target: { value: "123456" } });
        expect(input.value).toBe("1.234,56");
        expect(onValueChange).toHaveBeenLastCalledWith("1.234,56");
    });

    it("ArcanaDatePicker (date) abre o calendário e emite YYYY-MM-DD ao clicar num dia", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ArcanaDatePicker value="2026-07-25" onValueChange={onValueChange} />
        );
        expect(container.querySelector(".arcana-cal__input")).toBeTruthy();
        // Fechado: sem painel no body.
        expect(document.querySelector(".arcana-cal__panel")).toBeNull();
        fireEvent.click(
            container.querySelector(".arcana-cal__input") as HTMLButtonElement
        );
        const panel = document.querySelector(
            ".arcana-cal__panel"
        ) as HTMLElement;
        expect(panel).toBeTruthy();
        // Dia selecionado atual (25/07/2026) fica destacado.
        const selected = panel.querySelector(
            ".arcana-cal__day--selected"
        ) as HTMLElement;
        expect(selected?.textContent).toBe("25");
        // Clica no dia 10 → emite 2026-07-10.
        const day10 = Array.from(
            panel.querySelectorAll(".arcana-cal__day:not(.arcana-cal__day--adjacent)")
        ).find((el) => el.textContent === "10") as HTMLButtonElement;
        fireEvent.click(day10);
        expect(onValueChange).toHaveBeenLastCalledWith("2026-07-10");
    });

    it("ArcanaTable renderiza colunas, células e empty", () => {
        const { container, getByText, rerender } = render(
            <ArcanaTable
                columns={[
                    { key: "name", label: "Nome" },
                    { key: "qty", label: "Qtd", align: "right" },
                ]}
                rows={[{ name: "Gás", qty: 2 }]}
            />
        );
        expect(container.querySelector("table.arcana-table")).toBeTruthy();
        expect(container.querySelector(".arcana-table__th--right")).toBeTruthy();
        expect(getByText("Gás")).toBeTruthy();
        rerender(
            <ArcanaTable
                columns={[{ key: "name", label: "Nome" }]}
                rows={[]}
            />
        );
        expect(container.querySelector(".arcana-table__empty")).toBeTruthy();
    });

    it("ArcanaSummaryTilesGroup + ArcanaSummaryTile renderizam o grid e o tone", () => {
        const { container, getByText } = render(
            <ArcanaSummaryTilesGroup columns={2}>
                <ArcanaSummaryTile
                    tone="positive"
                    label="Entradas"
                    value="R$ 10"
                    sub="4 formas"
                />
            </ArcanaSummaryTilesGroup>
        );
        const tiles = container.querySelector(".arcana-summary-tiles") as HTMLElement;
        expect(tiles.style.getPropertyValue("--arcana-summary-tiles-cols")).toBe("2");
        expect(
            container.querySelector(".arcana-summary-tile--positive")
        ).toBeTruthy();
        expect(getByText("R$ 10")).toBeTruthy();
        expect(getByText("4 formas")).toBeTruthy();
    });

    it("ArcanaLoadingOverlay respeita a prop visible", () => {
        const { container, rerender } = render(
            <ArcanaLoadingOverlay visible={false} />
        );
        expect(container.querySelector(".arcana-loading-overlay")).toBeNull();
        rerender(<ArcanaLoadingOverlay visible text="Salvando…" />);
        expect(container.querySelector(".arcana-loading-overlay")).toBeTruthy();
        expect(
            container.querySelector(".arcana-loading-overlay__text")!.textContent
        ).toBe("Salvando…");
    });

    // ── React lote 3 (final): overlay / composição ─────────────────────────

    it("ArcanaDialog abre/fecha via ref e teleporta pro body com as classes shadcn", () => {
        function Harness() {
            const ref = useRef<ArcanaDialogHandle>(null);
            return (
                <>
                    <button onClick={() => ref.current?.show()}>abrir</button>
                    <ArcanaDialog
                        ref={ref}
                        title="Meu Modal"
                        footer={(hide) => <button onClick={hide}>fechar</button>}
                    >
                        <p>corpo do dialog</p>
                    </ArcanaDialog>
                </>
            );
        }
        const { getByText } = render(<Harness />);
        // Fechado por default — nada no body.
        expect(document.querySelector(".arcana-dialog-overlay")).toBeNull();

        fireEvent.click(getByText("abrir"));
        const overlay = document.querySelector(".arcana-dialog-overlay")!;
        expect(overlay).toBeTruthy();
        expect(document.querySelector(".arcana-dialog-content")).toBeTruthy();
        expect(document.querySelector(".arcana-dialog-title")!.textContent).toBe("Meu Modal");
        expect(getByText("corpo do dialog")).toBeTruthy();

        fireEvent.click(getByText("fechar"));
        expect(document.querySelector(".arcana-dialog-overlay")).toBeNull();
    });

    it("ArcanaDropdown abre no click do trigger e o item dispara onClick + fecha", () => {
        const onClick = vi.fn();
        const { getByText } = render(
            <ArcanaDropdown trigger={<button>menu</button>}>
                <ArcanaDropdownItem icon="fa-solid fa-pen" onClick={onClick}>
                    Renomear
                </ArcanaDropdownItem>
            </ArcanaDropdown>
        );
        expect(document.querySelector(".arcana-dropdown__menu")).toBeNull();

        fireEvent.click(getByText("menu"));
        const menu = document.querySelector(".arcana-dropdown__menu")!;
        expect(menu).toBeTruthy();
        const item = document.querySelector(".arcana-dropdown-item")!;
        expect(item.classList.contains("arcana-dropdown-item--default")).toBe(true);

        fireEvent.click(getByText("Renomear"));
        expect(onClick).toHaveBeenCalledOnce();
        // closeOnClick default → menu fecha.
        expect(document.querySelector(".arcana-dropdown__menu")).toBeNull();
    });

    it("ArcanaEditFieldDialog abre via ref e dispara onSave", () => {
        const onSave = vi.fn();
        function Harness() {
            const ref = useRef<ArcanaEditFieldDialogHandle>(null);
            return (
                <>
                    <button onClick={() => ref.current?.show()}>editar</button>
                    <ArcanaEditFieldDialog ref={ref} title="Alterar Plano" onSave={onSave}>
                        <input aria-label="campo" />
                    </ArcanaEditFieldDialog>
                </>
            );
        }
        const { getByText } = render(<Harness />);
        fireEvent.click(getByText("editar"));
        expect(document.querySelector(".arcana-dialog-title")!.textContent).toBe("Alterar Plano");
        fireEvent.click(getByText("Salvar Alterações"));
        expect(onSave).toHaveBeenCalledOnce();
    });

    it("ArcanaRequiredFieldsDialog lista os campos pendentes via ref", () => {
        function Harness() {
            const ref = useRef<ArcanaRequiredFieldsDialogHandle>(null);
            return (
                <>
                    <button onClick={() => ref.current?.show()}>validar</button>
                    <ArcanaRequiredFieldsDialog
                        ref={ref}
                        fields={[
                            { key: "name", label: "Nome", hint: "Passo 1" },
                            { key: "doc", label: "CNPJ", hint: "Passo 2" },
                        ]}
                    />
                </>
            );
        }
        const { getByText } = render(<Harness />);
        fireEvent.click(getByText("validar"));
        expect(document.querySelectorAll(".rf-item").length).toBe(2);
        expect(getByText("Nome")).toBeTruthy();
        expect(getByText("CNPJ")).toBeTruthy();
    });

    it("ArcanaActionPanel renderiza visual + CTA e dispara onAction", () => {
        const onAction = vi.fn();
        const { container, getByText } = render(
            <ArcanaActionPanel
                icon="fa-solid fa-clock"
                title="Configure os horários"
                description="Cadastre os intervalos."
                actionLabel="Adicionar"
                onAction={onAction}
            />
        );
        expect(container.querySelector(".arcana-action-panel")).toBeTruthy();
        expect(container.querySelectorAll(".arcana-action-panel__ring").length).toBe(2);
        expect(container.querySelector(".arcana-action-panel__title")!.textContent).toBe(
            "Configure os horários"
        );
        fireEvent.click(getByText("Adicionar"));
        expect(onAction).toHaveBeenCalledOnce();
    });

    it("família ArcanaSettingsList monta com as classes compartilhadas", () => {
        const { container, getByText } = render(
            <ArcanaSettingsList>
                <ArcanaSettingsListGroup
                    title="Pedidos"
                    icon="fa-solid fa-cart-shopping"
                    iconColor="indigo"
                >
                    <ArcanaSettingsListItem label="Plano" caption="Funcionalidades">
                        <span className="arcana-settings-list__current-value">Pro</span>
                    </ArcanaSettingsListItem>
                </ArcanaSettingsListGroup>
            </ArcanaSettingsList>
        );
        expect(container.querySelector(".arcana-settings-list")).toBeTruthy();
        expect(
            container.querySelector(".arcana-settings-list__group-icon--indigo")
        ).toBeTruthy();
        expect(container.querySelector(".arcana-settings-list__item")).toBeTruthy();
        expect(container.querySelector(".arcana-settings-list__caption")!.textContent).toBe(
            "Funcionalidades"
        );
        expect(getByText("Plano")).toBeTruthy();
    });

    it("ArcanaSettingsListGroup collapsible alterna a visibilidade dos items", () => {
        const { container, getByText } = render(
            <ArcanaSettingsListGroup title="Avançado" collapsible defaultCollapsed>
                <ArcanaSettingsListItem label="Escondido" />
            </ArcanaSettingsListGroup>
        );
        // Colapsado por default → item não renderiza.
        expect(container.querySelector(".arcana-settings-list__item")).toBeNull();
        fireEvent.click(getByText("Avançado"));
        expect(container.querySelector(".arcana-settings-list__item")).toBeTruthy();
    });

    it("ArcanaSettingsEditableField mostra display + abre modal e salva o buffer", () => {
        const onValueChange = vi.fn();
        const onSave = vi.fn();
        const { container, getByText } = render(
            <ArcanaSettingsEditableField
                label="Desconto"
                caption="Valor aplicado"
                type="text"
                value="10"
                onValueChange={onValueChange}
                onSave={onSave}
            />
        );
        expect(container.querySelector(".arcana-settings-list__current-value")!.textContent).toBe(
            "10"
        );
        fireEvent.click(getByText("Alterar"));
        expect(document.querySelector(".arcana-dialog-content")).toBeTruthy();
        fireEvent.click(getByText("Salvar Alterações"));
        expect(onValueChange).toHaveBeenCalledWith("10");
        expect(onSave).toHaveBeenCalledWith("10");
    });

    it("família ArcanaSpecSheet monta header/section/field com as classes e emptyText", () => {
        const { container, getByText } = render(
            <ArcanaSpecSheet
                docNum="Cadastro Nº 042"
                title="Popgás"
                metaLabel="Status"
                meta={<span className="arcana-spec-sheet-badge">Ativo</span>}
                footer={<button>Alterar</button>}
            >
                <ArcanaSpecSheetSection title="Dados" sectionNum="§ 01" columns={2}>
                    <ArcanaSpecSheetField label="Razão Social" value="Popgás Ltda" />
                    <ArcanaSpecSheetField label="CNPJ" value={null} />
                </ArcanaSpecSheetSection>
            </ArcanaSpecSheet>
        );
        expect(container.querySelector("article.arcana-spec-sheet")).toBeTruthy();
        expect(container.querySelector(".arcana-spec-sheet__doc-num")!.textContent).toBe(
            "Cadastro Nº 042"
        );
        expect(container.querySelector(".arcana-spec-sheet__grid--cols-2")).toBeTruthy();
        expect(container.querySelector(".arcana-spec-sheet__footer")).toBeTruthy();
        // Field vazio (value=null) mostra o emptyText com a classe --empty.
        const emptyValue = container.querySelector(".arcana-spec-sheet__value--empty")!;
        expect(emptyValue.textContent).toBe("Não informado");
        expect(getByText("Popgás Ltda")).toBeTruthy();
    });
    it("ArcanaAccordion: com `animated`, o conteúdo abre e fecha", async () => {
        function Host() {
            const [value, setValue] = useState<string | string[] | null>(null);
            return (
                <ArcanaAccordion value={value} animated onValueChange={setValue}>
                    <ArcanaAccordionItem name="a" title="A">
                        <p className="body-a">Corpo A</p>
                    </ArcanaAccordionItem>
                </ArcanaAccordion>
            );
        }
        const { container } = render(<Host />);
        const content = container.querySelector(".arcana-accordion-content") as HTMLElement;
        expect(content.classList.contains("arcana-accordion-content--animated")).toBe(true);
        // Repouso inicial: fechado.
        expect(content.style.display).toBe("none");

        // Abre: visível já no início da transição.
        fireEvent.click(container.querySelector(".arcana-accordion-trigger")!);
        expect(container.querySelector(".arcana-accordion-item")!.classList.contains("open")).toBe(true);
        expect(content.style.display).not.toBe("none");
        // Ao assentar, os estilos inline da animação somem (volta pra height auto).
        await waitForStyle(() => content.style.height === "");

        // Fecha: só sai do layout quando a transição termina.
        fireEvent.click(container.querySelector(".arcana-accordion-trigger")!);
        await waitForStyle(() => content.style.display === "none");
    });

    it("ArcanaAccordion: sem `animated` (default), alterna display na hora", () => {
        function Host() {
            const [value, setValue] = useState<string | string[] | null>(null);
            return (
                <ArcanaAccordion value={value} onValueChange={setValue}>
                    <ArcanaAccordionItem name="a" title="A">Corpo A</ArcanaAccordionItem>
                </ArcanaAccordion>
            );
        }
        const { container } = render(<Host />);
        const content = container.querySelector(".arcana-accordion-content") as HTMLElement;
        expect(content.classList.contains("arcana-accordion-content--animated")).toBe(false);
        expect(content.style.display).toBe("none");
        fireEvent.click(container.querySelector(".arcana-accordion-trigger")!);
        expect(content.style.display).toBe("");
        fireEvent.click(container.querySelector(".arcana-accordion-trigger")!);
        expect(content.style.display).toBe("none");
    });
});
