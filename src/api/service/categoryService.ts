import { api } from '../instance'

export const categoryService = {
	getCategories: async () => {
		return (await api.get<Category[]>('/category/get/all')).data
	},

	editCategory: async (data: {
		id: number
		name: string
		price_one: number
		price_two: number
		price_three: number
		price_four: number
	}) => {
		return (await api.patch('/api/categories/', data)).data
	},

	deleteCategory: async (params: { id: number }) => {
		return (await api.delete('/api/categories/', { params })).data
	}
}
