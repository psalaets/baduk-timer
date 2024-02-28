<script lang="ts">
  import Dialog from '$lib/Dialog.svelte';

  export let paused = false;

  $: title = paused ? 'Paused' : 'Menu';
  $: closeButtonLabel = paused ? 'Resume' : 'Close';
</script>

<Dialog on:close>
  <span slot="title">{title}</span>
  <div slot="body">
    <ul>
      <li>
        <a href="/new">new game</a>
      </li>
    </ul>
  </div>
  <div slot="footer" let:close>
    <button on:click={close}>{closeButtonLabel}</button>
  </div>
</Dialog>
