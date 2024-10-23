import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Loading } from '../Loading'
import {
	Form,
	Button,
	DialogHeader,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	Input,
	FormMessage,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../ui'
import { useUpdatePromo } from '@/api/hooks/promoHooks'

const formSchema = z.object({
	id: z.number({ message: 'Это поле обязательно' }),
	name: z.string({
		message: 'Это поле обязательно'
	}),
	count: z
		.number({
			message: 'Это поле обязательно'
		})
		.int({ message: 'Это поле должно быть целым числом' }),
	value: z
		.number({
			message: 'Это поле обязательно'
		})
		.int({ message: 'Это поле должно быть целым числом' }),
	type: z.enum(['usdt', 'coin', 'clip'], {
		message: 'Это поле обязательно'
	})
})

const TYPES = [
	{ label: 'USDT', value: 'usdt' },
	{ label: 'Монеты', value: 'coin' },
	{ label: 'Обоймы', value: 'clip' }
]

export const UpdatePromo = ({ promo }: { promo: Promo }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: promo.id,
			name: promo.name,
			count: promo.count,
			value: promo.value,
			type: promo.type
		}
	})
	const { mutate, isPending } = useUpdatePromo()

	function onSubmit(data: z.infer<typeof formSchema>) {
		mutate(data)
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Button size={'sm'} variant={'outline'} className='mt-3'>
					Изменить
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Изменить промокод</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input placeholder='Введите название' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='count'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Количество активаций</FormLabel>
									<FormControl>
										<Input
											placeholder='Введите количество активаций'
											type='number'
											{...field}
											onChange={e => {
												// Преобразуем значение в число и вызываем field.onChange
												const value = e.target.value
													? Number(e.target.value)
													: null // null или 0, в зависимости от логики
												field.onChange(value)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Сколько даст промокод</FormLabel>
									<FormControl>
										<Input
											placeholder='Введите количество'
											type='number'
											{...field}
											onChange={e => {
												// Преобразуем значение в число и вызываем field.onChange
												const value = e.target.value
													? Number(e.target.value)
													: null // null или 0, в зависимости от логики
												field.onChange(value)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Тип</FormLabel>
									<FormControl>
										<Select
											onValueChange={value => field.onChange(value)}
											value={
												field.value !== undefined ? field.value.toString() : ''
											}>
											<SelectTrigger>
												<SelectValue placeholder='Выберите тип' />
											</SelectTrigger>
											<SelectContent>
												{TYPES?.map(type => (
													<SelectItem key={type.value} value={type.value}>
														{type.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
			</DialogContent>
		</Dialog>
	)
}
