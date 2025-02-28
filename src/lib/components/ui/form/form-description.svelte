<script lang="ts">
  import * as FormPrimitive from 'formsnap';
  import type { WithoutChild } from 'bits-ui';
  import clsx from 'clsx';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<FormPrimitive.DescriptionProps> = $props();
</script>

<FormPrimitive.Description
  bind:ref
  class={clsx('text-muted-foreground text-sm', className)}
  {...restProps}
/>
