<script lang="ts">
  import { LoaderIcon, LogOutIcon } from 'lucide-svelte';

  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';

  import { signOut } from '../auth-client';

  let signingOut = $state(false);

  const signOutFn = async () => {
    signingOut = true;
    await signOut({
      fetchOptions: {
        onSuccess() {
          goto('/');
        },
      },
    });
    signingOut = false;
  };
</script>

<Button class="z-10 gap-2" variant="secondary" onclick={signOutFn} disabled={signingOut}>
  <span class="text-sm">
    {#if signingOut}
      <LoaderIcon size={15} class="animate-spin" />
    {:else}
      <div class="flex items-center gap-2">
        <LogOutIcon size={16} />
        Sign Out
      </div>
    {/if}
  </span>
</Button>
