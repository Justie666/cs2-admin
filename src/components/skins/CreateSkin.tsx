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
import { QUALITY, RARITY } from '@/const'
import { useGetGuns } from '@/api/hooks/gunHooks'
import { uploadFileToS3 } from '@/api/uploadFileToS3'
import { toast } from 'sonner'
import { useCreateSkin } from '@/api/hooks/skinHooks'

const formSchema = z.object({
	gun_id: z.number({
		message: 'Это поле обязательно'
	}),
	price: z
		.number({
			message: 'Это поле обязательно'
		})
		.int({ message: 'Это поле должно быть целым числом' }),
	rarity: z.enum(['CO', 'SE', 'CL', 'PR', 'AQ', 'IQ', 'CG'], {
		message: 'Это поле обязательно'
	}),
	quality: z.enum(['FN', 'MW', 'FT', 'WW', 'BS'], {
		message: 'Это поле обязательно'
	}),
	name: z.string({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	}),
	image_url: z.any().refine(file => file instanceof File, {
		message: 'Выберите изображение'
	})
})

export const renderGuns = (guns: Gun[], level = 0) => {
	return guns.map(gun => (
		<div key={gun.id} style={{ paddingLeft: `${level * 10}px` }}>
			<SelectItem value={gun.id.toString()} disabled={gun.children.length > 0}>
				{gun.name}
			</SelectItem>
			{gun.children &&
				gun.children.length > 0 &&
				renderGuns(gun.children, level + 1)}
		</div>
	))
}

export const CreateSkin = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema)
	})
	const { mutate, isPending } = useCreateSkin()
	const { data: guns } = useGetGuns()

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			const image_url = await uploadFileToS3(data.image_url)

			mutate({ ...data, image_url })
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
					<DialogTitle>Создание команды</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Оружие</FormLabel>
									<FormControl>
										<Input placeholder='Введите название оружия' {...field} />
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
											placeholder='Введите цену оружия'
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
							name='gun_id'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Оружие</FormLabel>
									<FormControl>
										<Select
											onValueChange={value => field.onChange(Number(value))}
											value={
												field.value !== undefined ? field.value.toString() : ''
											}>
											<SelectTrigger>
												<SelectValue placeholder='Выберите тип оружия' />
											</SelectTrigger>
											<SelectContent>{guns && renderGuns(guns)}</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='rarity'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Редкость</FormLabel>
									<FormControl>
										<Select
											onValueChange={value => field.onChange(value)}
											value={field.value !== undefined ? field.value : ''}>
											<SelectTrigger>
												<SelectValue placeholder='Выберите редкость' />
											</SelectTrigger>
											<SelectContent>
												{RARITY?.map(rarity => (
													<SelectItem key={rarity.key} value={rarity.key}>
														{rarity.value}
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
							name='quality'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Команда 2</FormLabel>
									<FormControl>
										<Select
											onValueChange={value => field.onChange(value)}
											value={field.value !== undefined ? field.value : ''}>
											<SelectTrigger>
												<SelectValue placeholder='Выберите команду' />
											</SelectTrigger>
											<SelectContent>
												{QUALITY?.map(quality => (
													<SelectItem key={quality.key} value={quality.key}>
														{quality.value}
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
							name='image_url'
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