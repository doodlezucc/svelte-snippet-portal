<script lang="ts">
	import SampleText from '$lib/docs/SampleText.svelte';
	import { Destination, Portal, type PortalDestination } from 'svelte-tether';

	let destinationA = $state<PortalDestination>();
	let destinationB = $state<PortalDestination>();
</script>

<h1>Custom Destination</h1>

<p>
	The <code>Destination</code> component is used by the <code>PortalOverlay</code> component to mount
	snippets to the "top layer" of the document.
</p>

<p>
	You can use <code>Destination</code> yourself and <b>bind it</b> (using
	<code>bind:this</code>) to act as a destination for your portals.
</p>

<h2>Example</h2>

<div class="example">
	<p>
		These outlined rectangles are <code>div</code> elements, each with a bound
		<code>Destination</code> component placed inside:
	</p>

	<div class="destinations">
		<div class="custom-destination">
			<Destination bind:this={destinationA} />
		</div>
		<div class="custom-destination">
			<Destination bind:this={destinationB} />
		</div>
	</div>

	<Portal destination={destinationB}>
		<SampleText />
	</Portal>
</div>

<style>
	.destinations {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 32px;
	}

	.custom-destination {
		min-height: 40px;
		outline: 1px solid black;
	}
</style>
