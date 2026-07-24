/**
 * Stack global de z-index para overlays modais (ShadcnDialog, Modal legacy).
 *
 * Por que existe:
 * - Vários componentes de modal teleportam pro <body> (ShadcnDialog, Modal legacy via
 *   Bootstrap-style). Como viram siblings no body, o z-index precisa ser dinamico pra
 *   garantir que o ULTIMO aberto fique POR CIMA — desempate por DOM order nao funciona
 *   quando um modal e aberto a partir de DENTRO de outro (ex: TaskDetailsModal aberto
 *   de dentro de um ShadcnDialog).
 * - Antes: cada componente tinha seu proprio counter local. ShadcnDialog comecava em
 *   10000+, Modal usava z-index hardcoded 9998 → Modal aberto de dentro de ShadcnDialog
 *   ficava ATRAS porque 9998 < 10000.
 * - Agora: counter unico compartilhado. Todo modal/dialog aberto pega o proximo slot
 *   de z-index (BASE + 2*N) e libera ao fechar. Reseta pro BASE quando todos fecham
 *   pra evitar drift infinito ao longo de muitos open/close cycles.
 *
 * Layout do z-index:
 * - BASE_Z_INDEX = 10000
 * - Cada modal aberto consome 2 slots (overlay e content podem precisar de niveis
 *   distintos). Caller decide se usa o N retornado direto (overlay) ou N+1 (content).
 * - Element Plus popovers (--el-index-popper) sao mantidos DINAMICAMENTE acima do
 *   counter via syncPopperZIndex(). Antes era hardcoded em 10100 e popovers ficavam
 *   ATRAS de modais aninhados se o counter crescesse demais — agora e sempre
 *   counter + POPPER_OFFSET, garantindo que popovers fiquem por cima independente
 *   de quantos modais ja abriram na sessao.
 * - ConfirmDialog/AlertDialog usam 999999 hardcoded (universal "Tem certeza?") e
 *   passam por cima de tudo — esse comportamento e intencional e independente do stack.
 */

const BASE_Z_INDEX = 10000
const Z_INDEX_STEP = 2

/**
 * Quantos pontos o popper do Element Plus fica acima do counter.
 * 100 e folga generosa pra Element Plus incrementar internamente seu proprio
 * counter (cada popover novo aberto pega +1) sem nunca alcancar o proximo modal.
 */
const POPPER_OFFSET = 100

/**
 * Valor minimo do --el-index-popper. Acima do BASE pra cobrir o caso "nenhum
 * modal aberto, mas existem popovers no fundo da pagina" — popper precisa
 * estar acima de elementos comuns (.modal-mask de modais nao gerenciados,
 * etc.). 10100 mantem o comportamento antigo do default.
 */
const POPPER_BASE_Z_INDEX = 10100

let counter = BASE_Z_INDEX
let openCount = 0

/**
 * Atualiza --el-index-popper pra ficar sempre acima do counter atual.
 * Element Plus le essa CSS variable como base do z-index dos popovers, e
 * a regra `.el-popper { z-index: var(--el-index-popper) !important }` no
 * ShadcnDialog garante que TODOS os popovers ja abertos e os futuros pegam
 * esse valor instantaneamente.
 */
function syncPopperZIndex(): void {
    if (typeof document === 'undefined') return
    const popperZ = Math.max(POPPER_BASE_Z_INDEX, counter + POPPER_OFFSET)
    document.documentElement.style.setProperty('--el-index-popper', String(popperZ))
}

/**
 * Reserva o proximo nivel de z-index pro modal/dialog que esta abrindo.
 * Retorna o z-index do overlay; content deve usar `retorno + 1`.
 */
export function acquireZIndex(): number {
    counter += Z_INDEX_STEP
    openCount++
    syncPopperZIndex()
    return counter
}

/**
 * Libera o slot ao fechar. Quando o ultimo modal fecha, reseta o counter pro
 * BASE — evita o numero crescer indefinidamente ao longo da sessao.
 */
export function releaseZIndex(): void {
    openCount = Math.max(0, openCount - 1)
    if (openCount === 0) {
        counter = BASE_Z_INDEX
    }
    syncPopperZIndex()
}
