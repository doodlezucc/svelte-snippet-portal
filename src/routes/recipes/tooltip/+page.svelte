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

		{#snippet title()}
			Hello!
		{/snippet}
	</Tooltip>
</Figure>

<CodeBlock>
	{`svelte
<Tooltip>
	<b>Hover me to be greeted.</b>

	{#snippet title()}
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

<p>
	The library provides an <b>element-less</b> Svelte component to base your custom tooltips on,
	called <code>BaseTetherTooltip</code>. It's used in this recipe's source code.
</p>

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
			In the rendered DOM, the tooltip is <b>completely isolated</b> from the element. To make it
			easier for screen readers, you <b>should always</b> configure your floating tooltip's ID - use
			the passed in <code>tooltipId</code> parameter from the #snippet block for that.
		</p>
	</li>

	<li>
		<p>
			Other parameters passed in through the snippet include
			<code>isHovered</code> and <code>isFocused</code>. Both can be used to determine the visiblity
			of your tooltip. In the example above, these are used to toggle a CSS class on the element.
		</p>
	</li>
</ol>
