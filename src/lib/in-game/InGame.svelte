<script lang="ts">
  import { type Game, isGameInProgress } from '$lib/game';
  import GameClock from '$lib/game-clock/GameClock.svelte';
  import { i18nStore } from '$lib/i18n/i18n-store';
  import MenuDialog from '$lib/menu/MenuDialog.svelte';

  export let game: Game;

  const { paused, clockState, whoseTurn, phase } = game;

  $: gameInProgress = isGameInProgress($phase);
  let menuOpen = false;
</script>

<!-- Render game effects -->
<slot />

<GameClock
  gameClock={$clockState}
  settings={game.settings}
  whoseTurn={gameInProgress ? $whoseTurn : 'either'}
  on:stone={(event) => game.stonePlayed(event.detail)}
>
  {#if gameInProgress}
    <div class="c-menu-bar">
      <button class="c-menu-bar__button" on:click={() => game.pause()}
        >{$i18nStore.pauseButton}</button
      >
      <button
        class="c-menu-bar__button c-menu-bar__button--icon c-menu-bar__button--hides-in-landscape"
        on:click={() => game.pause()}>⏸</button
      >
      <button
        class="c-menu-bar__button c-menu-bar__button--hides-in-landscape c-menu-bar__button--flip"
        on:click={() => game.pause()}>{$i18nStore.pauseButton}</button
      >
    </div>
  {:else}
    <div class="c-menu-bar">
      <button class="c-menu-bar__button" on:click={() => (menuOpen = true)}
        >{$i18nStore.menuButton}</button
      >
    </div>
  {/if}

  {#if gameInProgress && $paused}
    <MenuDialog on:close={() => game.resume()} paused={$paused} settings={game.settings} />
  {:else if menuOpen}
    <MenuDialog on:close={() => (menuOpen = false)} settings={game.settings} />
  {/if}
</GameClock>

<style>
  .c-menu-bar {
    display: flex;
    height: 100%;
    background-color: rgb(24, 24, 24);
    border-radius: var(--container-border-radius);
  }
  .c-menu-bar:hover,
  .c-menu-bar:active {
    background-color: black;
  }
  .c-menu-bar__button {
    font-weight: bold;
    text-transform: uppercase;
    color: var(--clock-face-foreground-color);
    flex: 1 1 0%;
    border: none;
    background-color: transparent;
  }

  .c-menu-bar__button--flip {
    transform: rotate(180deg);
  }
  @media (orientation: landscape) {
    .c-menu-bar__button--hides-in-landscape {
      display: none;
    }
  }
</style>
