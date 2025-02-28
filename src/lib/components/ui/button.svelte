<script lang="ts">
  import type { WithElementRef } from 'bits-ui';
  import clsx from 'clsx';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  type ButtonProps = WithElementRef<HTMLButtonAttributes> & WithElementRef<HTMLAnchorAttributes>;
  let {
    class: className,
    ref = $bindable(null),
    href = undefined,
    type = 'button',
    children,
    ...restProps
  }: ButtonProps = $props();
</script>

{#if href}
  <a bind:this={ref} class={clsx('btn', className)} {href} {...restProps}>
    {@render children?.()}
  </a>
{:else}
  <button bind:this={ref} class={clsx('btn', className)} {type} {...restProps}>
    {@render children?.()}
  </button>
{/if}
