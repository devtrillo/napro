<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';

  import { invalidate } from '$app/navigation';
  import { buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';

  import { updateUser } from '../auth-client';
  import { editUserSchema } from '../schemas';

  let { form: propForm }: { form: SuperValidated<Infer<typeof editUserSchema>> } = $props();
  let open = $state(false);
  const form = superForm(propForm, {
    SPA: true,
    async onSubmit({ formData }) {
      const name = formData.get('name')?.toString();
      if (!name) return { error: { code: 'auth/invalid-email-or-password' } };

      await updateUser({
        fetchOptions: {
          onError: (error) => {
            toast.error(error.error.message);
          },
          onSuccess: () => {
            toast.success('User updated successfully');
          },
        },
        name: name ? name : undefined,
      });
      open = false;
      invalidate('/profile');
    },
    validators: zod(editUserSchema),
  });
  const { form: formData, enhance } = form;
</script>

<Dialog.Root {open} onOpenChange={(isOpen) => (open = isOpen)}>
  <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <form use:enhance>
      <Dialog.Header>
        <Dialog.Title>Edit User</Dialog.Title>
        <Dialog.Description>Edit user information</Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
        <Form.Field {form} name="name">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Name</Form.Label>
              <Input {...props} bind:value={$formData.name} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>
      <Dialog.Footer>
        <Form.Button>Save changes</Form.Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
