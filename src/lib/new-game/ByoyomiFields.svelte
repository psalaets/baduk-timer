<script lang="ts">
  import {
    mainTimeOptions,
    timePerPeriodOptions,
    DEFAULT_MAIN_TIME_SECONDS,
    DEFAULT_TIME_PER_PERIOD_SECONDS,
    DEFAULT_PERIODS
  } from './byoyomi-options';
  import Field from '$lib/new-game/Field.svelte';

  let initialMainTime = String(DEFAULT_MAIN_TIME_SECONDS);
  let initialTimePerPeriod = String(DEFAULT_TIME_PER_PERIOD_SECONDS);
  let initialPeriods = DEFAULT_PERIODS;
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
  <label for="periods">Periods</label>
  <input id="periods" name="periods" type="number" bind:value={initialPeriods} />
</Field>
