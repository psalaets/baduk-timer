<script lang="ts">
  import { initialTimeOptions, incrementOptions, maxTimeOptions } from './fischer-options';
  import Field from '$lib/new-game/Field.svelte';
</script>

<Field>
  <label for="initial-time">Initial Time</label>
  <select id="initial-time" name="initialTimeSeconds">
    {#each initialTimeOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>

<Field>
  <label for="increment">Increment</label>
  <select id="increment" name="incrementSeconds">
    {#each incrementOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>

<Field>
  <label for="max-time">Maximum Time</label>
  <select id="max-time" name="maxTimeSeconds">
    {#each maxTimeOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>
