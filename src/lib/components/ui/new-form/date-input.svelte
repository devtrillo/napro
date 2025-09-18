<script lang="ts">
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { CalendarIcon } from '@lucide/svelte';

	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';

	import { buttonVariants } from '../button';
	import Calendar from '../calendar/calendar.svelte';

	let {
		label,
		value = $bindable(),
		id,
		class: className,
		description,
		error,
	}: {
		label: string;
		value?: DateValue;
		id: string;
		class?: string;
		description?: string;
		error?: string;
	} = $props();
	let contentRef = $state<HTMLElement | null>(null);
	const df = new DateFormatter('en-US', { dateStyle: 'long' });
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
	<Popover.Root>
		<Popover.Trigger
			class={cn(
				buttonVariants({ variant: 'outline' }),
				'w-[280px] justify-start pl-4 text-left font-normal',
				!value && 'text-muted-foreground',
			)}
		>
			{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
			<CalendarIcon class="ml-auto size-4 opacity-50" />
		</Popover.Trigger>
		<Popover.Content bind:ref={contentRef} class="w-auto p-0">
			<Calendar type="single" bind:value />
		</Popover.Content>
	</Popover.Root>

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
