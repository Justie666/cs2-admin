import { apiWithoutToken } from '../instance'

export const authService = {
	login: async (data: LoginData) => {
		const response = await apiWithoutToken.post<{
			user_id: number
			level: number
		}>('/auth/admin/login', data, {
			withCredentials: true
		})
		console.log(response)

		const token = response.headers['authorization']?.split(' ')[1]

		console.log(response.headers['authorization'])
		const userID = response.data.user_id
		localStorage.setItem('user_id', String(userID))

		const level = response.data.level
		localStorage.setItem('level', String(level))

		if (token) {
			localStorage.setItem('access_token', token)
		}

		return response.data
	},

	loginWithoutData: async () => {
		const response = await apiWithoutToken.post('/auth/admin/login', null, {
			withCredentials: true
		})

		const userID = response.data.user_id
		localStorage.setItem('user_id', String(userID))

		const level = response.data.level
		localStorage.setItem('level', String(level))

		const newToken = response.headers['authorization']
		if (newToken) {
			localStorage.setItem('access_token', newToken)
		}
	}
}
