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
import { useCreateGun } from '@/api/hooks/gunHooks'

const formSchema = z.object({
	name: z.string({ message: 'Это поле обязательно' }).min(1, {
		message: 'Это поле обязательно'
	}),
	parent_id: z.number().nullable()
})

export const CreateGun = ({ parent_id }: { parent_id: number | null }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			parent_id
		}
	})
	const { mutate, isPending } = useCreateGun()

	function onSubmit(data: z.infer<typeof formSchema>) {
		mutate({ ...data, parent_id: parent_id ? parent_id : null })
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Button size={'sm'} variant={'outline'} className='mt-3'>
					Создать
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Создать оружие</DialogTitle>
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
							Создать
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
