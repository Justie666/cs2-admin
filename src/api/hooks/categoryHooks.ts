import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '../service/categoryService'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

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
		},
		onError: error => {
			const axiosError = error as AxiosError<{ detail: string }>
			// Проверяем, есть ли response и detail
			if (axiosError.response && axiosError.response.data) {
				toast.error(axiosError.response.data.detail || 'Произошла ошибка')
			} else {
				toast.error('Произошла ошибка')
			}
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
		},
		onError: error => {
			const axiosError = error as AxiosError<{ detail: string }>
			// Проверяем, есть ли response и detail
			if (axiosError.response && axiosError.response.data) {
				toast.error(axiosError.response.data.detail || 'Произошла ошибка')
			} else {
				toast.error('Произошла ошибка')
			}
		}
	})
}
