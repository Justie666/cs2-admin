import { CheckCircle, Circle, CircleX } from 'lucide-react'
import { CategoryEdit } from './CategoryEdit'

export const CategoryItem = ({
	id,
	active,
	name,
	children,
	parent_id,
	price
}: Category) => {
	return (
		<>
			<div className='w-full py-1 px-2 rounded-xl border-[2px] bg-white'>
				<div className='flex w-full justify-between items-center'>
					<div className='text-2xl flex items-center gap-2'>
						{active ? (
							<Circle
								size={12}
								fill='rgb(34 197 94)'
								stroke='rgb(34 197 94)'
								className='mt-1'
							/>
						) : (
							<Circle
								size={12}
								fill='rgb(239 68 68)'
								stroke='rgb(239 68 68)'
								className='mt-1'
							/>
						)}
						{name}{' '}
					</div>
					<div className='flex gap-2'>
						<CategoryEdit id={id} active={active} name={name} price={price} />
					</div>
				</div>
				<div className='flex gap-2'>
					<div>Новичок: {price.price_one} ₽</div>
					<div>Спец: {price.price_two} ₽</div>
					<div>Проф: {price.price_three} ₽</div>
					<div>Гуру: {price.price_four} ₽</div>
				</div>
			</div>
			{children && children.length > 0 && (
				<div className='pl-4 flex flex-col gap-1'>
					{children.map(child => (
						<CategoryItem key={child.id} {...child} />
					))}
				</div>
			)}
		</>
	)
}
