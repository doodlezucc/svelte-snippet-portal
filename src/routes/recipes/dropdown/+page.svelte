<script lang="ts">
	import Dropdown from '$lib/docs/Dropdown.svelte';

	let options = $state(['Option A', 'Option B', 'Option C', 'Option D with a long name']);
	let value = $state('Option A');
</script>

<h1>Dropdown</h1>

<p>
	Combo boxes are UI components which look similar to input fields, with the exception that the user
	may pick from a list of options.
</p>

<p>
	The list of options is usually presented to the user when interacting with the field, in the form
	of a <b>dropdown menu</b>.
</p>

<p>
	We can make use of an <code>Tether</code> to mount a dropdown menu <i>right under</i> our input field!
</p>

<Dropdown {options} bind:value />
