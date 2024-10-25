import { useDeleteAdmin, useGetAdmins } from '@/api/hooks/adminHooks'
import { CreateAdmin } from '@/components/admin/CreateAdmin'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Button
} from '@/components/ui'

export const AdminsPage = () => {
	const { data: admins } = useGetAdmins()
	const { mutate } = useDeleteAdmin()
	const handleDelete = (user_id: number) => {
		const isConfirm = confirm('Вы действительно хотите удалить админа?')
		if (isConfirm) {
			mutate({ user_id })
		}
	}

	return (
		<div>
			<CreateAdmin />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>Id</TableHead>
						<TableHead>Уровень</TableHead>
						<TableHead>Действия</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{admins?.map(admin => (
						<TableRow key={admin.id}>
							<TableCell className='font-medium'>{admin.id}</TableCell>
							<TableCell>
								{admin.level === 1 && 'Оператор'}
								{admin.level === 2 && 'Старший'}
								{admin.level === 3 && 'Владелец'}
							</TableCell>
							<TableCell>
								<Button
									variant={'outline'}
									onClick={() => handleDelete(admin.id)}>
									Удалить
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
