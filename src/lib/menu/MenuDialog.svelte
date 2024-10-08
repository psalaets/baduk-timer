<script lang="ts">
  import Button from '$lib/components/Button.svelte';
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
          <Button on:click={() => (shareOpen = !shareOpen)}>Share Settings</Button>
        </div>
        {#if shareOpen}
          <Button on:click={() => copyUrl()}>Copy Settings URL</Button>
          <QrCode data={shareableSettingsUrl(settings).toString()} />
        {/if}
      </li>
      <li>
        <Button on:click={() => toggleFullscreen()}>Fullscreen</Button>
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
    <Button on:click={close}>{closeButtonLabel}</Button>
  </div>
</Dialog>
