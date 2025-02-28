<script lang="ts">
  import '../lib/app.css';

  import { ParaglideJS } from '@inlang/paraglide-sveltekit';

  import { i18n } from '$lib/i18n';
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.webmanifest" />
</svelte:head>
<ParaglideJS {i18n}>
  {@render children()}
</ParaglideJS>
