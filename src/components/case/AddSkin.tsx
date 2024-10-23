import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
	Form,
	Button,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input
} from '../ui'
import { useAddSkin } from '@/api/hooks/caseHooks'
import { z } from 'zod'
import { Loading } from '../Loading'
import { PlusIcon } from 'lucide-react'

const formSchema = z.object({
	case_id: z.number({
		message: 'Это поле обязательно'
	}),
	skin_id: z
		.number({
			message: 'Это поле обязательно'
		})
		.int({ message: 'Это поле должно быть целым числом' }),
	chance: z
		.number({
			message: 'Это поле обязательно'
		})
		.int({ message: 'Это поле должно быть целым числом' })
})

export const AddSkin = ({ case_id }: { case_id: number }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			case_id
		}
	})
	const { mutate, isPending } = useAddSkin()

	async function onSubmit(data: z.infer<typeof formSchema>) {
		mutate(data)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='inline-flex items-start gap-1'>
				<FormField
					control={form.control}
					name='skin_id'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='id скина'
									type='number'
									{...field}
									onChange={e => {
										// Преобразуем значение в число и вызываем field.onChange
										const value = e.target.value ? Number(e.target.value) : null // null или 0, в зависимости от логики
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
					name='chance'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Шанс выпадения'
									type='number'
									{...field}
									onChange={e => {
										// Преобразуем значение в число и вызываем field.onChange
										const value = e.target.value ? Number(e.target.value) : null // null или 0, в зависимости от логики
										field.onChange(value)
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isPending} size={'icon'} type='submit'>
					<Loading isShow={isPending} />
					{!isPending && <PlusIcon />}
				</Button>
			</form>
		</Form>
	)
}
