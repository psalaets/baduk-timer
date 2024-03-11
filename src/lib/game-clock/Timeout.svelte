<script lang="ts">
  // Renders timeout message if true, otherwise renders slot content
  export let timeout: boolean;
</script>

{#if timeout}
  <span class="timeout">TIMEOUT</span>
{:else}
  <slot />
{/if}

<style>
  .timeout {
    font-weight: bold;
  }
</style>
