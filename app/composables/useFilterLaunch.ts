import type { Launch } from '~/types/launch'
import { computed, type ComputedRef, ref } from 'vue'

export const useLaunchFilter = (launches: ComputedRef<Launch[]>) => {
	const selectedYear = ref<number | null>(null)

	const yearOptions = computed(() => {
		const years = launches.value.map((launch) => new Date(launch.launch_date_local).getFullYear())
		const uniqueYears = [...new Set(years)].sort((a, b) => b - a)
		return uniqueYears
	})

	const filteredLaunches = computed(() => {
		if (!selectedYear.value) {
			return launches.value
		}

		return launches.value.filter((launch) => {
			const launchYear = new Date(launch.launch_date_local).getFullYear()
			return launchYear === selectedYear.value
		})
	})

	return {
		selectedYear,
		yearOptions,
		filteredLaunches,
	}
}
