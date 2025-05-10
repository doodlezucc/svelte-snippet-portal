<script lang="ts">
	import type { Alignment } from '$lib/index.js';
	import type { Icon as IconType } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import Tooltip from './Tooltip.svelte';

	interface Props {
		icon: typeof IconType;
		size?: number;
		tooltipAlignment?: Alignment;
		onclick: (ev: MouseEvent) => void;

		children: Snippet;
	}

	let { icon: Icon, size, tooltipAlignment = 'top-center', onclick, children }: Props = $props();
</script>

<Tooltip alignment={tooltipAlignment}>
	<button {onclick}><Icon {size} /></button>

	{#snippet title()}
		{@render children()}
	{/snippet}
</Tooltip>

<style lang="scss">
	button {
		appearance: none;
		display: inline-flex;
		margin: 0;
		padding: 0;
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
	}
</style>
