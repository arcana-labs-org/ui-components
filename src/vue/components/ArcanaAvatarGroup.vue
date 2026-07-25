<template>
    <div
        class="arcana-avatar-group"
        :class="[sizeClass, shapeClass]"
        :style="rootStyle"
        role="group"
        :aria-label="ariaLabel || undefined"
    >
        <ArcanaAvatar
            v-for="(avatar, i) in visibleAvatars"
            :key="i"
            :src="avatar.src || ''"
            :alt="avatar.alt || ''"
            :initials="avatar.initials || ''"
            :icon="avatar.icon || ''"
            :color="avatar.color || ''"
            :shape="shape || 'circle'"
        />

        <slot />

        <span
            v-if="overflowTotal > 0"
            class="arcana-avatar arcana-avatar-group__overflow"
            :class="`arcana-avatar--${shape || 'circle'}`"
        >+{{ overflowTotal }}</span>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"
import ArcanaAvatar from "./ArcanaAvatar.vue"

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarShape = 'circle' | 'square'

interface AvatarGroupItem {
    src?: string
    alt?: string
    initials?: string
    /** Classe de ícone do fallback (ex: `fa-solid fa-user`). */
    icon?: string
    /** Cor de fundo do fallback deste avatar. */
    color?: string
}

/**
 * `<ArcanaAvatarGroup>` — pilha de avatares sobrepostos ("quem participa disto").
 *
 * Duas formas de alimentar, combináveis (os data-driven vêm primeiro, depois os
 * projetados):
 * 1. **Data-driven** — prop `avatars` com `{ src?, alt?, initials?, icon?, color? }`.
 *    É a única forma em que o `max` sabe cortar, então é ela que rende o "+N"
 *    automático.
 * 2. **Composição** — `<ArcanaAvatar>` no slot default. Aqui o grupo não fatia
 *    (nem Angular nem Svelte permitem contar/cortar conteúdo projetado, e cortar
 *    só em Vue/React quebraria a paridade entre os ports): passe `overflowCount`
 *    com quantos ficaram de fora e o grupo desenha a mesma bolha "+N".
 *
 * API:
 * - `avatars` — lista data-driven (ver acima)
 * - `max` — máximo de avatares da prop `avatars` a exibir; o excedente vira "+N".
 *   `0`/omitido = sem limite
 * - `overflowCount` — soma um "+N" manual (para o caso de composição). Soma com o
 *   excedente calculado do `avatars`
 * - `size` — `'xs' | 'sm' | 'md' | 'lg' | 'xl'` ou número de px. **Propaga para
 *   TODOS os filhos**, inclusive os projetados por slot: o grupo seta
 *   `--arcana-avatar-size` e o avatar resolve o tamanho por herança (a declaração
 *   herdada do grupo vence o tamanho próprio do filho). Omitido = cada avatar usa
 *   o seu
 * - `shape` — `'circle' | 'square'`; também normaliza os filhos projetados (por
 *   especificidade CSS). Omitido = cada avatar usa o seu
 * - `overlap` — px que cada avatar cobre do anterior (default: 30% do tamanho)
 * - `spacing` — espaçamento POSITIVO em px entre os avatares; quando informado
 *   vence o `overlap` (a pilha deixa de se sobrepor)
 * - `ariaLabel` — nome acessível do grupo (`role="group"`)
 */
export default {
    name: 'ArcanaAvatarGroup',

    components: { ArcanaAvatar },

    props: {
        avatars: {
            type: Array as PropType<AvatarGroupItem[]>,
            default: () => [],
        },
        max: {
            type: Number,
            default: 0,
        },
        /** "+N" manual, para quando os avatares vêm por slot (o grupo não fatia slot). */
        overflowCount: {
            type: Number,
            default: 0,
        },
        size: {
            type: [String, Number] as PropType<AvatarSize | number | undefined>,
            default: undefined,
        },
        shape: {
            type: String as PropType<AvatarShape | undefined>,
            default: undefined,
        },
        /** px que cada avatar cobre do anterior. Default: 30% do tamanho. */
        overlap: {
            type: Number,
            default: undefined,
        },
        /** Espaçamento positivo (px). Informado, vence o `overlap`. */
        spacing: {
            type: Number,
            default: undefined,
        },
        ariaLabel: {
            type: String,
            default: '',
        },
    },

    computed: {
        normalizedAvatars(): AvatarGroupItem[] {
            return this.avatars ?? []
        },

        visibleAvatars(): AvatarGroupItem[] {
            const limit = Number(this.max) || 0
            if (limit <= 0) return this.normalizedAvatars
            return this.normalizedAvatars.slice(0, limit)
        },

        /** Excedente do `avatars` + o `overflowCount` manual (caso composição). */
        overflowTotal(): number {
            const hidden = this.normalizedAvatars.length - this.visibleAvatars.length
            return hidden + Math.max(0, Number(this.overflowCount) || 0)
        },

        /** Tamanho numérico (px) quando `size` não é um degrau da escala. */
        numericSize(): number | null {
            if (this.size === undefined || this.size === null || (this.size as unknown) === '') return null
            const n = typeof this.size === 'number' ? this.size : Number(this.size)
            return Number.isFinite(n) ? n : null
        },

        sizeClass(): string {
            if (this.size === undefined || this.size === null || (this.size as unknown) === '') return ''
            return this.numericSize === null ? `arcana-avatar-group--${this.size}` : ''
        },

        shapeClass(): string {
            return this.shape ? `arcana-avatar-group--${this.shape}` : ''
        },

        rootStyle(): Record<string, string> | undefined {
            const style: Record<string, string> = {}
            if (this.numericSize !== null) style['--arcana-avatar-size'] = `${this.numericSize}px`
            // `spacing` (espaço positivo) vence `overlap` (sobreposição).
            if (this.spacing !== undefined && this.spacing !== null) {
                style['--arcana-avatar-group-overlap'] = `${-Number(this.spacing)}px`
            } else if (this.overlap !== undefined && this.overlap !== null) {
                style['--arcana-avatar-group-overlap'] = `${Number(this.overlap)}px`
            }
            return Object.keys(style).length ? style : undefined
        },
    },
} as Component
</script>
