<script>
	import { ChevronLeftIcon, ChevronRightIcon, ZoomInIcon, ZoomOutIcon } from '@lucide/svelte';

	import StartNewCycle from '$features/cycles/components/start-new-cycle.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	// const z = createZInstance(getUserId());
</script>

<main class="container mx-auto mt-8 space-y-4">
	<Card.Root>
		<Card.Content class="flex flex-col items-center justify-between gap-4 p-4 md:flex-row ">
			<div class="flex flex-col gap-4">
				<span>Current Cycle</span>
				<div class="flex items-center gap-2 text-center">
					<span>Cycle #1</span>
					<Separator orientation="vertical" />
					<span>Day 15</span>
					<Separator orientation="vertical" />
					<span>Started: July 30th 2025</span>
				</div>
			</div>
			<StartNewCycle />
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Title class="flex justify-between p-4 ">
			<span>Cycle Chart</span>
			<div class="flex items-center justify-center gap-2">
				<Button variant="outline" size="sm">Multi-Cycle</Button>
				<Button variant="outline" size="sm">
					<ZoomOutIcon />
				</Button>
				<Button variant="outline" size="sm">
					<ZoomInIcon />
				</Button>
			</div>
		</Card.Title>
		<Card.Content>
			<div class="flex justify-between">
				<Button variant="outline">
					<ChevronLeftIcon />
					<span class="hidden sm:inline">Previous Cycle</span>
				</Button>
				<span>Cycle 1 of 1</span>
				<Button variant="outline">
					<ChevronRightIcon />
					<span class="hidden sm:inline">Next Cycle</span>
				</Button>
			</div>
			<div class="my-6 rounded-lg p-4">
				<h4 class="mb-3 text-sm font-medium">Legend</h4>
				<div class="grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded bg-red-600"></div>
						<span>Heavy bleeding</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded bg-red-400"></div>
						<span>Medium bleeding</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded bg-red-200"></div>
						<span>Light bleeding</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded bg-blue-100"></div>
						<span>Clear mucus</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded bg-gray-200"></div>
						<span>Cloudy mucus</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded bg-yellow-200"></div>
						<span>Yellow mucus</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded bg-amber-300"></div>
						<span>Brown mucus</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded border bg-gray-50"></div>
						<span>Dry day</span>
					</div>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</main>
