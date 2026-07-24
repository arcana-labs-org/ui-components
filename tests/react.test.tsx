import { describe, it, expect, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import {
    ShadcnButton,
    ShadcnBadge,
    ShadcnInput,
    ShadcnSwitch,
    ShadcnTabs,
    ShadcnCheckbox,
    ShadcnSelect,
    ShadcnInputBoolean,
    ShadcnNumberStepper,
    ShadcnRadioCardGroup,
    ShadcnSwitchSegmented,
    MultiSelectPopover,
    ShadcnInputMask,
    InputCurrency,
    ShadcnDatePicker,
    ShadcnTable,
    ShadcnSummaryTile,
    ShadcnSummaryTiles,
    ShadcnLoadingOverlay,
} from "../src/react";

// Smoke test do port React (lote 1): monta uma amostra dos componentes e garante que
// emitem as MESMAS classes shadcn do equivalente Vue (reuso do CSS compartilhado), além
// de um teste de interação por reatividade (click/toggle).
describe("@arcanalabs/ui-components — React smoke", () => {
    it("ShadcnButton renderiza com as classes shadcn e dispara onClick", () => {
        const onClick = vi.fn();
        const { container, getByText } = render(
            <ShadcnButton variant="primary" onClick={onClick}>
                Salvar
            </ShadcnButton>
        );
        const btn = container.querySelector("button")!;
        expect(btn.classList.contains("shadcn-button")).toBe(true);
        expect(btn.classList.contains("shadcn-button--primary")).toBe(true);
        expect(getByText("Salvar")).toBeTruthy();
        fireEvent.click(btn);
        expect(onClick).toHaveBeenCalledOnce();
    });

    it("ShadcnBadge renderiza com variant e slot (children)", () => {
        const { container, getByText } = render(
            <ShadcnBadge variant="green">Ativo</ShadcnBadge>
        );
        const span = container.querySelector("span.shadcn-badge")!;
        expect(span.classList.contains("shadcn-badge--green")).toBe(true);
        expect(getByText("Ativo")).toBeTruthy();
    });

    it("ShadcnInput renderiza um input controlado com a classe shadcn-input", () => {
        const { container } = render(<ShadcnInput value="olá" />);
        const input = container.querySelector("input.shadcn-input") as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.classList.contains("shadcn-input--md")).toBe(true);
        expect(input.value).toBe("olá");
    });

    it("ShadcnInput emite onValueChange ao digitar", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ShadcnInput value="" onValueChange={onValueChange} />
        );
        const input = container.querySelector("input.shadcn-input") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "abc" } });
        expect(onValueChange).toHaveBeenCalledWith("abc");
    });

    it("ShadcnSwitch renderiza role=switch e emite o novo valor ao alternar", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ShadcnSwitch value={false} onValueChange={onValueChange} />
        );
        const btn = container.querySelector("button.shadcn-switch")!;
        expect(btn.getAttribute("role")).toBe("switch");
        expect(btn.getAttribute("aria-checked")).toBe("false");
        fireEvent.click(btn);
        expect(onValueChange).toHaveBeenCalledWith(true);
    });

    it("ShadcnCheckbox usa input nativo e emite ao marcar", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ShadcnCheckbox value={false} label="Aceito" onValueChange={onValueChange} />
        );
        const label = container.querySelector("label.shadcn-checkbox")!;
        const input = label.querySelector("input.shadcn-checkbox__input") as HTMLInputElement;
        expect(input.type).toBe("checkbox");
        fireEvent.click(input);
        expect(onValueChange).toHaveBeenCalledWith(true);
    });

    it("ShadcnTabs renderiza triggers e troca o painel ativo (controlado)", () => {
        function Harness() {
            const [tab, setTab] = useState("a");
            return (
                <ShadcnTabs
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
        expect(container.querySelector(".shadcn-tabs__list")).toBeTruthy();
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
    it("ShadcnSelect abre o panel teleportado e seleciona uma opção", () => {
        function Harness() {
            const [v, setV] = useState<unknown>(null);
            return (
                <ShadcnSelect
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
        const trigger = container.querySelector("button.shadcn-select__trigger")!;
        expect(container.querySelector(".shadcn-select")).toBeTruthy();
        // fechado: sem panel
        expect(document.body.querySelector(".shadcn-select__panel")).toBeNull();
        fireEvent.click(trigger);
        const panel = document.body.querySelector(".shadcn-select__panel")!;
        expect(panel).toBeTruthy();
        const items = panel.querySelectorAll(".shadcn-select__item");
        expect(items.length).toBe(2);
        fireEvent.click(items[1]);
        // após seleção fecha e mostra o label
        expect(document.body.querySelector(".shadcn-select__panel")).toBeNull();
        expect(
            container.querySelector(".shadcn-select__label")!.textContent
        ).toContain("Dois");
    });

    it("ShadcnInputBoolean renderiza como shadcn-select com opção Todos", () => {
        const { container } = render(<ShadcnInputBoolean value={null} />);
        const trigger = container.querySelector("button.shadcn-select__trigger")!;
        fireEvent.click(trigger);
        const labels = Array.from(
            document.body.querySelectorAll(".shadcn-select__item-label")
        ).map((el) => el.textContent);
        expect(labels).toEqual(["Todos", "Sim", "Não"]);
    });

    it("ShadcnNumberStepper incrementa e respeita o max", () => {
        const onValueChange = vi.fn();
        function Harness() {
            const [v, setV] = useState(2);
            return (
                <ShadcnNumberStepper
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
        expect(container.querySelector(".shadcn-number-stepper")).toBeTruthy();
        const inc = container.querySelector(
            ".shadcn-number-stepper__btn--increment"
        ) as HTMLButtonElement;
        fireEvent.click(inc);
        expect(onValueChange).toHaveBeenLastCalledWith(3);
        // agora está no max → botão disabled
        expect(inc.disabled).toBe(true);
    });

    it("ShadcnRadioCardGroup emite ao trocar de opção", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ShadcnRadioCardGroup
                value="a"
                onValueChange={onValueChange}
                options={[
                    { label: "A", value: "a" },
                    { label: "B", value: "b" },
                ]}
            />
        );
        const cards = container.querySelectorAll(".shadcn-radio-card");
        expect(cards.length).toBe(2);
        expect(cards[0].classList.contains("is-selected")).toBe(true);
        const inputB = cards[1].querySelector(
            "input.shadcn-radio-card__input"
        ) as HTMLInputElement;
        fireEvent.click(inputB);
        expect(onValueChange).toHaveBeenCalledWith("b");
    });

    it("ShadcnSwitchSegmented alterna e reflete is-on", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ShadcnSwitchSegmented value={false} onValueChange={onValueChange} />
        );
        const root = container.querySelector(".shadcn-switch-segmented")!;
        expect(root.getAttribute("role")).toBe("switch");
        expect(root.classList.contains("is-on")).toBe(false);
        fireEvent.click(root);
        expect(onValueChange).toHaveBeenCalledWith(true);
    });

    it("MultiSelectPopover renderiza o trigger com o summary vazio", () => {
        const { container } = render(
            <MultiSelectPopover
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

    it("ShadcnInputMask formata o valor conforme a máscara e emite o raw", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ShadcnInputMask
                value=""
                mask="##.###.###/####-##"
                onValueChange={onValueChange}
            />
        );
        const input = container.querySelector("input.shadcn-input") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "11222333000181" } });
        expect(input.value).toBe("11.222.333/0001-81");
        expect(onValueChange).toHaveBeenLastCalledWith("11222333000181");
    });

    it("InputCurrency formata BRL enquanto digita (modo shadcn)", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <InputCurrency value="" shadcn onValueChange={onValueChange} />
        );
        expect(container.querySelector(".icur-shadcn-field")).toBeTruthy();
        const input = container.querySelector(
            "input.icur-shadcn-input"
        ) as HTMLInputElement;
        fireEvent.change(input, { target: { value: "123456" } });
        expect(input.value).toBe("1.234,56");
        expect(onValueChange).toHaveBeenLastCalledWith("1.234,56");
    });

    it("ShadcnDatePicker (composite) mascara a digitação e emite YYYY-MM-DD", () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ShadcnDatePicker value={null} onValueChange={onValueChange} />
        );
        expect(container.querySelector(".shadcn-date-picker__box")).toBeTruthy();
        const text = container.querySelector(
            "input.shadcn-date-picker__text"
        ) as HTMLInputElement;
        fireEvent.change(text, { target: { value: "25072026" } });
        expect(text.value).toBe("25/07/2026");
        expect(onValueChange).toHaveBeenLastCalledWith("2026-07-25");
    });

    it("ShadcnTable renderiza colunas, células e empty", () => {
        const { container, getByText, rerender } = render(
            <ShadcnTable
                columns={[
                    { key: "name", label: "Nome" },
                    { key: "qty", label: "Qtd", align: "right" },
                ]}
                rows={[{ name: "Gás", qty: 2 }]}
            />
        );
        expect(container.querySelector("table.shadcn-table")).toBeTruthy();
        expect(container.querySelector(".shadcn-table__th--right")).toBeTruthy();
        expect(getByText("Gás")).toBeTruthy();
        rerender(
            <ShadcnTable
                columns={[{ key: "name", label: "Nome" }]}
                rows={[]}
            />
        );
        expect(container.querySelector(".shadcn-table__empty")).toBeTruthy();
    });

    it("ShadcnSummaryTiles + ShadcnSummaryTile renderizam o grid e o tone", () => {
        const { container, getByText } = render(
            <ShadcnSummaryTiles columns={2}>
                <ShadcnSummaryTile
                    tone="positive"
                    label="Entradas"
                    value="R$ 10"
                    sub="4 formas"
                />
            </ShadcnSummaryTiles>
        );
        const tiles = container.querySelector(".shadcn-summary-tiles") as HTMLElement;
        expect(tiles.style.getPropertyValue("--shadcn-summary-tiles-cols")).toBe("2");
        expect(
            container.querySelector(".shadcn-summary-tile--positive")
        ).toBeTruthy();
        expect(getByText("R$ 10")).toBeTruthy();
        expect(getByText("4 formas")).toBeTruthy();
    });

    it("ShadcnLoadingOverlay respeita a prop visible", () => {
        const { container, rerender } = render(
            <ShadcnLoadingOverlay visible={false} />
        );
        expect(container.querySelector(".shadcn-loading-overlay")).toBeNull();
        rerender(<ShadcnLoadingOverlay visible text="Salvando…" />);
        expect(container.querySelector(".shadcn-loading-overlay")).toBeTruthy();
        expect(
            container.querySelector(".shadcn-loading-overlay__text")!.textContent
        ).toBe("Salvando…");
    });
});
