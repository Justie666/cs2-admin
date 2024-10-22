import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui'

const invoices = [
	{
		invoice: 'INV001',
		paymentStatus: 'Paid',
		totalAmount: '$250.00',
		paymentMethod: 'Credit Card'
	},
	{
		invoice: 'INV002',
		paymentStatus: 'Pending',
		totalAmount: '$150.00',
		paymentMethod: 'PayPal'
	},
	{
		invoice: 'INV003',
		paymentStatus: 'Unpaid',
		totalAmount: '$350.00',
		paymentMethod: 'Bank Transfer'
	},
	{
		invoice: 'INV004',
		paymentStatus: 'Paid',
		totalAmount: '$450.00',
		paymentMethod: 'Credit Card'
	},
	{
		invoice: 'INV005',
		paymentStatus: 'Paid',
		totalAmount: '$550.00',
		paymentMethod: 'PayPal'
	},
	{
		invoice: 'INV006',
		paymentStatus: 'Pending',
		totalAmount: '$200.00',
		paymentMethod: 'Bank Transfer'
	},
	{
		invoice: 'INV007',
		paymentStatus: 'Unpaid',
		totalAmount: '$300.00',
		paymentMethod: 'Credit Card'
	}
]

export const DisputePage = () => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>IDS</TableHead>
					<TableHead>Вопрос</TableHead>
					<TableHead className='text-right'>Ссылка</TableHead>
					<TableHead className='text-right'>Кто прав</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map(invoice => (
					<TableRow key={invoice.invoice}>
						<TableCell className='font-medium'>
							Эксперт: 12321312 <br /> Заказчик: 321321312
						</TableCell>
						<TableCell>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
							consectetur dicta dolorum autem ullam sint rem voluptatum dolorem
							earum dolores? Doloremque veniam, aspernatur expedita quod
							mollitia voluptatem impedit aliquam accusantium!
						</TableCell>
						<TableCell className='text-right'>
							<Button size={'sm'} variant={'link'} asChild>
								<a href={`google.com`} target='_blank'>
									Видео
								</a>
							</Button>
						</TableCell>
						<TableCell className='text-right flex flex-col gap-2'>
							<Button size={'sm'} variant={'outline'}>
								Эксперт
							</Button>
							<Button size={'sm'} variant={'outline'}>
								Заказчик
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
