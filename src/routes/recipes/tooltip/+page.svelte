<script lang="ts">
	import CodeBlock from '$docs/CodeBlock.svelte';
	import Figure from '$docs/layout/Figure.svelte';
	import Heading from '$docs/layout/Heading.svelte';
	import Tooltip from './Tooltip.svelte';
</script>

<Heading title="Tooltip" />

<p>
	Tooltips are essentially just elements positioned by a <code>Tether</code>, with the added trait
	of only being visible when the wrapped element is hovered.
</p>

<p>
	With the <code>Tooltip</code> component from this recipe, you can achieve something like the following
	example:
</p>

<Figure>
	<Tooltip>
		<b>Hover me to be greeted.</b>

		{#snippet tooltip()}
			Hello!
		{/snippet}
	</Tooltip>
</Figure>

<CodeBlock>
	{`svelte
<Tooltip>
	<b>Hover me to be greeted.</b>

	{#snippet tooltip()}
		Hello!
	{/snippet}
</Tooltip>
`}
</CodeBlock>

<p>
	When wrapped around an interactable element (e.g. a button), the tooltip shows up when hovering or
	navigating to that element. Accessibility is managed by automatically adding an
	<code>aria-labelledby</code> attribute to the wrapped element.
</p>

<h2>Source Code for <code>{'Tooltip'}</code></h2>

<CodeBlock>
	{`./Tooltip.svelte`}
</CodeBlock>

<p>
	There are multiple things to note in the <code>{'Tooltip'}</code> source code.
</p>

<ol>
	<li>
		<p>
			This component allows passing in the tooltip text as a <b>snippet</b>. Depending on your use
			case, you may prefer a string type instead (or a union of both types).
		</p>
	</li>

	<li>
		<p>
			The element the tooltip should get attached to gets <b>inferred</b> from the rendered
			<code>children()</code> snippet. The Tether component provides
			<code>bind:wrappedElement</code> as a way to get access to that element.
		</p>
	</li>

	<li>
		<p>
			In the rendered DOM, the tooltip is <b>completely isolated</b> from the element. To make it
			possible to apply CSS styles to the tooltip when the element is hovered, a dynamic stylesheet
			based on the unique <code>$props.id()</code> gets injected into the DOM for each
			<code>Tooltip</code> instance.
		</p>

		<p>
			The independent connection between the two parts of a tooltip requires a <code>:has()</code>
			selector in CSS. This selector is
			<a href="https://caniuse.com/css-has">available in modern browsers</a> since late 2023. You may
			have to opt for a JavaScript solution if you need to support older browsers.
		</p>
	</li>
</ol>
