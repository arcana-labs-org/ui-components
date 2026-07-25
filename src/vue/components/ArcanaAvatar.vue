<template>
    <span
        class="arcana-avatar"
        :class="[sizeClass, `arcana-avatar--${shape}`, { 'has-image': showImage }]"
        :style="rootStyle"
    >
        <img
            v-if="showImage"
            class="arcana-avatar__img"
            :src="src"
            :alt="alt"
            @error="onError"
        />
        <span v-else-if="initials" class="arcana-avatar__initials">{{ initials }}</span>
        <i v-else-if="icon" :class="['arcana-avatar__icon', icon]" aria-hidden="true"></i>
        <svg v-else class="arcana-avatar__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
                d="M12 12.6a4.3 4.3 0 1 0 0-8.6 4.3 4.3 0 0 0 0 8.6zm0 1.8c-3.6 0-7.2 1.85-7.2 4.1V20h14.4v-1.5c0-2.25-3.6-4.1-7.2-4.1z"
            />
        </svg>
    </span>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarShape = 'circle' | 'square'

/**
 * `<ArcanaAvatar>` — avatar de usuário/entidade com fallback em cascata.
 *
 * Cascata (para no primeiro que existir): **imagem → iniciais → ícone → silhueta**.
 * A imagem que falha ao carregar (`onerror`) sai da cascata em runtime: o
 * componente marca a `src` como quebrada e cai para o próximo degrau, então uma
 * URL morta nunca deixa um quadrado vazio na tela. Trocar a `src` re-arma a
 * tentativa.
 *
 * API:
 * - `src` / `alt` — imagem. `alt` vai no `<img>` nativo
 * - `initials` — texto curto do fallback (o CSS já aplica `text-transform: uppercase`)
 * - `icon` — classe de ícone do fallback (ex: `fa-solid fa-user`). Sem `initials`
 *   nem `icon`, entra uma silhueta em SVG inline (não depende de FontAwesome)
 * - `size` — `'xs' | 'sm' | 'md' | 'lg' | 'xl'` (default `'md'` = 40px) **ou um
 *   número de px** (ex: `:size="56"`), que vira inline style. Fonte, raio do
 *   quadrado e ícone derivam do tamanho por `calc()`
 * - `shape` — `'circle'` (default) | `'square'`
 * - `color` — cor de fundo do fallback. Qualquer string CSS (hex, `rgb()`,
 *   `var(...)`); vai como inline style em `--arcana-avatar-color`. Sem ela vale o
 *   token `--arcana-solid`, ou seja, o avatar deriva do acento da paleta e
 *   acompanha o modo escuro
 *
 * Emite `error` (evento nativo do `<img>`) quando a imagem falha.
 *
 * Dentro de um `<ArcanaAvatarGroup>` com `size`, o tamanho do GRUPO vence o deste
 * componente — o grupo seta `--arcana-avatar-size` e os filhos herdam. Ver o
 * cabeçalho de `styles/parts/avatar.scss`.
 */
export default {
    name: 'ArcanaAvatar',

    emits: ['error'],

    props: {
        src: {
            type: String,
            default: '',
        },
        alt: {
            type: String,
            default: '',
        },
        initials: {
            type: String,
            default: '',
        },
        /** Classe de ícone do fallback (ex: `fa-solid fa-user`). */
        icon: {
            type: String,
            default: '',
        },
        /** `'xs' | 'sm' | 'md' | 'lg' | 'xl'` ou um número de px. */
        size: {
            type: [String, Number] as PropType<AvatarSize | number>,
            default: 'md',
        },
        shape: {
            type: String as PropType<AvatarShape>,
            default: 'circle',
            validator: (v: string) => ['circle', 'square'].includes(v),
        },
        /** Cor de fundo do fallback. Default: token `--arcana-solid` (acento). */
        color: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            /** `src` que já falhou — usada para pular a imagem na cascata. */
            failedSrc: null as string | null,
        }
    },

    computed: {
        /** Tamanho numérico (px) quando `size` não é um degrau da escala. */
        numericSize(): number | null {
            const n = typeof this.size === 'number' ? this.size : Number(this.size)
            return Number.isFinite(n) && String(this.size).trim() !== '' ? n : null
        },

        sizeClass(): string {
            return this.numericSize === null ? `arcana-avatar--${this.size}` : ''
        },

        showImage(): boolean {
            return !!this.src && this.failedSrc !== this.src
        },

        rootStyle(): Record<string, string> | undefined {
            const style: Record<string, string> = {}
            if (this.numericSize !== null) style['--arcana-avatar-own-size'] = `${this.numericSize}px`
            if (this.color) style['--arcana-avatar-color'] = this.color
            return Object.keys(style).length ? style : undefined
        },
    },

    watch: {
        // Nova `src` re-arma a tentativa de carregar (a falha era da URL anterior).
        src() {
            this.failedSrc = null
        },
    },

    methods: {
        onError(event: Event) {
            this.failedSrc = this.src
            this.$emit('error', event)
        },
    },
} as Component
</script>
