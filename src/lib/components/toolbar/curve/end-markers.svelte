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
			d="m16.257 6.697 4.773 4.773a.75.75 0 0 1 0 1.06l-4.773 4.773a.75.75 0 0 1-1.06-1.06l3.492-3.493H3.5a.75.75 0 0 1 0-1.5h15.19l-3.493-3.493a.75.75 0 1 1 1.06-1.06z"
			clip-rule="evenodd"
		/>
	{:else if type === 'outline-circle'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M2.75 12a.75.75 0 0 1 .75-.75H13a.75.75 0 0 1 0 1.5H3.5a.75.75 0 0 1-.75-.75z"
			clip-rule="evenodd"
		/>
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M14.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zM17 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
			clip-rule="evenodd"
		/>
	{:else if type === 'fill-arrow'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M2.75 12a.75.75 0 0 1 .75-.75H13a.75.75 0 0 1 0 1.5H3.5a.75.75 0 0 1-.75-.75z"
			clip-rule="evenodd"
		/>
		<path
			fill="currentColor"
			d="M21.376 11.584a.5.5 0 0 1 0 .832l-7.599 5.066a.5.5 0 0 1-.777-.416V6.934a.5.5 0 0 1 .777-.416l7.599 5.066z"
		/>
	{:else if type === 'fill-circle'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M2.75 12a.75.75 0 0 1 .75-.75H13a.75.75 0 0 1 0 1.5H3.5a.75.75 0 0 1-.75-.75z"
			clip-rule="evenodd"
		/>
		<path
			fill="currentColor"
			d="M14.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zM17 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
			clip-rule="evenodd"
		/>
	{:else if type === 'line'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M2.75 12a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5h-16a.75.75 0 0 1-.75-.75z"
			clip-rule="evenodd"
		></path><path
			fill="currentColor"
			fill-rule="evenodd"
			d="M20.25 8a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75z"
			clip-rule="evenodd"
		></path>
	{:else if type === 'none'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M2.75 12a.75.75 0 0 1 .75-.75H19a.75.75 0 0 1 0 1.5H3.5a.75.75 0 0 1-.75-.75z"
			clip-rule="evenodd"
		/>
		<path fill="currentColor" d="M19 9.5v5l2-2.5-2-2.5z" />
	{/if}
</svg>
