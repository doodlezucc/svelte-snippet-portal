<script lang="ts">
	import Dropdown from '$lib/docs/Dropdown.svelte';
	import Figure from '$lib/docs/Figure.svelte';

	let options = $state(['Option A', 'Option B', 'Option C', 'Option D with a long name']);
	let value = $state('Option A');
</script>

<h1>Dropdown</h1>

<p>A dropdown menu is usually presented to the user when interacting with a combo box:</p>

<div>
	<select>
		{#each options as option}
			<option>{option}</option>
		{/each}
	</select>
</div>

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
	<Dropdown {options} bind:value />
</Figure>

<p>(TODO: add code example here)</p>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	q {
		display: block;
		margin: 2em 0;
		padding-left: 24px;
		border-left: 2px solid scheme.color('separator');

		color: scheme.color('quote');
	}
</style>
