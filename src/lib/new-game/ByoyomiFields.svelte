<script lang="ts">
  import {
    mainTimeOptions,
    timePerPeriodOptions,
    getInitialValues
  } from '$lib/new-game/byoyomi-fields';
  import Field from '$lib/new-game/Field.svelte';

  const initialValues = getInitialValues();

  let mainTimeSeconds = String(initialValues.mainTimeSeconds);
  let timePerPeriodSeconds = String(initialValues.timePerPeriodSeconds);
  let periods = String(initialValues.periods);
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
  <label for="periods">Periods</label>
  <input
    id="periods"
    name="periods"
    type="number"
    bind:value={periods}
    autocomplete="off"
    size="5"
  />
</Field>
