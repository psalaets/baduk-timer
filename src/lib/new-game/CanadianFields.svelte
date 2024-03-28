<script lang="ts">
  import { mainTimeOptions, timePerPeriodOptions, getInitialValues } from './canadian-fields';
  import Field from '$lib/new-game/Field.svelte';
  import Select from '$lib/new-game/Select.svelte';

  const initialValues = getInitialValues();

  let mainTimeSeconds = String(initialValues.mainTimeSeconds);
  let timePerPeriodSeconds = String(initialValues.timePerPeriodSeconds);
  let stonesPerPeriod = String(initialValues.stonesPerPeriod);
</script>

<Field>
  <label for="main-time">Main Time</label>
  <Select
    id="main-time"
    name="mainTimeSeconds"
    bind:value={mainTimeSeconds}
    options={mainTimeOptions}
  ></Select>
</Field>
<Field>
  <label for="time-per-period">Time per period</label>
  <Select
    id="time-per-period"
    name="timePerPeriodSeconds"
    bind:value={timePerPeriodSeconds}
    options={timePerPeriodOptions}
  ></Select>
</Field>
<Field>
  <label for="stones-per-period">Stones per period</label>
  <input
    id="stones-per-period"
    name="stonesPerPeriod"
    type="number"
    bind:value={stonesPerPeriod}
    autocomplete="off"
  />
</Field>
