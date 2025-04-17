<script lang="ts">
	import GitHubIcon from '@lucide/svelte/icons/github';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SendToBackIcon from '@lucide/svelte/icons/send-to-back';
	import SunIcon from '@lucide/svelte/icons/sun';
	import IconButton from './IconButton.svelte';
	import Tooltip from './Tooltip.svelte';

	let isDarkModeEnabled = $state(false);
</script>

<header class:dark-mode={isDarkModeEnabled}>
	<a class="logo" href="/">
		<SendToBackIcon />
		Svelte Snippet Portal
	</a>

	<div class="expand"></div>

	<IconButton
		icon={isDarkModeEnabled ? SunIcon : MoonIcon}
		tooltipAlignment="bottom-center"
		onclick={() => (isDarkModeEnabled = !isDarkModeEnabled)}
	>
		{isDarkModeEnabled ? 'Use light mode' : 'Use dark mode'}
	</IconButton>

	<Tooltip alignment="bottom-center">
		<a href="https://github.com/doodlezucc/svelte-snippet-portal"><GitHubIcon /></a>

		{#snippet tooltip()}
			GitHub
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

	.expand {
		flex: 1;
	}
</style>
