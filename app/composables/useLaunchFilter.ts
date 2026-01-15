import { computed, type ComputedRef, ref } from 'vue'

interface Launch {
	mission_name: string
	launch_date_local: Date
	launch_site: {
		site_name: string
	}
	rocket: {
		rocket_name: string
	}
	details: string
}

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
