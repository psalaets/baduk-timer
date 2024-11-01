<script lang="ts">
  import Select from '$lib/components/Select.svelte';
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

  const options = [
    {
      value: '',
      display: 'Select a language',
      disabled: true
    },
    ...languageOptions
  ];
</script>

<Select {id} {name} bind:value {options} on:change />
