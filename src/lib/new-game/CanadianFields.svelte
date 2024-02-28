<script lang="ts">
  import { mainTimeOptions, timePerPeriodOptions, getInitialValues } from './canadian-fields';
  import Field from '$lib/new-game/Field.svelte';

  const initialValues = getInitialValues();

  let mainTimeSeconds = String(initialValues.mainTimeSeconds);
  let timePerPeriodSeconds = String(initialValues.timePerPeriodSeconds);
  let stonesPerPeriod = String(initialValues.stonesPerPeriod);
</script>

<Field>
  <label for="main-time">Main Time</label>
  <select id="main-time" name="mainTimeSeconds" bind:value={mainTimeSeconds}>
    {#each mainTimeOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>
<Field>
  <label for="time-per-period">Time per period</label>
  <select id="time-per-period" name="timePerPeriodSeconds" bind:value={timePerPeriodSeconds}>
    {#each timePerPeriodOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>
<Field>
  <label for="stones-per-period">Stones per period</label>
  <input id="stones-per-period" name="stonesPerPeriod" type="number" bind:value={stonesPerPeriod} />
</Field>
