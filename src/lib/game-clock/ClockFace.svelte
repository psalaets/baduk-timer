<script lang="ts">
  export let myTurn: boolean;
  export let timeout: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<div class="clock-face {timeout ? 'timeout' : ''}" on:click role="button" tabindex="0">
  <div class="inner {myTurn ? 'my-turn' : ''} {timeout ? 'timeout' : ''}">
    <slot />
  </div>
</div>

<style>
  .clock-face {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    flex: 1 1 100%;

    text-align: center;
    padding: 1rem;

    background-color: var(--clock-face-background-color);
    color: var(--clock-face-foreground-color);
    border: 3px solid var(--clock-face-foreground-color);

    border-radius: 1.4rem;
  }

  .timeout {
    color: var(--color-danger);
    border-color: var(--color-danger);
  }

  .inner {
    padding: 1rem;

    /** Hidden but still takes up space by default */
    border: 3px solid var(--clock-face-background-color);
    border-radius: 0.8rem;
  }

  .inner.my-turn {
    /** No longer hidden */
    border-color: var(--clock-face-foreground-color);
  }

  .inner.timeout {
    border-color: var(--color-danger);
  }
</style>
