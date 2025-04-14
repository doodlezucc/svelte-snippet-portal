<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div>
	{@render children()}
</div>

<style lang="scss">
	@use '$lib/docs/style/constants.scss';

	div {
		margin: 0 6em;
		padding: 0 constants.$sidebar-width;
	}
</style>
