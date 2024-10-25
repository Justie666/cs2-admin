import axios from 'axios'

const url = 'https://api.cs-limited.ru'

export const apiWithoutToken = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json'
	}
})

export const api = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json'
	}
})

api.interceptors.request.use(
	config => {
		const token = localStorage.getItem('access_token')

		if (token) {
			config.headers.Authorization = `${token}`
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config
		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true

			try {
				const response = await axios.post(
					'https://api.two-market.ru/auth/admin/refresh',
					{
						user_id: +localStorage.getItem('user_id')!
					},
					{
						withCredentials: true
					}
				)

				const newToken = response.headers['authorization']
				if (newToken) {
					localStorage.setItem('access_token', newToken)

					api.defaults.headers['Authorization'] = newToken
					originalRequest.headers['Authorization'] = newToken
				}

				return api(originalRequest)
			} catch {
				localStorage.removeItem('access_token')

				try {
					const response = await axios.post(`${url}/auth/login`, null, {
						withCredentials: true
					})

					const newToken = response.headers['authorization']
					if (newToken) {
						localStorage.setItem('access_token', newToken)

						api.defaults.headers['Authorization'] = newToken
						originalRequest.headers['Authorization'] = newToken
					}

					return api(originalRequest)
				} catch {
					window.location.href = '/'
				}
			}
		}
		return Promise.reject(error)
	}
)
