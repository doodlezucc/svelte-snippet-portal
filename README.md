# Svelte Tether

A small collection of Svelte wrapper components to teleport snippets from one place to another. Useful for popovers and modal elements.

The library is written with _Svelte snippets_ in mind. Basic usage of a tether wrapper looks like this:

```svelte
<Tether origin="top-center">
	{#snippet portal()}
		<i>Tether.</i>
	{/snippet}

	<span>Sample text.</span>
</Tether>
```

Make sure to [check out the documentation](https://doodlezucc.github.io/svelte-tether/) for concepts, examples and use cases!
