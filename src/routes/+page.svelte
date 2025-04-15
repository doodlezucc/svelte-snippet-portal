<script lang="ts">
	import SampleText from '$lib/docs/SampleText.svelte';
	import { Anchor } from '$lib/index.js';
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

<div class="grid">
	<Anchor origin="top-center">
		<div>div content</div>

		{#snippet portal()}
			portal content
		{/snippet}
	</Anchor>

	<Anchor origin="bottom-left" alignment="bottom-center">
		<textarea></textarea>

		{#snippet portal()}
			<div class="popover"><SampleText /></div>
		{/snippet}
	</Anchor>
</div>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	.grid {
		border: 1px solid black;
		display: grid;
		grid-template-columns: max-content max-content max-content;
		justify-content: space-evenly;
	}

	.grid div {
		padding: 20px;
		width: 200px;
		background-color: scheme.color('primary');
		color: scheme.color('text-light');
	}

	.popover {
		background-color: scheme.color('primary');
		color: scheme.color('text-light');
		padding: 8px;
		border: 1px solid black;
		margin: 2px;
	}
</style>
