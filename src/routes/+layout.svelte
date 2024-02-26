<script lang="ts">
  import '../global.css';
  import { setGameContext, initialGameContext } from '$lib/game-context';

  setGameContext(initialGameContext);
</script>

<div>
  Top level layout
  <slot />
</div>
