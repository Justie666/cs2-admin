import { useBanUser, useGetUsersInfinite } from '@/api/hooks/userHooks'
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	Button,
	TableCell
} from '@/components/ui'
import { UserModal } from '@/components/user/UserModal'
import { useIntersectionObserver } from '@siberiacancode/reactuse'

export const UsersPage = () => {
	const { mutate: ban } = useBanUser()
	const { data: usersQuery, hasNextPage, fetchNextPage } = useGetUsersInfinite()
	const users = usersQuery?.pages.flatMap(page => page) || []

	const { ref: observerRef } = useIntersectionObserver<HTMLDivElement>({
		threshold: 1,
		onChange: entry => {
			if (entry.isIntersecting) {
				fetchNextPage()
			}
		}
	})

	console.log(hasNextPage)

	const toggleBan = (user_id: number, value: boolean) => {
		if (value) {
			const isConfirm = confirm(
				'Вы действительно хотите заблокировать пользователя?'
			)
			if (isConfirm) {
				ban({ user_id, value })
			}
		} else {
			const isConfirm = confirm(
				'Вы действительно хотите разблокировать пользователя?'
			)
			if (isConfirm) {
				ban({ user_id, value })
			}
		}
	}

	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>ID</TableHead>
						<TableHead>Имя</TableHead>
						<TableHead>Никнейм</TableHead>
						<TableHead>Реферал ID</TableHead>
						<TableHead>Кейсы</TableHead>
						<TableHead>Баланс (Coin)</TableHead>
						<TableHead>Баланс (USDT)</TableHead>
						<TableHead>Реферальный баланс</TableHead>
						<TableHead>Последнее открытие кейса</TableHead>
						<TableHead>Дата регистрации</TableHead>
						<TableHead>Фото</TableHead>
						<TableHead className='text-right'>Действия</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users?.map(user => (
						<TableRow key={user.id}>
							{/* ID пользователя */}
							<TableCell className='font-medium'>{user.id}</TableCell>

							{/* Имя пользователя */}
							<TableCell>{user.name}</TableCell>

							{/* Никнейм */}
							<TableCell>{user.username}</TableCell>

							{/* ID реферала */}
							<TableCell>
								{user.referrer_id ? user.referrer_id : 'Нет'}
							</TableCell>

							{/* Количество клипов */}
							<TableCell>{user.count_clip}</TableCell>

							{/* Баланс в монетах */}
							<TableCell>{user.balance_coin}</TableCell>

							{/* Баланс в USDT */}
							<TableCell>{user.balance_usdt}</TableCell>

							{/* Реферальный баланс */}
							<TableCell>{user.balance_referrers}</TableCell>

							{/* Последнее открытие кейса */}
							<TableCell>
								{user.last_open_case
									? new Date(user.last_open_case).toLocaleString()
									: 'Н/Д'}
							</TableCell>

							{/* Дата создания аккаунта */}
							<TableCell>
								{new Date(user.created_at).toLocaleString()}
							</TableCell>

							{/* Фото пользователя */}
							<TableCell>
								{user.photo_url ? (
									<img
										src={user.photo_url}
										alt={user.name}
										className='h-12 w-12 rounded-full'
									/>
								) : (
									'Нет фото'
								)}
							</TableCell>

							{/* Действия */}
							<TableCell className='text-right'>
								<div className='space-y-2'>
									<UserModal id={+user.id} />
									<Button
										variant={'destructive'}
										onClick={() => toggleBan(+user.id, !user.banned)}>
										{user.banned ? 'Разблокировать' : 'Заблокировать'}
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
					{hasNextPage && <div ref={observerRef} />}
				</TableBody>
			</Table>
		</div>
	)
}
