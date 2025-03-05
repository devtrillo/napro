<script lang="ts">
  import type { Session } from 'better-auth';
  import { LaptopIcon, LoaderIcon, SmartphoneIcon } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { UAParser } from 'ua-parser-js';

  import { invalidateAll } from '$app/navigation';

  import { revokeSession } from '../auth-client';

  let { session, currentSession }: { session: Session; currentSession: Session } = $props();

  const userAgent = new UAParser(session.userAgent || '');

  let killingSession = $state<string | null>(null);

  const killSession = async () => {
    killingSession = session.id;
    const res = await revokeSession({
      token: session.token,
    });

    if (res.error?.message) toast.error(res.error.message);
    else toast.success('Session terminated successfully');
    invalidateAll();
    killingSession = null;
  };
</script>

<div class="flex items-center gap-2 text-sm font-medium text-black dark:text-white">
  {#if userAgent.getDevice().type === 'mobile'}
    <SmartphoneIcon size={16} />
  {:else}
    <LaptopIcon size={16} />
  {/if}

  {`${userAgent.getOS().name}, ${userAgent.getBrowser().name}`}
  <button
    class="border-muted-foreground cursor-pointer text-xs text-red-500 underline opacity-80"
    onclick={killSession}
  >
    {#if killingSession === session.id}
      <LoaderIcon size={15} className="animate-spin" />
    {:else if session.id === currentSession.id}
      Sign Out
    {:else}
      Terminate
    {/if}
  </button>
</div>
