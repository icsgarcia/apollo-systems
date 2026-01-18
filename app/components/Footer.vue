<template>
	<v-footer color="primary" app>
		<v-container>
			<v-row align="center" justify="center">
				<v-col cols="12" class="text-center">
					<p class="mb-2">© {{ currentYear }} SpaceX Launches. All rights reserved.</p>
				</v-col>
			</v-row>
		</v-container>
	</v-footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>
