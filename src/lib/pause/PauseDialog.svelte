<script lang="ts">
  import Dialog from '$lib/Dialog.svelte';
</script>

<Dialog on:close>
  <span slot="title">Paused</span>
  <div slot="body">
    <a href="/new">new game</a>
  </div>
  <div slot="footer" let:close>
    <button on:click={close}>Resume</button>
  </div>
</Dialog>
