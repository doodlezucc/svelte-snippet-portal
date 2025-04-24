<script lang="ts">
	import { type Snippet } from 'svelte';
	import { Tether, type Alignment } from 'svelte-tether';

	interface Props {
		alignment?: Alignment;
		children: Snippet;
		tooltip: Snippet;
	}

	let { alignment = 'top-center', children, tooltip }: Props = $props();

	let wrappedElement = $state<HTMLElement>();
	let tooltipId = $props.id();

	// This adds an identifying attribute to the "wrappedElement".
	// You can think of this as a Svelte use:action acting on the element.
	$effect(() => {
		const currentWrappedElement = wrappedElement;

		if (currentWrappedElement) {
			currentWrappedElement.setAttribute('aria-labelledby', tooltipId);

			return () => {
				currentWrappedElement.removeAttribute('aria-labelledby');
			};
		}
	});
</script>

<Tether origin={alignment} bind:wrappedElement>
	{@render children()}

	{#snippet portal()}
		<div aria-hidden="true" role="tooltip" id={tooltipId}>
			{@render tooltip()}
		</div>
	{/snippet}
</Tether>

<!--
    The CSS selector here selects the tooltip element, if the wrapped element
    with the "aria-labelledby" attribute is currently hovered or focused.
-->
<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<style>
        body:has(
            [aria-labelledby='${tooltipId}']:hover,
            [aria-labelledby='${tooltipId}']:focus-visible
        ) #${tooltipId} {
            opacity: 1;
            margin: 4px;
        }
    </style>`}
</svelte:head>

<style>
	[role='tooltip'] {
		padding: 4px 12px;
		background-color: black;
		color: white;

		opacity: 0;
		margin: 0;
		transition: 0.1s;
	}
</style>
