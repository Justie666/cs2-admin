import { usePostLogin } from '@/api/hooks/authHooks'
import { Loading } from '@/components/Loading'
import { Checkbox } from '@/components/ui'
import { Button } from '@/components/ui/button'
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Form
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
	login: z.string({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	}),
	password: z.string({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	}),
	remember_me: z.boolean().default(false) // Поле "Запомнить меня" не обязательно
})

export const LoginPage = () => {
	const navigate = useNavigate()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			login: '844642570',
			password: '4QEe0kNrj7Do4oCV',
			remember_me: false
		}
	})
	const { mutate, isPending, isSuccess } = usePostLogin()

	function onSubmit(data: z.infer<typeof formSchema>) {
		mutate(data)
	}

	useEffect(() => {
		if (isSuccess) {
			navigate('/main')
		}
	}, [isSuccess, navigate])

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='p-4 border min-w-[400px]'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='login'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Логин</FormLabel>
									<FormControl>
										<Input placeholder='Логин' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input type='password' placeholder='Пароль' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='remember_me'
							render={({ field }) => (
								<FormItem className='flex items-center gap-2 space-y-0'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel>Запомнить меня</FormLabel>
								</FormItem>
							)}
						/>
						<Button disabled={isPending} className='w-full' type='submit'>
							<Loading isShow={isPending} />
							Авторизация
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
