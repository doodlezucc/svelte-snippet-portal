<script lang="ts">
	import Content from '$lib/docs/Content.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<Content>
	{@render children()}
</Content>
