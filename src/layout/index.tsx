import { useEffect } from 'react'
import { Nav } from '@/components/Nav'
import { Outlet, useNavigate } from 'react-router-dom'

export const IndexLayout = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('access_token')

		if (!token) {
			navigate('/')
		}
	}, [navigate])

	return (
		<div className='min-h-screen flex divide-x-2'>
			<Nav />
			<div className='flex-grow p-5'>
				<Outlet />
			</div>
		</div>
	)
}
