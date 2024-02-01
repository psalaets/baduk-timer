<script lang="ts">
  import type { Unsubscriber } from 'svelte/store';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { settings, game } from '$lib/game';
  import DualClock from '$lib/dual-clock/DualClock.svelte';
  import type { Color } from '$lib/color';

  let unsub: Unsubscriber | null = null;

  onMount(() => {
    unsub = game.subscribe((g) => {
      if (g.clock == null) {
        goto('/new');
      } else {
        g.clock.begin();
      }
    });
  });

  onDestroy(() => {
    if (unsub) {
      unsub();
      unsub = null;
    }
  });

  function onStone(color: Color) {
    game.stonePlayed(color);
  }
</script>

<a href="/new">new game</a>

{#if $game.clock && $settings}
  <DualClock
    gameClock={$game.clock}
    settings={$settings}
    on:stone={(event) => onStone(event.detail)}
  />
{/if}
