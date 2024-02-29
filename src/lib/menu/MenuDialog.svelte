<script lang="ts">
  import Dialog from '$lib/Dialog.svelte';
  import type { ClockSettings } from '$lib/clock-settings/clock-settings';
  import { shareableSettingsUrl } from '$lib/menu/share';

  export let paused = false;
  export let settings: ClockSettings;

  $: title = paused ? 'Paused' : 'Menu';
  $: closeButtonLabel = paused ? 'Resume' : 'Close';

  const copyUrl = () => {
    const url = shareableSettingsUrl(settings);
    navigator.clipboard.writeText(url.toString()).then(() => alert('URL copied!'));
  };

  let shareOpen = false;
</script>

<Dialog on:close>
  <span slot="title">{title}</span>
  <div slot="body">
    <ul>
      <li>
        <a href="/new">New Game</a>
      </li>
      <li>
        <div>
          <button on:click={() => (shareOpen = !shareOpen)}>Share Settings</button>
        </div>
        {#if shareOpen}
          <button on:click={() => copyUrl()}>Copy Settings URL</button>
        {/if}
      </li>
    </ul>
  </div>
  <div slot="footer" let:close>
    <button on:click={close}>{closeButtonLabel}</button>
  </div>
</Dialog>
