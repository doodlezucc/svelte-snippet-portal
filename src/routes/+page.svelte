<script lang="ts">
	import type { Alignment } from '$lib/index.js';
	import DisplayAnchor from './DisplayAnchor.svelte';

	let alignment = $state<Alignment>();
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
	<DisplayAnchor {alignment} origin="top-left" />
	<DisplayAnchor {alignment} origin="top-center" />
	<DisplayAnchor {alignment} origin="top-right" />
	<DisplayAnchor {alignment} origin="center-left" />
	<DisplayAnchor {alignment} origin="center" />
	<DisplayAnchor {alignment} origin="center-right" />
	<DisplayAnchor {alignment} origin="bottom-left" />
	<DisplayAnchor {alignment} origin="bottom-center" />
	<DisplayAnchor {alignment} origin="bottom-right" />
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
