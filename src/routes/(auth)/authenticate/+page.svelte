<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs';
  import LoginForm from '$lib/features/authentication/components/login-form.svelte';
  import RegisterForm from '$lib/features/authentication/components/register-form.svelte';

  import { type PageData } from './$types';

  const authMethods = [
    { text: 'Sign in', value: 'sign-in' },
    { text: 'Sign up', value: 'register' },
  ];
  let { data }: { data: PageData } = $props();
</script>

<Tabs.Root value="sign-in" class="w-[400px]">
  <Tabs.List>
    {#each authMethods as { value, text } (value)}
      <Tabs.Trigger {value}>{text}</Tabs.Trigger>
    {/each}
  </Tabs.List>
  <Tabs.Content value="sign-in">
    <LoginForm form={data.loginForm} />
  </Tabs.Content>
  <Tabs.Content value="register">
    <RegisterForm form={data.registerForm} />
  </Tabs.Content>
</Tabs.Root>
