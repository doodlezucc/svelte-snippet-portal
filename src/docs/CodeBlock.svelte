<script lang="ts">
	import ClipboardIcon from '@lucide/svelte/icons/clipboard';
	import type { Snippet } from 'svelte';
	import { Tether } from 'svelte-tether';
	import { fly } from 'svelte/transition';
	import IconButton from './IconButton.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let wrapper = $state<HTMLElement>();
	let textContent = $derived(wrapper?.textContent?.trim() ?? '');

	let showCopiedHint = $state(false);

	async function copyToClipboard() {
		await navigator.clipboard.writeText(textContent);
		showCopiedHint = true;
		setTimeout(() => (showCopiedHint = false), 2500);
	}
</script>

<div class="wrapper" bind:this={wrapper}>
	<div class="copy-region">
		<Tether origin="center-left">
			{#snippet portal()}
				{#if showCopiedHint}
					<span transition:fly={{ x: 8, duration: 200 }}>Copied!</span>
				{/if}
			{/snippet}

			<IconButton onclick={copyToClipboard} icon={ClipboardIcon} size={20}>Copy</IconButton>
		</Tether>
	</div>

	{@render children()}
</div>

<style lang="scss">
	@use '$docs/style/scheme';

	.wrapper {
		position: relative;
	}

	.copy-region {
		position: absolute;
		right: 0;
		margin: 12px 24px;

		opacity: 0.5;
		transition: 0.2s;

		&:hover,
		&:active {
			opacity: 1;
		}
	}

	span {
		font-size: 14px;
		margin: 8px;
		background-color: scheme.color('background');
		border: 1px solid scheme.color('separator');
		border-radius: 4px;
		padding: 4px 8px;
	}
</style>
