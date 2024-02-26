<script lang="ts">
  import {
    initialTimeOptions,
    incrementOptions,
    maxTimeOptions,
    DEFAULT_INITIAL_TIME_SECONDS,
    DEFAULT_INCREMENT_SECONDS,
    DEFAULT_MAX_TIME_SECONDS
  } from './fischer-options';
  import Field from '$lib/new-game/Field.svelte';

  let initialInitialTime = String(DEFAULT_INITIAL_TIME_SECONDS);
  let initialIncrement = String(DEFAULT_INCREMENT_SECONDS);
  let initialMaxTime = String(DEFAULT_MAX_TIME_SECONDS);
</script>

<Field>
  <label for="initial-time">Initial Time</label>
  <select id="initial-time" name="initialTimeSeconds" bind:value={initialInitialTime}>
    {#each initialTimeOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>

<Field>
  <label for="increment">Increment</label>
  <select id="increment" name="incrementSeconds" bind:value={initialIncrement}>
    {#each incrementOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>

<Field>
  <label for="max-time">Maximum Time</label>
  <select id="max-time" name="maxTimeSeconds" bind:value={initialMaxTime}>
    {#each maxTimeOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>
