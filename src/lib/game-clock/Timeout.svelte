<script lang="ts">
  // Renders timeout message if true, renders slot content otherwise
  export let timeout: boolean;
</script>

{#if timeout}
  <span class="timeout">TIMEOUT</span>
{:else}
  <slot />
{/if}

<style>
  .timeout {
    color: red;
    font-weight: bold;
  }
</style>
