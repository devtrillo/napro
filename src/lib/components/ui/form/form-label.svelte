<script lang="ts">
  import type { WithoutChild } from 'bits-ui';
  import * as FormPrimitive from 'formsnap';

  import clsx from 'clsx';
  import Label from '../label.svelte';

  let {
    ref = $bindable(null),
    children,
    class: className,
    ...restProps
  }: WithoutChild<FormPrimitive.LabelProps> = $props();
</script>

<FormPrimitive.Label {...restProps} bind:ref>
  {#snippet child({ props })}
    <Label {...props} class={clsx('data-[fs-error]:text-destructive', className)}>
      {@render children?.()}
    </Label>
  {/snippet}
</FormPrimitive.Label>
