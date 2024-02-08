<!-- Adapted from https://svelte.dev/examples/modal -->

<script lang="ts">
  let dialog: HTMLDialogElement;

  $: if (dialog) dialog.showModal();
  $: close = dialog ? dialog.close : () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close on:click|self={() => dialog.close()}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <slot name="title" />
    <hr />
    <slot name="content" />
    <hr />
    <slot name="footer" {close} />
    <!-- svelte-ignore a11y-autofocus -->
    <button autofocus on:click={() => dialog.close()}>close modal</button>
  </div>
</dialog>
