<script lang="ts">
	import type { Alignment } from '$lib/index.js';
	import DisplayAnchor from './DisplayAnchor.svelte';

	let direction = $state<Alignment>();
</script>

<h1>Svelte Snippet Portal</h1>

<p>
	Svelte components to teleport snippets from one place to another. Useful for popovers and modal
	elements.
</p>

<h2>{'<Anchor>'}</h2>

<p>
	Anchors are wrapped around an element and provide a way to mount custom content
	<i>in relation</i> to the wrapped element.
</p>

<p>
	An anchor can be aligned with 2 properties named <code class="primary">origin</code> and
	<code>direction</code>.
</p>

<div class="grid">
	<DisplayAnchor {direction} origin="top-left" />
	<DisplayAnchor {direction} origin="top-center" />
	<DisplayAnchor {direction} origin="top-right" />
	<DisplayAnchor {direction} origin="center-left" />
	<DisplayAnchor {direction} origin="center" />
	<DisplayAnchor {direction} origin="center-right" />
	<DisplayAnchor {direction} origin="bottom-left" />
	<DisplayAnchor {direction} origin="bottom-center" />
	<DisplayAnchor {direction} origin="bottom-right" />
</div>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	.primary {
		background-color: scheme.color('primary');
		color: scheme.color('text-light');
	}

	.grid {
		margin: 5em 4em;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 2em;
	}
</style>
