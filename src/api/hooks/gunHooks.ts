import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { gunService } from '../service/gunService'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useGetGuns = () => {
	return useQuery({
		queryKey: ['guns'],
		queryFn: () => gunService.getAll()
	})
}

export const useCreateGun = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: GunCreateData) => gunService.create(data),
		onSuccess: () => {
			toast.success('Оружие успешно создано')
			queryClient.invalidateQueries({ queryKey: ['guns'] })
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

export const useUpdateGun = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: GunUpdateData) => gunService.update(data),
		onSuccess: () => {
			toast.success('Оружие успешно обновлено')
			queryClient.invalidateQueries({ queryKey: ['guns'] })
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
