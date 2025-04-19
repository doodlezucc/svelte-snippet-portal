<script>
	import { PortalOverlay, Tether } from 'svelte-snippet-portal';
</script>

<h1>Boundary</h1>

<PortalOverlay>
	<div class="boundary">
		<div class="content">
			<Tether origin="top-left">
				<Tether origin="top-right">
					<textarea>Content</textarea>

					{#snippet portal()}
						<div>I am portal.</div>
					{/snippet}
				</Tether>

				{#snippet portal()}
					<div>I am portal.</div>
				{/snippet}
			</Tether>
		</div>
	</div>
</PortalOverlay>

<style lang="scss">
	@use '$lib/docs/style/scheme';

	.boundary {
		outline: 1px solid scheme.color('text');
		height: 300px;
		overflow: hidden;
	}

	.content {
		padding: 200px;
	}
</style>
