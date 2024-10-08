<script lang="ts">
  import { getInitialValues } from '$lib/new-game/byoyomi-fields';
  import Field from '$lib/new-game/Field.svelte';
  import TimeFields from '$lib/new-game/TimeFields.svelte';
  import Input from '$lib/new-game/Input.svelte';

  const initialValues = getInitialValues();

  let mainTime = initialValues.mainTime;
  let timePerPeriod = initialValues.timePerPeriod;
  let periods = String(initialValues.periods);
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
  minutes={timePerPeriod.minutes}
  seconds={timePerPeriod.seconds}
  legend="Time per period"
/>

<Field>
  <label for="periods">Periods</label>
  <Input id="periods" name="periods" type="number" bind:value={periods} autocomplete="off" />
</Field>
