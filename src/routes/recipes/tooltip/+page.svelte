<script lang="ts">
	import Figure from '$lib/docs/Figure.svelte';
	import Tooltip from '$lib/docs/Tooltip.svelte';
	import { Tether } from '$lib/index.js';
</script>

<h1>Tooltip</h1>

<p>
	Tooltips are essentially just elements positioned by a <code>Tether</code>, with the added trait
	of only being visible when the wrapped element is hovered.
</p>

<Figure>
	<Tether origin="top-center">
		<b>Here goes the actual element.</b>

		{#snippet portal()}
			<i>This is the tooltip.</i>
		{/snippet}
	</Tether>
</Figure>

{`svelte
<Tether origin="top-center">
	<b>Here goes the actual element.</b>

	{#snippet portal()}
		<i>This is the tooltip.</i>
	{/snippet}
</Tether>
`}

<Tooltip>
	<b>Hover me to be greeted.</b>

	{#snippet tooltip()}
		Hello!
	{/snippet}
</Tooltip>
