<script lang="ts">
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
      <div class="field">
        <label for={`${idPrefix}-hours`}>Hours</label>
        <input
          id={`${idPrefix}-hours`}
          name={`${namePrefix}Hours`}
          type="tel"
          size="6"
          bind:value={hours}
        />
      </div>
    {/if}
    <div class="field">
      <label for={`${idPrefix}-minutes`}>Minutes</label>
      <input
        id={`${idPrefix}-minutes`}
        name={`${namePrefix}Minutes`}
        type="tel"
        size="6"
        bind:value={minutes}
      />
    </div>
    <div class="field">
      <label for={`${idPrefix}-seconds`}>Seconds</label>
      <input
        id={`${idPrefix}-seconds`}
        name={`${namePrefix}Seconds`}
        type="tel"
        size="6"
        bind:value={seconds}
      />
    </div>
  </div>
</fieldset>

<style>
  .fields {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .field label {
    display: block;
  }
</style>
