<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TimeLeft from './TimeLeft.svelte';
  import PrimaryInfo from './PrimaryInfo.svelte';
  import SecondaryInfo from './SecondaryInfo.svelte';
  import { pluralize } from '$lib/util/pluralize';
  import type { Color } from '$lib/color';
  import type { ByoyomiData, ByoyomiClockSettings } from '$lib/timing/byoyomi';

  export let clock: ByoyomiData;
  export let settings: ByoyomiClockSettings;

  export let color: Color;

  const dispatch = createEventDispatcher();
</script>

<div class={`clock-face" ${color}`}>
  {#if clock.phase === 'main'}
    <PrimaryInfo>
      <TimeLeft secondsRemaining={clock.countdown} />
    </PrimaryInfo>
    <SecondaryInfo>
      +<TimeLeft secondsRemaining={settings.timePerPeriodSeconds} /> ({settings.periods})
    </SecondaryInfo>
  {:else}
    <PrimaryInfo>
      <TimeLeft secondsRemaining={clock.countdown} />
    </PrimaryInfo>
    <SecondaryInfo
      >({clock.periodsRemaining} {pluralize(clock.periodsRemaining, 'period')})</SecondaryInfo
    >
  {/if}

  <div>
    <button type="button" on:click={() => dispatch('stone')}>Played stone</button>
  </div>
</div>

<style>
  .clock-face {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    flex: 1 1 100%;

    text-align: center;
    padding: 1rem;

    background-color: var(--clock-bg-color);
    color: var(--clock-text-color);
    border: 1px solid var(--clock-border-color);
  }

  .white {
    --clock-bg-color: var(--clock-face-light);
    --clock-text-color: var(--clock-face-dark);
    --clock-border-color: var(--clock-face-dark);
  }

  .black {
    --clock-bg-color: var(--clock-face-dark);
    --clock-text-color: var(--clock-face-light);
    --clock-border-color: var(--clock-face-light);
  }
</style>
