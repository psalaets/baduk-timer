<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mainTimeLabel, timePerPeriodLabel } from '$lib/new-game/form-options';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let settings: ClockSettings;

  const dispatcher = createEventDispatcher();
</script>

<div>
  <h2>{settings.type}</h2>
  <div>Main time: {mainTimeLabel(settings.mainTimeSeconds)}</div>
  <div>Time per period: {timePerPeriodLabel(settings.timePerPeriodSeconds)}</div>
  <div>Periods: {settings.periods}</div>
  <button on:click={() => dispatcher('begin')}>Begin Game</button>
</div>
