import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiService } from '../service/apiService'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useGetApi = () => {
	return useQuery({
		queryKey: ['api'],
		queryFn: () => apiService.get()
	})
}

export const useUpdateApi = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['api'],
		mutationFn: (data: { market: string; ton: string }) =>
			apiService.update(data),
		onSuccess: () => {
			toast.success('Данные обновлены')
			queryClient.invalidateQueries({ queryKey: ['api'] })
		},
		onError: error => {
			const axiosError = error as AxiosError<{ detail: string }>
			if (axiosError.response && axiosError.response.data) {
				toast.error(axiosError.response.data.detail || 'Произошла ошибка')
			} else {
				toast.error('Произошла ошибка')
			}
		}
	})
}
