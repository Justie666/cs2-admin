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
	DialogTitle
} from '../ui'
import { useCreateTeam } from '@/api/hooks/teamHooks'
import { toast } from 'sonner'
import { uploadFileToS3 } from '@/api/uploadFileToS3'

const formSchema = z.object({
	name: z.string({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	}),
	logo: z.any().refine(file => file instanceof File, {
		message: 'Выберите изображение'
	})
})

export const CreateTeam = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema)
	})
	const { mutate, isPending } = useCreateTeam()

	async function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data)

		try {
			const logo_url = await uploadFileToS3(data.logo)

			mutate({ ...data, logo_url })
		} catch {
			toast.error('Произошла ошибка при создании команды')
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
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input placeholder='Название' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='logo'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Логотип</FormLabel>
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
