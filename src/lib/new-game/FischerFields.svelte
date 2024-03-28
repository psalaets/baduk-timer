<script lang="ts">
  import {
    initialTimeOptions,
    incrementOptions,
    maxTimeOptions,
    getInitialValues
  } from './fischer-fields';
  import Field from '$lib/new-game/Field.svelte';
  import Select from '$lib/new-game/Select.svelte';

  const initialValues = getInitialValues();

  let initialSeconds = String(initialValues.initialSeconds);
  let incrementSeconds = String(initialValues.incrementSeconds);
  let maxSeconds = String(initialValues.maxSeconds);
</script>

<Field>
  <label for="initial-time">Initial Time</label>
  <Select
    id="initial-time"
    name="initialTimeSeconds"
    bind:value={initialSeconds}
    options={initialTimeOptions}
  ></Select>
</Field>

<Field>
  <label for="increment">Increment</label>
  <Select
    id="increment"
    name="incrementSeconds"
    bind:value={incrementSeconds}
    options={incrementOptions}
  ></Select>
</Field>

<Field>
  <label for="max-time">Maximum Time</label>
  <Select
    id="max-time"
    name="maxTimeSeconds"
    bind:value={maxSeconds}
    options={maxTimeOptions}
  ></Select>
</Field>
