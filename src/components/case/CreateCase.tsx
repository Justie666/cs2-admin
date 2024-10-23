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
	FormMessage,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	SelectTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
	Input
} from '../ui'
import { uploadFileToS3 } from '@/api/uploadFileToS3'
import { toast } from 'sonner'
import { useCreateCase } from '@/api/hooks/caseHooks'

const formSchema = z.object({
	name: z.string({
		message: 'Это поле обязательно'
	}),
	price: z
		.number({
			message: 'Это поле обязательно'
		})
		.int({ message: 'Это поле должно быть целым числом' }),

	photo_url: z.any().refine(file => file instanceof File, {
		message: 'Выберите изображение'
	}),
	type_price: z.enum(['usdt', 'friend', 'coin'], {
		message: 'Это поле обязательно'
	})
})

const typePrice = ['usdt', 'friend', 'coin']

export const CreateCase = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema)
	})
	const { mutate, isPending } = useCreateCase()

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			const photo_url = await uploadFileToS3(data.photo_url)

			mutate({ ...data, photo_url })
		} catch {
			toast.error('Произошла ошибка при создании скина')
		}
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Button variant={'outline'}>Создать</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Создание кейса</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
							name='price'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Цена</FormLabel>
									<FormControl>
										<Input
											placeholder='Введите цену'
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
							name='type_price'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Редкость</FormLabel>
									<FormControl>
										<Select
											onValueChange={value => field.onChange(value)}
											value={typePrice !== undefined ? field.value : ''}>
											<SelectTrigger>
												<SelectValue placeholder='Выберите редкость' />
											</SelectTrigger>
											<SelectContent>
												{typePrice?.map(type => (
													<SelectItem key={type} value={type}>
														{type}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='photo_url'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Картинка</FormLabel>
									<FormControl>
										<Input
											type='file'
											accept='image/*'
											onChange={e => field.onChange(e.target.files?.[0])}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={isPending} className='w-full' type='submit'>
							<Loading isShow={isPending} />
							Сохранить
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
