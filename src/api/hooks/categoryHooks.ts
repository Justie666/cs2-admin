import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '../service/categoryService'

export const useGetCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getCategories()
	})
}

export const useEditCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: {
			id: number
			name: string
			price_one: number
			price_two: number
			price_three: number
			price_four: number
		}) => categoryService.editCategory(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		}
	})
}

export const useDeleteCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (params: { id: number }) =>
			categoryService.deleteCategory(params),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		}
	})
}
