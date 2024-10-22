import { useGetCategories } from '@/api/hooks/categoryHooks'
import { CategoryItem } from '@/components/category/CategoryItem'

export const CategoryPage = () => {
	const { data, isPending } = useGetCategories()

	const mockData: Category[] = [
		{
			id: 1,
			name: 'Категория',
			active: false,
			children: [
				{
					id: 2,
					name: 'Категория',
					active: true,
					children: [
						{
							id: 3,
							name: 'Категория',
							active: true,
							children: [],
							parent_id: 2,
							price: {
								price_one: 100,
								price_two: 100,
								price_three: 100,
								price_four: 100
							}
						},
						{
							id: 5,
							name: 'Категория',
							active: true,
							children: [],
							parent_id: 2,
							price: {
								price_one: 100,
								price_two: 100,
								price_three: 100,
								price_four: 100
							}
						}
					],
					parent_id: 1,
					price: {
						price_one: 100,
						price_two: 100,
						price_three: 100,
						price_four: 100
					}
				}
			],
			parent_id: 0,
			price: {
				price_one: 100,
				price_two: 100,
				price_three: 100,
				price_four: 100
			}
		},
		{
			id: 10,
			name: 'Категория',
			active: true,
			children: [
				{
					id: 321,
					name: 'Категория',
					active: true,
					children: [],
					parent_id: 2,
					price: {
						price_one: 100,
						price_two: 100,
						price_three: 100,
						price_four: 100
					}
				}
			],
			parent_id: 2,
			price: {
				price_one: 100,
				price_two: 100,
				price_three: 100,
				price_four: 100
			}
		}
	]

	return (
		<div className='flex flex-col gap-1'>
			{mockData?.map(category => (
				<CategoryItem key={category.id} {...category} />
			))}
		</div>
	)
}
