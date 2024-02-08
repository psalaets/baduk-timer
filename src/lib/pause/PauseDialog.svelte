<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Dialog from '$lib/Dialog.svelte';
</script>

<Dialog on:close>
  <span slot="title">Paused</span>
  <div slot="content">
    <ul>
      <li>New game</li>
    </ul>
  </div>
  <div slot="footer" let:close>
    <button on:click={() => close()}>Resume</button>
  </div>
</Dialog>
