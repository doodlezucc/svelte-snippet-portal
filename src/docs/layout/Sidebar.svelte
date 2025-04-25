<script lang="ts">
	import { page } from '$app/state';
	import IconButton from '$docs/IconButton.svelte';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import XIcon from '@lucide/svelte/icons/x';
	import SidebarLink from './SidebarLink.svelte';

	let isNavigationOpen = $state(false);

	let currentPath = $derived(page.url.pathname);

	$effect(() => {
		if (currentPath) {
			isNavigationOpen = false;
		}
	});
</script>

<div class="small-screen button">
	<IconButton
		icon={MenuIcon}
		tooltipAlignment="center-left"
		onclick={() => (isNavigationOpen = true)}>Navigation</IconButton
	>
</div>

<aside class:open={isNavigationOpen}>
	<ul>
		<SidebarLink path="/">Overview</SidebarLink>
		<SidebarLink path="/setup">Setup</SidebarLink>

		<ul>
			<h3>Advanced Usage</h3>
			<SidebarLink path="/tether-boundary">Tether Boundary</SidebarLink>
			<SidebarLink path="/custom-destination">Custom Destination</SidebarLink>
		</ul>

		<ul>
			<h3>Recipes</h3>
			<SidebarLink path="/recipes/tooltip">Tooltip</SidebarLink>
			<SidebarLink path="/recipes/dialog">Dialog</SidebarLink>
			<SidebarLink path="/recipes/dropdown">Dropdown</SidebarLink>
		</ul>
	</ul>

	<div class="small-screen button">
		<IconButton
			icon={XIcon}
			tooltipAlignment="center-left"
			onclick={() => (isNavigationOpen = false)}>Close</IconButton
		>
	</div>
</aside>

<style lang="scss">
	@use '$docs/style/scheme';

	.button {
		z-index: 1;
		display: flex;
		position: absolute;
		margin: 32px;
		right: 0;
	}

	aside {
		box-sizing: border-box;
		background-color: scheme.color('shade-1');
		border-right: 1px solid scheme.color('separator');

		display: flex;
		justify-content: end;
		padding: 0 3em;
		line-height: 1.5em;
		min-width: 240px;
		width: calc(50vw - 300px);
	}

	@media screen and (min-width: 1201px) {
		.small-screen {
			display: none;
		}
	}

	@media screen and (max-width: 1200px) {
		aside {
			position: absolute;
			z-index: 1;
			width: 100vw;
			max-height: 100%;
			overflow: auto;
			justify-content: start;
			border: none;
			border-bottom: 1px solid scheme.color('separator');

			&:not(.open) {
				display: none;
			}
		}
	}

	ul {
		padding-inline-start: 0;
		margin: 2em 0;
	}

	h3 {
		font-size: 1em;
		margin: 0.1em 0;
	}
</style>
