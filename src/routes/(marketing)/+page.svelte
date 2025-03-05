<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { signOut, useSession } from '$lib/features/authentication/auth-client';

  const session = useSession();

  let to = $derived($session.data ? '/profile' : '/authenticate');
</script>

<h1 class=" text-2xl">Welcome to SvelteKit</h1>

<p>
  Visit <Button color="secondary" href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</Button> to
  read the documentation
</p>

<div class="mx-auto mt-2 flex items-center gap-2">
  <a href={to}>
    <Button class="gap-2 rounded-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M5 3H3v4h2V5h14v14H5v-2H3v4h18V3zm12 8h-2V9h-2V7h-2v2h2v2H3v2h10v2h-2v2h2v-2h2v-2h2z"
        >
        </path>
      </svg>
      {#if $session.data}
        Profile
      {:else}
        Sign In
      {/if}
    </Button>
  </a>
  {#if $session.data}
    <Button
      class="btn-outline rounded-none"
      onclick={async () => {
        await signOut();
      }}>Sign Out</Button
    >
  {/if}
</div>
