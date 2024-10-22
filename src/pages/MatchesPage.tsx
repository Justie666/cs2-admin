import { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui'
import { useGetTeams } from '@/api/hooks/teamHooks'
import { CreateTeam } from '@/components/team/CreateTeam'
import { useGetEvents } from '@/api/hooks/eventHooks'
import { formatToUserTimezone } from '@/utils/formatToUserTimezone'
import { useIntersectionObserver } from '@siberiacancode/reactuse'
import { CreateMatch } from '@/components/matches/CreateMatch'

const LIMIT = 25

function getTeam(event: Events, id: number): Team | null {
	const array = [event.teams[0].team, event.teams[1].team]
	const team = array.find(team => team.id === id)
	return team ? team : null
}

export const MatchesPage = () => {
	const [selectedTab, setSelectedTab] = useState('teams')
	const [offset, setOffset] = useState(0)
	const [events, setEvents] = useState<Events[]>([])

	const { data: teams } = useGetTeams()
	const { data: eventsQuery } = useGetEvents({
		limit: LIMIT,
		offset
	})

	useEffect(() => {
		if (eventsQuery) {
			setEvents(prev => prev.concat(eventsQuery))
		}
	}, [eventsQuery])

	const handleNextPage = () => {
		setOffset(offset + LIMIT)
	}

	// При загрузке компонента, извлекаем выбранную вкладку из localStorage
	useEffect(() => {
		const savedTab = localStorage.getItem('selectedTabMatches')
		if (savedTab) {
			setSelectedTab(savedTab)
		}
	}, [])

	// Обновляем localStorage при изменении вкладки
	const handleTabChange = (value: string) => {
		setSelectedTab(value)
		localStorage.setItem('selectedTabMatches', value)
	}

	const { ref: observerRef } = useIntersectionObserver<HTMLDivElement>({
		threshold: 1,
		onChange: entry => {
			if (entry.isIntersecting) {
				handleNextPage()
			}
		}
	})

	return (
		<Tabs
			value={selectedTab}
			onValueChange={handleTabChange}
			className='w-full'>
			<TabsList>
				<TabsTrigger value='teams'>Команды</TabsTrigger>
				<TabsTrigger value='matches'>Матчи</TabsTrigger>
			</TabsList>
			<TabsContent value='teams'>
				<CreateTeam />
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>Название</TableHead>
							<TableHead>Картинка</TableHead>
							<TableHead>Method</TableHead>
							<TableHead className='text-right'>Действия</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{teams?.map(team => (
							<TableRow key={team.id}>
								<TableCell className='font-medium'>{team.id}</TableCell>
								<TableCell>{team.name}</TableCell>
								<TableCell>
									<img
										src={team.logo_url}
										alt={team.name}
										className='h-[100px] object-cover'
									/>
								</TableCell>
								<TableCell className='text-right'>
									{/* <TeamEdit id={1} active name='' price={321312} /> */}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TabsContent>
			<TabsContent value='matches'>
				<CreateMatch />
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>Id</TableHead>
							<TableHead>Дата начала</TableHead>
							<TableHead>Статус</TableHead>
							<TableHead>Информация</TableHead>
							<TableHead>Команды</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{events?.map(event => (
							<TableRow key={event.id}>
								<TableCell className='font-medium'>{event.id}</TableCell>
								<TableCell>{formatToUserTimezone(event.date_start)}</TableCell>
								<TableCell>
									{event.status ? 'Активный матч' : 'Закончился'}
								</TableCell>
								<TableCell className='text-left'>
									<div>
										{event.won !== null && (
											<div>Победитель - {getTeam(event, event.won)?.name}</div>
										)}
										{event.won_first_map !== null && (
											<div>
												Победитель 1 карты -{' '}
												{getTeam(event, event.won_first_map)?.name}{' '}
											</div>
										)}
										{event.won_second_map !== null && (
											<div>
												Победитель 2 карты -{' '}
												{getTeam(event, event.won_second_map)?.name}{' '}
											</div>
										)}
										{event.knife !== null && (
											<div>Был ли нож - {event.knife ? 'Да' : 'Нет'} </div>
										)}
										{event.dry_bill !== null && (
											<div>
												Был ли сухой счёт - {event.dry_bill ? 'Да' : 'Нет'}{' '}
											</div>
										)}
									</div>
								</TableCell>
								<TableCell>
									<div>
										Команда 1 - {event.teams[0].team.name} <br />
										Команда 2 - {event.teams[1].team.name}{' '}
									</div>
								</TableCell>
							</TableRow>
						))}
						{eventsQuery && <div ref={observerRef} />}
					</TableBody>
				</Table>
			</TabsContent>
		</Tabs>
	)
}
