import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { skinService } from '../service/skinService'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useGetSkins = (params: GetSkinsParams) => {
	return useQuery({
		queryKey: ['skins', params],
		queryFn: () => skinService.getAll(params)
	})
}

export const useCreateSkin = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: SkinCreateData) => skinService.create(data),
		onSuccess: () => {
			toast.success('Скин успешно создан')
			queryClient.invalidateQueries({ queryKey: ['skins'] })
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

export const useUpdateSkin = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: SkinUpdateData) => skinService.update(data),
		onSuccess: () => {
			toast.success('Скин успешно обновлен')
			queryClient.invalidateQueries({ queryKey: ['skins'] })
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
