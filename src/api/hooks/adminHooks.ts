import { useMutation } from '@tanstack/react-query'
import { adminService } from '../service/adminService'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useCreateAdmin = () => {
	return useMutation({
		mutationFn: (data: { user_id: number; level: number }) =>
			adminService.create(data),
		onSuccess: () => {
			toast.success('Админ успешно создан')
		},
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
