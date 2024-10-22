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
	SelectValue
} from '../ui'
import { useCreateEvent } from '@/api/hooks/eventHooks'
import { useGetTeams } from '@/api/hooks/teamHooks'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { toast } from 'sonner'

const formSchema = z.object({
	date_start: z.date({
		message: 'Это поле обязательно'
	}),
	team_one_id: z.number({
		message: 'Это поле обязательно'
	}),
	team_two_id: z.number({
		message: 'Это поле обязательно'
	})
})

export const CreateMatch = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			date_start: new Date()
		}
	})
	const { mutate, isPending } = useCreateEvent()
	const { data: teams } = useGetTeams()

	function handleDateSelect(date: Date | undefined) {
		if (date) {
			form.setValue('date_start', date)
		}
	}

	function handleTimeChange(type: 'hour' | 'minute', value: string) {
		const currentDate = form.getValues('date_start') || new Date()
		const newDate = new Date(currentDate)

		if (type === 'hour') {
			const hour = parseInt(value, 10)
			newDate.setHours(hour)
		} else if (type === 'minute') {
			newDate.setMinutes(parseInt(value, 10))
		}

		form.setValue('date_start', newDate)
	}

	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data)

		if (data.team_one_id === data.team_two_id) {
			toast.error('Команды не могут совпадать')
			return
		}

		const today = new Date()
		if (data.date_start < today) {
			toast.error('Дата не может быть задним числом') // Show error if date is in the past
			return
		}
		const userTimezoneOffset = today.getTimezoneOffset() * 60 * 1000
		const selectedDateUTC = new Date(
			data.date_start.getTime() + userTimezoneOffset
		)

		const formattedDate = selectedDateUTC.toISOString().replace(/\.000Z$/, '')

		mutate({ ...data, date_start: formattedDate })
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
							name='date_start'
							render={({ field }) => (
								<FormItem>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-full pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}>
													{field.value ? (
														format(field.value, 'MM/dd/yyyy HH:mm')
													) : (
														<span>MM/DD/YYYY HH:mm</span>
													)}
													<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0'>
											<div className='sm:flex'>
												<Calendar
													mode='single'
													selected={field.value}
													onSelect={handleDateSelect} // Update the date field
													initialFocus
												/>
												<div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
													<ScrollArea className='w-64 sm:w-auto'>
														<div className='flex sm:flex-col p-2'>
															{Array.from({ length: 24 }, (_, i) => i)
																.reverse()
																.map(hour => (
																	<Button
																		key={hour}
																		size='icon'
																		variant={
																			field.value &&
																			field.value.getHours() === hour
																				? 'default'
																				: 'ghost'
																		}
																		className='sm:w-full shrink-0 aspect-square'
																		onClick={() =>
																			handleTimeChange('hour', hour.toString())
																		}>
																		{hour}
																	</Button>
																))}
														</div>
														<ScrollBar
															orientation='horizontal'
															className='sm:hidden'
														/>
													</ScrollArea>
													<ScrollArea className='w-64 sm:w-auto'>
														<div className='flex sm:flex-col p-2'>
															{Array.from({ length: 12 }, (_, i) => i * 5).map(
																minute => (
																	<Button
																		key={minute}
																		size='icon'
																		variant={
																			field.value &&
																			field.value.getMinutes() === minute
																				? 'default'
																				: 'ghost'
																		}
																		className='sm:w-full shrink-0 aspect-square'
																		onClick={() =>
																			handleTimeChange(
																				'minute',
																				minute.toString()
																			)
																		}>
																		{minute.toString().padStart(2, '0')}
																	</Button>
																)
															)}
														</div>
														<ScrollBar
															orientation='horizontal'
															className='sm:hidden'
														/>
													</ScrollArea>
												</div>
											</div>
										</PopoverContent>
									</Popover>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='team_one_id'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Команда 1</FormLabel>
									<FormControl>
										<Select
											onValueChange={value => field.onChange(Number(value))} // Convert string to number
											value={
												field.value !== undefined ? field.value.toString() : ''
											} // Ensure value is a string for display
										>
											<SelectTrigger>
												<SelectValue placeholder='Выберите команду' />
											</SelectTrigger>
											<SelectContent>
												{teams?.map(team => (
													<SelectItem key={team.id} value={team.id.toString()}>
														{' '}
														{/* Ensure id is string for SelectItem */}
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
							name='team_two_id'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Команда 2</FormLabel>
									<FormControl>
										<Select
											onValueChange={value => field.onChange(Number(value))} // Convert string to number
											value={
												field.value !== undefined ? field.value.toString() : ''
											} // Ensure value is a string for display
										>
											<SelectTrigger>
												<SelectValue placeholder='Выберите команду' />
											</SelectTrigger>
											<SelectContent>
												{teams?.map(team => (
													<SelectItem key={team.id} value={team.id.toString()}>
														{' '}
														{/* Ensure id is string for SelectItem */}
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
