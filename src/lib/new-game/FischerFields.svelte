<script lang="ts">
  import { i18nStore } from '$lib/i18n/i18n-store';
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
  legend={$i18nStore.initialTimeLabel}
/>

<TimeFields
  idPrefix="increment"
  namePrefix="increment"
  minutes={increment.minutes}
  seconds={increment.seconds}
  legend={$i18nStore.incrementLabel}
/>

<TimeFields
  idPrefix="max-time"
  namePrefix="maxTime"
  hasHours
  hours={maxTime.hours}
  minutes={maxTime.minutes}
  seconds={maxTime.seconds}
  legend={$i18nStore.maximumTimeLabel}
/>
