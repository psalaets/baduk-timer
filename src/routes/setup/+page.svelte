<script lang="ts">
  import { goto } from '$app/navigation';
  import { i18nStore } from '$lib/i18n/i18n-store';
  import { appSettingsStore } from '$lib/app-settings-store';
  import { isSupportedLanguage } from '$lib/app-settings';
  import LanguageSelect from '$lib/language-picker/LanguageSelect.svelte';
  import Field from '$lib/components/Field.svelte';

  const onChange = (event: Event) => {
    const language = (event.target as HTMLSelectElement).value;

    if (isSupportedLanguage(language)) {
      appSettingsStore.update((currentSettings) => {
        return {
          ...currentSettings,
          language
        };
      });
    }

    goto('/new');
  };
</script>

<div class="setup-page">
  <h1>Setup</h1>
  <form>
    <Field>
      <label for="language">{$i18nStore.languageLabel}</label>
      <LanguageSelect id="language" name="language" value="" on:change={onChange} />
    </Field>
  </form>
</div>

<style>
  .setup-page {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-inline: auto;
    width: 26rem;
    max-width: calc(100% - 2rem);
  }

  form {
    width: 100%;
  }
</style>
