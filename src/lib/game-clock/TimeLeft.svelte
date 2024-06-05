<script lang="ts">
  import { timeRemaining } from '$lib/game-clock/time-remaining';

  export let secondsRemaining = 0;
</script>

<span>{timeRemaining(secondsRemaining)}</span>

<style>

</style>