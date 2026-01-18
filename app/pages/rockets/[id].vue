<template>
	<v-container>
		<v-card v-if="rocket">
			<v-card-title>{{ rocket.name }}</v-card-title>
			<v-card-text>
				<p>
					<strong>Description:</strong>
					{{ rocket.description || '-' }}
				</p>
				<p>
					<strong>First Flight:</strong>
					{{ rocket.first_flight || '-' }}
				</p>
				<p v-if="rocket.height">
					<strong>Height:</strong>
					{{ rocket.height.meters }}m ({{ rocket.height.feet }}ft)
				</p>
				<p v-if="rocket.diameter">
					<strong>Diameter:</strong>
					{{ rocket.diameter.meters }}m ({{ rocket.diameter.feet }}ft)
				</p>
				<p v-if="rocket.mass">
					<strong>Mass:</strong>
					{{ rocket.mass.kg }}kg ({{ rocket.mass.lb }}lb)
				</p>
				<p>
					<strong>Stages:</strong>
					{{ rocket.stages || '-' }}
				</p>
			</v-card-text>
		</v-card>
		<v-alert v-else type="warning">Rocket not found</v-alert>
	</v-container>
</template>

<script lang="ts" setup>
const route = useRoute()
const rocketId = route.params.id as string

const query = gql`
	query getRocket($rocketId: ID!) {
		rocket(id: $rocketId) {
			id
			name
			description
			first_flight
			height {
				meters
				feet
			}
			diameter {
				feet
				meters
			}
			mass {
				kg
				lb
			}
			stages
		}
	}
`

const { data } = await useAsyncQuery<{
	rocket: {
		name: string
		description: string
		first_flight: string
		height: {
			feet: number
			meters: number
		}
		diameter: {
			feet: number
			meters: number
		}
		mass: {
			kg: number
			lb: number
		}
		stages: number
	}
}>(query, {
	rocketId,
})

const rocket = computed(() => data.value?.rocket ?? null)
</script>
