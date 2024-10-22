import { useMutation } from '@tanstack/react-query'
import { authService } from '../service/authService'

export const usePostLogin = () => {
	return useMutation({
		mutationFn: (data: LoginData) => authService.login(data)
	})
}
