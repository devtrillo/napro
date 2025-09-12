<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<main class="bg-secondary container mx-auto h-full p-4">
	{@render children()}
</main>
