<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	import FertilityForm from '$features/settings/fertility-form.svelte';
	import PersonalForm from '$features/settings/personal-form.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<div class="container mx-auto max-w-4xl px-4 py-8">
	<div class="mb-8">
		<h1 class="text-muted-foreground mb-2 text-3xl font-bold">Profile Settings</h1>
		<p>Manage your account, fertility tracking preferences, and subscription</p>
	</div>
	<Card.Root>
		<Card.Header>
			<Card.Title id="personal">Personal</Card.Title>
			<Card.Description>Update your personal details and profile photo</Card.Description>
		</Card.Header>
		<Card.Content>
			<PersonalForm name={data.user?.name} />
		</Card.Content>
		<Card.Header>
			<Card.Title id="fertility">Fertility</Card.Title>
			<Card.Description>Customize your fertility tracking experience</Card.Description>
			<FertilityForm />
		</Card.Header>
		<Card.Header>
			<Card.Title id="billing">Billing</Card.Title>
			<Card.Description>Manage your subscription and billing information</Card.Description>
		</Card.Header>
		<Card.Header>
			<Card.Title id="notifications">Notifications</Card.Title>
			<Card.Description>
				Choose how you want to be notified about your fertility tracking
			</Card.Description>
		</Card.Header>
		<Card.Header>
			<Card.Title>Privacy</Card.Title>
			<Card.Description>Manage your data privacy and account security</Card.Description>
		</Card.Header>
	</Card.Root>
</div>
