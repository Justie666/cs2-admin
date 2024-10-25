import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const LINKS: { title: string; href: string; level: number }[] = [
	{
		href: '/admin/main/DJLSJDLKASJDLKASJDNLKSAN:CLKASJXLKAJLK',
		title: 'Админы',
		level: 3
	},
	{
		href: '/admin/main/SDAMA:XM"SA"K:JI)PURIQWJDKLSADSA',
		title: 'Пользователи',
		level: 3
	},
	{
		href: '/admin/main/XKMSAIOUWQRYNZAXNJKASHDLKSAJDLJIORWQUO',
		title: 'Матчи',
		level: 1
	},
	{
		href: '/admin/main/XASUROIQJDSALKNXASKJD',
		title: 'Выводы скинов',
		level: 1
	},
	{
		href: '/admin/main/XMAOPISJOIEJROINASLKC:JALSKFJKLSA:JD:LK',
		title: 'Скины',
		level: 2
	},
	{
		href: '/admin/main/ZJOIWQREUWQHJDKNBSALKJXSAFLKJLHS',
		title: 'Промокоды',
		level: 2
	},
	{
		href: '/admin/main/MXASKOJDIOJQIORJKSDNACXNZMC',
		title: 'Кейсы',
		level: 3
	},
	{
		href: '/admin/main/ASKRWQPOKDSAM',
		title: 'Api key и Wallet',
		level: 3
	},
	{
		href: '/admin/main/CXZSDFADS',
		title: 'Статистика',
		level: 3
	}
]

export const Nav = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const isActive = (href: string) => {
		return pathname.includes(href)
	}
	const level = +localStorage.getItem('level')!

	const handleLogout = () => {
		localStorage.clear()
		navigate('/')
	}

	return (
		<div className='p-5 min-w-[200px]'>
			<div className='flex flex-col gap-2 mt-5'>
				{LINKS.map(
					link =>
						level >= link.level && (
							<Button
								key={link.href}
								size={'sm'}
								variant={isActive(link.href) ? 'default' : 'outline'}
								className='justify-start'
								asChild>
								<Link to={link.href}>{link.title}</Link>
							</Button>
						)
				)}
				<Button
					variant={'destructive'}
					className='mt-5'
					onClick={() => handleLogout()}>
					Выйти
				</Button>
			</div>
		</div>
	)
}
