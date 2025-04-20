<script lang="ts" module>
	import { getContext } from 'svelte';

	const BOUNDARY_CONTEXT_KEY = 'portal-tether-boundary';

	export interface TetherBoundaryContext {
		getRect: () => DOMRect | undefined;
	}

	export function useTetherBoundary() {
		return getContext<TetherBoundaryContext>(BOUNDARY_CONTEXT_KEY);
	}
</script>

<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { useAnimationFrame } from './animation-frame.svelte.js';

	interface Props {
		class?: ClassValue;
		children: Snippet;
	}

	let { class: classValue, children }: Props = $props();

	let wrapper = $state<HTMLElement>();
	let wrapperRect = $state<DOMRect>();

	useAnimationFrame(() => {
		if (wrapper) {
			wrapperRect = wrapper.getBoundingClientRect();
		}
	});

	setContext<TetherBoundaryContext>(BOUNDARY_CONTEXT_KEY, {
		getRect: () => wrapperRect
	});
</script>

<div class={classValue} bind:this={wrapper}>
	{@render children()}
</div>
