<header>
	<a href="/">Svelte Snippet Portal</a>
</header>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	header {
		padding: 24px 48px;

		display: flex;
		gap: 32px;

		background-color: scheme.color('background');
		border-bottom: 1px solid scheme.color('separator');
	}

	a {
		color: scheme.color('text');
	}
</style>
