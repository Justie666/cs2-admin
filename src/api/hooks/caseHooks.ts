import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { caseService } from '../service/caseService'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useGetCases = (params: { sorting: 'free' | 'paid' }) => {
	return useQuery({
		queryKey: ['cases', params],
		queryFn: () => caseService.getAll(params)
	})
}

export const useCreateCase = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: CreateCaseData) => caseService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cases'] })

			toast.success('Кейс успешно создан')
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

export const useUpdateCase = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: UpdateCaseData) => caseService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cases'] })
			toast.success('Кейс успешно обновлен')
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

export const useDeleteCase = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (params: { case_id: number }) => caseService.delete(params),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cases'] })
			toast.success('Кейс успешно удален')
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

export const useAddSkin = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: AddSkinData) => caseService.addSkin(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cases'] })
			toast.success('Скин успешно добавлен')
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

export const useRemoveSkin = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: { case_skin_id: number }) =>
			caseService.removeSkin(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cases'] })
			toast.success('Скин успешно удален')
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

export const useChangeSkin = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: UpdateSkinData) => caseService.updateSkin(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cases'] })
			toast.success('Шанс на выпадение скина изменён')
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
