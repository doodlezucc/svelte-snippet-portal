<script lang="ts">
	import Link from './Link.svelte';
</script>

<aside>
	<ul>
		<Link href="/">Overview</Link>
		<Link href="/setup">Setup</Link>

		<ul>
			<h3>Advanced Usage</h3>
			<Link href="/tether-boundary">Tether Boundary</Link>
			<Link href="/custom-destination">Custom Destination</Link>
		</ul>

		<ul>
			<h3>Recipes</h3>
			<Link href="/recipes/tooltip">Tooltip</Link>
			<Link href="/recipes/dialog">Dialog</Link>
			<Link href="/recipes/dropdown">Dropdown</Link>
		</ul>
	</ul>
</aside>

<style lang="scss">
	@use '$lib/docs/style/scheme';

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
