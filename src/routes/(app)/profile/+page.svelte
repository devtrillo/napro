<script lang="ts">
  import type { PageData } from './$types';
  import * as Card from '$lib/components/ui/card';
  import * as Avatar from '$lib/components/ui/avatar';
  import * as Alert from '$lib/components/ui/alert';
  import { Button } from '$lib/components/ui/button';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';
  import { sendVerificationEmail } from '$lib/features/authentication/auth-client';

  let { data }: { data: PageData } = $props();
  let { session, user } = data;

  let emailVerificationPending = $state(false);
  const sendVerifyEmail = async () => {
    await sendVerificationEmail(
      { email: user.email },
      {
        onRequest(context) {
          emailVerificationPending = true;
        },
        onError(context) {
          toast.error(context.error.message);
          emailVerificationPending = false;
        },
        onSuccess() {
          toast.success('Verification email sent successfully');
          emailVerificationPending = false;
        },
      },
    );
  };
</script>

<Card.Root class="container mx-auto max-w-lg">
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
      <!-- <EditUserDialog /> -->
    </div>
    {#if !user.emailVerified}
      <Alert.Root>
        <Alert.Title>Verify you Email Address</Alert.Title>
        <Alert.Description class="text-muted-foreground">
          Please verify your email address. Check your inbox for the verification email. If you
          haven't received the email, click the button below to resend.
        </Alert.Description>
        <Button size="sm" variant="secondary" class="mt-2" onclick={sendVerifyEmail}>
          {#if emailVerificationPending}
            <Loader size={15} class="animate-spin" />
          {:else}
            Resend Verification Email
          {/if}
        </Button>
      </Alert.Root>
    {/if}
  </Card.Content>
  <Card.Footer>
    <p>Card Footer</p>
  </Card.Footer>
</Card.Root>
