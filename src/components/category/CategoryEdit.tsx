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
	DialogTitle,
	Checkbox
} from '../ui'

const formSchema = z.object({
	id: z.number(),
	name: z.string({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	}),
	price_one: z.number({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	}),
	price_two: z.number({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	}),
	price_three: z.number({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	}),
	price_four: z.number({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	}),
	active: z.boolean()
})

export const CategoryEdit = ({
	id,
	active,
	name,
	price
}: Omit<Category, 'children' | 'parent_id'>) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id,
			name,
			price_one: price.price_one,
			price_two: price.price_two,
			price_three: price.price_three,
			price_four: price.price_four,
			active
		}
	})
	const { mutate, isPending } = useEditCategory()

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
						<FormField
							control={form.control}
							name='price_three'
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
							name='price_four'
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
							name='active'
							render={({ field }) => (
								<FormItem className='flex items-center gap-2 space-y-0'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel>Активна</FormLabel>
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
