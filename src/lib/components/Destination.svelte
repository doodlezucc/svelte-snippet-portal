<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export class MountedPortal {
		readonly snippet: Snippet;
		readonly unmount: () => void;

		constructor(snippet: Snippet, unmount: () => void) {
			this.snippet = snippet;
			this.unmount = unmount;
		}
	}

	export interface PortalDestination {
		mountPortal(snippet: Snippet): MountedPortal;
	}
</script>

<script lang="ts">
	let mountedPortals = $state<MountedPortal[]>([]);

	export function mountPortal(snippet: Snippet): MountedPortal {
		const portal = new MountedPortal(snippet, () => {
			mountedPortals = mountedPortals.filter((somePortal) => somePortal !== portal);
		});

		mountedPortals.push(portal);

		return portal;
	}
</script>

{#each mountedPortals as portal (portal)}
	{@render portal.snippet()}
{/each}
