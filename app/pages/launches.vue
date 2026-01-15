<template>
	<v-container>
		<v-table>
			<thead>
				<tr>
					<th>Mission Name</th>
					<th>Launch Date</th>
					<th>Launch Site Name</th>
					<th>Rocket Name</th>
					<th>Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="launch in launches" :key="launch.mission_name">
					<td>{{ launch.mission_name || '-' }}</td>
					<td>
						{{
							new Date(launch.launch_date_local).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
							}) || '-'
						}}
					</td>
					<td>{{ launch.launch_site?.site_name || '-' }}</td>
					<td>{{ launch.rocket?.rocket_name || '-' }}</td>
					<td>{{ launch.details || '-' }}</td>
				</tr>
			</tbody>
		</v-table>
	</v-container>
</template>
<script lang="ts" setup>
const query = gql`
	query getLaunches {
		launches {
			mission_name
			launch_date_local
			launch_site {
				site_name
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`
const { data } = useAsyncQuery<{
	launches: {
		mission_name: string
		launch_date_local: Date
		launch_site: {
			site_name: string
		}
		rocket: {
			rocket_name: string
		}
		details: string
	}[]
}>(query)

const launches = computed(() => data.value?.launches ?? [])
</script>
