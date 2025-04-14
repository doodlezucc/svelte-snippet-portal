<script lang="ts">
	import SampleText from '$lib/docs/SampleText.svelte';
	import { Portal, Space, type PortalSpace } from '$lib/index.js';

	let spaceA = $state<PortalSpace>();
	let spaceB = $state<PortalSpace>();
</script>

<h1>Custom Space</h1>

<p>
	The <code>Space</code> component is used by the <code>PortalOverlay</code> component to mount snippets
	to the "top layer" of the document.
</p>

<p>
	You can use <code>Space</code> yourself and <b>bind it</b> (using
	<code>bind:this</code>) to act as a destination for your portals.
</p>

<h2>Example</h2>

<div class="example">
	<p>
		These outlined rectangles are <code>div</code> elements, each with a bound
		<code>Space</code> component placed inside:
	</p>

	<div class="spaces">
		<div class="custom-space">
			<Space bind:this={spaceA} />
		</div>
		<div class="custom-space">
			<Space bind:this={spaceB} />
		</div>
	</div>

	<Portal space={spaceB}>
		<SampleText />
	</Portal>
</div>

<style>
	.spaces {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 32px;
	}

	.custom-space {
		min-height: 40px;
		outline: 1px solid black;
	}
</style>
