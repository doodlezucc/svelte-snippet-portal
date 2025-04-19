<script lang="ts" module>
	import { getContext } from 'svelte';
	import type { PortalSpace } from './Space.svelte';

	const OVERLAY_CONTEXT_KEY = 'portal-overlay';

	export interface OverlayContext {
		space: PortalSpace;
		getRect: () => DOMRect | undefined;
	}

	export function useOverlay() {
		return getContext<OverlayContext>(OVERLAY_CONTEXT_KEY);
	}
</script>

<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import Space from './Space.svelte';
	import { useAnimationFrame } from './animation-frame.svelte.js';

	interface Props {
		class?: ClassValue;
		children: Snippet;
	}

	let { class: classValue, children }: Props = $props();

	let space = $state<Space>();
	let wrapper = $state<HTMLElement>();

	let wrapperRect = $state<DOMRect>();

	useAnimationFrame(() => {
		if (wrapper) {
			wrapperRect = wrapper.getBoundingClientRect();
		}
	});

	setContext<OverlayContext>(OVERLAY_CONTEXT_KEY, {
		space: {
			mountPortal(snippet) {
				return space!.mountPortal(snippet);
			}
		},
		getRect: () => wrapperRect
	});
</script>

<div class="overlay">
	<Space bind:this={space} />
</div>

<div class={classValue} bind:this={wrapper}>
	{@render children()}
</div>

<style>
	.overlay {
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
