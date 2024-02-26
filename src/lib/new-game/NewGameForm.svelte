<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { EventHandler } from 'svelte/elements';

  import {
    mainTimeOptions,
    timePerPeriodOptions,
    parse as parseByoyomi
  } from '$lib/new-game/byoyomi-options';
  import { parse as parseCanadian } from '$lib/new-game/canadian-options';
  import { parse as parseFischer } from '$lib/new-game/fischer-options';
  import {
    initialTimeOptions,
    incrementOptions,
    maxTimeOptions
  } from '$lib/new-game/fischer-options';
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
    <Field>
      <label for="main-time">Main Time</label>
      <select id="main-time" name="mainTime">
        {#each mainTimeOptions as opt (opt.value)}
          <option value={opt.value}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="time-per-period">Time per period</label>
      <select id="time-per-period" name="timePerPeriod">
        {#each timePerPeriodOptions as opt (opt.value)}
          <option value={opt.value}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="periods">Periods</label>
      <input id="periods" name="periods" type="number" autocomplete="off" />
    </Field>
  {:else if timingSystem === 'canadian'}
    <Field>
      <label for="main-time">Main Time</label>
      <select id="main-time" name="mainTime">
        {#each mainTimeOptions as opt (opt.value)}
          <option value={opt.value}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="time-per-period">Time per period</label>
      <select id="time-per-period" name="timePerPeriod">
        {#each timePerPeriodOptions as opt (opt.value)}
          <option value={opt.value}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="stones-per-period">Stones per period</label>
      <input id="stones-per-period" name="stonesPerPeriod" type="number" autocomplete="off" />
    </Field>
  {:else if timingSystem === 'fischer'}
    <Field>
      <label for="initial-time">Initial Time</label>
      <select id="initial-time" name="initialTime">
        {#each initialTimeOptions as opt (opt.value)}
          <option value={opt.value}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="increment">Increment</label>
      <select id="increment" name="increment">
        {#each incrementOptions as opt (opt.value)}
          <option value={opt.value}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="max-time">Maximum Time</label>
      <select id="max-time" name="maxTime">
        {#each maxTimeOptions as opt (opt.value)}
          <option value={opt.value}>{opt.display}</option>
        {/each}
      </select>
    </Field>
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
