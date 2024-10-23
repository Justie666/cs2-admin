import { useCreateAdmin } from '@/api/hooks/adminHooks'
import { Loading } from '@/components/Loading'
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	Input,
	FormMessage,
	Form,
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Button
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	user_id: z.string({
		message: 'Это поле обязательно'
	}),
	level: z.number({
		message: 'Это поле обязательно'
	})
})

const LEVELS = [
	{ label: 'Оператор', value: 1 },
	{ label: 'Старший', value: 2 },
	{ label: 'Владелец', value: 3 }
]

export const CreateAdmin = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			user_id: '', // Инициализируем пустой строкой
			level: 1 // Или любой другой уровень по умолчанию
		}
	})

	const { mutate: create, isPending } = useCreateAdmin()

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		console.log(data)
		create({ level: data.level, user_id: Number(data.user_id) })
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-3 max-w-[400px]'>
					<FormField
						control={form.control}
						name='user_id'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Id пользователя в телеграме</FormLabel>
								<FormControl>
									<Input
										type='number'
										{...field}
										onChange={e => {
											const value = e.target.value
												? e.target.value.toString() // Меняем на строку
												: '' // Заменяем на пустую строку
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
						name='level'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Тип</FormLabel>
								<FormControl>
									<Select
										onValueChange={value => field.onChange(Number(value))} // Преобразуем в число
										value={
											field.value !== undefined ? field.value.toString() : ''
										}>
										<SelectTrigger>
											<SelectValue placeholder='Выберите тип' />
										</SelectTrigger>
										<SelectContent>
											{LEVELS.map(type => (
												<SelectItem
													key={type.value}
													value={type.value.toString()}>
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
						Создать
					</Button>
				</form>
			</Form>
		</div>
	)
}
