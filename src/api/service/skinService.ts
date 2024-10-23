import { api } from '../instance'

export const skinService = {
	getAll: async (params: GetSkinsParams) => {
		return (await api.get<Skin[]>('/admin/skin', { params })).data
	},
	create: async (data: SkinCreateData) => {
		return (await api.post('/admin/skin', data)).data
	},

	update: async (data: SkinUpdateData) => {
		return (await api.put('/admin/skin', data)).data
	}
}
