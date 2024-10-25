import { useGetFullInfo } from '@/api/hooks/userHooks'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Button,
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
} from '../ui'
import { useState, useEffect } from 'react'

export const UserModal = ({ id }: { id: number }) => {
	const [isOpen, setIsOpen] = useState(false)
	const {
		data: user,
		isLoading,
		error,
		refetch
	} = useGetFullInfo({ user_id: id })

	// Fetch user data when the modal opens
	useEffect(() => {
		if (isOpen) {
			refetch()
		}
	}, [isOpen, refetch])

	if (isLoading) return <p>Загрузка...</p>
	if (error) return <p>Ошибка при загрузке информации о пользователе</p>

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>
				<Button variant={'outline'}>Подробнее</Button>
			</DialogTrigger>
			<DialogContent className='dialog-content'>
				{/* Применяем класс для стилей */}
				<DialogHeader>
					<DialogTitle>Информация о пользователе</DialogTitle>
				</DialogHeader>
				{user ? (
					<div>
						<h2>
							{user.name} ({user.username})
						</h2>
						<p>
							<strong>ID:</strong> {user.id}
						</p>
						<p>
							<strong>ID реферера:</strong> {user.referrer_id}
						</p>
						<p>
							<strong>Часовой пояс:</strong> {user.time_zone}
						</p>
						<p>
							<strong>Баланс (монеты):</strong> {user.balance_coin}
						</p>
						<p>
							<strong>Баланс (USDT):</strong> {user.balance_usdt}
						</p>
						<p>
							<strong>Баланс (рефералы):</strong> {user.balance_referrers}
						</p>
						<p>
							<strong>Последний открытый кейс:</strong> {user.last_open_case}
						</p>
						<p>
							<strong>Дата регистрации:</strong> {user.created_at}
						</p>

						<h3>Статистика:</h3>
						<ul>
							<li>
								<strong>Всего ставок:</strong> {user.statistics.total_bets}
							</li>
							<li>
								<strong>Всего скинов:</strong> {user.statistics.total_skins}
							</li>
							<li>
								<strong>Всего рефералов:</strong>{' '}
								{user.statistics.total_referrals}
							</li>
							<li>
								<strong>Всего открытых кейсов:</strong>{' '}
								{user.statistics.total_opened_cases}
							</li>
							<li>
								<strong>Всего дней на платформе:</strong>{' '}
								{user.statistics.total_days_on_platform}
							</li>
						</ul>

						{/* Скины */}
						<Accordion type='single' collapsible>
							<AccordionItem value='skins'>
								<AccordionTrigger>Скины</AccordionTrigger>
								<AccordionContent>
									<ul>
										{user.skins.map(skin => (
											<li key={skin.id}>
												<p>
													{skin.name} - {skin.price} ({skin.quality}) (
													{skin.rarity})
												</p>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						{/* Кейсы */}
						<Accordion type='single' collapsible>
							<AccordionItem value='cases'>
								<AccordionTrigger>Кейсы</AccordionTrigger>
								<AccordionContent>
									<ul>
										{user.cases.map(caseItem => (
											<li key={caseItem.id}>
												<p>Кейс: {caseItem.case_skin.case.name}</p>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						{/* Полученные скины */}
						<Accordion type='single' collapsible>
							<AccordionItem value='receivedSkins'>
								<AccordionTrigger>Полученные скины</AccordionTrigger>
								<AccordionContent>
									<ul>
										{user.receiving_skin.map(item => (
											<li key={item.id}>
												<p>
													Скин: {item.skin.name} - {item.status} -{' '}
													{item.created_at}
												</p>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						{/* Транзакции */}
						<Accordion type='single' collapsible>
							<AccordionItem value='transactions'>
								<AccordionTrigger>Транзакции</AccordionTrigger>
								<AccordionContent>
									<ul>
										{user.moneys.map(money => (
											<li key={money.id}>
												<p>Сумма: {money.amount}</p>
												<p>Дата: {money.created_at}</p>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						{/* Рефералы */}
						<Accordion type='single' collapsible>
							<AccordionItem value='referrals'>
								<AccordionTrigger>Рефералы</AccordionTrigger>
								<AccordionContent>
									<ul>
										{user.referrals.map(referral => (
											<li key={referral.id}>{referral.id}</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				) : (
					<p>Данные пользователя недоступны</p>
				)}
			</DialogContent>
		</Dialog>
	)
}
