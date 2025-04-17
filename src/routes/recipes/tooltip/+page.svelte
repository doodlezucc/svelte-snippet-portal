<script lang="ts">
	import Tooltip from '$lib/docs/Tooltip.svelte';
</script>

<h1>Tooltip</h1>

<p>
	Tooltips are essentially just elements positioned by an <code>Tether</code>, with the added trait
	of only being visible when the wrapped element is hovered.
</p>

<Tooltip>
	<b>Hover me to be greeted.</b>

	{#snippet tooltip()}
		Hello!
	{/snippet}
</Tooltip>
