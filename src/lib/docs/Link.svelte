<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		children: Snippet;
	}

	let { href, children }: Props = $props();

	let isCurrentPage = $derived(href === page.url.pathname);
</script>

<li><a {href} class:current={isCurrentPage}>{@render children()}</a></li>

<style lang="scss">
	@use '$lib/docs/style/scheme';

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
