<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { EventHandler } from 'svelte/elements';
  import { BYOYOMI, CANADIAN, FISCHER } from '$lib/timing/clock-type';

  import {
    timeSystemOptions,
    saveSettings as saveCommonSettings,
    getInitialValues
  } from '$lib/new-game/common-options';
  import {
    parse as parseByoyomi,
    saveSettings as saveByoyomiSettings
  } from '$lib/new-game/byoyomi-options';
  import ByoyomiFields from '$lib/new-game/ByoyomiFields.svelte';

  import {
    parse as parseCanadian,
    saveSettings as saveCanadianSettings
  } from '$lib/new-game/canadian-options';
  import CanadianFields from '$lib/new-game/CanadianFields.svelte';

  import {
    parse as parseFischer,
    saveSettings as saveFischerSettings
  } from '$lib/new-game/fischer-options';
  import FischerFields from '$lib/new-game/FischerFields.svelte';

  import Field from '$lib/new-game/Field.svelte';
  import type { ClockSettings } from '$lib/timing/clock-settings';
  import { getter } from './get-form-value';

  export let canCancel = false;

  const parse = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const timeSystem = getter(formData)('timeSystem');

    if (timeSystem === BYOYOMI) {
      return parseByoyomi(formData);
    } else if (timeSystem === CANADIAN) {
      return parseCanadian(formData);
    } else if (timeSystem === FISCHER) {
      return parseFischer(formData);
    } else {
      throw new Error(`Unexpected time system: ${timeSystem}`);
    }
  };

  const saveSettings = (settings: ClockSettings) => {
    saveCommonSettings({ timeSystem: settings.type });

    if (settings.type === BYOYOMI) {
      saveByoyomiSettings(settings);
    } else if (settings.type === CANADIAN) {
      saveCanadianSettings(settings);
    } else if (settings.type === FISCHER) {
      saveFischerSettings(settings);
    }
  };

  const submitDispatcher = createEventDispatcher<{ submit: ClockSettings }>();
  const cancelDispatcher = createEventDispatcher();

  const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = (event) => {
    const form = event.target as HTMLFormElement;
    const values = parse(form);

    saveSettings(values);
    submitDispatcher('submit', values);
  };

  const onCancel = () => cancelDispatcher('cancel');

  let { timeSystem } = getInitialValues();
</script>

<form aria-label="Time settings" method="POST" on:submit|preventDefault={onSubmit} novalidate>
  <Field>
    <label for="time-system">Time System</label>
    <select id="time-system" name="timeSystem" bind:value={timeSystem}>
      {#each timeSystemOptions as opt (opt.value)}
        <option value={opt.value}>{opt.display}</option>
      {/each}
    </select>
  </Field>

  {#if timeSystem === BYOYOMI}
    <ByoyomiFields />
  {:else if timeSystem === CANADIAN}
    <CanadianFields />
  {:else if timeSystem === FISCHER}
    <FischerFields />
  {:else}
    Unhandled timing system: {timeSystem}
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
