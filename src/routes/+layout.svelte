<script lang="ts">
  import '../reset.css';
  import '../global.css';

  import { browser } from '$app/environment';
  import { isLanguageSet } from '$lib/app-settings';
  import { goto } from '$app/navigation';

  if (browser && !isLanguageSet()) {
    goto('/setup');
  }
</script>

<svelte:head>
  <title>BadukTimer</title>
  <meta name="description" content="Game clock for Go / Baduk / Weiqi / Igo" />
</svelte:head>

<slot />
