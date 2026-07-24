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
