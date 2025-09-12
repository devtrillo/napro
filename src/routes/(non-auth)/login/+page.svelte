<script lang="ts">
	import { CalendarIcon, HeartIcon, ShieldIcon } from '@lucide/svelte';

	import Login from '$features/auth/login.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<div class="flex flex-1 items-center justify-center p-4">
	<div class="w-full max-w-md">
		<div class="mb-8 text-center">
			<div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
				<HeartIcon class="h-8 w-8 " />
			</div>
			<h1 class="mb-2 text-2xl font-bold">Fertility Tracker</h1>
			<p class="">Your personal Creighton Model charting companion</p>
		</div>

		<Card.Root class="border-0  shadow-lg backdrop-blur-sm">
			<Card.Header>
				<Card.Title>Login to Your Account</Card.Title>
			</Card.Header>

			<Card.Content>
				<Login />
			</Card.Content>
		</Card.Root>

		<div class="mt-8 grid grid-cols-3 gap-4 text-center">
			<div class="space-y-2">
				<div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full">
					<ShieldIcon class="h-4 w-4" />
				</div>
				<p class="text-xs">Secure & Private</p>
			</div>
			<div class="space-y-2">
				<div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full">
					<CalendarIcon class="h-4 w-4" />
				</div>
				<p class="text-xs">Daily Tracking</p>
			</div>
			<div class="space-y-2">
				<div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full">
					<HeartIcon class="h-4 w-4" />
				</div>
				<p class="text-xs">Creighton Model</p>
			</div>
		</div>
	</div>
</div>
