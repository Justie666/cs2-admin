import { CreateGun } from './CreateGun'
import { UpdateGun } from './UpdateGun'

export const GunItem = ({ gun }: { gun: Gun }) => {
	return (
		<div className='rounded border p-3'>
			<div>
				{gun.id} - {gun.name}
			</div>
			{gun.children && gun.children.length > 0 && (
				<div className='ml-3 flex flex-col gap-1 mt-3'>
					{gun.children.map(gun => (
						<GunItem gun={gun} key={gun.id} />
					))}
				</div>
			)}
			<div className='flex gap-2'>
				<CreateGun parent_id={gun.id} />
				<UpdateGun gun={gun} />
			</div>
		</div>
	)
}
