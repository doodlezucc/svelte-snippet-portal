<script lang="ts">
	import { page } from '$app/state';
	import Content from '$lib/docs/Content.svelte';
</script>

<Content>
	<h1>{page.status} {page.error!.message}</h1>
	<p>sorry :(</p>
</Content>
