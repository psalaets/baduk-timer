<script lang="ts">
  export let id: string;
  export let name: string;
  export let options: Array<{ value: string; display: string; disabled?: boolean }>;
  export let value: string;
</script>

<select {id} {name} bind:value on:change>
  {#each options as opt (opt.value)}
    <option disabled={opt.disabled} value={opt.value}>{opt.display}</option>
  {/each}
</select>

<style>
  select {
    appearance: none;
    width: 100%;

    padding-inline: 0.5rem;
    padding-block: 0.25rem;

    border: 0.0625rem solid darkgray;
    border-radius: 0.25rem;
    box-shadow: none;
    font-weight: 400;
    overflow: visible;

    background-color: #ffffff;
    line-height: 1.5;

    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
  }

  select:focus-visible {
    outline-width: 0.0625rem;
    outline-color: var(--focused-input-outline-color);
  }
</style>
