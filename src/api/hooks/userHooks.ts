import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'
import { userService } from '../service/userService'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useGetUsersInfinite = () => {
	return useInfiniteQuery({
		queryKey: ['users'],
		queryFn: ({ pageParam = 0 }) =>
			userService.getAll({ limit: 20, offset: pageParam }),
		getNextPageParam: (lastPage, allPages) => {
			if (!lastPage || lastPage.length === 0) {
				return undefined
			}
			return allPages.length * 20
		},
		initialPageParam: 0
	})
}

export const useGetFullInfo = (params: { user_id: number }) => {
	return useQuery({
		queryKey: ['user', params],
		queryFn: () => userService.getFullInfo(params),
		enabled: false
	})
}

export const useBanUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: { user_id: number; value: boolean }) =>
			userService.ban(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
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
