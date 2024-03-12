<script lang="ts">
  import TimeLeft from '$lib/game-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/game-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/game-clock/SecondaryInfo.svelte';
  import Timeout from '$lib/game-clock/Timeout.svelte';
  import type { ByoyomiState } from '$lib/timing/byoyomi';
  import type { ByoyomiClockSettings } from '$lib/clock-settings/byoyomi-settings';

  export let state: ByoyomiState;
  export let settings: ByoyomiClockSettings;
</script>

{#if state.phase === 'main'}
  <PrimaryInfo>
    <TimeLeft secondsRemaining={state.countdown} />
  </PrimaryInfo>
  <SecondaryInfo>
    <Timeout timeout={state.timeout}>
      {#if state.periodsRemaining === 0}
        <span class="sudden-death">(SD)</span>
      {:else}
        +<TimeLeft secondsRemaining={settings.timePerPeriodSeconds} /> ({settings.periods})
      {/if}
    </Timeout>
  </SecondaryInfo>
{:else}
  <PrimaryInfo>
    <TimeLeft secondsRemaining={state.countdown} />
  </PrimaryInfo>
  <SecondaryInfo>
    <Timeout timeout={state.timeout}>
      {#if state.periodsRemaining === 1}
        <span class="sudden-death">(SD)</span>
      {:else}
        ({state.periodsRemaining} periods)
      {/if}
    </Timeout>
  </SecondaryInfo>
{/if}

<style>
  .sudden-death {
    color: var(--color-danger);
  }
</style>
