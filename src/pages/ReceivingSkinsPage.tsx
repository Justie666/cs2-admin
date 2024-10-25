import { useGetReceivingSkin } from '@/api/hooks/adminHooks'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui'
import { formatToUserTimezone } from '@/utils/formatToUserTimezone'

export const ReceivingSkinsPage = () => {
	const { data } = useGetReceivingSkin()
	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>Id</TableHead>
						<TableHead>user id</TableHead>
						<TableHead>skin_id</TableHead>
						<TableHead>Статус</TableHead>
						<TableHead className='text-right'>Дата создания</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map(skin => (
						<TableRow key={skin.id}>
							<TableCell className='font-medium'>{skin.id}</TableCell>
							<TableCell>{skin.user_id}</TableCell>
							<TableCell>{skin.skin_id}</TableCell>
							<TableCell>{skin.status}</TableCell>
							<TableCell className='text-right'>
								{formatToUserTimezone(skin.created_at)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
