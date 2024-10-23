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
import { useUpdateCase } from '@/api/hooks/caseHooks'
import { Edit2 } from 'lucide-react'

const formSchema = z.object({
	id: z.number().min(1, { message: 'Это поле обязательно' }),
	name: z.string({
		message: 'Это поле обязательно'
	}),
	price: z
		.number({
			message: 'Это поле обязательно'
		})
		.int({ message: 'Это поле должно быть целым числом' }),

	photo_url: z.union([z.string(), z.any()]).optional(),
	type_price: z.enum(['usdt', 'friend', 'coin'], {
		message: 'Это поле обязательно'
	})
})

const typePrice = ['usdt', 'friend', 'coin']

export const EditCase = ({ case: caseData }: { case: Case }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: caseData.id,
			name: caseData.name,
			price: caseData.price,
			photo_url: caseData.photo_url,
			type_price: caseData.type_price
		}
	})
	const { mutate, isPending } = useUpdateCase()

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			let photo_url = caseData.photo_url // По умолчанию берем URL из пропсов

			// Если был выбран файл, загружаем его
			if (data.photo_url instanceof File) {
				photo_url = await uploadFileToS3(data.photo_url)
			}

			mutate({ ...data, photo_url })
		} catch {
			toast.error('Произошла ошибка при создании скина')
		}
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Button variant={'outline'} size={'icon'}>
					<Edit2 />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Изменить кейс</DialogTitle>
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
