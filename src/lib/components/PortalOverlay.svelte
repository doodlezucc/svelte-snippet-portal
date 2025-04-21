<script lang="ts" module>
	import { getContext } from 'svelte';
	import type { PortalSpace } from './Space.svelte';

	const OVERLAY_CONTEXT_KEY = 'portal-overlay';

	export interface MountedModal {
		unmount(): void;
	}

	export interface OverlayContext {
		space: PortalSpace;
		mountModal(): MountedModal;
	}

	export function useOverlay() {
		return getContext<OverlayContext>(OVERLAY_CONTEXT_KEY);
	}

	export interface OverlayState {
		hasModals: boolean;
	}
</script>

<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import Space from './Space.svelte';

	interface Props {
		/**
		 * The CSS z-index property applied to the overlay.
		 *
		 * @default 10
		 */
		zIndex?: number;
		children: Snippet<[state: OverlayState]>;
	}

	let { zIndex = 10, children }: Props = $props();

	let space = $state<Space>();
	let modals = $state.raw<MountedModal[]>([]);

	setContext<OverlayContext>(OVERLAY_CONTEXT_KEY, {
		space: {
			mountPortal(snippet) {
				return space!.mountPortal(snippet);
			}
		},
		mountModal() {
			const mountedModal: MountedModal = {
				unmount() {
					modals = modals.filter((someModal) => someModal !== mountedModal);
				}
			};

			modals = [...modals, mountedModal];
			return mountedModal;
		}
	});

	let overlayState = $derived<OverlayState>({
		hasModals: modals.length > 0
	});
</script>

<div class="overlay" style:--overlay-z-index={zIndex}>
	<Space bind:this={space} />
</div>

{@render children(overlayState)}

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
