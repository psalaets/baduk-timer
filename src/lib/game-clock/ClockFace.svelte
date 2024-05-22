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
    margin: 3cqi;
    border-radius: 3cqi;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2cqi;
    user-select: none;

    /** Game clock is this element's flex container */
    flex: 1 1 100%;

    background-color: var(--clock-face-background-color);
    background-image: radial-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, 0));
    box-shadow: inset 0 0 10px 0 rgba(0, 0, 0, .2);
    color: var(--clock-face-foreground-color);
    text-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    font-size: calc(100vw / 6);
    line-height: 1;
    text-align: center;
    transition: box-shadow .2s, background-color .2s, background-image .2s;
    transition-timing-function: cubic-bezier(.18,.89,.32,1.28);
  }

  .my-turn {
    background-color: var(--clock-face-my-turn-color);
    box-shadow: 0 0 10px 0 var(--clock-face-my-turn-color);
    background-image: radial-gradient(rgba(208, 255, 0, .3), rgba(208, 255, 0, 0));
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
