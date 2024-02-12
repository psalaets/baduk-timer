<script lang="ts">
  let message: string;
</script>

<div class="field">
  <slot />
</div>

<style>
  .field {
    display: flex;
    justify-content: space-between;
  }
</style>
