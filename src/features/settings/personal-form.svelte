<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import TextInput from '$lib/components/ui/new-form/text-input.svelte';

	import { updateUser } from './forms.remote';

	const { name }: { name?: string } = $props();
</script>

<form {...updateUser} class="flex flex-col gap-4">
	<TextInput label="Name" id="name" defaultValue={name} />
	<Button type="submit" class="self-end sm:w-1/2">Save</Button>
</form>
