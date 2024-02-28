<script lang="ts">
  import {
    initialTimeOptions,
    incrementOptions,
    maxTimeOptions,
    getInitialValues
  } from './fischer-options';
  import Field from '$lib/new-game/Field.svelte';

  const initialValues = getInitialValues();

  let initialSeconds = String(initialValues.initialSeconds);
  let incrementSeconds = String(initialValues.incrementSeconds);
  let maxSeconds = String(initialValues.maxSeconds);
</script>

<Field>
  <label for="initial-time">Initial Time</label>
  <select id="initial-time" name="initialTimeSeconds" bind:value={initialSeconds}>
    {#each initialTimeOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>

<Field>
  <label for="increment">Increment</label>
  <select id="increment" name="incrementSeconds" bind:value={incrementSeconds}>
    {#each incrementOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>

<Field>
  <label for="max-time">Maximum Time</label>
  <select id="max-time" name="maxTimeSeconds" bind:value={maxSeconds}>
    {#each maxTimeOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>
