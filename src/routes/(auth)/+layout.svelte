<script lang="ts">
	import { BellIcon, CalendarIcon } from '@lucide/svelte';

	import { resolve } from '$app/paths';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { updateUserId } from '$lib/stores/user.svelte';
	import { cn } from '$lib/utils';

	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
	let notifications = 0;
	const initials = data.user?.name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase();
	updateUserId(data.user?.id);
</script>

<header
	class="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
>
	<div class="container flex h-16 items-center justify-between px-4">
		<div class="flex items-center gap-3">
			<a href={resolve('/app')} class="flex items-center gap-3">
				<div class="hidden h-8 w-8 items-center justify-center rounded-lg sm:flex">
					<CalendarIcon class="h-4 w-4" />
				</div>
				<div>
					<h1 class="text-foreground text-lg font-semibold">FertilityTracker</h1>
				</div>
			</a>
		</div>

		<div class="flex items-center gap-3">
			<Button variant="ghost" size="sm" class="relative hidden sm:block">
				<BellIcon class="h-4 w-4" />
				{#if notifications > 0}
					<span
						class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
					>
						{notifications}
					</span>
				{/if}
			</Button>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="ghost">
							<Avatar class="h-8 w-8">
								<AvatarFallback>{initials}</AvatarFallback>
								<AvatarImage
									src={`https://www.gravatar.com/avatar/${data.user?.email}`}
									alt={data.user?.name}
								/>
							</Avatar>
							<div class="hidden sm:block">
								<p class="text-foreground text-left text-sm font-medium">{data.user?.name}</p>
								<p class=" text-muted-foreground text-left text-xs">{data.user?.email}</p>
							</div>
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							{#snippet child({ props })}
								<a
									{...props}
									href={resolve('/profile')}
									class={cn(props.class ?? '', ' cursor-pointer')}
								>
									Profile
								</a>
							{/snippet}
						</DropdownMenu.Item>
						<DropdownMenu.Item>Settings</DropdownMenu.Item>

						<DropdownMenu.Separator />
						<DropdownMenu.Item class="text-red-600 dark:text-red-400">
							{#snippet child({ props })}
								<a
									{...props}
									class={cn(props.class ?? '', ' cursor-pointer')}
									href={resolve('/logout')}
								>
									Sign Out
								</a>
							{/snippet}
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</header>
{@render children()}
