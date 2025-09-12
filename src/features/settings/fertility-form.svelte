<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import SelectInput from '$lib/components/ui/new-form/select-input.svelte';

	import { updateFertilityPreferences } from './forms.remote';
</script>

<form class="my-4 flex flex-col gap-4" {...updateFertilityPreferences}>
	<SelectInput
		label="Average Cycle Length (days)"
		id="cycle-length"
		options={Array.from({ length: 21 }, (_, i) => ({
			label: (20 + i).toString(),
			value: (20 + i).toString(),
		}))}
	/>
	<SelectInput
		label="Tracking Method"
		id="tracking-method"
		options={[{ label: 'Creighton model', value: 'creighton' }]}
		initialValue="creighton"
	/>
	<!-- Daily reminder switch -->
	<!-- only if above is true: Daily reminder Time [Date time default 8pm] -->

	<Button type="submit" class="self-end sm:w-1/2">Save</Button>
</form>
