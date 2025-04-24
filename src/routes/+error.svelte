<script lang="ts">
	import { page } from '$app/state';
	import Heading from '$docs/layout/Heading.svelte';
</script>

<Heading title="{page.status} {page.error!.message}" />
<p>sorry :(</p>
