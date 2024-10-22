interface Price {
	price_one: number
	price_two: number
	price_three: number
	price_four: number
}

interface Category {
	name: string
	parent_id: number
	id: number
	active: boolean
	children: Category[]
	price: Price
}

type Team = {
	name: string
	logo_url: string
	id: number
}

interface TeamCreateData {
	name: string
	logo_url: string
}

interface PaginationParams {
	limit: number
	offset: number
}

interface LoginData {
	login: string
	password: string
	remember_me: boolean
}

interface Teams {
	id: number
	score: number
	total_coin: number
	total_usdt: number
	team: Team
}

type Events = {
	id: number
	date_start: string
	status: boolean
	created_at: string
	won: number
	won_first_map: number
	won_second_map: number
	dry_bill: boolean
	knife: boolean
	teams: Teams[]
}

interface EventCreateData {
	date_start: string
	team_one_id: number
	team_two_id: number
}
