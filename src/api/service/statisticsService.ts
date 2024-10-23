import { api } from '../instance'

export const statisticsService = {
	getAll: async () => {
		return (await api.get<IStatistics>('/admin/statistics')).data
	}
}
