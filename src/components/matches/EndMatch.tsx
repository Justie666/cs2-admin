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
	Checkbox
} from '../ui'
import { useEndEvent } from '@/api/hooks/eventHooks'

const formSchema = z.object({
	event_id: z.number(),
	won: z.number({
		message: 'Это поле обязательно'
	}),
	won_first_map: z.number({
		message: 'Это поле обязательно'
	}),
	won_second_map: z.number({
		message: 'Это поле обязательно'
	}),
	dry_bill: z.boolean().default(false),
	knife: z.boolean().default(false)
})

interface EndMatchProps {
	event_id: number
	teams: Teams[]
}

export const EndMatch = ({ event_id, teams }: EndMatchProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			event_id
		}
	})
	const { mutate, isPending } = useEndEvent()

	const teamsArray = teams.map(team => team.team)

	function onSubmit(data: z.infer<typeof formSchema>) {
		mutate(data)
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Button variant={'outline'}>Завершить матч</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Завершить матч</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='won'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Победитель</FormLabel>
									<FormControl>
										<Select
											onValueChange={value => field.onChange(Number(value))}
											value={
												field.value !== undefined ? field.value.toString() : ''
											}>
											<SelectTrigger>
												<SelectValue placeholder='Выберите команду' />
											</SelectTrigger>
											<SelectContent>
												{teamsArray?.map(team => (
													<SelectItem key={team.id} value={team.id.toString()}>
														{team.name}
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
							name='won_first_map'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Победитель 1 карты</FormLabel>
									<FormControl>
										<Select
											onValueChange={value => field.onChange(Number(value))}
											value={
												field.value !== undefined ? field.value.toString() : ''
											}>
											<SelectTrigger>
												<SelectValue placeholder='Выберите команду' />
											</SelectTrigger>
											<SelectContent>
												{teamsArray?.map(team => (
													<SelectItem key={team.id} value={team.id.toString()}>
														{team.name}
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
							name='won_second_map'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Победитель 2 карты</FormLabel>
									<FormControl>
										<Select
											onValueChange={value => field.onChange(Number(value))}
											value={
												field.value !== undefined ? field.value.toString() : ''
											}>
											<SelectTrigger>
												<SelectValue placeholder='Выберите команду' />
											</SelectTrigger>
											<SelectContent>
												{teamsArray?.map(team => (
													<SelectItem key={team.id} value={team.id.toString()}>
														{team.name}
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
							name='dry_bill'
							render={({ field }) => (
								<FormItem className='flex items-center gap-2 space-y-0'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel>Сухой счёт</FormLabel>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='knife'
							render={({ field }) => (
								<FormItem className='flex items-center gap-2 space-y-0'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel>Был ли нож</FormLabel>
								</FormItem>
							)}
						/>
						<Button disabled={isPending} className='w-full' type='submit'>
							<Loading isShow={isPending} />
							Завершить
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
