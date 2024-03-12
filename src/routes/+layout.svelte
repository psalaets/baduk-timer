<script lang="ts">
  import '../reset.css';
  import '../global.css';
  import { setGameContext, initialGameContext } from '$lib/game-context';

  setGameContext(initialGameContext);
</script>

<svelte:head>
  <title>BadukTimer</title>
  <meta name="description" content="Game clock for Go / Baduk / Weiqi / Igo" />
</svelte:head>

<slot />
