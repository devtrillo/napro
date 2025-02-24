<script lang="ts">
  import type { WithElementRef } from 'bits-ui';
  import clsx from 'clsx';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type ButtonVariant = 'outline' | 'soft' | 'ghost' | 'link';
  type ButtonColor =
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  type ButtonModifier = 'wide' | 'block' | 'square' | 'circle';
  type ButtonBehavior = 'btn-active' | 'btn-disabled';

  type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant;
      size?: ButtonSize;
      color?: ButtonColor;
      modifier?: ButtonModifier;
      behavior?: ButtonBehavior;
    };
  let {
    class: className,
    variant,
    size,
    color,
    modifier,
    behavior,
    ref = $bindable(null),
    href = undefined,
    type = 'button',
    children,
    ...restProps
  }: ButtonProps = $props();
  const appendStyle = (str?: string) => (str ? `btn-${str}` : false);
</script>

{#if href}
  <a
    bind:this={ref}
    class={clsx(
      'btn',
      appendStyle(variant),
      appendStyle(size),
      appendStyle(color),
      appendStyle(modifier),
      appendStyle(behavior),
      className,
    )}
    {href}
    {...restProps}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    class={clsx(
      'btn',
      appendStyle(variant),
      appendStyle(size),
      appendStyle(color),
      appendStyle(modifier),
      appendStyle(behavior),
      className,
    )}
    {type}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}
