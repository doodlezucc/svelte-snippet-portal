<script lang="ts">
	import TetheredBox from './TetheredBox.svelte';
</script>

<h1>Stress Test</h1>

<div class="boxes">
	{#each { length: 250 }}
		<TetheredBox />
	{/each}
</div>

<style>
	.boxes {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
</style>
