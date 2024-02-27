<script lang="ts">
  import { mainTimeOptions, timePerPeriodOptions, getInitialValues } from './byoyomi-options';
  import Field from '$lib/new-game/Field.svelte';

  const initialValues = getInitialValues();

  let initialMainTime = String(initialValues.mainTimeSeconds);
  let initialTimePerPeriod = String(initialValues.timePerPeriodSeconds);
  let initialPeriods = String(initialValues.periods);
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
