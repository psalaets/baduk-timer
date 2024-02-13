<script lang="ts">
  import { object, variant, number, literal, minValue, picklist, transform } from 'valibot';
  import { createEventDispatcher } from 'svelte';
  import { superForm, defaults, intProxy } from 'sveltekit-superforms/client';
  import { valibot, valibotClient } from 'sveltekit-superforms/adapters';

  import { mainTimeOptions, timePerPeriodOptions } from './byoyomi-options';
  import Field from '$lib/new-game/Field.svelte';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let canCancel = false;

  export const timeSystemOptions = [
    { id: 'byoyomi', display: 'Byo-Yomi' },
    { id: 'canadian', display: 'Canadian' },
    { id: 'fischer', display: 'Fischer' }
  ];

  const byoyomiSchema = object({
    type: literal('byoyomi'),
    mainTimeSeconds: picklist(mainTimeOptions.map((o) => Number(o.id))),
    timePerPeriodSeconds: picklist(timePerPeriodOptions.map((o) => Number(o.id))),
    periods: number('Must be a number', [minValue(0, 'Cannot be less than 0')])
  });

  const canadiaSchema = object({
    type: literal('canadian'),
    mainTimeSeconds: picklist(mainTimeOptions.map((o) => Number(o.id))),
    timePerPeriodSeconds: picklist(timePerPeriodOptions.map((o) => Number(o.id))),
    stonesPerPeriod: number('Must be a number', [minValue(1, 'Cannot be less than 1')])
  });

  const mainSchema = variant('type', [byoyomiSchema, canadiaSchema]);

  const submitDispatcher = createEventDispatcher<{ submit: ClockSettings }>();
  const cancelDispatcher = createEventDispatcher();

  const initialData = {
    periods: 5,
    mainTimeSeconds: mainTimeOptions.filter((o) => o.default).map((o) => Number(o.id))[0],
    timePerPeriodSeconds: timePerPeriodOptions.filter((o) => o.default).map((o) => Number(o.id))[0]
  };

  const { form, errors, enhance } = superForm(defaults(initialData, valibot(mainSchema)), {
    SPA: true,
    validators: valibotClient(mainSchema),
    onUpdated(event) {
      if (event.form.valid) {
        console.log('submitting...');

        submitDispatcher('submit', event.form.data);
      }
    }
  });

  function onCancel() {
    cancelDispatcher('cancel');
  }

  // Bind inputs to proxies (and not $form.foo) to get string => int parsing in
  // places that svelte doesn't already do it
  const mainTimeProxy = intProxy(form, 'mainTimeSeconds');
  const timePerPeriodProxy = intProxy(form, 'timePerPeriodSeconds');
</script>

<form aria-label="Time settings" use:enhance method="POST" novalidate>
  <pre>{JSON.stringify($errors, null, 2)}</pre>
  <pre>{JSON.stringify($form, null, 2)}</pre>
  <Field>
    <label for="time-system">Time System</label>
    <select id="time-system" name="timeSystem" bind:value={$form.type}>
      {#each timeSystemOptions as opt (opt.id)}
        <option value={opt.id}>{opt.display}</option>
      {/each}
    </select>
    {#if $errors.type}
      <span>{$errors.type}</span>
    {/if}
  </Field>

  {#if $form.type === 'byoyomi'}
    <Field>
      <label for="main-time">Main Time</label>
      <select id="main-time" name="mainTime" bind:value={$mainTimeProxy}>
        {#each mainTimeOptions as opt (opt.id)}
          <option value={opt.id}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="time-per-period">Time per period</label>
      <select id="time-per-period" name="timePerPeriod" bind:value={$timePerPeriodProxy}>
        {#each timePerPeriodOptions as opt (opt.id)}
          <option value={opt.id}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="periods">Periods</label>
      <input
        id="periods"
        name="periods"
        type="number"
        autocomplete="off"
        bind:value={$form.periods}
      />
      {#if $errors.periods}
        <span>{$errors.periods}</span>
      {/if}
    </Field>
  {:else if $form.type === 'canadian'}
    <Field>
      <label for="main-time">Main Time</label>
      <select id="main-time" name="mainTime" bind:value={$mainTimeProxy}>
        {#each mainTimeOptions as opt (opt.id)}
          <option value={opt.id}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="time-per-period">Time per period</label>
      <select id="time-per-period" name="timePerPeriod" bind:value={$timePerPeriodProxy}>
        {#each timePerPeriodOptions as opt (opt.id)}
          <option value={opt.id}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="stones-per-period">Stones per period</label>
      <input
        id="stones-per-period"
        name="stonesPerPeriod"
        type="number"
        autocomplete="off"
        bind:value={$form.stonesPerPeriod}
      />
      {#if $errors.stonesPerPeriod}
        <span>{$errors.stonesPerPeriod}</span>
      {/if}
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
