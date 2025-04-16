<script lang="ts">
	import { Anchor, type Alignment } from '$lib/index.js';

	interface Props {
		origin: Alignment;
		direction?: Alignment;
	}

	let { origin, direction }: Props = $props();
</script>

<Anchor {origin} {direction}>
	<div>
		{origin}
	</div>

	{#snippet portal()}
		<span>
			{#if direction}
				{direction}
			{:else}
				default
			{/if}
		</span>
	{/snippet}
</Anchor>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	div {
		text-align: center;
		padding: 20px;
		background-color: scheme.color('primary');
		color: scheme.color('text-light');
	}

	span {
		padding: 4px;
		background-color: scheme.color('secondary');
		color: scheme.color('text');
	}
</style>
