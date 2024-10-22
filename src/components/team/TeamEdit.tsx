import { useEditCategory } from '@/api/hooks/categoryHooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pen } from 'lucide-react'
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

const formSchema = z.object({
	id: z.number(),
	name: z.string({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	})
})

export const TeamEdit = ({ id, name, logo_url }: Team) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id,
			name,
			logo_url
		}
	})
	const { mutate, isPending } = useTe()

	function onSubmit(data: z.infer<typeof formSchema>) {
		mutate(data)
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Button size={'icon'} variant={'outline'}>
					<Pen />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Редактирование категории</DialogTitle>
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
										<Input placeholder='Логин' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='price_one'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Цена для новичка</FormLabel>
									<FormControl>
										<Input placeholder='Цена' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='price_two'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Цена для новичка</FormLabel>
									<FormControl>
										<Input placeholder='Цена' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={isPending} className='w-full' type='submit'>
							<Loading isShow={isPending} />
							Сохрнаить
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
