<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mainTimeOptions, timePerPeriodOptions } from './form-options';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let canCancel = false;

  const submitDispatcher = createEventDispatcher<{ submit: ClockSettings }>();
  const cancelDispatcher = createEventDispatcher();

  function onSubmit(event: SubmitEvent) {
    const formData = new FormData(event.target as HTMLFormElement);

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
</script>

<form aria-label="Game settings" on:submit|preventDefault="{onSubmit}">
  <div class="field">
    <label for="main-time">Main Time</label>
    <select id="main-time" name="mainTime">
      {#each mainTimeOptions as [key, value] (key)}
      <option value="{key}">{value}</option>
      {/each}
    </select>
  </div>
  <div class="field">
    <label for="time-per-period">Time per period</label>
    <select id="time-per-period" name="timePerPeriod">
      {#each timePerPeriodOptions as [key, value] (key)}
      <option value="{key}">{value}</option>
      {/each}
    </select>
  </div>
  <div class="field">
    <label for="periods">Periods</label>
    <input id="periods" name="periods" type="tel" />
  </div>

  <div class="buttons">
    {#if canCancel}
    <button type="button" on:click="{onCancel}">Cancel</button>
    {/if}
    <button type="submit">Apply</button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    margin-inline: auto;
    width: 400px;
  }

  form > div {
    display: flex;
    justify-content: space-between;
  }

  form > .field + .field {
    margin-top: 1rem;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
  }
</style>
