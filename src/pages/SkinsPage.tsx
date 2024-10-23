import { useGetGuns } from '@/api/hooks/gunHooks'
import { useGetSkins } from '@/api/hooks/skinHooks'
import { CreateGun } from '@/components/guns/CreateGun'
import { GunItem } from '@/components/guns/GunItem'
import { CreateSkin, renderGuns } from '@/components/skins/CreateSkin'
import { UpdateSkin } from '@/components/skins/UpdateSkin'
import {
	Input,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui'
import { QUALITY, RARITY } from '@/const'
import { useIntersectionObserver } from '@siberiacancode/reactuse'
import { useEffect, useState } from 'react'

function findGunNameById(guns: Gun[], id: number): string {
	for (const gun of guns) {
		if (gun.id === id) {
			return gun.name
		}
		if (gun.children.length > 0) {
			const childName = findGunNameById(gun.children, id)
			if (childName) {
				return childName
			}
		}
	}
	return '' // Если оружие не найдено
}

const QUALITY2: { value: string | null; title: string }[] = [
	{ value: 'null', title: 'Качество' },
	{ value: 'FN', title: 'Прямо с завода' },
	{ value: 'MW', title: 'Немного поношенное' },
	{ value: 'FT', title: 'После полевых испытаний' },
	{ value: 'WW', title: 'Поношенное' },
	{ value: 'BS', title: 'Закалённый в боях' }
]

const RARITY2: { value: string | null; title: string }[] = [
	{ value: 'null', title: 'Редкость' },
	{ value: 'CO', title: 'Крайне редкое' },
	{ value: 'SE', title: 'Тайное' },
	{ value: 'CL', title: 'Засекреченное' },
	{ value: 'PR', title: 'Запрещенное' },
	{ value: 'AQ', title: 'Армейское' },
	{ value: 'IQ', title: 'Промышленное' },
	{ value: 'CG', title: 'Ширпотреб' }
]

const limit = 25

export const SkinsPage = () => {
	const [selectedTab, setSelectedTab] = useState('guns')
	const [selectedQuality, setSelectedQuality] = useState<string>('null')
	const [selectedRarity, setSelectedRarity] = useState<string>('null')
	const [selectedGun, setSelectedGun] = useState<number | null>(null)
	const [searchValue, setSearchValue] = useState<string>('')
	const [sortedValue, setSortedValue] = useState<Sorting>('popular')
	const [offset, setOffset] = useState(0)
	const [skins, setSkins] = useState<Skin[]>([])

	const { data: guns } = useGetGuns()

	useEffect(() => {
		const savedTab = localStorage.getItem('selectedTabSkins')
		if (savedTab) {
			setSelectedTab(savedTab)
		}
	}, [])

	const { data: skinsQuery } = useGetSkins({
		limit: limit,
		offset: offset,
		gun_id: selectedGun === 0 ? null : selectedGun,
		quality: selectedQuality === 'null' ? null : (selectedQuality as Quality),
		rarity: selectedRarity === 'null' ? null : (selectedRarity as Rarity),
		sorting: sortedValue,
		name: searchValue
	})

	useEffect(() => {
		setSkins([])
		setOffset(0)
	}, [selectedGun, selectedQuality, selectedRarity, sortedValue, searchValue])

	useEffect(() => {
		if (skinsQuery) {
			setSkins(prevSkins => [...prevSkins, ...skinsQuery])
		}
	}, [skinsQuery])

	const handleTabChange = (value: string) => {
		setSelectedTab(value)
		localStorage.setItem('selectedTabSkins', value)
	}

	const { ref: observerRef } = useIntersectionObserver<HTMLDivElement>({
		threshold: 1,
		onChange: entry => {
			if (entry.isIntersecting) {
				console.log(31321)

				setOffset(prev => prev + limit)
			}
		}
	})

	return (
		<Tabs
			value={selectedTab}
			onValueChange={handleTabChange}
			className='w-full'>
			<TabsList>
				<TabsTrigger value='guns'>Оружия</TabsTrigger>
				<TabsTrigger value='skins'>Скины</TabsTrigger>
			</TabsList>
			<TabsContent value='guns'>
				<div className='mb-3'>
					<CreateGun parent_id={null} />
				</div>

				<div className='flex flex-col gap-2'>
					{guns?.map(gun => (
						<GunItem key={gun.id} gun={gun} />
					))}
				</div>
			</TabsContent>
			<TabsContent value='skins'>
				<CreateSkin />

				<Input
					className='w-full mt-5'
					placeholder='Поиск'
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
				/>

				<div className='my-3'>
					<div>
						<div className='flex gap-3 mt-4'>
							<div>
								<Select
									value={selectedQuality}
									onValueChange={value => setSelectedQuality(value)}>
									<SelectTrigger className='w-[180px]'>
										<SelectValue placeholder='Качество' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{QUALITY2.map(quality => (
												<SelectItem
													key={quality.value}
													value={quality.value || 'По умолчанию'}>
													{quality.title}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div>
								<Select
									value={selectedRarity}
									onValueChange={value => setSelectedRarity(value)}>
									<SelectTrigger className='w-[180px]'>
										<SelectValue placeholder='Редкость' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{RARITY2.map(rarity => (
												<SelectItem
													key={rarity.value}
													value={rarity.value || 'По умолчанию'}>
													{rarity.title}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div>
								{guns && (
									<Select
										onValueChange={value => setSelectedGun(Number(value))}
										value={selectedGun !== null ? selectedGun.toString() : ''} // Преобразуем в строку
									>
										<SelectTrigger>
											<SelectValue placeholder='Выберите тип оружия' />
										</SelectTrigger>
										<SelectContent>{renderGuns(guns)}</SelectContent>
									</Select>
								)}
							</div>
						</div>
					</div>
					<div className='mt-3 flex gap-2'>
						<div
							className={`text-[15px] font-medium cursor-pointer ${
								sortedValue === 'popular' && 'text-primary'
							}`}
							onClick={() => setSortedValue('popular')}>
							По умолчанию
						</div>
						<div
							className={`text-[15px] font-medium cursor-pointer ${
								sortedValue === 'cheaper' && 'text-primary'
							}`}
							onClick={() => setSortedValue('cheaper')}>
							Дешевле
						</div>
						<div
							className={`text-[15px] font-medium cursor-pointer ${
								sortedValue === 'dearly' && 'text-primary'
							}`}
							onClick={() => setSortedValue('dearly')}>
							Дороже
						</div>
					</div>
				</div>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Id</TableHead>
							<TableHead>Название</TableHead>
							<TableHead>Картинка</TableHead>
							<TableHead>Информация</TableHead>
							<TableHead className='text-right'>Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{skins.map(skin => (
							<TableRow key={skin.id}>
								<TableCell className='font-medium'>{skin.id}</TableCell>
								<TableCell className='font-medium'>{skin.name}</TableCell>
								<TableCell className='font-medium'>
									<img
										src={skin.image_url}
										alt=''
										className='h-[200px] object-cover'
									/>
								</TableCell>
								<TableCell>
									<div>Цена - {skin.price} $</div>
									<div>
										Качество -{' '}
										{QUALITY.find(q => q.key === skin.quality)?.value}
									</div>
									<div>
										{' '}
										Редкость - {RARITY.find(q => q.key === skin.rarity)?.value}
									</div>
									<div>Активен - {skin.active ? 'Да' : 'Нет'}</div>
									{guns && (
										<div> Оружие - {findGunNameById(guns, skin.gun_id)}</div>
									)}
								</TableCell>
								<TableCell>
									<UpdateSkin skinData={skin} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					{skinsQuery && <div ref={observerRef}>dsadas</div>}
				</Table>
			</TabsContent>
		</Tabs>
	)
}
