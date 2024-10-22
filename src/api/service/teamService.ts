import { api } from '../instance'

export const teamService = {
	getAll: async () => {
		return (await api.get<Team[]>('/admin/team')).data
	},

	create: async (data: TeamCreateData) => {
		return (await api.post('/admin/team', data)).data
	}
}
