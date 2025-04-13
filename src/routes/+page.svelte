<script lang="ts">
	import { Anchor, Portal, Space, type PortalSpace } from '$lib/index.js';
	import SampleText from './SampleText.svelte';

	let mySpace = $state<PortalSpace>();
</script>

<h1>svelte-snippet-portal</h1>

<div class="my-space">
	<Space bind:this={mySpace} />
</div>

{#if mySpace}
	<Portal space={mySpace}>
		<SampleText />
	</Portal>
{/if}

<div class="grid">
	<Anchor origin="center-left">
		<div>div content</div>

		{#snippet portal()}
			portal content
		{/snippet}
	</Anchor>

	<Anchor origin="bottom-center">
		<textarea>div content</textarea>

		{#snippet portal()}
			<div class="popover"><SampleText /></div>
		{/snippet}
	</Anchor>
</div>

<style>
	.grid {
		border: 1px solid black;
		display: grid;
		grid-template-columns: max-content max-content max-content;
		justify-content: space-evenly;
	}

	.grid div {
		padding: 20px;
		width: 200px;
		background-color: burlywood;
	}

	.popover {
		background-color: aqua;
		padding: 8px;
		border: 1px solid black;
		margin: 8px;
	}
</style>
