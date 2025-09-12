<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn, type WithoutChild } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<
		HTMLAttributes<HTMLElement> & { ref: HTMLElement | null; child: Snippet }
	> = $props();
</script>

<div
	data-slot="form-description"
	class={cn('text-muted-foreground text-sm', className)}
	{...restProps}
></div>
