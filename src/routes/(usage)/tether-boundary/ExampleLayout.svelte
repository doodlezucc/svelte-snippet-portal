<script lang="ts">
	import type { Snippet } from 'svelte';
	import { PortalOverlay, TetherBoundary } from 'svelte-tether';

	let { children }: { children: Snippet } = $props();
</script>

<PortalOverlay>
	<TetherBoundary>
		{@render children()}
	</TetherBoundary>
</PortalOverlay>
