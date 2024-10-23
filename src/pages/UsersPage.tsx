import { useGetAllUsers } from '@/api/hooks/userHooks'
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell
} from '@/components/ui'
import { UserModal } from '@/components/user/UserModal'
import { useIntersectionObserver } from '@siberiacancode/reactuse'
import {} from 'lucide-react'
import { useEffect, useState } from 'react'

const limit = 25

export const UsersPage = () => {
	const [offset, setOffset] = useState(0)
	const [users, setUsers] = useState<IUsersStat[]>([])
	const { data: usersQuery } = useGetAllUsers({
		limit: 25,
		offset: offset
	})

	useEffect(() => {
		if (usersQuery) {
			setUsers(prev => prev.concat(usersQuery))
		}
	}, [usersQuery])

	const { ref: observerRef } = useIntersectionObserver<HTMLDivElement>({
		threshold: 1,
		onChange: entry => {
			if (entry.isIntersecting) {
				console.log(31321)

				setOffset(prev => prev + limit)
			}
		}
	})

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
								<UserModal id={+user.id} />
							</TableCell>
						</TableRow>
					))}
					{usersQuery && usersQuery?.length > 1 && <div ref={observerRef} />}
				</TableBody>
			</Table>
		</div>
	)
}
