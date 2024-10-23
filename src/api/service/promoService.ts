import { api } from '../instance'

export const promoService = {
	getAll: async () => {
		return (await api.get<Promo[]>('/admin/promo')).data
	},

	create: async (data: CreatePromoData) => {
		return (await api.post('/admin/promo', data)).data
	},

	update: async (data: UpdatePromoData) => {
		return (await api.put('/admin/promo', data)).data
	}
}
