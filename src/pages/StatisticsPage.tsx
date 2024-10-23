import { useGetStatistics } from '@/api/hooks/statisticksHooks'
import { ArrowUp, ArrowDown } from 'lucide-react'

export const StatisticsPage = () => {
	const { data: stat } = useGetStatistics()

	// Проверяем, есть ли данные, перед тем как рендерить
	if (!stat) return <div>Загрузка...</div>

	return (
		<div className='container mx-auto p-6'>
			<h1 className='text-2xl font-bold mb-4'>Обзор статистики</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{/* Пользователи */}
				<StatCard
					title='Пользователи'
					dayValue={stat.users.day.value}
					dayLastValue={stat.users.day.last_value}
					dayPercent={stat.users.day.percent}
					monthValue={stat.users.month.value}
					monthLastValue={stat.users.month.last_value}
					monthPercent={stat.users.month.percent}
					allValue={stat.users.all}
				/>

				{/* Ставки */}
				<StatCard
					title='Ставки'
					dayValue={stat.bets.day.value}
					dayLastValue={stat.bets.day.last_value}
					dayPercent={stat.bets.day.percent}
					monthValue={stat.bets.month.value}
					monthLastValue={stat.bets.month.last_value}
					monthPercent={stat.bets.month.percent}
					allValue={stat.bets.all}
				/>

				{/* Кейсы */}
				<StatCard
					title='Кейсы'
					dayValue={stat.cases.day.value}
					dayLastValue={stat.cases.day.last_value}
					dayPercent={stat.cases.day.percent}
					monthValue={stat.cases.month.value}
					monthLastValue={stat.cases.month.last_value}
					monthPercent={stat.cases.month.percent}
					allValue={stat.cases.all}
				/>

				{/* Скины */}
				<StatCard
					title='Скины'
					dayValue={stat.skins.day.value}
					dayLastValue={stat.skins.day.last_value}
					dayPercent={stat.skins.day.percent}
					monthValue={stat.skins.month.value}
					monthLastValue={stat.skins.month.last_value}
					monthPercent={stat.skins.month.percent}
					allValue={stat.skins.all}
				/>
			</div>
		</div>
	)
}

// Компонент StatCard для отображения каждой категории с процентами и прошлым значением
const StatCard = ({
	title,
	dayValue,
	dayLastValue,
	dayPercent,
	monthValue,
	monthLastValue,
	monthPercent,
	allValue
}: {
	title: string
	dayValue: number
	dayLastValue: number
	dayPercent: number
	monthValue: number
	monthLastValue: number
	monthPercent: number
	allValue: number
}) => {
	const formatPercent = (percent: number) => {
		const colorClass = percent >= 0 ? 'text-green-600' : 'text-red-600'
		const Icon = percent >= 0 ? ArrowUp : ArrowDown
		return (
			<span className={`flex items-center ${colorClass}`}>
				{percent}% <Icon className='w-4 h-4 ml-1' />
			</span>
		)
	}

	return (
		<div className='bg-white shadow-md rounded-lg p-4'>
			<h2 className='text-xl font-semibold mb-2'>{title}</h2>

			{/* Статистика за день */}
			<div className='text-sm text-gray-600 mb-1'>
				Сегодня: {dayValue} (вчера: {dayLastValue}) {formatPercent(dayPercent)}
			</div>

			{/* Статистика за месяц */}
			<div className='text-sm text-gray-600 mb-1'>
				В этом месяце: {monthValue} (прошлый месяц: {monthLastValue}){' '}
				{formatPercent(monthPercent)}
			</div>

			{/* Общая статистика */}
			<div className='text-sm text-gray-600 mb-1'>Всего: {allValue}</div>
		</div>
	)
}
