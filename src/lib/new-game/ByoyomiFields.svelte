<script lang="ts">
  import { mainTimeOptions, timePerPeriodOptions } from './byoyomi-options';
  import Field from '$lib/new-game/Field.svelte';
  import ErrorMessage from '$lib/new-game/ErrorMessage.svelte';

  type ErrorMessages = {
    periods?: string;
  };

  export let errors: ErrorMessages = {};
</script>

<Field>
  <label for="main-time">Main Time</label>
  <select id="main-time" name="mainTime">
    {#each mainTimeOptions as opt (opt.id)}
      <option value={opt.id}>{opt.display}</option>
    {/each}
  </select>
</Field>
<Field>
  <label for="time-per-period">Time per period</label>
  <select id="time-per-period" name="timePerPeriod">
    {#each timePerPeriodOptions as opt (opt.id)}
      <option value={opt.id}>{opt.display}</option>
    {/each}
  </select>
</Field>
<Field>
  <label for="periods">Periods</label>
  <input id="periods" name="periods" type="number" />
  {#if errors && errors.periods}
    <ErrorMessage message={errors.periods} />
  {/if}
</Field>
