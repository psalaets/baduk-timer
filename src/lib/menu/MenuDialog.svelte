<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
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
  import { isSupportedLanguage, toLanguage } from '$lib/app-settings';
  import LanguageSelect from '$lib/language-picker/LanguageSelect.svelte';
  import { i18nStore } from '$lib/i18n/i18n-store';

  export let paused = false;
  export let settings: ClockSettings;

  $: title = paused ? $i18nStore.pauseMenuTitle : $i18nStore.pregameMenuTitle;
  $: closeButtonLabel = paused ? $i18nStore.resumeGameButton : $i18nStore.closeMenuButton;
  $: copyUrl = () => {
    const url = shareableSettingsUrl(settings);
    navigator.clipboard
      .writeText(url.toString())
      .then(() => alert($i18nStore.shareLinkCopiedFeedback));
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

<Dialog on:close {title} let:close>
  <div>
    <ul>
      <li>
        <a href="/new">{$i18nStore.newGameLink}</a>
      </li>
      <li>
        <div>
          <Button on:click={() => (shareOpen = !shareOpen)}>{$i18nStore.shareSettingsButton}</Button
          >
        </div>
        {#if shareOpen}
          <Button on:click={() => copyUrl()}>{$i18nStore.copyShareLinkButton}</Button>
          <QrCode data={shareableSettingsUrl(settings).toString()} />
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
    <Button on:click={close}>{closeButtonLabel}</Button>
  </div>
</Dialog>
