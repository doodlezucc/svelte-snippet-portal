<script lang="ts" module>
	export type Alignment = keyof typeof ALIGNMENT_MAPPING;

	const ALIGNMENT_MAPPING = {
		'top-left': [0, 0],
		'top-center': [0.5, 0],
		'top-right': [1, 0],
		'center-left': [0, 0.5],
		center: [0.5, 0.5],
		'center-right': [1, 0.5],
		'bottom-left': [0, 1],
		'bottom-center': [0.5, 1],
		'bottom-right': [1, 1]
	};

	export type SizeInheritMode = boolean | 'constrain';
</script>

<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import Portal from './Portal.svelte';

	const VIEWPORT_MARGIN = 0;

	interface Props {
		origin: Alignment;
		direction?: Alignment;
		inheritWidth?: SizeInheritMode;
		inheritHeight?: SizeInheritMode;
		portal: Snippet;
		children: Snippet;

		/** The wrapped HTML element used as a reference for positioning the portal (read-only). */
		wrappedElement?: HTMLElement;
	}

	let {
		origin,
		direction = origin,
		inheritWidth = false,
		inheritHeight = false,
		portal,
		children,
		wrappedElement = $bindable()
	}: Props = $props();

	let referenceWrapper = $state<HTMLElement>();
	let rect = $state<DOMRect>();

	let update = $state(true);
	let animationFrameRequest = $state<number>();

	function updateRect() {
		if (!update) return;

		if (wrappedElement) {
			rect = wrappedElement.getBoundingClientRect();
		}

		animationFrameRequest = requestAnimationFrame(updateRect);
	}

	$effect(() => {
		if (update) {
			animationFrameRequest = requestAnimationFrame(updateRect);
		} else if (animationFrameRequest !== undefined) {
			cancelAnimationFrame(animationFrameRequest);
			animationFrameRequest = undefined;
		}
	});

	onMount(() => {
		return () => {
			if (animationFrameRequest !== undefined) {
				cancelAnimationFrame(animationFrameRequest);
			}
		};
	});

	let childWidth = $state(0);
	let childHeight = $state(0);

	let viewportWidth = $state(0);
	let viewportHeight = $state(0);
	onMount(() => {
		viewportWidth = window.innerWidth;
		viewportHeight = window.innerHeight;
	});

	let maxX = $derived(viewportWidth - VIEWPORT_MARGIN - childWidth);
	let maxY = $derived(viewportHeight - VIEWPORT_MARGIN - childHeight);

	let originHorizontal = $derived(ALIGNMENT_MAPPING[origin][0]);
	let originVertical = $derived(ALIGNMENT_MAPPING[origin][1]);

	let alignHorizontal = $derived(ALIGNMENT_MAPPING[direction][0]);
	let alignVertical = $derived(ALIGNMENT_MAPPING[direction][1]);

	let childXUnclamped = $derived(
		!rect ? 0 : rect.x + originHorizontal * rect.width - childWidth * (1 - alignHorizontal)
	);
	let childYUnclamped = $derived(
		!rect ? 0 : rect.y + originVertical * rect.height - childHeight * (1 - alignVertical)
	);

	let childX = $derived(Math.min(Math.max(childXUnclamped, VIEWPORT_MARGIN), maxX));
	let childY = $derived(Math.min(Math.max(childYUnclamped, VIEWPORT_MARGIN), maxY));

	function updateWrappedElement() {
		const children = referenceWrapper!.children;

		if (children.length < 1) {
			wrappedElement = undefined;
			throw new Error('Tether must have exactly one child element');
		}

		wrappedElement = referenceWrapper!.children[0] as HTMLElement;
	}

	let cssVariables = $derived({
		x: childX,
		y: childY,
		...(inheritWidth && rect ? { w: rect.width } : {}),
		...(inheritHeight && rect ? { h: rect.height } : {})
	});

	let cssStyle = $derived(
		Object.entries(cssVariables)
			.map(([key, value]) => `--${key}: ${value}px;`)
			.join(' ')
	);

	// Update renderedText whenever the content of the popover changes
	onMount(() => {
		updateWrappedElement();

		const observer = new MutationObserver(() => {
			updateWrappedElement();
		});

		observer.observe(referenceWrapper!, { childList: true });

		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:window
	onresize={() => {
		viewportWidth = window.innerWidth;
		viewportHeight = window.innerHeight;
	}}
/>

<div class="tether" bind:this={referenceWrapper}>
	{@render children()}
</div>

{#if referenceWrapper}
	<Portal>
		<div
			class="popover"
			data-inherit-width={inheritWidth}
			data-inherit-height={inheritHeight}
			bind:clientWidth={childWidth}
			bind:clientHeight={childHeight}
			style={cssStyle}
		>
			{@render portal()}
		</div>
	</Portal>
{/if}

<style>
	.tether {
		display: contents;
	}

	.popover {
		position: absolute;
		display: grid;
		transform: translate(var(--x), var(--y));

		&[data-inherit-width='true'] {
			width: var(--w);
		}
		&[data-inherit-width='constrain'] {
			max-width: var(--w);
		}

		&[data-inherit-height='true'] {
			height: var(--h);
		}
		&[data-inherit-height='constrain'] {
			max-height: var(--h);
		}
	}
</style>
