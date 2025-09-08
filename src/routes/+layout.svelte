<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n'

	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>
<ParaglideJS {i18n}>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<slot/>
</ParaglideJS>