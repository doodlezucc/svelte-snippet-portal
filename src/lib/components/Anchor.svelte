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
		alignment?: Alignment;
		inheritWidth?: SizeInheritMode;
		inheritHeight?: SizeInheritMode;
		portal: Snippet;
		children: Snippet;
	}

	let {
		origin,
		alignment = origin,
		inheritWidth = false,
		inheritHeight = false,
		portal,
		children
	}: Props = $props();

	let anchorWrapper = $state<HTMLElement>();
	let anchorElement = $state<HTMLElement>();
	let rect = $state<DOMRect>();

	let update = $state(true);
	let animationFrameRequest = $state<number>();

	function updateRect() {
		if (!update) return;

		if (anchorElement) {
			rect = anchorElement.getBoundingClientRect();
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

	let alignHorizontal = $derived(ALIGNMENT_MAPPING[alignment][0]);
	let alignVertical = $derived(ALIGNMENT_MAPPING[alignment][1]);

	let childXUnclamped = $derived(
		!rect ? 0 : rect.x + originHorizontal * rect.width - childWidth * (1 - alignHorizontal)
	);
	let childYUnclamped = $derived(
		!rect ? 0 : rect.y + originVertical * rect.height - childHeight * (1 - alignVertical)
	);

	let childX = $derived(Math.min(Math.max(childXUnclamped, VIEWPORT_MARGIN), maxX));
	let childY = $derived(Math.min(Math.max(childYUnclamped, VIEWPORT_MARGIN), maxY));

	function updateAnchorElement() {
		const children = anchorWrapper!.children;

		if (children.length < 1) {
			anchorElement = undefined;
			throw new Error('Anchor must have exactly one child element');
		}

		anchorElement = anchorWrapper!.children[0] as HTMLElement;
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
		updateAnchorElement();

		const observer = new MutationObserver(() => {
			updateAnchorElement();
		});

		observer.observe(anchorWrapper!, { childList: true });

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

<div class="anchor" bind:this={anchorWrapper}>
	{@render children()}
</div>

{#if anchorWrapper}
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
	.anchor {
		display: contents;
	}

	.popover {
		position: absolute;
		display: inline-flex;
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
