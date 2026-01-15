import type { Launch } from '~/types/launch'
import { computed, type ComputedRef, ref } from 'vue'

type SortOrder = 'asc' | 'desc' | null

export const useSortLaunch = (launches: ComputedRef<Launch[]>) => {
	const sortOrder = ref<SortOrder>(null)

	const sortedLaunches = computed(() => {
		if (!sortOrder.value) {
			return launches.value
		}

		return [...launches.value].sort((a, b) => {
			const dateA = new Date(a.launch_date_local).getTime()
			const dateB = new Date(b.launch_date_local).getTime()

			if (sortOrder.value === 'asc') {
				return dateA - dateB
			} else {
				return dateB - dateA
			}
		})
	})

	const toggleSort = () => {
		if (sortOrder.value === null) {
			sortOrder.value = 'asc'
		} else if (sortOrder.value === 'asc') {
			sortOrder.value = 'desc'
		} else {
			sortOrder.value = null
		}
	}

	return {
		sortOrder,
		sortedLaunches,
		toggleSort,
	}
}
