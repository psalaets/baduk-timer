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

    --clock-bg-color: var(--clock-face-light);
    --clock-text-color: var(--clock-face-dark);
    --clock-border-color: var(--clock-face-dark);

    background-color: var(--clock-bg-color);
    color: var(--clock-text-color);
    border: 3px solid var(--clock-border-color);

    border-radius: 1.4rem;
  }

  .inner {
    padding: 1rem;

    border: 3px solid var(--clock-bg-color);
    border-radius: 0.8rem;
  }

  .inner.my-turn {
    border: 3px solid var(--clock-border-color);
  }

  .timeout {
    color: red;
    border-color: red;
  }

  .inner.timeout {
    border-color: red;
  }
</style>
