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
	div {
		place-self: center;
		margin: 2em 0;
	}
</style>
