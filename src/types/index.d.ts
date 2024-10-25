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

interface IDay {
	value: number
	last_value: number
	percent: number
}

interface IMonth {
	value: number
	last_value: number
	percent: number
}

interface IUsers {
	day: IDay
	month: IMonth
	all: number
}

interface IDay {
	value: number
	last_value: number
	percent: number
}

interface IMonth {
	value: number
	last_value: number
	percent: number
}

interface IBets {
	day: IDay
	month: IMonth
	all: number
}

interface IDay {
	value: number
	last_value: number
	percent: number
}

interface IMonth {
	value: number
	last_value: number
	percent: number
}

interface ICases {
	day: IDay
	month: IMonth
	all: number
}

interface IDay {
	value: number
	last_value: number
	percent: number
}

interface IMonth {
	value: number
	last_value: number
	percent: number
}

interface ISkins {
	day: IDay
	month: IMonth
	all: number
}

interface IStatistics {
	users: IUsers
	bets: IBets
	cases: ICases
	skins: ISkins
}

type IUsersStat = {
	id: string
	name: string
	banned: boolean
	username: string
	referrer_id: string
	time_zone: number
	photo_url: string
	trade_url: string
	use_ref_bonus: boolean
	count_clip: number
	balance_coin: number
	balance_usdt: number
	balance_referrers: number
	last_open_case: string
	created_at: string
}

interface IStatistics1 {
	total_bets: number
	total_skins: number
	total_referrals: number
	total_opened_cases: number
	total_days_on_platform: number
}

interface ISkins1 {
	name: string
	price: number
	gun_id: number
	quality: string
	rarity: string
	image_url: string
	id: number
}

interface ITeam1 {
	name: string
	logo_url: string
	id: number
}

interface ITeams1 {
	id: number
	score: number
	total_coin: number
	total_usdt: number
	team: ITeam1
}

interface IEvent1 {
	id: number
	date_start: string
	status: boolean
	created_at: string
	won: number
	won_first_map: number
	won_second_map: number
	dry_bill: boolean
	knife: boolean
	teams: ITeams1[]
}

interface IBets {
	id: number
	event_team_id: number
	bet_type: string
	bet: boolean
	currency: string
	amount: number
	active: boolean
	event: IEvent1
}

interface ISkin {
	name: string
	price: number
	gun_id: number
	quality: string
	rarity: string
	image_url: string
	id: number
}

interface ICase {
	id: number
	name: string
	photo_url: string
	type_price: string
	price: number
}

interface ICaseSkin {
	id: number
	chance: number
	skin: ISkin1
	case: ICase1
}

interface ICases {
	id: number
	created_at: string
	case_skin: ICaseSkin1
}

interface IMoneys {
	id: number
	amount: number
	created_at: string
}

interface ISkin {
	name: string
	price: number
	gun_id: number
	quality: string
	rarity: string
	image_url: string
	id: number
}

interface IReceivingSkin {
	id: number
	status: string
	created_at: string
	skin: ISkin1
}

interface IReferrals {
	id: number
	photo_url: string
}

interface IFullInfo {
	id: string
	name: string
	username: string
	referrer_id: string
	time_zone: number
	photo_url: string
	trade_url: string
	use_ref_bonus: boolean
	count_clip: number
	balance_coin: number
	balance_usdt: number
	balance_referrers: number
	last_open_case: string
	created_at: string
	statistics: IStatistics1
	skins: ISkins1[]
	bets: IBets1[]
	cases: ICases1[]
	moneys: IMoneys1[]
	receiving_skin: IReceivingSkin1[]
	referrals: IReferrals1[]
}

interface IAdmin {
	id: number
	level: number
}

interface DeleteAdminParams {
	user_id: number
}

interface ReceivingSkin {
	id: number
	user_id: number
	skin_id: number
	status: string
	created_at: string
}
