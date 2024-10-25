import { useMutation } from '@tanstack/react-query'
import { authService } from '../service/authService'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const usePostLogin = () => {
	return useMutation({
		mutationFn: (data: LoginData) => authService.login(data),
		onError: error => {
			const axiosError = error as AxiosError<{ detail: string }>
			// Проверяем, есть ли response и detail
			if (axiosError.response && axiosError.response.data) {
				toast.error(axiosError.response.data.detail || 'Произошла ошибка')
			} else {
				toast.error('Произошла ошибка')
			}
		}
	})
}

export const usePostLoginWithoutData = () => {
	return useMutation({
		mutationFn: () => authService.loginWithoutData(),
		onError: error => {
			const axiosError = error as AxiosError<{ detail: string }>
			// Проверяем, есть ли response и detail
			if (axiosError.response && axiosError.response.data) {
				toast.error(axiosError.response.data.detail || 'Произошла ошибка')
			} else {
				toast.error('Произошла ошибка')
			}
		}
	})
}
