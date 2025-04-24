<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	interface Props {
		path: string;
		children: Snippet;
	}

	let { path, children }: Props = $props();

	let href = $derived(`${base}${path}`);
	let isCurrentPage = $derived(href === page.url.pathname);
</script>

<li><a {href} class:current={isCurrentPage}>{@render children()}</a></li>

<style lang="scss">
	@use '$docs/style/scheme';

	li {
		list-style: none;
	}

	a {
		color: scheme.color('text');
	}

	.current {
		color: scheme.color('primary');
	}
</style>
