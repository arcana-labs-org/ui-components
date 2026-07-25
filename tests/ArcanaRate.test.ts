import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ArcanaRate } from "../src/vue";

/**
 * ArcanaRate — comportamento (Vue). Cobre o que os 4 ports compartilham: markup/classes,
 * seleção por clique, o recorte percentual que desenha meia estrela / média, o modo
 * `readonly` e a navegação por teclado do radiogroup (roving tabindex).
 */
describe("ArcanaRate", () => {
    it("renderiza `max` estrelas dentro de um radiogroup", () => {
        const wrapper = mount(ArcanaRate, { props: { modelValue: 0, max: 5 } });

        expect(wrapper.classes()).toContain("arcana-rate");
        expect(wrapper.classes()).toContain("arcana-rate--md");
        expect(wrapper.attributes("role")).toBe("radiogroup");
        expect(wrapper.findAll(".arcana-rate__item")).toHaveLength(5);
        expect(wrapper.findAll('[role="radio"]')).toHaveLength(5);
    });

    it("clicar numa estrela emite update:modelValue e change", async () => {
        const wrapper = mount(ArcanaRate, { props: { modelValue: 1 } });

        await wrapper.findAll(".arcana-rate__item")[2].trigger("click");

        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([3]);
        expect(wrapper.emitted("change")?.[0]).toEqual([3]);
    });

    it("marca aria-checked só na estrela que contém a nota", () => {
        const wrapper = mount(ArcanaRate, { props: { modelValue: 3.5, allowHalf: true } });
        const checked = wrapper
            .findAll(".arcana-rate__item")
            .map((item) => item.attributes("aria-checked"));

        // 3.5 → a QUARTA estrela é a que está pela metade (ceil(3.5) === 4).
        expect(checked).toEqual(["false", "false", "false", "true", "false"]);
    });

    it("recorta a camada cheia em % — meia estrela e média fracionada", () => {
        const wrapper = mount(ArcanaRate, { props: { modelValue: 4.3, readonly: true } });
        const widths = wrapper
            .findAll(".arcana-rate__icon--filled")
            .map((el) => el.attributes("style"));

        expect(widths.slice(0, 4)).toEqual([
            "width: 100%;",
            "width: 100%;",
            "width: 100%;",
            "width: 100%;",
        ]);
        // Sem o arredondamento sairia "30.000000000000027%".
        expect(widths[4]).toBe("width: 30%;");
    });

    it("readonly/disabled não emitem e saem da ordem de tabulação", async () => {
        const readonlyRate = mount(ArcanaRate, { props: { modelValue: 2, readonly: true } });
        await readonlyRate.findAll(".arcana-rate__item")[4].trigger("click");
        expect(readonlyRate.emitted("update:modelValue")).toBeUndefined();
        expect(readonlyRate.classes()).toContain("is-readonly");
        expect(readonlyRate.attributes("aria-readonly")).toBe("true");

        const disabledRate = mount(ArcanaRate, { props: { modelValue: 2, disabled: true } });
        await disabledRate.findAll(".arcana-rate__item")[4].trigger("click");
        expect(disabledRate.emitted("update:modelValue")).toBeUndefined();
        expect(disabledRate.classes()).toContain("is-disabled");
        expect(
            disabledRate.findAll(".arcana-rate__item").map((i) => i.attributes("tabindex"))
        ).toEqual(["-1", "-1", "-1", "-1", "-1"]);
    });

    it("roving tabindex: um único ponto de parada, na estrela da nota atual", () => {
        const wrapper = mount(ArcanaRate, { props: { modelValue: 3 } });
        expect(
            wrapper.findAll(".arcana-rate__item").map((i) => i.attributes("tabindex"))
        ).toEqual(["-1", "-1", "0", "-1", "-1"]);

        // Nota 0: o ponto de parada é a primeira estrela.
        const empty = mount(ArcanaRate, { props: { modelValue: 0 } });
        expect(empty.findAll(".arcana-rate__item").map((i) => i.attributes("tabindex"))).toEqual([
            "0",
            "-1",
            "-1",
            "-1",
            "-1",
        ]);
    });

    it("setas andam de um passo (0.5 com allowHalf), Home/End vão aos extremos", async () => {
        const wrapper = mount(ArcanaRate, { props: { modelValue: 2, allowHalf: true, max: 5 } });

        await wrapper.trigger("keydown", { key: "ArrowRight" });
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([2.5]);

        await wrapper.trigger("keydown", { key: "ArrowLeft" });
        expect(wrapper.emitted("update:modelValue")?.[1]).toEqual([1.5]);

        await wrapper.trigger("keydown", { key: "End" });
        expect(wrapper.emitted("update:modelValue")?.[2]).toEqual([5]);

        await wrapper.trigger("keydown", { key: "Home" });
        expect(wrapper.emitted("update:modelValue")?.[3]).toEqual([0.5]);
    });

    it("não passa dos limites 0..max", async () => {
        const top = mount(ArcanaRate, { props: { modelValue: 5, max: 5 } });
        await top.trigger("keydown", { key: "ArrowRight" });
        expect(top.emitted("update:modelValue")).toBeUndefined();

        const bottom = mount(ArcanaRate, { props: { modelValue: 0 } });
        await bottom.trigger("keydown", { key: "ArrowLeft" });
        expect(bottom.emitted("update:modelValue")).toBeUndefined();
    });

    it("showText usa o rótulo da nota; showScore mostra o número (texto vence)", () => {
        const texts = ["Péssimo", "Ruim", "Regular", "Bom", "Ótimo"];

        const withText = mount(ArcanaRate, { props: { modelValue: 4, showText: true, texts } });
        expect(withText.find(".arcana-rate__text").text()).toBe("Bom");
        expect(withText.find(".arcana-rate__score").exists()).toBe(false);

        const withScore = mount(ArcanaRate, {
            props: { modelValue: 3.5, allowHalf: true, showScore: true },
        });
        expect(withScore.find(".arcana-rate__score").text()).toBe("3.5");

        // Mutuamente exclusivos (como no Element Plus): com os dois ligados, o texto vence.
        const both = mount(ArcanaRate, {
            props: { modelValue: 2, showText: true, showScore: true, texts },
        });
        expect(both.find(".arcana-rate__text").exists()).toBe(true);
        expect(both.find(".arcana-rate__score").exists()).toBe(false);
    });

    it("cores viram custom properties (sem hex fixo no componente)", () => {
        const wrapper = mount(ArcanaRate, {
            props: { modelValue: 3, color: "var(--arcana-info-solid)", voidColor: "#eee" },
        });
        const style = wrapper.attributes("style") ?? "";

        expect(style).toContain("--arcana-rate-color: var(--arcana-info-solid)");
        expect(style).toContain("--arcana-rate-void-color: #eee");
    });

    it("hover pré-visualiza a nota sem emitir", async () => {
        // happy-dom devolve rect zerado; o guard de largura 0 cai para a estrela cheia.
        const wrapper = mount(ArcanaRate, { props: { modelValue: 1 } });
        const spy = vi.spyOn(wrapper.vm as unknown as { $emit: () => void }, "$emit");

        await wrapper.findAll(".arcana-rate__item")[3].trigger("mousemove");
        expect(
            wrapper.findAll(".arcana-rate__icon--filled")[3].attributes("style")
        ).toBe("width: 100%;");
        expect(spy).not.toHaveBeenCalled();

        await wrapper.findAll(".arcana-rate__item")[3].trigger("mouseleave");
        expect(
            wrapper.findAll(".arcana-rate__icon--filled")[3].attributes("style")
        ).toBe("width: 0%;");
    });
});
