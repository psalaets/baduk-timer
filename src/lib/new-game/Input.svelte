<script lang="ts">
</script>

<input {...$$restProps} on:change />

<style>
  input {
    appearance: none;
    width: 100%;

    padding-inline: 0.5rem;
    padding-block: 0.25rem;

    border: 0.0625rem solid darkgray;
    border-radius: 0.25rem;
    box-shadow: none;
    font-weight: 400;
    overflow: visible;

    background-color: #ffffff;
    line-height: 1.5;
  }

  input:focus-visible {
    outline-width: 0.0625rem;
    outline-color: #0000ff;
  }
</style>
