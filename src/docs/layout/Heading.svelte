<script lang="ts">
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<svelte:head>
	<title>{title} - Svelte Tether</title>
</svelte:head>

<h1>{title}</h1>
