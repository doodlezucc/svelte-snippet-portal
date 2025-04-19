<script lang="ts">
	import { useAnimationFrame } from '$lib/components/animation-frame.svelte.js';
	import { PortalOverlay, Tether } from 'svelte-snippet-portal';
	import { Spring } from 'svelte/motion';

	interface Point {
		x: number;
		y: number;
	}

	let outerBoundary = $state<HTMLElement>();
	let outerBoundaryRect = $state<DOMRect>();

	useAnimationFrame(() => {
		outerBoundaryRect = outerBoundary?.getBoundingClientRect();
	});

	let relativeOffset = $state<Point>({ x: 0.5, y: 0.5 });

	const offset = new Spring<Point>({ x: -1, y: -1 }, {});
	let isInitial = $derived(offset.target.x < 0);

	$effect(() => {
		if (outerBoundaryRect) {
			const absoluteOffset: Point = {
				x: relativeOffset.x * outerBoundaryRect.width,
				y: relativeOffset.y * outerBoundaryRect.height
			};

			offset.set(absoluteOffset, { instant: isInitial });
		}
	});

	let style = $derived(isInitial ? '' : `--x: ${offset.current.x}px; --y: ${offset.current.y}px`);

	function inferRelativeOffset(ev: PointerEvent) {
		if (!outerBoundaryRect) return;

		relativeOffset = {
			x: Math.min(Math.max((ev.x - outerBoundaryRect.left) / outerBoundaryRect.width, 0), 1),
			y: Math.min(Math.max((ev.y - outerBoundaryRect.top) / outerBoundaryRect!.height, 0), 1)
		};
	}

	let isPointerDown = $state(false);

	function onPointerDown(ev: PointerEvent) {
		ev.preventDefault();
		inferRelativeOffset(ev);
		isPointerDown = true;
	}

	function onPointerMove(ev: PointerEvent) {
		if (ev.buttons !== 0) {
			inferRelativeOffset(ev);
		}
	}
</script>

<svelte:window
	onpointermove={isPointerDown ? onPointerMove : undefined}
	onpointerup={() => (isPointerDown = false)}
/>

<h1>Boundary</h1>

<p>
	The <code>PortalOverlay</code> component should be part of your +layout.svelte if you want to use any
	portal functionality.
</p>

<p>
	However, the overlay has another use case. You can wrap certain regions of your Svelte page in
	their own <code>PortalOverlay</code> to constrain the position of all the nested
	<code>Tether</code> portals.
</p>

<p><b>Click and drag</b> in the area below to see this in action.</p>

<div class="outer-boundary" bind:this={outerBoundary} onpointerdown={onPointerDown}>
	<div class="content" {style}></div>

	<PortalOverlay>
		<div class="boundary">
			<span class="boundary-header">{'<PortalOverlay>'}</span>

			<Tether origin="top-left">
				{#snippet portal()}
					<span>top-left</span>
				{/snippet}

				<Tether origin="bottom-right">
					{#snippet portal()}
						<span>bottom-right</span>
					{/snippet}

					<div class="content hidden" {style}></div>
				</Tether>
			</Tether>
		</div>
	</PortalOverlay>
</div>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	.outer-boundary {
		outline: 1px solid scheme.color('text');
		padding: 100px;
		display: grid;
		place-content: stretch;
		position: relative;

		:global(*) {
			pointer-events: none;
		}
	}

	.boundary {
		outline: 1px solid scheme.color('text');
		height: 300px;
	}

	.boundary-header {
		position: absolute;
		transform: translateY(-100%);
	}

	.content {
		background-color: scheme.color('primary');
		width: 50px;
		height: 50px;
		transform: translate(-25px, -25px);

		position: absolute;
		left: var(--x, 50%);
		top: var(--y, 50%);

		&.hidden {
			visibility: hidden;
		}
	}

	span {
		padding: 0px 4px;
		outline: 1px solid scheme.color('primary');
	}
</style>
