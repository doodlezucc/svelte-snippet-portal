<script lang="ts">
	import Button from '$docs/Button.svelte';
	import CodeBlock from '$docs/CodeBlock.svelte';
	import Figure from '$docs/layout/Figure.svelte';
	import Heading from '$docs/layout/Heading.svelte';
	import BoundDestination from './BoundDestination.svelte';

	let useDestinationB = $state(false);
</script>

<Heading title="Custom Destination" />

<p>
	The <code>Destination</code> component is used by the <code>PortalOverlay</code> component to mount
	snippets to the "top layer" of the document.
</p>

<p>
	You can use <code>Destination</code> yourself and <b>bind it</b> (using
	<code>bind:this</code>) to act as a destination for your portals.
</p>

<p>
	For example, the following outlined rectangles are plain <code>div</code> elements, each with a
	bound <code>Destination</code> component placed inside.
</p>

<BoundDestination {useDestinationB} />

<Figure>
	<Button onclick={() => (useDestinationB = !useDestinationB)}>Switch Destination</Button>
</Figure>

<p>
	By clicking the button, a portal (containg just a text span) switches its mounting destination
	from one <code>div</code> to another.
</p>

<CodeBlock>
	{`./BoundDestination.svelte`}
</CodeBlock>
