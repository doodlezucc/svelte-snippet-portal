<script lang="ts">
	import Link from './Link.svelte';
</script>

<aside>
	<ul>
		<Link href="/">Overview</Link>

		<ul>
			<h3>Examples</h3>
			<Link href="/examples/tooltip">Tooltip</Link>
			<Link href="/examples/dialog">Dialog</Link>
			<Link href="/examples/custom-space">Custom Space</Link>
		</ul>
	</ul>
</aside>

<style lang="scss">
	@use '$lib/docs/style/constants';
	@use '$lib/docs/style/scheme';

	aside {
		position: absolute;
		top: 0;
		bottom: 0;
		box-sizing: border-box;
		background-color: scheme.color('shade-1');
		border-right: 1px solid scheme.color('separator');
		width: constants.$sidebar-width;

		display: flex;
		justify-content: end;
		padding: 0 3em;
		line-height: 1.5em;
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
