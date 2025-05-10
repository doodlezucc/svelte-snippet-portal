import { onMount } from 'svelte';

type TickListener = () => void;

const listeners = new Set<TickListener>();

let animationFrameRequest: number | undefined = undefined;

function tick() {
	animationFrameRequest = requestAnimationFrame(tick);
	for (const callback of listeners) {
		callback();
	}
}

export function useAnimationFrame(onTick: () => void) {
	onMount(() => {
		onTick();
		listeners.add(onTick);

		if (animationFrameRequest === undefined) {
			animationFrameRequest = requestAnimationFrame(tick);
		}

		return () => {
			listeners.delete(onTick);
		};
	});
}
