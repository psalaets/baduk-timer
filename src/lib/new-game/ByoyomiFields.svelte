<script lang="ts">
  import Field from '$lib/components/Field.svelte';
  import Input from '$lib/components/Input.svelte';
  import TimeFields from '$lib/new-game/TimeFields.svelte';
  import { getInitialValues } from '$lib/new-game/byoyomi-fields';
  import { i18nStore } from '$lib/i18n/i18n-store';
  import { capitalize } from '$lib/util/capitalize';

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
  legend={$i18nStore.mainTimeLabel}
/>

<TimeFields
  idPrefix="time-per-period"
  namePrefix="timePerPeriod"
  minutes={timePerPeriod.minutes}
  seconds={timePerPeriod.seconds}
  legend={$i18nStore.timePerPeriodLabel}
/>

<Field>
  <label for="periods">{capitalize($i18nStore.periods)}</label>
  <Input id="periods" name="periods" type="number" bind:value={periods} autocomplete="off" />
</Field>
