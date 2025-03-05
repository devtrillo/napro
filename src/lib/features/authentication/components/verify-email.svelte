<script lang="ts">
  import type { User } from 'better-auth';
  import { LoaderIcon } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  import * as Alert from '$lib/components/ui/alert';
  import { Button } from '$lib/components/ui/button';

  import { sendVerificationEmail } from '../auth-client';

  let { user }: { user: User } = $props();

  let emailVerificationPending = $state(false);
  const sendVerifyEmail = async () => {
    await sendVerificationEmail(
      { callbackURL: '/profile', email: user.email },
      {
        onError(context) {
          toast.error(context.error.message);
          emailVerificationPending = false;
        },
        onRequest(context) {
          emailVerificationPending = true;
        },
        onSuccess() {
          toast.success('Verification email sent successfully');
          emailVerificationPending = false;
        },
      },
    );
  };
</script>

{#if !user.emailVerified}
  <Alert.Root>
    <Alert.Title>Verify you Email Address</Alert.Title>
    <Alert.Description class="text-muted-foreground">
      Please verify your email address. Check your inbox for the verification email. If you haven't
      received the email, click the button below to resend.
    </Alert.Description>
    <Button size="sm" variant="secondary" class="mt-2" onclick={sendVerifyEmail}>
      {#if emailVerificationPending}
        <LoaderIcon size={15} class="animate-spin" />
      {:else}
        Resend Verification Email
      {/if}
    </Button>
  </Alert.Root>
{/if}
