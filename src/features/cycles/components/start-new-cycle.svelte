<script lang="ts">
	import { PlusCircleIcon } from '@lucide/svelte';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4, zod4Client } from 'sveltekit-superforms/adapters';
	import z from 'zod/v4';

	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	const formSchema = z.object({
		notes: z.string(),
		startDate: z.date(),
	});
	const initialData = { notes: '', startDate: new Date() };

	const { form, errors, constraints, enhance } = superForm(
		defaults(initialData, zod4(formSchema)),
		{
			SPA: true,
			onUpdate({ form }) {
				console.log('form', form);
			},
			validators: zod4Client(formSchema),
		},
	);
</script>

<Dialog.Root open={true}>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
		<PlusCircleIcon /> Start New Cycle
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<form use:enhance method="POST">
			<Dialog.Header>
				<Dialog.Title>Start New Cycle</Dialog.Title>
				<Dialog.Description>Begin tracking a new fertility cycle</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<label>
					E-mail<br />
					<input
						aria-invalid={$errors ? 'true' : undefined}
						bind:value={$form.notes}
						{...$constraints.notes}
					/>
				</label>
				{#if $errors.notes}<span class="invalid">{$errors.notes}</span>{/if}
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
