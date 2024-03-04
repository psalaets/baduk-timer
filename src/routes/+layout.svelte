<script lang="ts">
  import '../global.css';
  import { setGameContext, initialGameContext } from '$lib/game-context';

  setGameContext(initialGameContext);
</script>

<div>
  <slot />
</div>
