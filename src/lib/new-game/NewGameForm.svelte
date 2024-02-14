<script lang="ts">
  import {
    safeParse,
    object,
    variant,
    literal,
    picklist,
    transform,
    custom,
    string,
    type Input,
    type Output
  } from 'valibot';
  import { createEventDispatcher } from 'svelte';
  import type { EventHandler } from 'svelte/elements';

  import { mainTimeOptions, timePerPeriodOptions } from './byoyomi-options';
  import Field from '$lib/new-game/Field.svelte';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let canCancel = false;

  export const timeSystemOptions = [
    { id: 'byoyomi', display: 'Byo-Yomi' },
    { id: 'canadian', display: 'Canadian' },
    { id: 'fischer', display: 'Fischer' }
  ];

  const nonNegativeInteger = transform(
    string([custom((v) => !!v && v.trim().length > 0 && !isNaN(Number(v)), 'Must be a number')]),
    (v) => Math.max(0, Math.trunc(Number(v)))
  );

  const byoyomiSchema = object({
    type: literal('byoyomi'),
    mainTimeSeconds: transform(picklist(mainTimeOptions.map((o) => o.id)), (v) => Number(v)),
    timePerPeriodSeconds: transform(picklist(timePerPeriodOptions.map((o) => o.id)), (v) =>
      Number(v)
    ),
    periods: nonNegativeInteger
  });

  type FormSchema = Input<typeof byoyomiSchema>;
  type ByoyomiSchema = Output<typeof byoyomiSchema>;

  const canadianSchema = object({
    type: literal('canadian'),
    mainTimeSeconds: picklist(mainTimeOptions.map((o) => o.id)),
    timePerPeriodSeconds: picklist(timePerPeriodOptions.map((o) => o.id)),
    stonesPerPeriod: nonNegativeInteger
  });

  const mainSchema = variant('type', [byoyomiSchema, canadianSchema]);

  const submitDispatcher = createEventDispatcher<{ submit: ClockSettings }>();
  const cancelDispatcher = createEventDispatcher();

  const initialData = {
    periods: 5,
    mainTimeSeconds: mainTimeOptions.filter((o) => o.default).map((o) => o.id)[0],
    timePerPeriodSeconds: timePerPeriodOptions.filter((o) => o.default).map((o) => o.id)[0]
  };

  let errors: any = {};

  const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = (event) => {
    const form = event.target as HTMLFormElement;

    const getStringValue = (form: HTMLFormElement, defaultValue: string) => {
      const formData = new FormData(form);
      return (name: string) => {
        const value = formData.get(name);
        if (value instanceof File) {
          throw new Error(`Unexpected file value for ${name}`);
        } else {
          return value ?? defaultValue;
        }
      };
    };

    const get = getStringValue(form, '');
    const raw: FormSchema = {
      type: 'byoyomi',
      mainTimeSeconds: get('mainTime'),
      timePerPeriodSeconds: get('timePerPeriod'),
      periods: get('periods')
    };

    const result = safeParse(byoyomiSchema, raw);

    if (result.success) {
      errors = {};
      submitDispatcher('submit', result.output);
    } else {
      result.issues.forEach((issue) => {
        if (issue.path && issue.path[0].type === 'object') {
          const key = issue.path[0].key;
          errors = { ...errors, [key]: issue.message };
        }
      });
    }
  };

  const onCancel = () => cancelDispatcher('cancel');

  let timingSystem: string;
</script>

<form aria-label="Time settings" method="POST" on:submit|preventDefault={onSubmit} novalidate>
  <pre>{JSON.stringify(errors)}</pre>
  <Field>
    <label for="time-system">Time System</label>
    <select id="time-system" name="timeSystem" bind:value={timingSystem}>
      {#each timeSystemOptions as opt (opt.id)}
        <option value={opt.id}>{opt.display}</option>
      {/each}
    </select>
  </Field>

  {#if timingSystem === 'byoyomi'}
    <Field>
      <label for="main-time">Main Time</label>
      <select id="main-time" name="mainTime">
        {#each mainTimeOptions as opt (opt.id)}
          <option value={opt.id} selected={opt.default}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="time-per-period">Time per period</label>
      <select id="time-per-period" name="timePerPeriod">
        {#each timePerPeriodOptions as opt (opt.id)}
          <option value={opt.id} selected={opt.default}>{opt.display}</option>
        {/each}
      </select>
    </Field>

    <Field>
      <label for="periods">Periods</label>
      <input id="periods" name="periods" type="number" autocomplete="off" />
      {#if errors.periods}<span>{errors.periods}</span>{/if}
    </Field>
  {:else if timingSystem === 'canadian'}
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
