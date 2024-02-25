<script lang="ts">
  import Dialog from '$lib/Dialog.svelte';
</script>

<Dialog on:close>
  <span slot="title">Paused</span>
  <div slot="body">
    <ul>
      <li>
        <a href="/new">new game</a>
      </li>
    </ul>
  </div>
  <div slot="footer" let:close>
    <button on:click={close}>Resume</button>
  </div>
</Dialog>
