import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'

const LINKS: { title: string; href: string }[] = [
	{
		href: '/main/category',
		title: 'Категории'
	},
	{
		href: '/main/dispute',
		title: 'Споры'
	},
	{
		href: '/main/finance',
		title: 'Финансовая статистика'
	},
	{
		href: '/main/statistics',
		title: 'Статистика'
	},
	{
		href: '/main/admins',
		title: 'Админы'
	},
	{
		href: '/main/users',
		title: 'Пользователи'
	},
	{
		href: '/main/matches',
		title: 'Матчи'
	},
	{
		href: '/main/skins',
		title: 'Скины'
	}
]

export const Nav = () => {
	const { pathname } = useLocation()

	const isActive = (href: string) => {
		return pathname.includes(href)
	}

	return (
		<div className='p-5'>
			<div>
				<div>logo</div>
				<div>Сделано в mirry-code</div>
			</div>
			<div className='flex flex-col gap-2 mt-5'>
				{LINKS.map(link => (
					<Button
						key={link.href}
						size={'sm'}
						variant={isActive(link.href) ? 'default' : 'outline'}
						className='justify-start'
						asChild>
						<Link to={link.href}>{link.title}</Link>
					</Button>
				))}
			</div>
		</div>
	)
}
