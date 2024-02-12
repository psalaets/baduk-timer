<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ByoyomiFields from '$lib/new-game/ByoyomiFields.svelte';
  import CanadianFields from '$lib/new-game/CanadianFields.svelte';
  import Field from '$lib/new-game/Field.svelte';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let canCancel = false;

  export const timeSystemOptions = [
    { id: 'byoyomi', display: 'Byo-Yomi' },
    { id: 'canadian', display: 'Canadian' },
    { id: 'fischer', display: 'Fischer' }
  ];

  const submitDispatcher = createEventDispatcher<{ submit: ClockSettings }>();
  const cancelDispatcher = createEventDispatcher();

  function onSubmit(event: SubmitEvent) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // TODO validate settings

    const settings: ClockSettings = {
      type: 'byoyomi',
      mainTimeSeconds: Number(formData.get('mainTime')),
      timePerPeriodSeconds: Number(formData.get('timePerPeriod')),
      periods: Number(formData.get('periods'))
    };

    submitDispatcher('submit', settings);
  }

  function onCancel() {
    cancelDispatcher('cancel');
  }

  let timeSystem: string;
</script>

<form aria-label="Game settings" on:submit|preventDefault={onSubmit}>
  System: {timeSystem}
  <Field>
    <label for="time-system">Time System</label>
    <select id="time-system" name="timeSystem" bind:value={timeSystem}>
      {#each timeSystemOptions as opt (opt.id)}
        <option value={opt.id}>{opt.display}</option>
      {/each}
    </select>
  </Field>
  {#if timeSystem === 'byoyomi'}
    <ByoyomiFields />
  {:else if timeSystem === 'canadian'}
    <CanadianFields />
  {:else if timeSystem === 'fischer'}
    TODO fischer fields
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
