<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import type { ClockSettings } from '$lib/clock-settings/clock-settings';
  import {
    isFullscreen,
    canFullscreen,
    enterFullscreen,
    exitFullscreen
  } from '$lib/menu/fullscreen';
  import { appSettingsStore } from '$lib/app-settings-store';
  import { isSupportedLanguage } from '$lib/app-settings';
  import LanguageSelect from '$lib/language-picker/LanguageSelect.svelte';
  import { i18nStore } from '$lib/i18n/i18n-store';
  import { goto } from '$app/navigation';
  import ShareSettings from '$lib/menu/ShareSettings.svelte';

  export let paused = false;
  export let settings: ClockSettings;

  $: title = paused ? $i18nStore.pauseMenuTitle : $i18nStore.pregameMenuTitle;
  $: closeButtonLabel = paused ? $i18nStore.resumeGameButton : $i18nStore.closeMenuButton;

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

  const handleChangeLanguage = (event: Event) => {
    const language = (event.target as HTMLSelectElement).value;

    if (isSupportedLanguage(language)) {
      appSettingsStore.update((settings) => ({
        ...settings,
        language
      }));
    }
  };

  let shareOpen = false;
</script>

<Dialog id="in-game-menu" on:close {title} let:close>
  <div>
    <ul class="settings-menu">
      <li>
        <Button on:click={() => goto('/new')}>{$i18nStore.newGameLink}</Button>
      </li>
      <li>
        <Button on:click={() => (shareOpen = !shareOpen)}>{$i18nStore.shareSettingsButton}</Button>
        {#if shareOpen}
          <ShareSettings {settings} />
        {/if}
      </li>
      <li>
        <Button on:click={() => toggleFullscreen()}>{$i18nStore.fullscreenButton}</Button>
      </li>
      <li>
        <label>
          {$i18nStore.toggleSoundLabel}
          <input type="checkbox" on:change={toggleSound} checked={$appSettingsStore.sound} />
        </label>
      </li>
      <li>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>
          {$i18nStore.languageLabel}
          <LanguageSelect
            id="language"
            name="language"
            value={$appSettingsStore.language}
            on:change={handleChangeLanguage}
          />
        </label>
      </li>
    </ul>
    <div class="buttons">
      <Button on:click={close}>{closeButtonLabel}</Button>
    </div>
  </div>
</Dialog>

<style>
  .settings-menu {
    list-style-type: none;
    margin: 0;
    padding: 1rem;
  }

  .settings-menu > * + * {
    margin-top: 0.8rem;
  }

  .buttons {
    display: flex;
    justify-content: center;
  }
</style>
