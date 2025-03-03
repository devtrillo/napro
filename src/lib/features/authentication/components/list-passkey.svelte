<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import { cn } from '$lib/utils';
</script>

<Dialog.Root>
  <Dialog.Trigger class={cn(buttonVariants({ variant: 'outline' }), 'text-xs md:text-sm')}>
    List Passkeys
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
