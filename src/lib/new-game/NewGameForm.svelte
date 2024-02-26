<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { EventHandler } from 'svelte/elements';

  import { parse as parseByoyomi } from '$lib/new-game/byoyomi-options';
  import ByoyomiFields from '$lib/new-game/ByoyomiFields.svelte';

  import { parse as parseCanadian } from '$lib/new-game/canadian-options';
  import CanadianFields from '$lib/new-game/CanadianFields.svelte';

  import { parse as parseFischer } from '$lib/new-game/fischer-options';
  import FischerFields from '$lib/new-game/FischerFields.svelte';

  import Field from '$lib/new-game/Field.svelte';
  import type { ClockSettings } from '$lib/timing/clock-settings';
  import { getter } from './get-form-value';

  export let canCancel = false;

  export const timeSystemOptions = [
    { value: 'byoyomi', display: 'Byo-Yomi' },
    { value: 'canadian', display: 'Canadian' },
    { value: 'fischer', display: 'Fischer' }
  ];

  const parse = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const timeSystem = getter(formData)('timeSystem');

    if (timeSystem === 'byoyomi') {
      return parseByoyomi(formData);
    } else if (timeSystem === 'canadian') {
      return parseCanadian(formData);
    } else if (timeSystem === 'fischer') {
      return parseFischer(formData);
    } else {
      throw new Error(`Unexpected time system: ${timeSystem}`);
    }
  };

  const submitDispatcher = createEventDispatcher<{ submit: ClockSettings }>();
  const cancelDispatcher = createEventDispatcher();

  const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = (event) => {
    const form = event.target as HTMLFormElement;
    const values = parse(form);

    // store values in localstorage

    submitDispatcher('submit', values);
  };

  const onCancel = () => cancelDispatcher('cancel');

  let timingSystem: string;
</script>

<form aria-label="Time settings" method="POST" on:submit|preventDefault={onSubmit} novalidate>
  <Field>
    <label for="time-system">Time System</label>
    <select id="time-system" name="timeSystem" bind:value={timingSystem}>
      {#each timeSystemOptions as opt (opt.value)}
        <option value={opt.value}>{opt.display}</option>
      {/each}
    </select>
  </Field>

  {#if timingSystem === 'byoyomi'}
    <ByoyomiFields />
  {:else if timingSystem === 'canadian'}
    <CanadianFields />
  {:else if timingSystem === 'fischer'}
    <FischerFields />
  {:else}
    Unhandled timing system: {timingSystem}
  {/if}

  <div class="buttons">
    {#if canCancel}
      <button type="button" on:click={onCancel}>Cancel</button>
    {/if}
    <button type="submit">Apply</button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin-inline: auto;
    width: 400px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
  }
</style>
