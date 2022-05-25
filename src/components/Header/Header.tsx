import {
	ActionIcon,
	Burger,
	Button,
	ColorScheme,
	Group,
	Header as MantineHeader,
	Modal,
	Popover,
	Text,
	TextInput,
	useMantineTheme,
} from '@mantine/core'
import {useForm, useMediaQuery} from '@mantine/hooks'
import {showNotification} from '@mantine/notifications'
import clsx from 'clsx'
import {observer} from 'mobx-react-lite'
import {FC, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Login, Plus, Search, User} from 'tabler-icons-react'
import {privateRoutes, publicRoutes} from '../../routes'
import {authState} from '../../store'
import {ISearch} from '../../types'
import {ButtonLink} from '../ButtonLink'
import {DarkModeButton} from '../DarkModeButton'
import s from './Header.module.css'

interface Props {
	toggleColorScheme: (value?: ColorScheme) => void
	isNavbarOpen: boolean
	toggleNavbar: () => void
}

export const Header: FC<Props> = observer(({toggleColorScheme, isNavbarOpen, toggleNavbar}) => {
	const theme = useMantineTheme()
	const navigate = useNavigate()
	const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
	const isSmallDesktop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	const ref = useRef<HTMLInputElement>(null)
	const form = useForm<ISearch>({
		initialValues: {
			query: '',
		},
	})

	const onBurgerClick = () => {
		toggleNavbar()
	}

	const onModalClose = () => {
		setIsModalOpen(false)
	}

	const onSearchClick = () => {
		setIsModalOpen(true)
	}

	const onCreateClick = () => {
		navigate('/create')
	}

	const onPopoverButtonClick = () => {
		setIsPopoverOpen(prev => !prev)
	}

	const onPopoverClose = () => {
		setIsPopoverOpen(false)
	}

	const onLogout = () => {
		authState.logout()
		showNotification({
			message: 'Произведён выход из аккаунта',
			color: 'green',
		})
	}

	const onSubmit = form.onSubmit(({query}) => {
		if (query) {
			navigate({
				pathname: privateRoutes.search.path,
				search: `?query=${query}`,
			})
			form.setValues({
				query: '',
			})
			ref.current?.blur()
		}
	})

	return (
		<MantineHeader height={70} py='md' px={isTablet ? 'xs' : 'md'} style={{background: theme.colors.gray[0]}}>
			<Group position='apart'>
				{isTablet ? (
					<Burger opened={isNavbarOpen} onClick={onBurgerClick} size={26} color='gray'/>
				) : (
					<ButtonLink path={privateRoutes.main.path} px={0} className={s.logoWrapper}
					>
						<Group align='center'>
							<Text>ВГПУ</Text>
							<Text>|</Text>
							<Text size='lg'>Vinnitsa.kz</Text>
						</Group>
					</ButtonLink>
				)}
				<Group>
					{authState.user && (isSmallDesktop ? (
						<ActionIcon size={36} variant='outline' onClick={onCreateClick}>
							<Plus size={18}/>
						</ActionIcon>
					) : (
						<ButtonLink path={privateRoutes.create.path} variant='outline' size={isTablet ? 'sm' : 'md'}
							className={clsx(s.button, s.addButton)}
						>
							Добавить пост
						</ButtonLink>
					))}
					{authState.user && (
						<form onSubmit={onSubmit}>
							{isTablet ? (
								<>
									<ActionIcon size={36} title='Поиск' variant='default' onClick={onSearchClick}>
										<Search size={18}/>
									</ActionIcon>
									<Modal opened={isModalOpen} onClose={onModalClose} withCloseButton={false}>
										<TextInput
											placeholder='Поиск' {...form.getInputProps('query')}
											icon={<Search size={18}/>} ref={ref}
										/>
									</Modal>
								</>
							) : (
								<TextInput
									placeholder='Поиск' icon={<Search size={18}/>} ref={ref}
									sx={{flexShrink: 1}} {...form.getInputProps('query')}
								/>
							)}
						</form>
					)}
					{authState.user ? (
						<Popover opened={isPopoverOpen} position='bottom' onClose={onPopoverClose}
							target={isTablet ? (
								<ActionIcon size={36} title='Профиль' variant='default' onClick={onPopoverButtonClick}>
									<User size={18}/>
								</ActionIcon>
							) : (
								<Button onClick={onPopoverButtonClick} variant='light'>
									{authState.user.email}
								</Button>
							)}
						>
							<Button color='red' onClick={onLogout} fullWidth variant='subtle'>
								Выйти
							</Button>
						</Popover>
					) : (
						<ButtonLink path={publicRoutes.auth.path} variant='light' size={isTablet ? 'sm' : 'md'}
							className={s.button}
							rightIcon={<Login size={18}/>}
						>
							Войти
						</ButtonLink>
					)}
					<DarkModeButton toggle={toggleColorScheme}/>
				</Group>
			</Group>
		</MantineHeader>
	)
})
