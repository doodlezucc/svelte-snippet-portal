<script lang="ts">
	import { Anchor, type Alignment } from '$lib/index.js';
	import { type Snippet } from 'svelte';

	interface Props {
		alignment?: Alignment;
		children: Snippet;
		tooltip: Snippet;
	}

	let { alignment = 'top-center', children, tooltip }: Props = $props();

	let wrappedElement = $state<HTMLElement>();

	let tooltipId = $props.id();

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

<Anchor origin={alignment} bind:wrappedElement>
	{@render children()}

	{#snippet portal()}
		<div aria-hidden="true" role="tooltip" id={tooltipId}>
			{@render tooltip()}
		</div>
	{/snippet}
</Anchor>

<svelte:head>
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

<style lang="scss">
	@use '$lib/docs/style/scheme';

	[role='tooltip'] {
		padding: 4px 12px;
		background-color: scheme.color('tooltip-background');
		color: scheme.color('tooltip-text');
		font-size: 0.8rem;
		font-weight: 500;

		opacity: 0;
		margin: 0;
		transition: 0.1s;
	}
</style>
