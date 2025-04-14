<script lang="ts">
	import '$lib/docs/style/index.scss';
	import '@fontsource-variable/montserrat';
	import '@fontsource-variable/roboto-mono';
	import '@fontsource/merriweather';

	import PortalOverlay from '$lib/components/PortalOverlay.svelte';
	import Header from '$lib/docs/Header.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<PortalOverlay>
	<Header />

	{@render children()}
</PortalOverlay>
