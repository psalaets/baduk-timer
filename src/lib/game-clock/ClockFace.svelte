<script lang="ts">
  export let myTurn: boolean;
  export let timeout: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<div class="clock-face" class:timeout on:click role="button" tabindex="0">
  <div class="inner" class:my-turn={myTurn} class:timeout>
    <slot />
  </div>
</div>

<style>
  .clock-face {
    /** Game clock is this element's flex container */
    flex: 1 1 100%;

    padding: 1cqi;

    background-color: var(--clock-face-background-color);
    color: var(--clock-face-foreground-color);
    border: 3px solid var(--clock-face-foreground-color);

    border-radius: 1.4cqi;
  }

  .timeout {
    color: var(--color-danger);
    border-color: var(--color-danger);
  }

  /** Extra container element used to acheive double border effect */
  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1cqi;

    padding: 1.4cqi;

    /** Hidden but still takes up space by default */
    border: 3px solid var(--clock-face-background-color);
    border-radius: 0.8cqi;
  }

  .inner.my-turn {
    /** No longer hidden */
    border-color: var(--clock-face-foreground-color);
  }

  .inner.timeout {
    border-color: var(--color-danger);
  }
</style>
