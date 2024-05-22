<script lang="ts">
  import { timeRemaining } from '$lib/game-clock/time-remaining';

  export let secondsRemaining = 0;
</script>

<div>{timeRemaining(secondsRemaining)}</div>

<style>

</style>