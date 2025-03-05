<script lang="ts">
  import QR from '@svelte-put/qr/svg/QR.svelte';
  import { LoaderIcon, ShieldCheckIcon } from 'lucide-svelte';
  import type { EventHandler } from 'svelte/elements';
  import { toast } from 'svelte-sonner';

  import { invalidateAll } from '$app/navigation';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  import { twoFactor } from '../auth-client';

  let open = $state(true);
  let verifyUri = $state<{ backupCodes: string[]; totpURI: string } | null>(null);

  let loading = $state(false);
  let password = $state('');
  const onSubmit: EventHandler<SubmitEvent> = async (event) => {
    event.preventDefault();
    loading = true;
    try {
      if (verifyUri) {
        await twoFactor.verifyTotp({
          code: password,
          fetchOptions: {
            onError(context) {
              password = '';
              toast.error(context.error.message);
            },
            onSuccess() {
              toast.success('2FA enabled successfully');
              verifyUri = null;
              password = '';
              open = false;
            },
          },
          trustDevice: true,
        });
        invalidateAll();
      } else {
        twoFactor.enable({
          fetchOptions: {
            onError(ctx) {
              toast.error(ctx.error.message);
            },
            onSuccess(ctx) {
              verifyUri = ctx.data;
              password = '';
            },
          },
          password,
        });
      }
    } finally {
      loading = false;
    }
  };
</script>

<Dialog.Root {open} onOpenChange={(isOpen) => (open = isOpen)}>
  <Dialog.Trigger class={buttonVariants({ class: 'gap-2', variant: 'outline' })}>
    <ShieldCheckIcon class="size-4" />
    Enable 2FA
  </Dialog.Trigger>
  <Dialog.Content class="w-11/12 sm:max-w-md">
    <form onsubmit={onSubmit}>
      <Dialog.Header class="mb-4">
        <Dialog.Title>Enable 2FA</Dialog.Title>
        <Dialog.Description>Enable 2FA to secure your account</Dialog.Description>
      </Dialog.Header>
      {#if !!verifyUri}
        <div class="flex flex-col gap-2">
          <div class="flex flex-col items-center justify-center gap-2">
            <QR class="size-70" data={verifyUri.totpURI} />
            <p>Backup codes</p>
            <div class="flex flex-wrap items-center justify-center">
              {#each verifyUri.backupCodes as code (code)}
                <span class="rounded-md px-2 py-1">{code}</span>
              {/each}
            </div>
          </div>
          <Label for="code">Verification Code</Label>
          <Input id="code" bind:value={password} placeholder="Verification Code" />
        </div>
      {:else}
        <div class="flex flex-col gap-2">
          <Label for="password">Password</Label>
          <Input id="password" bind:value={password} placeholder="Password" type="password" />
        </div>
      {/if}
      <Dialog.Footer>
        <Button type="submit" disabled={loading}>
          {#if loading}
            <LoaderIcon />
          {:else}
            Enable 2FA
          {/if}
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
