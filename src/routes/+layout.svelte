<script lang="ts">
	import '$lib/docs/style/index.scss';
	import '@fontsource-variable/montserrat';
	import '@fontsource-variable/roboto-mono';
	import '@fontsource/merriweather';

	import PortalOverlay from '$lib/components/PortalOverlay.svelte';
	import TetherBoundary from '$lib/components/TetherBoundary.svelte';
	import Content from '$lib/docs/Content.svelte';
	import Header from '$lib/docs/Header.svelte';
	import Sidebar from '$lib/docs/Sidebar.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<PortalOverlay class="global-portal-overlay">
	<Header />

	<main>
		<Sidebar />

		<TetherBoundary class="content-boundary">
			<Content>
				{@render children()}
			</Content>
		</TetherBoundary>
	</main>
</PortalOverlay>

<style lang="scss">
	:global(.global-portal-overlay) {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	:global(.content-boundary) {
		display: flex;
	}

	main {
		flex: 1;
		position: relative;
		overflow: hidden;
		display: flex;
	}
</style>
