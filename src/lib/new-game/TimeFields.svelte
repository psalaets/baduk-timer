<script lang="ts">
  import Field from '$lib/components/Field.svelte';
  import Input from '$lib/components/Input.svelte';
  import { i18nStore } from '$lib/i18n/i18n-store';

  export let legend: string;
  /** Prefix for fields ids */
  export let idPrefix: string;
  /** Prefix for fields names */
  export let namePrefix: string;
  /** Show the hours input? */
  export let hasHours = false;
  export let hours = 0;
  export let minutes: number;
  export let seconds: number;
</script>

<fieldset>
  <legend>{legend}</legend>
  <div class="fields">
    {#if hasHours}
      <Field>
        <label for={`${idPrefix}-hours`}>{$i18nStore.hoursLabel}</label>
        <Input
          id={`${idPrefix}-hours`}
          name={`${namePrefix}Hours`}
          type="number"
          autocomplete="off"
          size="6"
          bind:value={hours}
        />
      </Field>
    {/if}
    <Field>
      <label for={`${idPrefix}-minutes`}>{$i18nStore.minutesLabel}</label>
      <Input
        id={`${idPrefix}-minutes`}
        name={`${namePrefix}Minutes`}
        type="number"
        autocomplete="off"
        size="6"
        bind:value={minutes}
      />
    </Field>
    <Field>
      <label for={`${idPrefix}-seconds`}>{$i18nStore.secondsLabel}</label>
      <Input
        id={`${idPrefix}-seconds`}
        name={`${namePrefix}Seconds`}
        type="number"
        autocomplete="off"
        size="6"
        bind:value={seconds}
      />
    </Field>
  </div>
</fieldset>

<style>
  .fields {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
</style>
