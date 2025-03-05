<script lang="ts">
  import { FingerprintIcon, LoaderIcon, TrashIcon } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  import { Button, buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Table from '$lib/components/ui/table';
  import { cn } from '$lib/utils';

  import { passkey, useListPasskeys } from '../auth-client';

  let open = $state(false);

  let passkeys = $state(useListPasskeys());
  let passkeysData = $derived($passkeys?.data || []);
  let numPasskeys = $derived($passkeys?.data?.length || 0);

  let deletePasskeyLoading = $state(false);
  const onDeletePasskey = (id: string) => async () => {
    deletePasskeyLoading = true;
    try {
      const res = await passkey.deletePasskey({
        fetchOptions: {
          onError(error) {
            toast.error(error.error.message);
          },
          onSuccess() {
            toast.success('Passkey deleted successfully');
          },
        },
        id,
      });
    } finally {
      deletePasskeyLoading = false;
    }
  };
</script>

{#if numPasskeys !== 0}
  <Dialog.Root {open} onOpenChange={(isOpen) => (open = isOpen)}>
    <Dialog.Trigger
      class={cn(buttonVariants({ variant: 'outline' }), 'text-xs md:text-sm')}
      disabled={numPasskeys === 0}
    >
      <FingerprintIcon class="mr-2 size-4" />
      Passkeys {numPasskeys}
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Passkeys</Dialog.Title>
        <Dialog.Description>List of passkeys</Dialog.Description>
      </Dialog.Header>
      <Table.Root>
        <Table.Header>
          <Table.Row><Table.Head>Name</Table.Head></Table.Row>
        </Table.Header>
        {#each passkeysData as passkey (passkey.id)}
          <Table.Row class="flex items-center justify-between">
            <Table.Cell>{passkey.name || 'My passkey'}</Table.Cell>
            <Table.Cell class="text-right">
              <Button onclick={onDeletePasskey(passkey.id)}>
                {#if deletePasskeyLoading}
                  <LoaderIcon class="size-4 animate-spin" />
                {:else}
                  <TrashIcon class="text-destructive" />
                {/if}
              </Button></Table.Cell
            >
          </Table.Row>
        {/each}
      </Table.Root>
    </Dialog.Content>
  </Dialog.Root>
{/if}
