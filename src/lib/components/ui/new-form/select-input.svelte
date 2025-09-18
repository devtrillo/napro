<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { cn } from '$lib/utils';

	let {
		initialValue,
		options,
		label,
		description,
		error,
		id,
		...selectProps
	}: {
		id: string;
		label: string;
		description?: string;
		error?: string;
		initialValue?: string;
		name?: string;
		options: { label: string; value: string; disabled?: boolean }[];
	} = $props();
	let value = $state(initialValue ?? '');

	const triggerContent = $derived(
		options.find((f) => f.value === value)?.label ?? 'Select an option',
	);
</script>

<div class="space-y-2">
	<label for={id}>
		{label}
	</label>
	<Select.Root type="single" bind:value name={selectProps.name || id}>
		<Select.Trigger class="w-[180px]" {id}>
			{triggerContent}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each options as option (option.value)}
					<Select.Item value={option.value} disabled={option.disabled} label={option.label}>
						{option.label}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
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
