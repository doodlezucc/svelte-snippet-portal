<script lang="ts">
	import { Tether, type Alignment } from '$lib/index.js';
	import { type Snippet } from 'svelte';

	interface Props {
		alignment?: Alignment;
		children: Snippet;
		tooltip: Snippet;
	}

	let { alignment = 'top-center', children, tooltip }: Props = $props();

	let wrappedElement = $state<HTMLElement>();

	let tooltipId = $props.id();
	let isHovered = $state(false);
	let isFocused = $state(false);

	function onMouseEnter() {
		isHovered = true;
	}

	function onMouseLeave() {
		isHovered = false;
	}

	function onFocus(ev: FocusEvent) {
		// The CSS pseudo-class :focus-visible (usually) only applies if the user
		// navigated to the target element with keyboard navigation.
		if (ev.target instanceof HTMLElement && ev.target.matches(':focus-visible')) {
			isFocused = true;
		}
	}

	function onBlur() {
		isFocused = false;
	}

	$effect(() => {
		const currentWrappedElement = wrappedElement;

		if (currentWrappedElement) {
			currentWrappedElement.setAttribute('aria-labelledby', tooltipId);
			currentWrappedElement.addEventListener('mouseenter', onMouseEnter);
			currentWrappedElement.addEventListener('mouseleave', onMouseLeave);
			currentWrappedElement.addEventListener('focus', onFocus);
			currentWrappedElement.addEventListener('blur', onBlur);

			return () => {
				currentWrappedElement.removeAttribute('aria-labelledby');
				currentWrappedElement.removeEventListener('mouseenter', onMouseEnter);
				currentWrappedElement.removeEventListener('mouseleave', onMouseLeave);
				currentWrappedElement.removeEventListener('focus', onFocus);
				currentWrappedElement.removeEventListener('blur', onBlur);
			};
		}
	});
</script>

<Tether origin={alignment} bind:wrappedElement>
	{@render children()}

	{#snippet portal()}
		<div aria-hidden="true" role="tooltip" id={tooltipId} class:visible={isHovered || isFocused}>
			{@render tooltip()}
		</div>
	{/snippet}
</Tether>

<style lang="scss">
	@use '$docs/style/scheme';

	[role='tooltip'] {
		padding: 4px 12px;
		background-color: scheme.color('tooltip-background');
		color: scheme.color('tooltip-text');
		font-size: 0.8rem;
		font-weight: 500;

		transition: 0.1s;
		opacity: 0;
		margin: 0;

		&.visible {
			opacity: 1;
			margin: 4px;
		}
	}
</style>
