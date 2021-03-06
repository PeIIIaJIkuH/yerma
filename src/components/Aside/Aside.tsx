import {Aside as MantineAside, ScrollArea, useMantineTheme} from '@mantine/core'
import {useMediaQuery} from '@mantine/hooks'
import clsx from 'clsx'
import {FC} from 'react'
import {adminRoutes, privateRoutes} from '../../routes'
import {authState} from '../../store'
import {ButtonLink} from '../ButtonLink'
import s from './Aside.module.css'

interface Props {
	isOpen: boolean
	closeNavbar: () => void
}

export const Aside: FC<Props> = ({isOpen, closeNavbar}) => {
	const theme = useMantineTheme()
	const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

	return (
		<MantineAside
			hidden={!isOpen}
			hiddenBreakpoint='sm'
			width={{sm: 200}}
			className={clsx(s.aside, isTablet && s.tabletAside)}
			style={{background: theme.colors.gray[0]}}
		>
			<MantineAside.Section grow component={ScrollArea}>
				<ButtonLink path={privateRoutes.leisure.path} fullWidth callback={closeNavbar}>
					Досуг
				</ButtonLink>
				<ButtonLink path={privateRoutes.tales.path} fullWidth callback={closeNavbar}>
					Студенческие байки
				</ButtonLink>
				<ButtonLink path={privateRoutes.gallery.path} fullWidth callback={closeNavbar}>
					Фото-видео-галерея
				</ButtonLink>
				<ButtonLink path={privateRoutes.muz.path} fullWidth callback={closeNavbar}>
					“9 Муз”
				</ButtonLink>
				<ButtonLink path={privateRoutes.memory.path} fullWidth callback={closeNavbar}>
					Memory
				</ButtonLink>
				{authState.user?.is_superuser && (
					<ButtonLink path={adminRoutes.unverified.path} fullWidth callback={closeNavbar}>
						Посты для проверки
					</ButtonLink>
				)}
			</MantineAside.Section>
		</MantineAside>
	)
}
