<script lang="ts">
  import TimeLeft from '$lib/dual-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/dual-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/dual-clock/SecondaryInfo.svelte';
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
