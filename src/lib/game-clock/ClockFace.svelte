<script lang="ts">
  export let myTurn: boolean;
  export let timeout: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<div class="clock-face" class:my-turn={myTurn} class:timeout on:click role="button" tabindex="0">
  <slot />
</div>

<style>
  .clock-face {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2cqi;

    /** Game clock is this element's flex container */
    flex: 1 1 100%;

    background-color: var(--clock-face-background-color);
    color: var(--clock-face-foreground-color);
  }

  .my-turn {
    background-color: var(--clock-face-my-turn-color);
  }

  .timeout {
    background-color: var(--clock-face-timeout-color);
  }
</style>
