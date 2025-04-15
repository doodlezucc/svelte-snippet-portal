<script lang="ts">
	import '$lib/docs/style/index.scss';
	import '@fontsource-variable/montserrat';
	import '@fontsource-variable/roboto-mono';
	import '@fontsource/merriweather';

	import PortalOverlay from '$lib/components/PortalOverlay.svelte';
	import Content from '$lib/docs/Content.svelte';
	import Header from '$lib/docs/Header.svelte';
	import Sidebar from '$lib/docs/Sidebar.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<PortalOverlay>
	<Header />

	<main>
		<Sidebar />

		<Content>
			{@render children()}
		</Content>
	</main>
</PortalOverlay>

<style lang="scss">
	main {
		flex: 1;
		position: relative;
		overflow: hidden;
		display: flex;
	}
</style>
