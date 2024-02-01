<script lang="ts">
  export let secondsRemaining = 0;

  function wholeSeconds(secondsLeft: number) {
    return Math.trunc(secondsLeft);
  }

  function minutes(secondsLeft: number, padSize = 1) {
    const wholeMinutes = Math.trunc(wholeSeconds(secondsLeft) / 60);
    return String(wholeMinutes).padStart(padSize, '0');
  }

  function seconds(secondsLeft: number, padSize = 2) {
    return String(Math.trunc(secondsLeft % 60)).padStart(padSize, '0');
  }
</script>

<span>{minutes(secondsRemaining)}:{seconds(secondsRemaining)}</span>
