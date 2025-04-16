<script lang="ts">
	import { Anchor } from '$lib/index.js';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { fly } from 'svelte/transition';

	interface Props {
		options: string[];
		value: string;
	}

	let { options, value = $bindable() }: Props = $props();

	let expanded = $state(false);

	let popupId = $state(crypto.randomUUID());

	function onSelect(option: string) {
		value = option;
		expanded = false;
	}

	function onOptionKeyDown(option: string, ev: KeyboardEvent) {
		if (ev.key === ' ' || ev.key === 'Enter') {
			ev.preventDefault();
			onSelect(option);
		}
	}

	function onDropdownKeyDown(ev: KeyboardEvent) {
		if (ev.key === 'Escape') {
			ev.preventDefault();
			expanded = false;
		} else if (ev.key === ' ' || ev.key === 'Enter') {
			ev.preventDefault();
			expanded = !expanded;
		} else if (ev.key === 'ArrowUp') {
			ev.preventDefault();
			value = options[(options.indexOf(value) + options.length - 1) % options.length];
		} else if (ev.key === 'ArrowDown') {
			ev.preventDefault();
			value = options[(options.indexOf(value) + 1) % options.length];
		}
	}
</script>

<svelte:window onmouseup={expanded ? () => (expanded = false) : undefined} />

<Anchor origin="bottom-right" direction="bottom-left" inheritWidth>
	<div
		role="combobox"
		aria-controls={popupId}
		aria-expanded={expanded}
		tabindex="0"
		onclick={() => (expanded = true)}
		onkeydown={onDropdownKeyDown}
	>
		<span>{value}</span>

		<div class="icon">
			<ChevronDownIcon />
		</div>
	</div>

	{#snippet portal()}
		{#if expanded}
			<ul role="listbox" id={popupId} transition:fly={{ y: -2, duration: 200 }}>
				{#each options as option}
					<li
						role="option"
						aria-selected={value === option}
						tabindex="0"
						onmousedown={() => onSelect(option)}
						onkeydown={(ev) => onOptionKeyDown(option, ev)}
					>
						{option}
					</li>
				{/each}
			</ul>
		{/if}
	{/snippet}
</Anchor>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	[role='combobox'] {
		border: 1px solid scheme.color('text');
		border-radius: 8px;
		padding: 10px 12px;
		background: scheme.color('background');
		cursor: pointer;

		width: 300px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;

		display: grid;
		grid-template-columns: 1fr max-content;
		transition: 0.2s;

		&:hover {
			background: scheme.color('shade-1');
		}

		.icon {
			display: inline-flex;
			transition: rotate 0.2s;
		}

		&[aria-expanded='true'] {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;

			.icon {
				rotate: 180deg;
			}
		}
	}

	[role='listbox'] {
		margin: 0;
		padding-inline-start: 0;
		pointer-events: all;
		background: scheme.color('background');
		box-shadow: 2px 2px 0 #0005;
		border: 1px solid scheme.color('shade-2');
		border-top-width: 0;
		border-radius: 8px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		overflow: auto;
	}

	[role='option'] {
		list-style: none;
		padding: 6px 16px;
		cursor: pointer;

		&:hover {
			background-color: scheme.color('shade-1');
		}

		&[aria-selected='true'] {
			color: scheme.color('primary');
			font-weight: 600;
		}
	}
</style>
