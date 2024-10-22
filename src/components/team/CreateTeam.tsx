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
import AWS from 'aws-sdk'

// Функция для загрузки изображения на S3
export async function uploadFileToS3(file: File) {
	// Настройка AWS S3
	const s3 = new AWS.S3({
		endpoint: 'https://s3.timeweb.cloud',
		accessKeyId: 'PKG54KTOL8XGWFIOOQGB',
		secretAccessKey: 'Tqe58oD57zo1NFcu3GORTagvfMBriwR2FLxfSbJi',
		region: 'ru-1',
		signatureVersion: 'v4'
	})

	const params = {
		Bucket: 'your-s3-bucket-name', // Имя вашего S3 bucket
		Key: `teams/${Date.now()}-${file.name}`, // Уникальное имя файла
		Body: file,
		ContentType: file.type,
		ACL: 'public-read' // Для того, чтобы файл был публично доступен
	}

	try {
		const { Location } = await s3.upload(params).promise()
		return Location // Возвращает URL загруженного файла
	} catch (error) {
		console.error('Ошибка загрузки файла на S3:', error)
		throw new Error('Ошибка загрузки файла на сервер')
	}
}

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
			// const logo_url = '321312'

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
