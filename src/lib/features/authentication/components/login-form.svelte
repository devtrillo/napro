<script lang="ts">
  import LoaderCircleIcon from 'lucide-svelte/icons/loader-circle';
  import { toast } from 'svelte-sonner';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';

  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as m from '$lib/paraglide/messages';

  import { signIn } from '../auth-client';
  import { loginSchema } from '../schemas';

  let { form: propForm }: { form: SuperValidated<Infer<typeof loginSchema>> } = $props();

  const form = superForm(propForm, {
    SPA: true,
    async onSubmit({ formData }) {
      const email = formData.get('email')?.toString();
      const password = formData.get('password')?.toString();
      if (!email || !password) return { error: { code: 'auth/invalid-email-or-password' } };

      const { error } = await signIn.email({
        callbackURL: '/',
        email,
        password,
        rememberMe: true,
      });
      if (error?.code) return toast.error(m?.[error.code]?.());
    },
    validators: zod(loginSchema),
  });
  const { form: formData, enhance, delayed } = form;

  const loginGoogle = () =>
    signIn.social({
      callbackURL: '/',
      provider: 'google',
    });
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Sign In</Card.Title>
    <Card.Description>Enter your email below to login to your account.</Card.Description>
  </Card.Header>
  <Card.Content>
    <form use:enhance>
      <Form.Field {form} name="email">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Email</Form.Label>
            <Input {...props} bind:value={$formData.email} type="email" />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="password">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Password</Form.Label>
            <Input {...props} bind:value={$formData.password} type="password" />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Button disabled={$delayed} class="w-full">
        {#if $delayed}
          <LoaderCircleIcon class="animate-spin" />
          {m.auth_signin_progress()}
        {:else}
          {m.auth_signin()}
        {/if}
      </Form.Button>
    </form>
  </Card.Content>
  <Card.Footer>
    <Button variant="outline" class="gap-2" onclick={loginGoogle}>
      <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
        <path
          fill="#4285F4"
          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        />
        <path
          fill="#34A853"
          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        />
        <path
          fill="#FBBC05"
          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
        />
        <path
          fill="#EB4335"
          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        />
      </svg>
    </Button>
  </Card.Footer>
</Card.Root>
