<!-- Adapted from https://svelte.dev/examples/modal -->

<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import { onMount } from 'svelte';

  export let id: string;
  export let title: string;

  const titleElementId = `${id}__title`;

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
<dialog {id} bind:this={dialog} on:close on:click={onClick} aria-labelledby={titleElementId}>
  <div class="inner">
    <div id={titleElementId} class="title">
      {title}
    </div>
    <slot {close} />
  </div>
</dialog>

<style>
  dialog {
    border-radius: var(--container-border-radius);

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
    display: flex;
    flex-direction: column;
    gap: 1rem;

    /* (3) padding for all content within the dialog */
    padding: 1rem;
  }

  .title {
    text-align: center;
  }
</style>
