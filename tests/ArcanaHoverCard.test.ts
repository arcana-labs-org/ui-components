import "@angular/compiler";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";
import { act, fireEvent, render } from "@testing-library/react";
import { mount } from "@vue/test-utils";
import { flushSync, mount as svelteMount, unmount } from "svelte";
import { createElement } from "react";
import { nextTick } from "vue";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import ArcanaHoverCardVue from "../src/vue/components/ArcanaHoverCard.vue";
import { ArcanaHoverCard as ArcanaHoverCardReact } from "../src/react/ArcanaHoverCard";
import HoverCardFixture from "./fixtures/HoverCardFixture.svelte";
import { ArcanaHoverCardComponent } from "../src/angular/arcana-hover-card.component";

/**
 * `ArcanaHoverCard` nos 4 frameworks. O caso crítico (e o que costuma quebrar em
 * hover cards) é o TRAJETO gatilho → cartão: o `mouseleave` do gatilho agenda o
 * fechamento, e o `mouseenter` do cartão precisa CANCELAR esse timer dentro da
 * carência de `closeDelay`. Cada port é exercitado exatamente nesse caminho.
 */
const panel = () => document.querySelector(".arcana-hover-card__panel");

const mouse = (element: Element, type: "mouseenter" | "mouseleave") =>
    element.dispatchEvent(new MouseEvent(type));

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    document.querySelectorAll(".arcana-hover-card__panel").forEach((node) => node.remove());
});

describe("ArcanaHoverCard — Vue", () => {
    const mountCard = () =>
        mount(ArcanaHoverCardVue, {
            props: { openDelay: 100, closeDelay: 200 },
            slots: {
                trigger: '<a class="gatilho" href="#perfil">@arcana</a>',
                default: '<p class="cartao">Arcana Labs</p>',
            },
            attachTo: document.body,
        });

    it("abre depois do openDelay e descreve o gatilho com aria-describedby", async () => {
        const wrapper = mountCard();
        const trigger = wrapper.find(".arcana-hover-card__trigger");

        await trigger.trigger("mouseenter");
        vi.advanceTimersByTime(50);
        await nextTick();
        expect(panel()).toBeNull(); // ainda dentro do openDelay

        vi.advanceTimersByTime(100);
        await nextTick();
        await nextTick();

        const card = panel();
        expect(card).not.toBeNull();
        expect(card?.textContent).toContain("Arcana Labs");
        expect(card?.getAttribute("role")).toBe("tooltip");
        expect(trigger.attributes("aria-describedby")).toBe(card?.id);
        // Cartão não rouba foco: nada de tabindex/autofocus.
        expect(card?.hasAttribute("tabindex")).toBe(false);

        wrapper.unmount();
    });

    it("mover o mouse do gatilho PRO cartão não fecha (carência do closeDelay)", async () => {
        const wrapper = mountCard();
        const trigger = wrapper.find(".arcana-hover-card__trigger");

        await trigger.trigger("mouseenter");
        vi.advanceTimersByTime(150);
        await nextTick();
        await nextTick();
        const card = panel() as HTMLElement;
        expect(card).not.toBeNull();

        // Saiu do gatilho (fechamento agendado) e entrou no cartão dentro da carência.
        await trigger.trigger("mouseleave");
        vi.advanceTimersByTime(100);
        mouse(card, "mouseenter");

        vi.advanceTimersByTime(1000);
        await nextTick();
        expect(panel()).not.toBeNull(); // continua aberto

        // Só fecha quando o mouse deixa o próprio cartão.
        mouse(card, "mouseleave");
        vi.advanceTimersByTime(250);
        await nextTick();
        expect(panel()).toBeNull();

        wrapper.unmount();
    });

    it("Escape fecha o cartão", async () => {
        const wrapper = mountCard();
        await wrapper.find(".arcana-hover-card__trigger").trigger("mouseenter");
        vi.advanceTimersByTime(150);
        await nextTick();
        await nextTick();
        expect(panel()).not.toBeNull();

        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        await nextTick();
        expect(panel()).toBeNull();

        wrapper.unmount();
    });

    it("`disabled` nunca abre", async () => {
        const wrapper = mount(ArcanaHoverCardVue, {
            props: { openDelay: 10, disabled: true },
            slots: { trigger: "<span>x</span>", default: "<p>y</p>" },
        });

        await wrapper.find(".arcana-hover-card__trigger").trigger("mouseenter");
        vi.advanceTimersByTime(500);
        await nextTick();
        expect(panel()).toBeNull();

        wrapper.unmount();
    });
});

