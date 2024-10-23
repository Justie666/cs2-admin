import { useGetPromos } from '@/api/hooks/promoHooks'
import { CreatePromo } from '@/components/promo/CreatePromo'
import { UpdatePromo } from '@/components/promo/UpdatePromo'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui'

const TYPES = [
	{ label: 'USDT', value: 'usdt' },
	{ label: 'Монеты', value: 'coin' },
	{ label: 'Обоймы', value: 'clip' }
]

export const PromoPage = () => {
	const { data: promos } = useGetPromos()

	return (
		<div>
			<CreatePromo />

			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>Id</TableHead>
							<TableHead>Название</TableHead>
							<TableHead>Количество активация</TableHead>
							<TableHead>Тип и сумма</TableHead>
							<TableHead>Действия</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{promos?.map(promo => (
							<TableRow key={promo.id}>
								<TableCell className='font-medium'>{promo.id}</TableCell>
								<TableCell>{promo.name}</TableCell>
								<TableCell>{promo.count}</TableCell>
								<TableCell>
									<div>
										Тип - {TYPES.find(p => promo.type === p.value)?.label}
									</div>
									<div>Сколько даст - {promo.value}</div>
								</TableCell>
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
