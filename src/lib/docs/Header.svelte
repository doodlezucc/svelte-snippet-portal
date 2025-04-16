<script lang="ts">
	import GitHubIcon from '@lucide/svelte/icons/github';
	import SendToBackIcon from '@lucide/svelte/icons/send-to-back';
	import Tooltip from './Tooltip.svelte';
</script>

<header>
	<a class="logo" href="/">
		<SendToBackIcon />
		Svelte Snippet Portal
	</a>

	<div class="expand"></div>

	<Tooltip alignment="bottom-center">
		<a href="https://github.com/doodlezucc/svelte-snippet-portal"><GitHubIcon /></a>

		{#snippet tooltip()}
			GitHub
		{/snippet}
	</Tooltip>

	<Tooltip alignment="bottom-center">
		<a href="https://github.com/doodlezucc/svelte-snippet-portal"><GitHubIcon /></a>

		{#snippet tooltip()}
			Yeah!
		{/snippet}
	</Tooltip>
</header>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	header {
		padding: 24px 48px;

		display: flex;
		gap: 32px;

		background-color: scheme.color('background');
		border-bottom: 1px solid scheme.color('separator');
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	a {
		color: scheme.color('text');
		display: inline-flex;
	}
</style>
