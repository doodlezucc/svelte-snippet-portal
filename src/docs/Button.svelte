<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick: (ev: MouseEvent) => void;
		children: Snippet;
	}

	let { onclick, children }: Props = $props();
</script>

<button {onclick}>
	{@render children()}
</button>

<style lang="scss">
	@use '$docs/style/scheme';

	button {
		appearance: none;
		font: inherit;
		font-weight: 600;
		border: 2px solid scheme.color('primary');
		border-radius: 8px;
		padding: 8px 20px;
		cursor: pointer;

		background-color: transparent;
		color: scheme.color('primary');
		outline: 2px solid transparent;
		outline-offset: 0;
		transition: 0.15s;

		&:hover,
		&:focus-visible {
			background-color: scheme.color('primary');
			color: scheme.color('on-primary');
			outline: 2px solid scheme.color('primary');
			outline-offset: 8px;
		}

		&:active {
			outline-offset: 12px;
			transition-duration: 0.1s;
		}
	}
</style>
