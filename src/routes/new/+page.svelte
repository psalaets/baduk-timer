<script lang="ts">
  import NewGameForm from '$lib/new-game/NewGameForm.svelte';
  import { settings as gameSettings } from '$lib/game';
  import type { ClockSettings } from '$lib/timing/clock-settings';
  import { goto } from '$app/navigation';

  const hasPreExistingSettings = !!$gameSettings;

  function onSubmit(event: CustomEvent<ClockSettings>) {
    gameSettings.newGame(event.detail);
    goto('/');
  }

  function onCancel() {
    goto('/');
  }
</script>

<h1>New Game</h1>
<NewGameForm canCancel={hasPreExistingSettings} on:submit={onSubmit} on:cancel={onCancel} />
