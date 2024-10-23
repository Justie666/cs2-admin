import { api } from '../instance'

export const caseService = {
	getAll: async (params: { sorting: 'free' | 'paid' }) => {
		return (await api.get<Case[]>('/admin/case', { params })).data
	},
	create: async (data: CreateCaseData) => {
		return (await api.post('/admin/case', data)).data
	},
	update: async (data: UpdateCaseData) => {
		return (await api.put('/admin/case', data)).data
	},

	delete: async (params: { case_id: number }) => {
		return (await api.delete('/admin/case', { params })).data
	},

	addSkin: async (data: AddSkinData) => {
		return (await api.post('/admin/case/skin', data)).data
	},
	removeSkin: async (data: { case_skin_id: number }) => {
		return (await api.delete('/admin/case/skin', { data })).data
	},

	updateSkin: async (data: UpdateSkinData) => {
		return (await api.patch('/admin/case/skin', data)).data
	}
}
