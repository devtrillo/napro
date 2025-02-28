<script lang="ts">
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { loginSchema } from '../schemas';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import Input from '$lib/components/ui/input.svelte';

  let props: { form: SuperValidated<Infer<typeof loginSchema>> } = $props();
  const form = superForm(props.form, {
    validators: zodClient(loginSchema),
  });

  const { form: formData, enhance, errors } = form;
  $effect(() => {
    console.log($errors);
  });
</script>

<form method="POST" action="?/login" use:enhance class=" space-y-4">
  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input class="w-full" {...props} bind:value={$formData.email} />
      {/snippet}
    </Form.Control>

    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Password</Form.Label>
        <Input class="w-full" type="password" {...props} bind:value={$formData.password} />
      {/snippet}
    </Form.Control>

    <Form.FieldErrors />
  </Form.Field>
  <Form.Button class="btn-primary w-full">Login</Form.Button>
</form>
