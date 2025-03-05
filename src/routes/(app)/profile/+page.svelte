<script lang="ts">
  import { LoaderIcon } from 'lucide-svelte';

  import * as Avatar from '$lib/components/ui/avatar';
  import * as Card from '$lib/components/ui/card';
  import AddPasskey from '$lib/features/authentication/components/add-passkey.svelte';
  import ChangePassword from '$lib/features/authentication/components/change-password.svelte';
  import EditUserDialog from '$lib/features/authentication/components/edit-user-dialog.svelte';
  import ListPasskey from '$lib/features/authentication/components/list-passkey.svelte';
  import Session from '$lib/features/authentication/components/session.svelte';
  import SignOut from '$lib/features/authentication/components/sign-out.svelte';
  import TwoFactorDisable from '$lib/features/authentication/components/two-factor-disable.svelte';
  import TwoFactorEnabled from '$lib/features/authentication/components/two-factor-enabled.svelte';
  import VerifyEmail from '$lib/features/authentication/components/verify-email.svelte';

  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  let user = $derived(data.user || {});
  let formEditProfile = $derived(data.formEditProfile);
  let formAddNewPasskey = $derived(data.formAddNewPasskey);
  let formChangePassword = $derived(data.formChangePassword);
</script>

<div class="flex h-dvh items-center justify-center">
  <Card.Root class="w-full max-w-lg">
    <Card.Header>
      <Card.Title>User</Card.Title>
    </Card.Header>
    <Card.Content class="grid grid-cols-1 gap-8">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-4">
          <Avatar.Root class="hidden h-9 w-9 sm:flex">
            <Avatar.Image src={user.image || '#'} alt="Avatar" class="object-cover" />
            <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
          </Avatar.Root>
          <div class="grid gap-1">
            <p class="text-sm leading-none font-medium">
              {user.name}
            </p>
            <p class="text-sm">{user.email}</p>
          </div>
        </div>
        <EditUserDialog form={formEditProfile} />
      </div>
      <VerifyEmail {user} />
      <div class="flex w-max flex-col gap-1 border-l-2 px-2">
        <p class="text-xs font-medium">Active Sessions</p>
        {#await data.activeSessions}
          <span class="flex items-center gap-2"> <LoaderIcon size={20} /> Loading sessions...</span>
        {:then activeSessions}
          {#each activeSessions?.filter((session) => session.userAgent) as session (session.id)}
            <Session {session} currentSession={data.session} />
          {/each}
        {/await}
      </div>
      <div class="flex flex-wrap items-center justify-between gap-2 border-y py-4">
        <div class="flex flex-col gap-2">
          <p class="text-sm">Passkeys</p>
          <div class="flex flex-wrap gap-2">
            <AddPasskey form={formAddNewPasskey} />
            <ListPasskey />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-sm">Two Factor</p>
          <div class="flex gap-2">
            {#if user.twoFactorEnabled}
              <TwoFactorDisable />
            {:else}
              <TwoFactorEnabled />
            {/if}
          </div>
        </div>
      </div>
    </Card.Content>
    <Card.Footer class="flex items-center justify-between gap-2">
      <ChangePassword form={formChangePassword} />
      <SignOut />
    </Card.Footer>
  </Card.Root>
</div>
