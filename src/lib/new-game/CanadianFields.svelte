<script lang="ts">
  import { getInitialValues } from './canadian-fields';
  import Field from '$lib/new-game/Field.svelte';
  import TimeFields from '$lib/new-game/TimeFields.svelte';
  import Input from '$lib/new-game/Input.svelte';

  const initialValues = getInitialValues();

  let mainTime = initialValues.mainTime;
  let timePerPeriod = initialValues.timePerPeriod;
  let stonesPerPeriod = String(initialValues.stonesPerPeriod);
</script>

<TimeFields
  idPrefix="main-time"
  namePrefix="mainTime"
  hasHours
  hours={mainTime.hours}
  minutes={mainTime.minutes}
  seconds={mainTime.seconds}
  legend="Main Time"
/>

<TimeFields
  idPrefix="time-per-period"
  namePrefix="timePerPeriod"
  hasHours
  hours={timePerPeriod.hours}
  minutes={timePerPeriod.minutes}
  seconds={timePerPeriod.seconds}
  legend="Time per period"
/>

<Field>
  <label for="stones-per-period">Stones per period</label>
  <Input
    id="stones-per-period"
    name="stonesPerPeriod"
    type="number"
    bind:value={stonesPerPeriod}
    autocomplete="off"
  />
</Field>
