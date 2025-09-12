<script lang="ts">
	import { cn } from '$lib/utils';

	import { Input } from '../input';
	import type { InputProps } from '../input/types';

	type TextInputProps = {
		label: string;
		id: string;

		class?: string;
		description?: string;
		error?: string;
		value?: string;
	} & InputProps;

	let {
		label,
		id,
		class: className,
		description,
		error,
		value = $bindable(),
		...inputProps
	}: TextInputProps = $props();
</script>

<div class="space-y-2">
	<label
		for={id}
		class={cn(
			{ 'text-destructive': error },
			'flex select-none items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
			className,
		)}
	>
		{label}
	</label>
	<Input
		{...inputProps}
		bind:value
		name={inputProps.name || id}
		{id}
		aria-invalid={error ? 'true' : 'false'}
		placeholder={inputProps.placeholder || label}
	/>

	{#if description || error}
		<p
			class={cn('text-muted-foreground text-xs', {
				'text-destructive': error,
			})}
		>
			{error || description}
		</p>
	{/if}
</div>
