<script lang="ts">
  import Dialog from '$lib/Dialog.svelte';
  import QrCode from '$lib/menu/QrCode.svelte';
  import type { ClockSettings } from '$lib/clock-settings/clock-settings';
  import { shareableSettingsUrl } from '$lib/menu/share';
  import {
    isFullscreen,
    canFullscreen,
    enterFullscreen,
    exitFullscreen
  } from '$lib/menu/fullscreen';
  import { appSettingsStore } from '$lib/app-settings-store';

  export let paused = false;
  export let settings: ClockSettings;

  $: title = paused ? 'Paused' : 'Menu';
  $: closeButtonLabel = paused ? 'Resume' : 'Close';

  const copyUrl = () => {
    const url = shareableSettingsUrl(settings);
    navigator.clipboard.writeText(url.toString()).then(() => alert('URL copied!'));
  };

  const toggleFullscreen = () => {
    if (canFullscreen()) {
      if (isFullscreen()) {
        exitFullscreen();
      } else {
        enterFullscreen();
      }
    }
  };

  const toggleSound = () => {
    appSettingsStore.update((settings) => ({
      ...settings,
      sound: !settings.sound
    }));
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
          <QrCode data={shareableSettingsUrl(settings).toString()} />
        {/if}
      </li>
      <li>
        <button on:click={() => toggleFullscreen()}>Fullscreen</button>
      </li>
      <li>
        <label>
          Sound
          <input type="checkbox" on:change={toggleSound} checked={$appSettingsStore.sound} />
        </label>
      </li>
    </ul>
  </div>
  <div slot="footer" let:close>
    <button on:click={close}>{closeButtonLabel}</button>
  </div>
</Dialog>
