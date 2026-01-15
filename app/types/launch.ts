export interface Launch {
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
