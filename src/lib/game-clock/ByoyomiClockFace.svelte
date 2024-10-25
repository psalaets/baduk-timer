<script lang="ts">
  import TimeLeft from '$lib/game-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/game-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/game-clock/SecondaryInfo.svelte';
  import Timeout from '$lib/game-clock/Timeout.svelte';
  import type { ByoyomiState } from '$lib/timing/byoyomi';
  import type { ByoyomiClockSettings } from '$lib/clock-settings/byoyomi-settings';
  import { toSeconds } from '$lib/clock-settings/duration';
  import { i18nStore } from '$lib/i18n/i18n-store';

  export let state: ByoyomiState;
  export let settings: ByoyomiClockSettings;

  const secondsPerPeriod = toSeconds(settings.timePerPeriod);
</script>

{#if state.phase === 'main'}
  <PrimaryInfo>
    <TimeLeft secondsRemaining={state.countdown} />
  </PrimaryInfo>
  <SecondaryInfo>
    <Timeout timeout={state.timeout}>
      {#if state.periodsRemaining === 0}
        <span class="sudden-death">({$i18nStore.suddenDeath})</span>
      {:else}
        <TimeLeft secondsRemaining={secondsPerPeriod} /> ({settings.periods})
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
        <span class="sudden-death">({$i18nStore.suddenDeath})</span>
      {:else}
        ({state.periodsRemaining} {$i18nStore.periods})
      {/if}
    </Timeout>
  </SecondaryInfo>
{/if}

<style>
  .sudden-death {
    color: var(--color-danger);
  }
</style>
