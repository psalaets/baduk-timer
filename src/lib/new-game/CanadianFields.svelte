<script lang="ts">
  import Field from '$lib/components/Field.svelte';
  import Input from '$lib/components/Input.svelte';
  import TimeFields from '$lib/new-game/TimeFields.svelte';
  import { getInitialValues } from './canadian-fields';
  import { i18nStore } from '$lib/i18n/i18n-store';

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
  legend={$i18nStore.mainTimeLabel}
/>

<TimeFields
  idPrefix="time-per-period"
  namePrefix="timePerPeriod"
  hasHours
  hours={timePerPeriod.hours}
  minutes={timePerPeriod.minutes}
  seconds={timePerPeriod.seconds}
  legend={$i18nStore.timePerPeriodLabel}
/>

<Field>
  <label for="stones-per-period">{$i18nStore.stonesPerPeriodLabel}</label>
  <Input
    id="stones-per-period"
    name="stonesPerPeriod"
    type="number"
    bind:value={stonesPerPeriod}
    autocomplete="off"
  />
</Field>
