import { api } from '../instance'

export const userService = {
	getAll: async (params: PaginationParams) => {
		return (await api.get<IUsersStat[]>('/admin/user', { params })).data
	},

	getFullInfo: async (params: { user_id: number }) => {
		return (await api.get<IFullInfo>(`/admin/user/id`, { params })).data
	},

	ban: async (data: { user_id: number; value: boolean }) => {
		return (await api.post('/admin/ban', data)).data
	}
}
