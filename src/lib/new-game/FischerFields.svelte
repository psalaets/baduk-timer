<script lang="ts">
  import { getInitialValues } from './fischer-fields';
  import TimeFields from './TimeFields.svelte';

  const initialValues = getInitialValues();

  let initialTime = initialValues.initialTime;
  let increment = initialValues.increment;
  let maxTime = initialValues.maxTime;
</script>

<TimeFields
  idPrefix="initial-time"
  namePrefix="initialTime"
  hasHours
  hours={initialTime.hours}
  minutes={initialTime.minutes}
  seconds={initialTime.seconds}
  legend="Initial Time"
/>

<TimeFields
  idPrefix="increment"
  namePrefix="increment"
  minutes={increment.minutes}
  seconds={increment.seconds}
  legend="Increment"
/>

<TimeFields
  idPrefix="max-time"
  namePrefix="maxTime"
  hasHours
  hours={maxTime.hours}
  minutes={maxTime.minutes}
  seconds={maxTime.seconds}
  legend="Maximum Time"
/>
