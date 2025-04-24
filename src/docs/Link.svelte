<script lang="ts">
	import { base } from '$app/paths';
	import type { Snippet } from 'svelte';

	interface Props {
		path: string;
		children: Snippet;
	}

	let { path, children }: Props = $props();
</script>

<a href="{base}{path}">{@render children()}</a>
