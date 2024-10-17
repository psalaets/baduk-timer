<script lang="ts">
  import Select from '$lib/new-game/Select.svelte';
  import { supportedLanguages } from '$lib/app-settings';

  export let id: string;
  export let name: string;
  export let value: string;

  const languageOptions = supportedLanguages.map((lang) => {
    return {
      value: lang.id,
      display: lang.name
    };
  });
</script>

<Select {id} {name} bind:value options={languageOptions} on:change />
