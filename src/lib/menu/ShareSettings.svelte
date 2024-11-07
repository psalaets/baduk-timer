<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import QrCode from '$lib/menu/QrCode.svelte';
  import type { ClockSettings } from '$lib/clock-settings/clock-settings';
  import { i18nStore } from '$lib/i18n/i18n-store';
  import { shareableSettingsUrl } from '$lib/menu/share';

  export let settings: ClockSettings;

  $: copyUrl = () => {
    const url = shareableSettingsUrl(settings);
    navigator.clipboard
      .writeText(url.toString())
      .then(() => alert($i18nStore.shareLinkCopiedFeedback));
  };
</script>

<div>
  <Button on:click={() => copyUrl()}>{$i18nStore.copyShareLinkButton}</Button>
  <QrCode data={shareableSettingsUrl(settings).toString()} />
</div>
