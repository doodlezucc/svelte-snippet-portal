<script lang="ts">
	import type { Alignment } from '$lib/index.js';
	import ExampleTether from './ExampleTether.svelte';

	let direction = $state<Alignment>();
</script>

<h1>Svelte Snippet Portal</h1>

<p>
	Svelte components to teleport snippets from one place to another. Useful for popovers and modal
	elements.
</p>

<h2>{'<Tether>'}</h2>

<p>
	Tethers are wrapped around an element and provide a way to mount custom content
	<i>in relation</i> to the wrapped element.
</p>

<p>
	A <code>Tether</code> component can be aligned with 2 properties named
	<code class="primary">origin</code>
	and
	<code>direction</code>.
</p>

<div class="grid">
	<ExampleTether {direction} origin="top-left" />
	<ExampleTether {direction} origin="top-center" />
	<ExampleTether {direction} origin="top-right" />
	<ExampleTether {direction} origin="center-left" />
	<ExampleTether {direction} origin="center" />
	<ExampleTether {direction} origin="center-right" />
	<ExampleTether {direction} origin="bottom-left" />
	<ExampleTether {direction} origin="bottom-center" />
	<ExampleTether {direction} origin="bottom-right" />
</div>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	.primary {
		background-color: scheme.color('primary');
		color: scheme.color('on-primary');
	}

	.grid {
		margin: 5em 4em;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 2em;
	}
</style>
