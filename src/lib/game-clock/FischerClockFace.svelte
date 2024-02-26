<script lang="ts">
  import TimeLeft from '$lib/game-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/game-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/game-clock/SecondaryInfo.svelte';
  import type { FischerState, FischerClockSettings } from '$lib/timing/fischer';

  export let state: FischerState;
  export let settings: FischerClockSettings;
</script>

<PrimaryInfo>
  <TimeLeft secondsRemaining={state.countdown} />
</PrimaryInfo>
<SecondaryInfo>
  (+<TimeLeft secondsRemaining={settings.incrementSeconds} />)
</SecondaryInfo>
