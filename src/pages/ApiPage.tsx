import { useGetApi, useUpdateApi } from '@/api/hooks/apiHooks'
import { Loading } from '@/components/Loading'
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	Input,
	FormMessage,
	Form,
	Button
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	market: z.string({
		message: 'Это поле обязательно'
	}),
	ton: z.string({
		message: 'Это поле обязательно'
	})
})

export const ApiPage = () => {
	const { data, isPending: isPendingApi } = useGetApi()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema)
	})

	const { mutate: update, isPending } = useUpdateApi()

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		update(data)
	}

	useEffect(() => {
		if (data) {
			form.reset(data)
		}
	}, [data, form])

	if (isPendingApi) {
		return <div>Загрузка...</div>
	}

	return (
		<div>
			<div>
				{' '}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-3 max-w-[400px]'>
						<FormField
							control={form.control}
							name='market'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Api market</FormLabel>
									<FormControl>
										<Input placeholder='Api market' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='ton'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ton wallet</FormLabel>
									<FormControl>
										<Input placeholder='Ton wallet' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={isPending} className='w-full mt-2' type='submit'>
							<Loading isShow={isPending} />
							Сохранить
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
