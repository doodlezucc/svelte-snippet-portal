<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let container = $state<HTMLElement>();

	function resetScroll() {
		container!.scrollTop = 0;
	}

	let pagePath = $derived(page.url.pathname);

	$effect(() => {
		// Scroll to top when navigating to a new documentation page
		if (pagePath) {
			resetScroll();
		}
	});
</script>

<div class="container" bind:this={container}>
	<div class="content">
		{@render children()}
	</div>
</div>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	.container {
		width: 100%;
		padding: 2em 6em;
		overflow-y: auto;
	}

	.content {
		max-width: 820px;
		border-bottom: 1px solid scheme.color('separator');
		padding-bottom: 2em;
		margin-bottom: 2em;
	}
</style>
