<script lang="ts">
  import { LoaderIcon, ShieldXIcon } from 'lucide-svelte';
  import type { EventHandler } from 'svelte/elements';
  import { toast } from 'svelte-sonner';

  import { buttonVariants } from '$lib/components/ui/button';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import Input from '$lib/components/ui/input/input.svelte';
  import { Label } from '$lib/components/ui/label';

  import { twoFactor } from '../auth-client';
  let open = $state(false);
  let loading = $state(false);
  let password = $state('');

  const onSubmit: EventHandler<SubmitEvent> = async (event) => {
    console.log(password);
    event.preventDefault();
    event.preventDefault();
    loading = true;
    try {
      await twoFactor.disable({
        fetchOptions: {
          onError(context) {
            toast.error(context.error.message);
          },
          onSuccess() {
            toast.success('2FA disabled successfully');
          },
        },
        password,
      });
      invalidateAll();
    } finally {
      loading = false;
    }
  };
</script>

<Dialog.Root {open} onOpenChange={(isOpen) => (open = isOpen)}>
  <Dialog.Trigger class={buttonVariants({ class: 'gap-2', variant: 'outline' })}>
    <ShieldXIcon class="size-4" />
    Disable 2FA
  </Dialog.Trigger>

  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This will remove an important layer of security to your account.
      </Dialog.Description>
    </Dialog.Header>
    <form onsubmit={onSubmit}>
      <div class="flex flex-col gap-2">
        <Label for="password">Password</Label>
        <Input id="password" bind:value={password} placeholder="Password" type="password" />
      </div>
      <Button type="submit" class="w-full" disabled={loading}>
        {#if loading}
          <LoaderIcon />
          <span>Disabling 2FA...</span>
        {:else}
          Disable 2FA
        {/if}
      </Button>
    </form>
  </Dialog.Content>
</Dialog.Root>
