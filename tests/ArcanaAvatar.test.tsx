import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { fireEvent, render } from "@testing-library/react";
import { ArcanaAvatar, ArcanaAvatarGroup } from "../src/vue";
import {
    ArcanaAvatar as ArcanaAvatarReact,
    ArcanaAvatarGroup as ArcanaAvatarGroupReact,
} from "../src/react";

/**
 * ArcanaAvatar / ArcanaAvatarGroup — comportamento. A cascata de fallback e o "+N" são
 * checados no Vue; o port React entra para garantir que emite o MESMO markup/classes
 * (é o CSS compartilhado que os dois consomem).
 */
describe("ArcanaAvatar", () => {
    it("cascata: imagem quando há `src`", () => {
        const wrapper = mount(ArcanaAvatar, {
            props: { src: "https://exemplo/rosto.png", alt: "Ana" },
        });

        expect(wrapper.classes()).toContain("arcana-avatar");
        expect(wrapper.classes()).toContain("arcana-avatar--md");
        expect(wrapper.classes()).toContain("arcana-avatar--circle");
        expect(wrapper.classes()).toContain("has-image");
        expect(wrapper.find("img.arcana-avatar__img").attributes("alt")).toBe("Ana");
    });

    it("cascata: iniciais → ícone → silhueta quando não há imagem", () => {
        const initials = mount(ArcanaAvatar, { props: { initials: "AB", icon: "fa-solid fa-user" } });
        expect(initials.find(".arcana-avatar__initials").text()).toBe("AB");
        expect(initials.find(".arcana-avatar__icon").exists()).toBe(false);

        const icon = mount(ArcanaAvatar, { props: { icon: "fa-solid fa-user" } });
        expect(icon.find("i.arcana-avatar__icon").classes()).toContain("fa-user");

        const glyph = mount(ArcanaAvatar, {});
        expect(glyph.find("svg.arcana-avatar__glyph").exists()).toBe(true);
    });

    it("imagem quebrada cai para o próximo degrau da cascata e emite `error`", async () => {
        const wrapper = mount(ArcanaAvatar, {
            props: { src: "https://exemplo/404.png", initials: "LC" },
        });
        expect(wrapper.find("img").exists()).toBe(true);

        await wrapper.find("img").trigger("error");

        expect(wrapper.find("img").exists()).toBe(false);
        expect(wrapper.find(".arcana-avatar__initials").text()).toBe("LC");
        expect(wrapper.classes()).not.toContain("has-image");
        expect(wrapper.emitted("error")).toHaveLength(1);

        // Nova `src` re-arma a tentativa (a falha era da URL anterior).
        await wrapper.setProps({ src: "https://exemplo/ok.png" });
        expect(wrapper.find("img").exists()).toBe(true);
    });

    it("size numérico vira custom property em vez de classe da escala", () => {
        const numeric = mount(ArcanaAvatar, { props: { size: 56, shape: "square" } });
        expect(numeric.attributes("style")).toContain("--arcana-avatar-own-size: 56px");
        expect(numeric.classes().join(" ")).not.toContain("arcana-avatar--56");
        expect(numeric.classes()).toContain("arcana-avatar--square");

        const named = mount(ArcanaAvatar, { props: { size: "xl" } });
        expect(named.classes()).toContain("arcana-avatar--xl");
        expect(named.attributes("style")).toBeUndefined();
    });

    it("`color` vira custom property (sem hex fixo no componente)", () => {
        const wrapper = mount(ArcanaAvatar, {
            props: { initials: "PG", color: "var(--arcana-info-solid)" },
        });
        expect(wrapper.attributes("style")).toContain(
            "--arcana-avatar-color: var(--arcana-info-solid)"
        );
    });

    it("port React emite o mesmo markup e trata o erro da imagem", () => {
        const onError = vi.fn();
        const { container } = render(
            <ArcanaAvatarReact src="https://exemplo/404.png" initials="LC" onError={onError} />
        );

        const root = container.querySelector(".arcana-avatar")!;
        expect(root.className).toContain("arcana-avatar--md");
        expect(root.className).toContain("arcana-avatar--circle");
        expect(root.className).toContain("has-image");

        fireEvent.error(container.querySelector("img")!);

        expect(container.querySelector("img")).toBeNull();
        expect(container.querySelector(".arcana-avatar__initials")?.textContent).toBe("LC");
        expect(onError).toHaveBeenCalledTimes(1);
    });
});

