<script lang="ts">
	import CodeBlock from '$docs/CodeBlock.svelte';
	import Figure from '$docs/Figure.svelte';
	import Dropdown from './Dropdown.svelte';
	import DropdownUnstyled from './DropdownUnstyled.svelte';

	let options = $state(['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet']);
	let value = $state('Lorem');
</script>

<h1>Dropdown</h1>

<p>A dropdown menu is usually presented to the user when interacting with a combo box:</p>

<Figure>
	<select>
		{#each options as option (option)}
			<option>{option}</option>
		{/each}
	</select>
</Figure>

<p>
	In HTML, this UI component is implemented via the <i>select</i> element and a list of
	<i>option</i> elements. The main problem with especially the latter is that they're not very
	flexible when it comes to styling. To quote the amazing
	<a
		href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select#styling_with_css"
	>
		MDN web docs
	</a>:
</p>

<q>
	It is [...] hard to get a consistent result across browsers with traditional {'<select>'}
	elements. If you want to get full control, you should consider using a library with good facilities
	for styling form widgets, or try rolling your own dropdown menu using non-semantic elements, JavaScript,
	and WAI-ARIA to provide semantics.
</q>

<p>
	In order to build a combo box from scratch, you can start with a basic, clickable input field. You
	can then make use of a <code>Tether</code> to mount a custom dropdown menu <i>right under</i> the field.
</p>

<Figure>
	<DropdownUnstyled {options} bind:value />
</Figure>

<CodeBlock>
	{`./DropdownUnstyled.svelte`}
</CodeBlock>

<p>
	To make it the same width, you can pass the <code>inheritWidth</code> flag to the
	<code>Tether</code> component. You can also put a <i>soft limit</i> on the maximum width by using
	the special value
	<code>inheritWidth="constrain"</code>.
</p>

<p>
	For improved usability, a tether can be configured to wrap horizontally and/or vertically. For the
	dropdown menu below, the <code>wrapVertical</code> flag means that the alignment
	<b>automatically swaps</b> to the top if there's not enough space below the input field.
</p>

<h2>Styling</h2>

<p>
	You can also add a chevron icon to the text field and align the CSS with your site's scheme to get
	nicer looking results.
</p>

<p>
	For example, this multi-themed documentation makes use of CSS variables and the
	<a href="https://sass-lang.com/">SCSS</a> language superset. The following is an extended version of
	the component above, adjusted to fit in with the rest of the documentation pages.
</p>

<Figure>
	<Dropdown {options} bind:value />
</Figure>

<CodeBlock>
	{`./Dropdown.svelte`}
</CodeBlock>

<style lang="scss">
	@use '$docs/style/scheme';

	q {
		display: block;
		margin: 2em 0;
		padding-left: 24px;
		border-left: 2px solid scheme.color('separator');

		color: scheme.color('quote');
	}
</style>
