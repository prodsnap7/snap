<script lang="ts">
	import clsx from 'clsx';

	type Props = {
		x1: number;
		y1: number;
		x2: number;
		y2: number;
	};

	const { x1, y1, x2, y2 } = $props<Props>();
	let isVisible = $state(true);

	$effect(() => {
		const timer = setTimeout(() => {
			isVisible = false;
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	});
</script>

<line
	{x1}
	{y1}
	{x2}
	{y2}
	marker-end="url(#circle)"
	marker-start="url(#circle)"
	stroke-dasharray="5, 5"
	class={clsx('stroke-primary transition-opacity duration-800', {
		'opacity-0': !isVisible
	})}
/>
