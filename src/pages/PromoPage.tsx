import { useGetPromos } from '@/api/hooks/promoHooks'
import { CreatePromo } from '@/components/promo/CreatePromo'
import { UpdatePromo } from '@/components/promo/UpdatePromo'
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui'
import { toast } from 'sonner'

const TYPES = [
	{ label: 'USDT', value: 'usdt' },
	{ label: 'Монеты', value: 'coin' },
	{ label: 'Обоймы', value: 'clip' }
]

export const PromoPage = () => {
	const { data: promos } = useGetPromos()

	const handleCopyLink = (name: string) => {
		navigator.clipboard.writeText(`https://t.me/betscs2bot?start=promo_${name}`)
		toast.success(`Ссылка успешно скопирована`)
	}

	return (
		<div>
			<CreatePromo />

			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>Id</TableHead>
							<TableHead>Ссылка</TableHead>
							<TableHead>Количество активация</TableHead>
							<TableHead>Тип </TableHead>
							<TableHead>Сумма</TableHead>
							<TableHead>Действия</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{promos?.map(promo => (
							<TableRow key={promo.id}>
								<TableCell className='font-medium'>{promo.id}</TableCell>
								<TableCell>
									<Button
										variant={'outline'}
										onClick={() => handleCopyLink(promo.name)}>
										Скопировать
									</Button>
								</TableCell>
								<TableCell>{promo.count}</TableCell>
								<TableCell>
									{TYPES.find(p => promo.type === p.value)?.label}
								</TableCell>
								<TableCell>{promo.value}</TableCell>
								<TableCell>
									<UpdatePromo promo={promo} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
