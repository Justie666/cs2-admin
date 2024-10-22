import { LoaderCircle } from 'lucide-react'

interface LoadingProps {
	isShow?: boolean
}

export const Loading = ({ isShow }: LoadingProps) => {
	if (!isShow) return null

	return (
		<div>
			<LoaderCircle className='animate-spin' />
		</div>
	)
}
