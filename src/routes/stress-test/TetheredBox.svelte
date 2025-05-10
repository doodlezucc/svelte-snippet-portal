<script lang="ts">
	import IconButton from '$docs/IconButton.svelte';
	import IceCreamConeIcon from '@lucide/svelte/icons/ice-cream-cone';
	import { Tether } from 'svelte-tether';
</script>

<Tether origin="top-left" direction="center-right">
	{#snippet portal()}
		<span>Tether</span>
	{/snippet}

	<div>
		<IconButton onclick={() => {}} icon={IceCreamConeIcon}>Icon 1</IconButton>
		<IconButton onclick={() => {}} icon={IceCreamConeIcon}>Icon 2</IconButton>
		<IconButton onclick={() => {}} icon={IceCreamConeIcon}>Icon 3</IconButton>
	</div>
</Tether>

<style lang="scss">
	@use '$docs/style/scheme';

	div {
		display: flex;
		justify-content: center;
		gap: 8px;
		border: 2px solid scheme.color('separator');
		border-radius: 16px;
		box-sizing: border-box;
		padding: 16px;
		transition: 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

		&:hover {
			border-width: 8px;
		}
	}

	span {
		background-color: scheme.color('shade-2');
		margin-left: 16px;
		padding: 2px 16px;
	}
</style>
