<script lang="ts" module>
	const ALIGNMENTS: Alignment[] = [
		'top-left',
		'top-center',
		'top-right',
		'center-left',
		'center',
		'center-right',
		'bottom-left',
		'bottom-center',
		'bottom-right'
	];

	export const ALIGNMENT_EXAMPLE_DEFAULT = 'default (= undefined)';
	export const ALIGNMENT_EXAMPLE_OPTIONS = [ALIGNMENT_EXAMPLE_DEFAULT, ...ALIGNMENTS];
</script>

<script lang="ts">
	import type { Alignment } from 'svelte-tether';
	import AlignedTetherBox from './AlignedTetherBox.svelte';

	interface Props {
		selectedOption: typeof ALIGNMENT_EXAMPLE_DEFAULT | Alignment;
	}

	let { selectedOption }: Props = $props();

	let direction = $derived(
		selectedOption !== ALIGNMENT_EXAMPLE_DEFAULT ? (selectedOption as Alignment) : undefined
	);
</script>

<div class="grid">
	<AlignedTetherBox {direction} origin="top-left" />
	<AlignedTetherBox {direction} origin="top-center" />
	<AlignedTetherBox {direction} origin="top-right" />
	<AlignedTetherBox {direction} origin="center-left" />
	<AlignedTetherBox {direction} origin="center" />
	<AlignedTetherBox {direction} origin="center-right" />
	<AlignedTetherBox {direction} origin="bottom-left" />
	<AlignedTetherBox {direction} origin="bottom-center" />
	<AlignedTetherBox {direction} origin="bottom-right" />
</div>

<style lang="scss">
	@use '$docs/style/scheme';

	.grid {
		margin: 5em 4em;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 2em;
	}
</style>
