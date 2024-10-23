import { useQuery } from '@tanstack/react-query'
import { userService } from '../service/userService'

export const useGetAllUsers = (params: PaginationParams) => {
	return useQuery({
		queryKey: ['users', params],
		queryFn: () => userService.getAll(params)
	})
}

export const useGetFullInfo = (params: { user_id: number }) => {
	return useQuery({
		queryKey: ['user', params],
		queryFn: () => userService.getFullInfo(params)
	})
}
