<script lang="ts">
  import {
    mainTimeOptions,
    timePerPeriodOptions,
    DEFAULT_MAIN_TIME_SECONDS,
    DEFAULT_TIME_PER_PERIOD_SECONDS,
    DEFAULT_STONES_PER_PERIOD
  } from './canadian-options';
  import Field from '$lib/new-game/Field.svelte';

  let initialMainTime = String(DEFAULT_MAIN_TIME_SECONDS);
  let initialTimePerPeriod = String(DEFAULT_TIME_PER_PERIOD_SECONDS);
  let initialStonesPerPeriod = String(DEFAULT_STONES_PER_PERIOD);
</script>

<Field>
  <label for="main-time">Main Time</label>
  <select id="main-time" name="mainTimeSeconds" bind:value={initialMainTime}>
    {#each mainTimeOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>
<Field>
  <label for="time-per-period">Time per period</label>
  <select id="time-per-period" name="timePerPeriodSeconds" bind:value={initialTimePerPeriod}>
    {#each timePerPeriodOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>
<Field>
  <label for="stones-per-period">Stones per period</label>
  <input
    id="stones-per-period"
    name="stonesPerPeriod"
    type="number"
    bind:value={initialStonesPerPeriod}
  />
</Field>
