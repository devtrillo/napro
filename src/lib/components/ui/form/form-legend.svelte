<script lang="ts">
  import * as FormPrimitive from 'formsnap';
  import type { WithoutChild } from 'bits-ui';
  import clsx from 'clsx';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<FormPrimitive.LegendProps> = $props();
</script>

<FormPrimitive.Legend
  bind:ref
  class={clsx('data-[fs-error]:text-destructive text-sm leading-none font-medium', className)}
  {...restProps}
/>
