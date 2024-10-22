import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { teamService } from '../service/teamService'
import { toast } from 'sonner'

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
		onError() {
			toast.error('Произошла ошибка при создании команды')
		}
	})
}
