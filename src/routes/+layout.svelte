<script lang="ts">
	import '$lib/app.css';

	import { ModeWatcher } from 'mode-watcher';

	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
{@render children?.()}
