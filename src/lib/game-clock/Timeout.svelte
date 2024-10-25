<script lang="ts">
  import { i18nStore } from '$lib/i18n/i18n-store';

  // Renders timeout message if true, otherwise renders slot content
  export let timeout: boolean;
</script>

{#if timeout}
  <span class="timeout">{$i18nStore.timeout}</span>
{:else}
  <slot />
{/if}

<style>
  .timeout {
    font-weight: bold;
  }
</style>
