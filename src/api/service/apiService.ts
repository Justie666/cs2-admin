import { api } from '../instance'

export const apiService = {
	get: async () =>
		(await api.get<{ market: string; ton: string }>('/admin/system')).data,

	update: async (data: { market: string; ton: string }) =>
		(await api.put('/admin/system', data)).data
}
