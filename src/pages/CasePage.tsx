import {
	useChangeSkin,
	useDeleteCase,
	useGetCases,
	useRemoveSkin
} from '@/api/hooks/caseHooks'
import { CreateCase } from '@/components/case/CreateCase'
import { EditCase } from '@/components/case/EditCase'
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
	Button,
	Input
} from '@/components/ui'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const CasePage = () => {
	const [filter, setFilter] = useState<'free' | 'paid'>('free')
	const { data: cases } = useGetCases({ sorting: filter })
	const { mutate: deleteCase } = useDeleteCase()
	const { mutate } = useRemoveSkin()
	const { mutate: updateSkin } = useChangeSkin()

	const handleDelete = (id: number) => {
		const isConfirmed = window.confirm('Вы уверены, что хотите удалить кейс?')

		if (isConfirmed) {
			deleteCase({ case_id: id })
		}
	}

	const handleRemoveSkin = (case_skin_id: number) => {
		const isConfirmed = window.confirm('Вы уверены, что хотите удалить скин?')
		if (isConfirmed) {
			mutate({ case_skin_id })
		}
	}

	const handleChangeSkin = ({ id, chance }: { id: number; chance: number }) => {
		if (chance > 99) {
			toast.error('Нельзя установить больше 99% шансов')
		}
		updateSkin({ id, chance })
	}

	return (
		<div>
			<CreateCase />

			<div className='mt-3 flex gap-2'>
				<div
					className={`text-[15px] font-medium cursor-pointer ${
						filter === 'free' && 'text-primary'
					}`}
					onClick={() => setFilter('free')}>
					Бесплатные
				</div>
				<div
					className={`text-[15px] font-medium cursor-pointer ${
						filter === 'paid' && 'text-primary'
					}`}
					onClick={() => setFilter('paid')}>
					Платные
				</div>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>id</TableHead>
						<TableHead>Название</TableHead>
						<TableHead>Цена</TableHead>
						<TableHead>Картинка</TableHead>
						<TableHead>Скины</TableHead>
						<TableHead>Действия</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{cases?.map(caseItem => (
						<TableRow key={caseItem.id}>
							<TableCell className='font-medium'>{caseItem.id}</TableCell>
							<TableCell>{caseItem.name}</TableCell>
							<TableCell>
								{caseItem.price} {caseItem.type_price}
							</TableCell>
							<TableCell>
								{' '}
								<img
									src={caseItem.photo_url}
									alt=''
									className='object-cover h-[100px]'
								/>
							</TableCell>
							<TableCell>
								{caseItem.skins.map(skin => (
									<div key={skin.id} className='flex gap-2 items-center'>
										<img
											src={skin.skin.image_url}
											className='size-[40px] object-cover'
											alt=''
										/>
										<div className='flex gap-2 items-center'>
											{skin.skin.id} -{skin.skin.name} ({skin.skin.quality}) - (
											{skin.skin.rarity}) -{' '}
											<Input
												defaultValue={skin.chance}
												className='w-[70px]'
												onBlur={e =>
													handleChangeSkin({
														id: skin.id,
														chance: Number(e.target.value) // Обновляем шанс сразу
													})
												}
											/>
											%
										</div>
										<Button
											size={'icon'}
											variant={'outline'}
											onClick={() => handleRemoveSkin(skin.id)}>
											<Trash2 />
										</Button>
									</div>
								))}
							</TableCell>
							<TableCell>
								<div className='flex gap-2 items-center'>
									<EditCase case={caseItem} />
									<Button
										size={'icon'}
										variant={'outline'}
										onClick={() => handleDelete(caseItem.id)}>
										<Trash2 />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
