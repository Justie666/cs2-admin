import { api } from '../instance'

export const adminService = {
	create: async (data: { user_id: number; level: number }) => {
		return (await api.post('/admin', data)).data
	}
}
