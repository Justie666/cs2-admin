import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { eventService } from '../service/eventService'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useGetEvents = (params: PaginationParams) => {
	return useQuery({
		queryKey: ['events', params],
		queryFn: () => eventService.getAll(params)
	})
}

export const useCreateEvent = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: EventCreateData) => eventService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['events'] })
			toast.success('Матч успешно создан')
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

export const useEndEvent = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: EventEndData) => eventService.end(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['events'] })
			toast.success('Матч успешно завершен')
			window.location.reload()
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
