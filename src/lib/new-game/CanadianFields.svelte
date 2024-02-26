<script lang="ts">
  import { mainTimeOptions, timePerPeriodOptions } from './byoyomi-options';
  import Field from '$lib/new-game/Field.svelte';
</script>

<Field>
  <label for="main-time">Main Time</label>
  <select id="main-time" name="mainTimeSeconds">
    {#each mainTimeOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>
<Field>
  <label for="time-per-period">Time per period</label>
  <select id="time-per-period" name="timePerPeriodSeconds">
    {#each timePerPeriodOptions as opt (opt.value)}
      <option value={opt.value}>{opt.display}</option>
    {/each}
  </select>
</Field>
<Field>
  <label for="stones-per-period">Stones per period</label>
  <input id="stones-per-period" name="stonesPerPeriod" type="number" />
</Field>
