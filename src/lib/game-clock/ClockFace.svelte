<script lang="ts">
  export let myTurn: boolean;
  export let timeout: boolean;
  export let invertsInPortrait: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<div
  class="clock-face"
  class:my-turn={myTurn}
  class:inverts-in-portrait={invertsInPortrait}
  class:timeout
  on:click
  role="button"
  tabindex="0"
>
  <slot />
</div>

<style>
  .clock-face {
    height: 100%;
    padding: 10px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    background-color: var(--clock-face-background-color);
    background-image: radial-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
    box-shadow: inset 0 0 10px 0 rgba(0, 0, 0, 0.2);
    color: var(--clock-face-foreground-color);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    line-height: 1;
    text-align: center;
    transition:
      box-shadow 0.2s,
      background-color 0.2s,
      background-image 0.2s;
    transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }

  @media (orientation: landscape) {
    .clock-face {
      font-size: calc((45vw - 2em) / 6);
    }
  }

  @media (orientation: portrait) {
    .clock-face {
      font-size: calc((100vw - 2em) / 6);
    }
  }

  .my-turn {
    background-color: var(--clock-face-my-turn-color);
    box-shadow: 0 0 10px 0 var(--clock-face-my-turn-color);
    background-image: radial-gradient(rgba(208, 255, 0, 0.3), rgba(208, 255, 0, 0));
  }

  .timeout {
    background-color: var(--clock-face-timeout-color);
  }

  @media (orientation: portrait) {
    .inverts-in-portrait {
      transform: rotate(180deg);
    }
  }
</style>
