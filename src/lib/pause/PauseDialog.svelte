<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Dialog from '$lib/Dialog.svelte';

  const switchDispatcher = createEventDispatcher();
</script>

<Dialog on:close>
  <span slot="title">Paused</span>
  <div slot="body">
    <ul>
      <li>
        <a href="/new">new game</a>
      </li>
      <li><button on:click={() => switchDispatcher('switch')}>Switch sides</button></li>
    </ul>
  </div>
  <div slot="footer" let:close>
    <button on:click={close}>Resume</button>
  </div>
</Dialog>
