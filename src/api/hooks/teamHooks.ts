import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { teamService } from '../service/teamService'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useGetTeams = () => {
	return useQuery({
		queryKey: ['teams'],
		queryFn: () => teamService.getAll()
	})
}

export const useCreateTeam = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: TeamCreateData) => teamService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['teams'] })
			toast.success('Команда успешно создана')
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
