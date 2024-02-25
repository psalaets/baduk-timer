<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { EventHandler } from 'svelte/elements';

  import {
    mainTimeOptions,
    timePerPeriodOptions,
    parse as parseByoyomi
  } from '$lib/new-game/byoyomi-options';
  import { parse as parseCanadian } from '$lib/new-game/canadian-options';
  import Field from '$lib/new-game/Field.svelte';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let canCancel = false;

  export const timeSystemOptions = [
    { value: 'byoyomi', display: 'Byo-Yomi' },
    { value: 'canadian', display: 'Canadian' },
    { value: 'fischer', display: 'Fischer' }
  ];

  /**
   * @return value of a form field, or empty string if there is no value
   */
  const get = (fieldName: string, formData: FormData) => {
    const value = formData.get(fieldName);
    if (value instanceof File) {
      throw new Error(`Unexpected file value for ${fieldName}`);
    } else {
      return value ?? '';
    }
  };

  const parse = (formData: FormData) => {
    const timeSystem = get('timeSystem', formData);

    if (timeSystem === 'byoyomi') {
      return parseByoyomi({
        type: timeSystem,
        mainTimeSeconds: get('mainTime', formData),
        timePerPeriodSeconds: get('timePerPeriod', formData),
        periods: get('periods', formData)
      });
    } else if (timeSystem === 'canadian') {
      return parseCanadian({
        type: timeSystem,
        mainTimeSeconds: get('mainTime', formData),
        timePerPeriodSeconds: get('timePerPeriod', formData),
        stonesPerPeriod: get('stonesPerPeriod', formData)
      });
    } else if (timeSystem === 'fischer') {
      return {
        type: timeSystem as 'fischer',
        initialSeconds: 4,
        incrementSeconds: 5,
        maxSeconds: 6
      };
    } else {
      throw new Error(`Unexpected time system: ${timeSystem}`);
    }
  };

  const submitDispatcher = createEventDispatcher<{ submit: ClockSettings }>();
  const cancelDispatcher = createEventDispatcher();

  const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = (event) => {
    const form = event.target as HTMLFormElement;
    const values = parse(new FormData(form));

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
          <option value={opt.value} selected={opt.default}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="time-per-period">Time per period</label>
      <select id="time-per-period" name="timePerPeriod">
        {#each timePerPeriodOptions as opt (opt.value)}
          <option value={opt.value} selected={opt.default}>{opt.display}</option>
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
