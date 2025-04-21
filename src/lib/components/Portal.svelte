<script lang="ts">
	import { untrack, type Snippet } from 'svelte';
	import { useOverlay } from './PortalOverlay.svelte';
	import type { PortalSpace } from './Space.svelte';

	interface Props {
		modal?: boolean;
		space?: PortalSpace;
		children: Snippet;
	}

	let { modal = false, space, children }: Props = $props();

	const overlay = useOverlay();
	let usedSpace = $derived(space ?? overlay.space);

	$effect(() => {
		// Without "untrack", infinite recursion would occur when used by the Tether component.
		const space = usedSpace;
		const mountedPortal = untrack(() => space.mountPortal(children));

		return () => {
			mountedPortal.unmount();
		};
	});

	$effect(() => {
		if (modal) {
			const mountedModal = untrack(() => overlay.mountModal());

			return () => {
				mountedModal.unmount();
			};
		}
	});
</script>
