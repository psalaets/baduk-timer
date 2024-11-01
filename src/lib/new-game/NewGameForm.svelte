<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { EventHandler } from 'svelte/elements';
  import { BYOYOMI, CANADIAN, FISCHER } from '$lib/clock-settings/clock-type';
  import type { ClockSettings } from '$lib/clock-settings/clock-settings';

  import Button from '$lib/components/Button.svelte';
  import Field from '$lib/components/Field.svelte';
  import Select from '$lib/components/Select.svelte';
  import { getter } from './get-form-value';

  import { getInitialValues } from '$lib/new-game/common-fields';
  import { saveSettings as saveCommonSettings } from '$lib/clock-settings/common-settings';

  import { parse as parseByoyomi } from '$lib/new-game/byoyomi-fields';
  import { saveSettings as saveByoyomiSettings } from '$lib/clock-settings/byoyomi-settings';
  import ByoyomiFields from '$lib/new-game/ByoyomiFields.svelte';

  import { parse as parseCanadian } from '$lib/new-game/canadian-fields';
  import { saveSettings as saveCanadianSettings } from '$lib/clock-settings/canadian-settings';
  import CanadianFields from '$lib/new-game/CanadianFields.svelte';

  import { parse as parseFischer } from '$lib/new-game/fischer-fields';
  import { saveSettings as saveFischerSettings } from '$lib/clock-settings/fischer-settings';
  import FischerFields from '$lib/new-game/FischerFields.svelte';
  import { i18nStore } from '$lib/i18n/i18n-store';

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
    saveCommonSettings(settings);

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

  let { type } = getInitialValues();
  const typeOptions = [
    { value: BYOYOMI, display: $i18nStore.byoyomi },
    { value: CANADIAN, display: $i18nStore.canadian },
    { value: FISCHER, display: $i18nStore.fischer }
  ];
</script>

<form
  aria-label={$i18nStore.timeSettingsLabel}
  method="POST"
  on:submit|preventDefault={onSubmit}
  novalidate
>
  <Field>
    <label for="time-system">{$i18nStore.timeSystemLabel}</label>
    <Select id="time-system" name="timeSystem" bind:value={type} options={typeOptions}></Select>
  </Field>

  {#if type === BYOYOMI}
    <ByoyomiFields />
  {:else if type === CANADIAN}
    <CanadianFields />
  {:else if type === FISCHER}
    <FischerFields />
  {:else}
    Unhandled timing system: {type}
  {/if}

  <div class="buttons">
    {#if canCancel}
      <Button type="button" on:click={onCancel}>{$i18nStore.cancelNewGameButton}</Button>
    {/if}
    <Button type="submit">{$i18nStore.applySettingsButton}</Button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
</style>
