import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { promoService } from '../service/promoService'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useGetPromos = () => {
	return useQuery({
		queryKey: ['promos'],
		queryFn: () => promoService.getAll()
	})
}

export const useCreatePromo = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: CreatePromoData) => promoService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['promos'] })
			toast.success('Промо успешно создано')
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

export const useUpdatePromo = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: UpdatePromoData) => promoService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['promos'] })
			toast.success('Промо успешно обновлено')
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
