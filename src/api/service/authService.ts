import { api } from '../instance'

export const authService = {
	login: async (data: LoginData) => {
		const response = await api.post('/auth/admin/login', data)
		console.log(response)

		// Извлекаем токен из заголовков (например, из Authorization)
		const token = response.headers['authorization']?.split(' ')[1]

		console.log(response.headers['authorization'])

		// Сохраняем токен в localStorage, если он существует
		if (token) {
			localStorage.setItem('access_token', token)
		}

		return response.data
	}
}
