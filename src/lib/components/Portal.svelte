<script lang="ts">
	import { untrack, type Snippet } from 'svelte';
	import type { PortalDestination } from './Destination.svelte';
	import { useOverlay } from './PortalOverlay.svelte';

	interface Props {
		modal?: boolean;
		destination?: PortalDestination;
		children: Snippet;
	}

	let { modal = false, destination, children }: Props = $props();

	const overlay = useOverlay();
	let usedDestination = $derived(destination ?? overlay.destination);

	$effect(() => {
		// Without "untrack", infinite recursion would occur when used by the Tether component.
		const destination = usedDestination;
		const mountedPortal = untrack(() => destination.mountPortal(children));

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
