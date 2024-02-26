<script lang="ts">
  import { mainTimeOptions, timePerPeriodOptions, getInitialValues } from './canadian-options';
  import Field from '$lib/new-game/Field.svelte';

  const initialValues = getInitialValues();

  let initialMainTime = String(initialValues.mainTimeSeconds);
  let initialTimePerPeriod = String(initialValues.timePerPeriodSeconds);
  let initialStonesPerPeriod = String(initialValues.stonesPerPeriod);
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
