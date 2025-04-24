<script lang="ts">
	import CodeBlock from '$lib/docs/CodeBlock.svelte';
	import DisableTetherBoundary from '$lib/docs/DisableTetherBoundary.svelte';
	import Figure from '$lib/docs/Figure.svelte';
	import { Tether, type Alignment } from 'svelte-tether';
	import Dropdown from './recipes/dropdown/Dropdown.svelte';
	import TetherAlignmentExample, {
		ALIGNMENT_EXAMPLE_DEFAULT,
		ALIGNMENT_EXAMPLE_OPTIONS
	} from './TetherAlignmentExample.svelte';

	let alignmentExampleDirection = $state<typeof ALIGNMENT_EXAMPLE_DEFAULT | Alignment>(
		ALIGNMENT_EXAMPLE_DEFAULT
	);
</script>

<h1>Svelte Tether</h1>

<p>
	A small collection of Svelte wrapper components to teleport snippets from one place to another.
	Useful for popovers and modal elements.
</p>

<h2>What are Tethers?</h2>

<p>
	A <code>Tether</code> component can be wrapped around an element to mount a floating popover
	<i>in relation</i> to the wrapped element.
</p>

<p>
	The tether can then be aligned with 2 properties named <code class="primary">origin</code> and
	<code>direction</code>. The <i>direction</i> parameter is optional and defaults to the
	<i>origin</i> alignment.
</p>

<DisableTetherBoundary>
	<TetherAlignmentExample selectedOption={alignmentExampleDirection} />
</DisableTetherBoundary>

<Figure>
	<div class="labelled-dropdown">
		<code><b>direction</b></code>
		<Dropdown options={ALIGNMENT_EXAMPLE_OPTIONS} bind:value={alignmentExampleDirection} />
	</div>
</Figure>

<p>
	The library is written with <i>Svelte snippets</i> in mind. Basic usage of a tether wrapper looks like
	this:
</p>

<CodeBlock>
	{`svelte
<Tether origin="top-center">
	{#snippet portal()}
		<i>Tether.</i>
	{/snippet}

	<span>Sample text.</span>
</Tether>
`}
</CodeBlock>

<Figure>
	<DisableTetherBoundary>
		<Tether origin="top-center">
			{#snippet portal()}
				<i>Tether.</i>
			{/snippet}

			<span>Sample text.</span>
		</Tether>
	</DisableTetherBoundary>
</Figure>

<h2>Why <code>portal</code>?</h2>

<p>
	Tethers are based on the frontend concept of <b>portals</b> - that is, ways for a UI element to
	break out of its hierarchy and instead get attached to a <b>different parent</b> element.
</p>

<p>
	You can use the tether-underlying <code>Portal</code> component by itself, which implements this
	behavior. Any content nested inside a portal gets mounted to a <code>Destination</code> - by
	default, a destination managed by the global <code>PortalOverlay</code>.
</p>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	.primary {
		background-color: scheme.color('primary');
		color: scheme.color('on-primary');
	}

	.labelled-dropdown {
		display: flex;
		align-items: center;
		gap: 8px;
	}
</style>
