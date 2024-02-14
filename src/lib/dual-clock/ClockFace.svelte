<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Color } from '$lib/color';

  export let color: Color;

  const dispatch = createEventDispatcher();
</script>

<div class="clock-face {color === 'black' ? 'black' : 'white'}">
  <slot />
</div>

<style>
  .clock-face {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    flex: 1 1 100%;

    text-align: center;
    padding: 1rem;

    background-color: var(--clock-bg-color);
    color: var(--clock-text-color);
    border: 1px solid var(--clock-border-color);
  }

  .white {
    --clock-bg-color: var(--clock-face-light);
    --clock-text-color: var(--clock-face-dark);
    --clock-border-color: var(--clock-face-dark);
  }

  .black {
    --clock-bg-color: var(--clock-face-dark);
    --clock-text-color: var(--clock-face-light);
    --clock-border-color: var(--clock-face-light);
  }
</style>
