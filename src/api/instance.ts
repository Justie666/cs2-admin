import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://api.two-market.ru',
	headers: {
		'Content-Type': 'application/json'
	}
})

api.interceptors.request.use(
	config => {
		const token = localStorage.getItem('access_token')

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)