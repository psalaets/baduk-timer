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

<div class="game-clock">
  <GenericClockFace
    state={gameClock.black}
    myTurn={whoseTurn === 'black'}
    {settings}
    on:stone={() => dispatchStone('stone', 'black')}
  />

  <div class="middle">
    <slot />
  </div>

  <GenericClockFace
    state={gameClock.white}
    myTurn={whoseTurn === 'white'}
    {settings}
    on:stone={() => dispatchStone('stone', 'white')}
  />
</div>

<style>
  .game-clock {
    container-name: game-clock;
    container-type: inline-size;

    display: flex;

    flex: 1 1 100%;
    max-width: 100rem;

    font-size: 1cqi;
  }

  .middle {
    display: flex;
    align-items: center;
    padding: 2cqi;
  }
</style>
