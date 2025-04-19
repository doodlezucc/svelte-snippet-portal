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
	import { useOverlay } from './PortalOverlay.svelte';
	import { useAnimationFrame } from './animation-frame.svelte.js';

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

	const overlay = useOverlay();

	let referenceWrapper = $state<HTMLElement>();
	let rect = $state<DOMRect>();
	let boundary = $state(<DOMRect>{ top: 0, right: 1, bottom: 1, left: 0 });

	useAnimationFrame(() => {
		if (wrappedElement) {
			rect = wrappedElement.getBoundingClientRect();
		}

		const overlayRect = overlay.getRect();
		if (overlayRect) {
			boundary = overlayRect;
		}
	});

	let childWidth = $state(0);
	let childHeight = $state(0);

	let maxX = $derived(boundary.right - childWidth);
	let maxY = $derived(boundary.bottom - childHeight);

	$inspect(maxX);
	$inspect(maxY);

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

	let childX = $derived(Math.min(Math.max(childXUnclamped, boundary.left), maxX));
	let childY = $derived(Math.min(Math.max(childYUnclamped, boundary.top), maxY));

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

<div class="tether" bind:this={referenceWrapper}>
	{@render children()}
</div>

{#if referenceWrapper}
	<Portal>
		<div
			class="popover"
			data-inherit-width={inheritWidth || undefined}
			data-inherit-height={inheritHeight || undefined}
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
