<script lang="ts">
	type Props = {
		type: string;
	};

	const { type } = $props<Props>();
</script>

<svg width={24} height={24}>
	{#if type === 'outline-arrow'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M2.97 12.53a.75.75 0 0 1 0-1.06l4.773-4.773a.75.75 0 0 1 1.06 1.06L5.311 11.25H20.5a.75.75 0 0 1 0 1.5H5.31l3.493 3.493a.75.75 0 1 1-1.06 1.06L2.97 12.53z"
			clip-rule="evenodd"
		/>
	{:else if type === 'outline-circle'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M9.75 12a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5h-10a.75.75 0 0 1-.75-.75z"
			clip-rule="evenodd"
		/>
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M4.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zM7 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
			clip-rule="evenodd"
		/>
	{:else if type === 'fill-arrow'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M9.75 12a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5h-10a.75.75 0 0 1-.75-.75z"
			clip-rule="evenodd"
		/>
		<path
			fill="currentColor"
			d="M2.624 11.584a.5.5 0 0 0 0 .832l7.599 5.066a.5.5 0 0 0 .777-.416V6.934a.5.5 0 0 0-.777-.416l-7.599 5.066z"
		/>
	{:else if type === 'fill-circle'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M9.75 12a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5h-10a.75.75 0 0 1-.75-.75z"
			clip-rule="evenodd"
		/>
		<path
			fill="currentColor"
			d="M4.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zM7 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
			clip-rule="evenodd"
		/>
	{:else if type === 'line'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M3.25 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75z"
			clip-rule="evenodd"
		></path><path
			fill="currentColor"
			fill-rule="evenodd"
			d="M3.75 8a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5A.75.75 0 0 1 3.75 8z"
			clip-rule="evenodd"
		></path>
	{:else if type === 'none'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M5 12v-.75h16a.75.75 0 0 1 0 1.5H5V12z"
			clip-rule="evenodd"
		/>
		<path fill="currentColor" d="M5 9.5v5L3 12l2-2.5z" />
	{/if}
</svg>
