<script lang="ts">
  import Dialog from '$lib/Dialog.svelte';
  import type { ClockSettings } from '$lib/clock-settings/clock-settings';
  import { shareableSettingsUrl } from '$lib/menu/share';

  export let paused = false;
  export let settings: ClockSettings;

  $: title = paused ? 'Paused' : 'Menu';
  $: closeButtonLabel = paused ? 'Resume' : 'Close';

  const share = () => {
    const url = shareableSettingsUrl(settings);
    navigator.clipboard.writeText(url.toString()).then(() => alert('URL copied!'));
  };
</script>

<Dialog on:close>
  <span slot="title">{title}</span>
  <div slot="body">
    <ul>
      <li>
        <a href="/new">new game</a>
      </li>
      <li>
        <button on:click={() => share()}>Share settings</button>
      </li>
    </ul>
  </div>
  <div slot="footer" let:close>
    <button on:click={close}>{closeButtonLabel}</button>
  </div>
</Dialog>
