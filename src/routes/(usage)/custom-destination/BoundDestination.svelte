<script lang="ts">
	import { Destination, Portal } from 'svelte-tether';

	let { useDestinationB }: { useDestinationB: boolean } = $props();

	let destinationA = $state<Destination>();
	let destinationB = $state<Destination>();

	let currentDestination = $derived(useDestinationB ? destinationB : destinationA);
</script>

<div class="destinations">
	<div>
		<Destination bind:this={destinationA} />
	</div>
	<div>
		<Destination bind:this={destinationB} />
	</div>
</div>

{#if currentDestination}
	<Portal destination={currentDestination}>
		<span>This is sample text.</span>
	</Portal>
{/if}

<style>
	.destinations {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 32px;
	}

	.destinations div {
		height: 60px;
		outline: 1px solid grey;
	}
</style>
