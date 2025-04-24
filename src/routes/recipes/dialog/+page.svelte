<script lang="ts">
	import Button from '$docs/Button.svelte';
	import CodeBlock from '$docs/CodeBlock.svelte';
	import Figure from '$docs/Figure.svelte';
	import Dialog from './Dialog.svelte';

	let isDialogOpen = $state(false);
</script>

<h1>Dialog</h1>

<p>
	A standard <code>Portal</code> may be used to create elements which fill the entire viewport.
	That's because any content put inside a portal usually gets mounted right into the global
	<code>PortalOverlay</code> wrapper (if no
	<a href="/custom-destination">other destination</a> is specified).
</p>

<p>
	The overlay spans from the top left corner of your screen to the bottom right. You can make use of
	this to create modal UI elements such as dialogs.
</p>

<p>
	To create a simple fullscreen backdrop for a dialog to fit into, consider the following example:
</p>

<CodeBlock>
	{`svelte
<Portal modal>
	<div class="backdrop"></div>
</Portal>

<style>
	.backdrop {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 25%);
	}
</style>
`}
</CodeBlock>

<p>When mounted, this will render as a dark shade over your whole page.</p>

<h2>Modal portals</h2>

<p>
	The <code>modal</code> property on the <code>Portal</code> in the example above
	<b>doesn't influence</b> anything about the portal itself. When a "modal" portal gets mounted to
	the DOM, your global <code>PortalOverlay</code> keeps track.
</p>

<p>
	This is useful primarily for accessibility. When a modal dialog shows up on your page, no elements
	<i>behind</i> that dialog should be interactable in any way - focus should be
	<b>drawn to the dialog</b> and the dialog only.
</p>

<p>
	To make use of your <code>PortalOverlay</code>'s track-keeping, you should nest your
	+layout.svelte structure inside an explicit snippet block for the <code>children()</code> slot.
	This allows you to accept <b>parameters</b> managed by the overlay.
</p>

<p>So, instead of nesting your page content the shorthand way...</p>

<CodeBlock>
	{`svelte
<PortalOverlay>
	<main>
		<h1>Welcome to my page.</h1>
	</main>
</PortalOverlay>
`}
</CodeBlock>

<p>
	...you can use a <code>{'{#snippet children()}'}</code> block instead. You can then access the
	overlay state in your page content, for example to add the
	<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert">
		"inert" attribute
	</a> if any modals are currently mounted.
</p>

<CodeBlock>
	{`svelte
<PortalOverlay>
	{#snippet children({ hasModals })}
		<main inert={hasModals}>
			<h1>Welcome to my page.</h1>
		</main>
	{/snippet}
</PortalOverlay>
`}
</CodeBlock>

<h2>Full Example</h2>

<p>
	The following is a very basic dialog component, which can be opened or closed with a bindable
	<code>open</code> property.
</p>

<Dialog bind:open={isDialogOpen} title="Dialog Title">This is content.</Dialog>

<CodeBlock>
	{`svelte
<Dialog bind:open={isDialogOpen} title="Dialog Title">
	This is content.
</Dialog>
`}
</CodeBlock>

<Figure>
	<Button onclick={() => (isDialogOpen = true)}>Open Dialog</Button>
</Figure>

<p>
	The source code for this <code>Dialog</code> component implements "click-away" behavior. When clicking
	the backdrop, this causes the dialog to close.
</p>

<CodeBlock>
	{`./Dialog.svelte`}
</CodeBlock>
