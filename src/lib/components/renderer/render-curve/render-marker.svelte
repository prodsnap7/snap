<script lang="ts">
	type Props = {
		id: string;
		type: string;
		size: number;
		color: string;
		orient: 'start' | 'end';
	};

	const { id, type, size, color, orient } = $props<Props>();
	const markerWidth = $derived((6 * size) / 10);
	const markerHeight = $derived((6 * size) / 10);
</script>

<marker
	{id}
	viewBox="0 0 10 10"
	refX="4"
	refY="4"
	markerUnits="userSpaceOnUse"
	{markerWidth}
	{markerHeight}
	orient={orient === 'start' ? 'auto-start-reverse' : 'auto'}
>
	{#if type === 'outline-arrow'}
		<path
			fill="none"
			stroke={color}
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M 0 0 L 8 4 L 0 8"
		/>
	{:else if type === 'outline-circle'}
		<circle stroke-width={1} stroke={color} fill="none" cx={4} cy={4} r="3" />
	{:else if type === 'fill-arrow'}
		<path fill={color} stroke-linecap="round" stroke-linejoin="round" d="M 0 0 L 8 4 L 0 8 Z" />
	{:else if type === 'fill-circle'}
		<circle fill={color} cx={4} cy={4} r="3" />
	{/if}
</marker>
