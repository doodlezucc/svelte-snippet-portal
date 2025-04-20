<script lang="ts" module>
	import { getContext } from 'svelte';
	import type { PortalSpace } from './Space.svelte';

	const OVERLAY_CONTEXT_KEY = 'portal-overlay';

	export interface OverlayContext {
		space: PortalSpace;
	}

	export function useOverlay() {
		return getContext<OverlayContext>(OVERLAY_CONTEXT_KEY);
	}
</script>

<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import Space from './Space.svelte';
	import TetherBoundary from './TetherBoundary.svelte';

	interface Props {
		/**
		 * The CSS z-index property applied to the overlay.
		 *
		 * @default 10
		 */
		zIndex?: number;
		class?: ClassValue;
		children: Snippet;
	}

	let { zIndex = 10, class: classValue, children }: Props = $props();

	let space = $state<Space>();

	setContext<OverlayContext>(OVERLAY_CONTEXT_KEY, {
		space: {
			mountPortal(snippet) {
				return space!.mountPortal(snippet);
			}
		}
	});
</script>

<div class="overlay" style:--overlay-z-index={zIndex}>
	<Space bind:this={space} />
</div>

<TetherBoundary class={classValue} ignoreParentBoundary>
	{@render children()}
</TetherBoundary>

<style>
	.overlay {
		position: fixed;
		z-index: var(--overlay-z-index);
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
