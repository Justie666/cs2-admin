import { api } from '../instance'

export const eventService = {
	getAll: async (params: PaginationParams) =>
		(await api.get<Events[]>('/admin/event', { params })).data,

	create: async (data: EventCreateData) => {
		return (await api.post('/admin/event', data)).data
	}
}
