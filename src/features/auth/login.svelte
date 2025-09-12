<script lang="ts">
	import { CircleCheckIcon } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	import * as Alert from '$lib/components/ui/alert';
	import Button from '$lib/components/ui/button/button.svelte';
	import TextInput from '$lib/components/ui/new-form/text-input.svelte';

	import { LoginUser } from './login.remote';
</script>

<form {...LoginUser} class="flex flex-col gap-4">
	<TextInput
		label="Email"
		id="email"
		type="email"
		error={LoginUser.result?.errors?.email.message}
		defaultValue="esteban@devtrillo.com"
	/>
	<Button type="submit">Email me a login link</Button>
	{#if LoginUser.result?.success}
		<div transition:fade>
			<Alert.Root variant="success">
				<CircleCheckIcon />
				<Alert.Title>Success! Your changes have been saved</Alert.Title>
				<Alert.Description>This is an alert with icon, title and description.</Alert.Description>
			</Alert.Root>
		</div>
	{/if}
</form>
