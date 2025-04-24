<script lang="ts">
	import SidebarLink from './SidebarLink.svelte';
</script>

<aside>
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
</aside>

<style lang="scss">
	@use '$docs/style/scheme';

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

	ul {
		padding-inline-start: 0;
		margin: 2em 0;
	}

	h3 {
		font-size: 1em;
		margin: 0.1em 0;
	}
</style>
