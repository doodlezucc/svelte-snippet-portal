<script lang="ts">
	import { Tether, type Alignment } from '$lib/index.js';

	interface Props {
		origin: Alignment;
		direction?: Alignment;
	}

	let { origin, direction }: Props = $props();
</script>

<Tether {origin} {direction}>
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
</Tether>

<style lang="scss">
	@use '$docs/style/scheme';

	div {
		text-align: center;
		padding: 20px;
		background-color: scheme.color('primary');
		color: scheme.color('on-primary');
		font-weight: 500;
	}

	span {
		padding: 4px;
		background-color: scheme.color('secondary');
		color: scheme.color('on-secondary');
		font-weight: 500;
	}
</style>
