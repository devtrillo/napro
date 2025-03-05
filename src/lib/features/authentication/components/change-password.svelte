<script lang="ts">
  import { LoaderIcon, RectangleEllipsisIcon } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';

  import { buttonVariants } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';

  import { changePassword } from '../auth-client';
  import { changePasswordSchema } from '../schemas';

  let { form: propForm }: { form: SuperValidated<Infer<typeof changePasswordSchema>> } = $props();
  let open = $state(false);
  const form = superForm(propForm, {
    SPA: true,
    async onSubmit({ formData }) {
      const currentPassword = formData.get('currentPassword')?.toString();
      const newPassword = formData.get('newPassword')?.toString();
      const revokeOtherSessions = formData.get('signOutOtherPlaces');

      if (!newPassword || !currentPassword) return;

      const res = await changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: revokeOtherSessions === 'on',
      });
      if (res.error.code) {
        toast.error(m?.[res.error.code]?.());
      } else {
        toast.success('Password changed successfully');
      }

      open = false;
    },
    validators: zod(changePasswordSchema),
  });
  const { form: formData, enhance, delayed } = form;
</script>

<Dialog.Root {open} onOpenChange={(isOpen) => (open = isOpen)}>
  <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
    <RectangleEllipsisIcon /> Change password
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <form use:enhance>
      <Dialog.Header>
        <Dialog.Title>Edit User</Dialog.Title>
        <Dialog.Description>Edit user information</Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
        <Form.Field {form} name="currentPassword">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Current Password</Form.Label>
              <Input type="password" {...props} bind:value={$formData.currentPassword} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="newPassword">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>New Password</Form.Label>
              <Input type="password" {...props} bind:value={$formData.newPassword} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="confirmPassword">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Confirm Password</Form.Label>
              <Input type="password" {...props} bind:value={$formData.confirmPassword} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field
          {form}
          name="signOutOtherPlaces"
          class="flex flex-row items-start space-y-0 space-x-3  p-4"
        >
          <Form.Control>
            {#snippet children({ props })}
              <Checkbox {...props} bind:checked={$formData.signOutOtherPlaces} />

              <Form.Label>Sign out from other devices</Form.Label>
            {/snippet}
          </Form.Control>
        </Form.Field>
        <Form.Button disabled={$delayed}>
          {#if $delayed}
            <LoaderIcon size={15} class="animate-spin" />
          {:else}
            Change password
          {/if}
        </Form.Button>
      </div>
    </form>
  </Dialog.Content>
</Dialog.Root>
