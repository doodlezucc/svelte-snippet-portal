<script lang="ts">
	import PortalOverlay from '$lib/components/PortalOverlay.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<PortalOverlay>
	{@render children()}
</PortalOverlay>
