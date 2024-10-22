import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { eventService } from '../service/eventService'
import { toast } from 'sonner'

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
		onError: () => {
			toast.error('Произошла ошибка при создании матча')
		}
	})
}
