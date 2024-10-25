import { useGetStatistics } from '@/api/hooks/statisticksHooks'
import { ArrowUp, ArrowDown } from 'lucide-react'

export const StatisticsPage = () => {
	const { data: stat } = useGetStatistics()

	// Проверяем, есть ли данные, перед тем как рендерить
	if (!stat) return <div>Загрузка...</div>

	return (
		<div className='container mx-auto p-6'>
			<h1 className='text-2xl font-bold mb-4'>Обзор статистики</h1>

			<div className='text-xl font-bold mb-4'>Пользователи </div>
			<div className='grid grid-cols-3 gap-6'>
				{/* Пользователи */}
				<StatCard
					title='Сегодня'
					value={stat.users.day.value}
					percent={stat.users.day.percent}
					prevValue={stat.users.day.last_value}
				/>
				<StatCard
					title='Месяц'
					value={stat.users.month.value}
					percent={stat.users.month.percent}
					prevValue={stat.users.month.last_value}
				/>
				<StatCard title='Всего' value={stat.users.all} />
			</div>

			<div className='text-xl font-bold mb-4 mt-10'>Ставки</div>
			<div className='grid grid-cols-3 gap-6'>
				{/* Пользователи */}
				<StatCard
					title='Сегодня'
					value={stat.bets.day.value}
					percent={stat.bets.day.percent}
					prevValue={stat.bets.day.last_value}
				/>
				<StatCard
					title='Месяц'
					value={stat.bets.month.value}
					percent={stat.bets.month.percent}
					prevValue={stat.bets.month.last_value}
				/>
				<StatCard title='Всего' value={stat.bets.all} />
			</div>
			<div className='text-xl font-bold mb-4 mt-10'>Скины</div>
			<div className='grid grid-cols-3 gap-6'>
				{/* Пользователи */}
				<StatCard
					title='Сегодня'
					value={stat.skins.day.value}
					percent={stat.skins.day.percent}
					prevValue={stat.skins.day.last_value}
				/>
				<StatCard
					title='Месяц'
					value={stat.skins.month.value}
					percent={stat.skins.month.percent}
					prevValue={stat.skins.month.last_value}
				/>
				<StatCard title='Всего' value={stat.skins.all} />
			</div>
			<div className='text-xl font-bold mb-4 mt-10'>Кейсы</div>
			<div className='grid grid-cols-3 gap-6'>
				{/* Пользователи */}
				<StatCard
					title='Сегодня'
					value={stat.cases.day.value}
					percent={stat.cases.day.percent}
					prevValue={stat.cases.day.last_value}
				/>
				<StatCard
					title='Месяц'
					value={stat.cases.month.value}
					percent={stat.cases.month.percent}
					prevValue={stat.cases.month.last_value}
				/>
				<StatCard title='Всего' value={stat.cases.all} />
			</div>
		</div>
	)
}

const StatCard = ({
	title,
	percent,
	value,
	prevValue
}: {
	title: string
	percent?: number
	value?: number
	prevValue?: number
}) => {
	const circle = (percent: number) => {
		const colorClass = percent >= 0 ? 'text-green-600' : 'text-red-600'
		const Icon = percent >= 0 ? ArrowUp : ArrowDown
		return (
			<span
				className={`rounded-full size-[100px] border-[4px] ${colorClass} flex items-center justify-center`}>
				{percent}% <Icon className='w-4 h-4 ml-1' />
			</span>
		)
	}

	return (
		<div className='bg-white shadow-md rounded-lg p-4'>
			<h2 className='text-xl font-semibold mb-4'>{title}</h2>

			{prevValue === undefined && (
				<div className='flex items-center justify-center text-[40px] mt-7'>
					{value}
				</div>
			)}
			{prevValue !== undefined && (
				<div className='flex justify-between items-center'>
					{percent !== undefined && circle(percent)}
					<div className='text-right'>
						<div className='text-xl'>{value}</div>
						<div className='text-gray-500'>Прошлое значение: {prevValue}</div>
					</div>
				</div>
			)}
		</div>
	)
}
