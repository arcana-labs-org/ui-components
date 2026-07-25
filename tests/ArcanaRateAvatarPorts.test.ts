import "@angular/compiler";
import { provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";
import { flushSync, mount, unmount } from "svelte";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
    ArcanaAvatarComponent,
    ArcanaAvatarGroupComponent,
    ArcanaRateComponent,
} from "../src/angular";
import {
    ArcanaAvatar,
    ArcanaAvatarGroup,
    ArcanaRate,
} from "../src/svelte";

/**
 * Paridade dos ports Svelte e Angular de ArcanaRate / ArcanaAvatar / ArcanaAvatarGroup:
 * mesmo markup e MESMAS classes que o Vue/React (é o CSS compartilhado que os quatro
 * consomem), mais o essencial da interação de cada um.
 */
let cleanups: Array<() => void> = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderSvelte(Component: any, props: Record<string, unknown>) {
    const target = document.createElement("div");
    document.body.appendChild(target);
    const component = mount(Component, { target, props });
    flushSync();
    cleanups.push(() => {
        unmount(component);
        target.remove();
    });
    return target;
}

afterEach(() => {
    cleanups.forEach((cleanup) => cleanup());
    cleanups = [];
});

beforeAll(() => {
    TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

describe("ArcanaRate / ArcanaAvatar — port Svelte", () => {
    it("ArcanaRate renderiza o radiogroup e emite ao clicar", () => {
        const onValueChange = vi.fn();
        const onChange = vi.fn();
        const target = renderSvelte(ArcanaRate, { value: 2, onValueChange, onChange });

        const root = target.querySelector(".arcana-rate")!;
        expect(root.className).toContain("arcana-rate--md");
        expect(root.getAttribute("role")).toBe("radiogroup");
        expect(root.querySelectorAll(".arcana-rate__item")).toHaveLength(5);
        expect(
            (root.querySelectorAll(".arcana-rate__icon--filled")[1] as HTMLElement).style.width
        ).toBe("100%");

        (root.querySelectorAll(".arcana-rate__item")[3] as HTMLElement).dispatchEvent(
            new MouseEvent("click", { bubbles: true })
        );
        flushSync();

        expect(onValueChange).toHaveBeenCalledWith(4);
        expect(onChange).toHaveBeenCalledWith(4);
    });

    it("ArcanaAvatar cai para as iniciais quando a imagem falha", () => {
        const onError = vi.fn();
        const target = renderSvelte(ArcanaAvatar, {
            src: "https://exemplo/404.png",
            initials: "SV",
            onError,
        });

        const root = target.querySelector(".arcana-avatar")!;
        expect(root.className).toContain("has-image");

        root.querySelector("img")!.dispatchEvent(new Event("error"));
        flushSync();

        expect(target.querySelector("img")).toBeNull();
        expect(target.querySelector(".arcana-avatar__initials")?.textContent).toBe("SV");
        expect(onError).toHaveBeenCalledTimes(1);
    });

    it("ArcanaAvatarGroup corta no `max` e desenha o +N", () => {
        const target = renderSvelte(ArcanaAvatarGroup, {
            avatars: [{ initials: "AA" }, { initials: "BB" }, { initials: "CC" }],
            max: 2,
            size: "sm",
        });

        const root = target.querySelector(".arcana-avatar-group")!;
        expect(root.className).toContain("arcana-avatar-group--sm");
        expect(root.querySelectorAll(".arcana-avatar")).toHaveLength(3); // 2 + a bolha
        expect(root.querySelector(".arcana-avatar-group__overflow")?.textContent).toBe("+1");
    });
});

describe("ArcanaRate / ArcanaAvatar — port Angular", () => {
    it("ArcanaRate: host é o radiogroup e o teclado anda de meio passo", () => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [ArcanaRateComponent],
            providers: [provideZonelessChangeDetection()],
        });
        const fixture = TestBed.createComponent(ArcanaRateComponent);
        fixture.componentRef.setInput("value", 2);
        fixture.componentRef.setInput("allowHalf", true);
        fixture.detectChanges();

        const el = fixture.nativeElement as HTMLElement;
        expect(el.classList.contains("arcana-rate")).toBe(true);
        expect(el.classList.contains("arcana-rate--md")).toBe(true);
        expect(el.getAttribute("role")).toBe("radiogroup");
        expect(el.querySelectorAll(".arcana-rate__item")).toHaveLength(5);

        const onValue = vi.fn();
        fixture.componentInstance.valueChange.subscribe(onValue);
        el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
        expect(onValue).toHaveBeenCalledWith(2.5);
    });

    it("ArcanaAvatar: cascata e fallback ao erro da imagem", () => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [ArcanaAvatarComponent],
            providers: [provideZonelessChangeDetection()],
        });
        const fixture = TestBed.createComponent(ArcanaAvatarComponent);
        fixture.componentRef.setInput("src", "https://exemplo/404.png");
        fixture.componentRef.setInput("initials", "NG");
        fixture.detectChanges();

        const el = fixture.nativeElement as HTMLElement;
        expect(el.classList.contains("arcana-avatar")).toBe(true);
        expect(el.classList.contains("arcana-avatar--circle")).toBe(true);
        expect(el.classList.contains("has-image")).toBe(true);

        const onError = vi.fn();
        fixture.componentInstance.error.subscribe(onError);
        el.querySelector("img")!.dispatchEvent(new Event("error"));
        fixture.detectChanges();

        expect(el.querySelector("img")).toBeNull();
        expect(el.querySelector(".arcana-avatar__initials")?.textContent).toBe("NG");
        expect(onError).toHaveBeenCalledTimes(1);
    });

    it("ArcanaAvatarGroup: data-driven com `max` e bolha +N", () => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [ArcanaAvatarGroupComponent],
            providers: [provideZonelessChangeDetection()],
        });
        const fixture = TestBed.createComponent(ArcanaAvatarGroupComponent);
        fixture.componentRef.setInput("avatars", [
            { initials: "AA" },
            { initials: "BB" },
            { initials: "CC" },
            { initials: "DD" },
        ]);
        fixture.componentRef.setInput("max", 2);
        fixture.componentRef.setInput("spacing", 6);
        fixture.detectChanges();

        const el = fixture.nativeElement as HTMLElement;
        expect(el.classList.contains("arcana-avatar-group")).toBe(true);
        expect(el.getAttribute("role")).toBe("group");
        expect(el.style.getPropertyValue("--arcana-avatar-group-overlap")).toBe("-6px");
        expect(el.querySelectorAll(".arcana-avatar")).toHaveLength(3); // 2 + a bolha
        expect(el.querySelector(".arcana-avatar-group__overflow")?.textContent).toBe("+2");
    });
});
