<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="container">
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
		max-width: 800px;
		border-bottom: 1px solid scheme.color('separator');
		padding-bottom: 2em;
		margin-bottom: 2em;
	}
</style>
