<script lang="ts">
	import CodeBlock from '$docs/CodeBlock.svelte';
	import Heading from '$docs/layout/Heading.svelte';
	import Link from '$docs/Link.svelte';
</script>

<Heading title="Setup" />

<p>Add the library to your Svelte project by installing it with your preferred package manager.</p>

<CodeBlock>
	{`shell
npm install svelte-tether
`}
</CodeBlock>

<p>
	Once installed, get started by <b>wrapping your page</b> in the <code>PortalOverlay</code>
	component. Usually this would go into your outer most +layout.svelte file:
</p>

<CodeBlock>
	{`svelte
<PortalOverlay>
	{@render children()}
</PortalOverlay>
`}
</CodeBlock>

<p>
	The overlay must be an ancestor of all your tethers, because it defines a
	<a href="https://svelte.dev/docs/svelte/context">scoped Svelte context</a>. This context is
	required by tethers, as they need to know where to mount your popovers in the DOM.
</p>

<p>
	Consider also putting a <Link path="/tether-boundary">tether boundary</Link> around the contents of
	your page if you want all floating elements to be constrained to the viewport.
</p>