describe("ArcanaAvatarGroup", () => {
    const avatars = [
        { initials: "AA" },
        { initials: "BB" },
        { initials: "CC" },
        { initials: "DD" },
    ];

    it("renderiza a prop `avatars` e corta no `max` com bolha +N", () => {
        const wrapper = mount(ArcanaAvatarGroup, { props: { avatars, max: 2 } });

        expect(wrapper.classes()).toContain("arcana-avatar-group");
        expect(wrapper.attributes("role")).toBe("group");
        expect(wrapper.findAll(".arcana-avatar:not(.arcana-avatar-group__overflow)")).toHaveLength(2);
        expect(wrapper.find(".arcana-avatar-group__overflow").text()).toBe("+2");
    });

    it("sem `max` mostra todos e não desenha a bolha", () => {
        const wrapper = mount(ArcanaAvatarGroup, { props: { avatars } });
        expect(wrapper.findAll(".arcana-avatar")).toHaveLength(4);
        expect(wrapper.find(".arcana-avatar-group__overflow").exists()).toBe(false);
    });

    it("aceita avatares por slot e o `overflowCount` manual soma ao excedente", () => {
        const wrapper = mount(ArcanaAvatarGroup, {
            props: { avatars: avatars.slice(0, 2), max: 1, overflowCount: 3 },
            slots: {
                default: '<span class="arcana-avatar projetado">ZZ</span>',
            },
        });

        expect(wrapper.find(".projetado").exists()).toBe(true);
        // 1 escondido da prop `avatars` + 3 informados manualmente.
        expect(wrapper.find(".arcana-avatar-group__overflow").text()).toBe("+4");
    });

    it("`size`/`shape` do grupo propagam por token e classe (não por prop no filho)", () => {
        const named = mount(ArcanaAvatarGroup, {
            props: { avatars, size: "sm", shape: "square" },
        });
        expect(named.classes()).toContain("arcana-avatar-group--sm");
        expect(named.classes()).toContain("arcana-avatar-group--square");

        const numeric = mount(ArcanaAvatarGroup, { props: { avatars, size: 56 } });
        expect(numeric.attributes("style")).toContain("--arcana-avatar-size: 56px");
        expect(numeric.classes().join(" ")).not.toContain("arcana-avatar-group--56");
    });

    it("`spacing` vence `overlap` e inverte o sinal da margem", () => {
        const overlapped = mount(ArcanaAvatarGroup, { props: { avatars, overlap: 16 } });
        expect(overlapped.attributes("style")).toContain("--arcana-avatar-group-overlap: 16px");

        const spaced = mount(ArcanaAvatarGroup, { props: { avatars, overlap: 16, spacing: 6 } });
        expect(spaced.attributes("style")).toContain("--arcana-avatar-group-overlap: -6px");
    });

    it("port React: mesma pilha, mesmo corte, mesmos children projetados", () => {
        const { container } = render(
            <ArcanaAvatarGroupReact avatars={avatars} max={3} size="lg">
                <ArcanaAvatarReact initials="ZZ" />
            </ArcanaAvatarGroupReact>
        );

        const root = container.querySelector(".arcana-avatar-group")!;
        expect(root.className).toContain("arcana-avatar-group--lg");
        // 3 do `avatars` + 1 projetado + a bolha "+1".
        expect(root.querySelectorAll(".arcana-avatar")).toHaveLength(5);
        expect(root.querySelector(".arcana-avatar-group__overflow")?.textContent).toBe("+1");
    });
});
