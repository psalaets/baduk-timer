<!-- Adapted from https://svelte.dev/examples/modal -->

<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import { onMount } from 'svelte';

  let dialog: HTMLDialogElement;

  onMount(() => {
    dialog.showModal();
  });

  const close = () => dialog.close();

  const onClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    // If click was on the dialog itself then it was a click on the ::backdrop (see 1 and 2).
    // In other words, user clicked outside of dialog
    if (event.target === dialog) {
      close();
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close on:click={onClick}>
  <div class="inner">
    <slot name="title" />
    <hr />
    <slot name="body" />
    <hr />
    <slot name="footer" {close} />
  </div>
</dialog>

<style>
  dialog {
    /* (1) Makes child fill 100% of dialog height */
    display: flex;
    /* (2) The dialog has no padding and its child completely fills the content
    box (see 1) so the only way to really click dialog is clicking its ::backdrop
    and those clicks can be treated as user clicking outside of dialog.

    dialog's padding is provided by its child (see 3)
    */
    padding: 0;
  }

  .inner {
    /* (3) padding for all content within the dialog */
    padding: 1rem;
  }
</style>
