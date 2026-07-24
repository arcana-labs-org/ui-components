<script lang="ts">
  /**
   * `<ArcanaSettingsEditButton>` — helper aditivo (parity com o port React/Angular; NÃO
   * existe como SFC Vue separado — no Vue é markup inline no slot de ação). Botão "Alterar"
   * com o ícone lápis, classe `arcana-settings-list__edit-btn`, pra usar no slot de ação
   * de um `<ArcanaSettingsListItem>`.
   */
  let {
    disabled = false,
    label = "Alterar",
    onClick,
  }: {
    disabled?: boolean;
    label?: string;
    onClick?: (e: MouseEvent) => void;
  } = $props();
</script>

<button
  class="arcana-settings-list__edit-btn"
  type="button"
  {disabled}
  onclick={(e) => onClick?.(e)}
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
  {label}
</button>
