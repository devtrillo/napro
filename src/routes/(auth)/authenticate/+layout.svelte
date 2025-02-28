<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';

  let { children }: { data: LayoutData; children: Snippet } = $props();

  import Button from '$lib/components/ui/button.svelte';
  import clsx from 'clsx';
  import { page } from '$app/state';
  const authMethods = [
    { href: '/authenticate/sign-in', text: 'Sign in' },
    { href: '/authenticate/register', text: 'Sign up' },
  ];
</script>

<div class="bg-base-100 flex min-h-screen flex-col items-center justify-center">
  <div class="container mx-auto">
    <div class="join self-start">
      {#each authMethods as { href, text }}
        <Button
          {href}
          class={clsx('join-item', page.url.pathname === href ? 'btn-active' : 'btn-outline')}
        >
          {text}
        </Button>
      {/each}
    </div>
    <div class="card bg-base-300 p-6 shadow-lg">
      {@render children()}
    </div>
  </div>
</div>