describe("ArcanaHoverCard — React", () => {
    it("mover o mouse do gatilho PRO cartão não fecha (carência do closeDelay)", () => {
        const { container } = render(
            createElement(
                ArcanaHoverCardReact,
                {
                    openDelay: 100,
                    closeDelay: 200,
                    trigger: createElement("a", { className: "gatilho", href: "#perfil" }, "@arcana"),
                },
                createElement("p", { className: "cartao" }, "Arcana Labs"),
            ),
        );

        const trigger = container.querySelector(".arcana-hover-card__trigger") as HTMLElement;
        fireEvent.mouseEnter(trigger);
        act(() => {
            vi.advanceTimersByTime(150);
        });

        const card = panel() as HTMLElement;
        expect(card).not.toBeNull();
        expect(card.textContent).toContain("Arcana Labs");
        expect(trigger.getAttribute("aria-describedby")).toBe(card.id);

        fireEvent.mouseLeave(trigger);
        act(() => {
            vi.advanceTimersByTime(100);
        });
        fireEvent.mouseEnter(card);
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(panel()).not.toBeNull(); // continua aberto

        fireEvent.mouseLeave(card);
        act(() => {
            vi.advanceTimersByTime(250);
        });
        expect(panel()).toBeNull();
    });
});

describe("ArcanaHoverCard — Svelte", () => {
    it("mover o mouse do gatilho PRO cartão não fecha (carência do closeDelay)", () => {
        const target = document.createElement("div");
        document.body.appendChild(target);
        const component = svelteMount(HoverCardFixture, { target, props: {} });
        flushSync();

        const trigger = target.querySelector(".arcana-hover-card__trigger") as HTMLElement;
        mouse(trigger, "mouseenter");
        vi.advanceTimersByTime(150);
        flushSync();

        const card = panel() as HTMLElement;
        expect(card).not.toBeNull();
        expect(card.textContent).toContain("Arcana Labs");

        mouse(trigger, "mouseleave");
        vi.advanceTimersByTime(100);
        mouse(card, "mouseenter");
        vi.advanceTimersByTime(1000);
        flushSync();
        expect(panel()).not.toBeNull(); // continua aberto

        mouse(card, "mouseleave");
        vi.advanceTimersByTime(250);
        flushSync();
        expect(panel()).toBeNull();

        unmount(component);
        target.remove();
    });
});

describe("ArcanaHoverCard — Angular", () => {
    beforeAll(() => {
        TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
    });

    @Component({
        standalone: true,
        imports: [ArcanaHoverCardComponent],
        template: `
            <span arcanaHoverCard [openDelay]="100" [closeDelay]="200">
                <a arcanaHoverCardTrigger class="gatilho" href="#perfil">&#64;arcana</a>
                <p class="cartao">Arcana Labs</p>
            </span>
        `,
    })
    class Host {}

    it("mover o mouse do gatilho PRO cartão não fecha (carência do closeDelay)", () => {
        TestBed.configureTestingModule({
            imports: [Host],
            providers: [provideZonelessChangeDetection()],
        });
        const fixture = TestBed.createComponent(Host);
        fixture.detectChanges();

        const trigger = fixture.nativeElement.querySelector(
            ".arcana-hover-card__trigger",
        ) as HTMLElement;

        mouse(trigger, "mouseenter");
        vi.advanceTimersByTime(150);
        fixture.detectChanges();

        const card = panel() as HTMLElement;
        expect(card).not.toBeNull();
        expect(card.textContent).toContain("Arcana Labs");
        expect(card.getAttribute("role")).toBe("tooltip");

        mouse(trigger, "mouseleave");
        vi.advanceTimersByTime(100);
        mouse(card, "mouseenter");
        vi.advanceTimersByTime(1000);
        fixture.detectChanges();
        expect(panel()).not.toBeNull(); // continua aberto

        mouse(card, "mouseleave");
        vi.advanceTimersByTime(250);
        fixture.detectChanges();
        expect(panel()).toBeNull();

        fixture.destroy();
    });
});
