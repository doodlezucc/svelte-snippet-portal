<script lang="ts">
	import CodeBlock from '$lib/docs/CodeBlock.svelte';
	import type { Alignment } from '$lib/index.js';
	import ExampleTether from './ExampleTether.svelte';

	let direction = $state<Alignment>();
</script>

<h1>Svelte Tether</h1>

<p>
	A small collection of Svelte wrapper components to teleport snippets from one place to another.
	Useful for popovers and modal elements.
</p>

<CodeBlock>
	{`ts
npm install svelte-tether
`}
</CodeBlock>

<p>
	Get started by wrapping your page in the <code>PortalOverlay</code> component. Usually this would be
	in your outer most +layout.svelte file.
</p>

<CodeBlock>
	{`svelte
<PortalOverlay>
	{@render children()}
</PortalOverlay>
`}
</CodeBlock>

<h2>Portals</h2>

<p>Portals take whatever content you put inside and mount it in a <code>Destination</code>.</p>

<h2>Tethers</h2>

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
