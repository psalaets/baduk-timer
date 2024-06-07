<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import GenericClockFace from '$lib/game-clock/GenericClockFace.svelte';
  import type { GameClockState } from '$lib/timing/game-clock';
  import type { ClockSettings } from '$lib/clock-settings/clock-settings';
  import type { Color } from '$lib/color';

  export let gameClock: GameClockState;
  export let settings: ClockSettings;
  /**
   * Who plays next stone, or 'either' if either player can play (i.e. start the game)
   */
  export let whoseTurn: Color | 'either';

  const dispatchStone = createEventDispatcher();
</script>

<div class="c-clock-layout">
  <div class="c-clock-layout__timer">
    <GenericClockFace
      state={gameClock.black}
      myTurn={whoseTurn === 'black'}
      invertsInPortrait={true}
      {settings}
      on:stone={() => dispatchStone('stone', 'black')}
    />
  </div>

  <div class="c-clock-layout__menu">
    <slot />
  </div>
  <div class="c-clock-layout__timer">
    <GenericClockFace
      state={gameClock.white}
      myTurn={whoseTurn === 'white'}
      invertsInPortrait={false}
      {settings}
      on:stone={() => dispatchStone('stone', 'white')}
    />
  </div>
</div>

<style>
  .c-clock-layout {
    width: 100vw;
    height: 100vh;
    display: grid;
  }
  @media (orientation: landscape) {
    .c-clock-layout {
      grid-template-columns: [clock-alpha] 42.5% [menu] 15% [clock-omega] 42.5%;
    }
    .c-clock-layout__menu {
      padding-top: 1em;
      padding-bottom: 1em;
    }
  }
  @media (orientation: portrait) {
    .c-clock-layout {
      grid-template-rows: [clock-alpha] 45% [menu] 10% [clock-omega] 45%;
    }
  }
  .c-clock-layout__timer {
    padding: 1em;
  }
  .c-clock-layout__menu {
    padding-left: 1em;
    padding-right: 1em;
  }
</style>
