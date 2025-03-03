<script lang="ts">
  import { FingerprintIcon, PlusIcon, LoaderIcon } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import * as m from '$lib/paraglide/messages';
  import { invalidate } from '$app/navigation';
  import { buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { cn } from '$lib/utils';

  import { passkey } from '../auth-client';
  import { addPasskeySchema } from '../schemas';

  let { form: propForm }: { form: SuperValidated<Infer<typeof addPasskeySchema>> } = $props();

  let open = $state(true);
  const form = superForm(propForm, {
    SPA: true,
    id: 'add-passkey',
    async onSubmit({ formData }) {
      const name = formData.get('name')?.toString();
      if (!name) return { error: { code: 'auth/invalid-email-or-password' } };

      const res = await passkey.addPasskey({ name });
      if (res?.error) toast.error(m?.[res.error.code]?.() || res.error.message);
      else toast.success('Passkey added successfully. you can now use it to login.');

      open = false;
      invalidate('/profile');
    },
    validators: zod(addPasskeySchema),
  });
  const { form: formData, enhance, delayed } = form;
</script>

<Dialog.Root {open} onOpenChange={(isOpen) => (open = isOpen)}>
  <Dialog.Trigger class={cn(buttonVariants({ variant: 'outline' }), 'gap-2 text-xs md:text-sm')}>
    <PlusIcon />
    Add New Passkey
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Passkeys</Dialog.Title>
      <Dialog.Description>
        Create a new passkey to securely access your account without a password.
      </Dialog.Description>
    </Dialog.Header>
    <form class="" use:enhance>
      <div class="grid gap-2">
        <Form.Field {form} name="name">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Passkey</Form.Label>
              <Input {...props} bind:value={$formData.name} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>
      <Dialog.Footer>
        <Form.Button disabled={$delayed} class="w-full">
          {#if $delayed}
            <LoaderIcon /> Adding passkey...
          {:else}
            <FingerprintIcon /> Add passkey{/if}</Form.Button
        >
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
