import { api } from '../instance'

export const adminService = {
	create: async (data: { user_id: number; level: number }) => {
		return (await api.post('/admin', data)).data
	},

	getAll: async () => {
		return (await api.get<IAdmin[]>('/admin')).data
	},

	deleteAdmin: async (params: DeleteAdminParams) => {
		return (await api.delete('/admin', { params })).data
	},

	skins: async () => {
		return (await api.get<ReceivingSkin[]>('/admin/receiving')).data
	}
}
