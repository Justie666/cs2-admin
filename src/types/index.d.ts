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

interface EventEndData {
	event_id: number
	won: number
	won_first_map: number
	won_second_map: number
	dry_bill: boolean
	knife: boolean
}

type Quality = 'BS' | 'WW' | 'FT' | 'MW' | 'FN'
type Rarity = 'CG' | 'IQ' | 'AQ' | 'PR' | 'CL' | 'SE' | 'CO'
type Sorting = 'popular' | 'cheaper' | 'dearly'

type Gun = {
	id: number
	name: string
	children: Gun[]
	parent_id: number
}

interface GunCreateData {
	name: string
	parent_id: number | null
}
interface GunUpdateData {
	name: string
	parent_id: number | null
	id: number
}

type Skin = {
	id: number
	name: string
	price: number
	gun_id: number
	quality: Quality
	rarity: Rarity
	image_url: string
	active: boolean
}

interface SkinCreateData {
	name: string
	price: number
	gun_id: number
	quality: string
	rarity: string
	image_url: string
}
interface SkinUpdateData {
	name: string
	price: number
	gun_id: number
	quality: string
	rarity: string
	image_url: string
	id: number
	active: boolean
}

interface GetSkinsParams {
	limit: number
	offset: number
	sorting: Sorting
	gun_id: number | null
	quality: Quality | null
	rarity: Rarity | null
	name: string | null
}

type TypePrice = 'friend' | 'coin' | 'usdt'

interface CreateCaseData {
	name: string
	photo_url: string
	type_price: TypePrice
	price: number
}
interface UpdateCaseData {
	id: number
	name: string
	photo_url: string
	type_price: TypePrice
	price: number
}

interface Case {
	id: number
	name: string
	photo_url: string
	type_price: TypePrice
	price: number
	skins: {
		id: number
		chance: number
		skin: Skin
	}[]
}

interface AddSkinData {
	case_id: number
	skin_id: number
	chance: number
}

interface UpdateSkinData {
	id
	chance
}

type PromoType = 'coin' | 'usdt' | 'clip'

interface Promo {
	name: string
	type: PromoType
	value: number
	count: number
	id: number
}

interface CreatePromoData {
	name: string
	type: PromoType
	value: number
	count: number
}

interface UpdatePromoData {
	id: number
	name: string
	type: PromoType
	value: number
	count: number
}
