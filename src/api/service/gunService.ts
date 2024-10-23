import { api } from '../instance'

export const gunService = {
	getAll: async () => {
		return (await api.get<Gun[]>('/admin/gun')).data
	},
	create: async (data: GunCreateData) => {
		return (await api.post('/admin/gun', data)).data
	},

	update: async (data: GunUpdateData) => {
		return (await api.put('/admin/gun', data)).data
	}
}
