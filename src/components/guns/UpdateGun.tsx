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
import { useUpdateGun } from '@/api/hooks/gunHooks'

const formSchema = z.object({
	name: z.string({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	}),
	parent_id: z.number().nullable(),
	id: z.number()
})

export const UpdateGun = ({ gun }: { gun: Gun }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			parent_id: gun.parent_id,
			name: gun.name,
			id: gun.id
		}
	})
	const { mutate, isPending } = useUpdateGun()

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
					<DialogTitle>Изменить оружие</DialogTitle>
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
