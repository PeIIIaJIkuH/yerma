import {Aside as MantineAside, ScrollArea, useMantineTheme} from '@mantine/core'
import {useMediaQuery} from '@mantine/hooks'
import clsx from 'clsx'
import {FC} from 'react'
import {privateRoutes} from '../../routes'
import {ButtonLink} from '../ButtonLink'
import s from './Aside.module.css'

interface Props {
	isOpen: boolean
	closeNavbar: () => void
}

export const Aside: FC<Props> = ({isOpen, closeNavbar}) => {
	const theme = useMantineTheme()
	const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
	const isDark = theme.colorScheme === 'dark'

	return (
		<MantineAside
			hidden={!isOpen}
			hiddenBreakpoint='sm'
			width={{sm: 200}}
			className={clsx(s.aside, isDark ? s.dark : s.light, isTablet && s.tabletAside)}
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
				<ButtonLink path={privateRoutes.calendar.path} fullWidth callback={closeNavbar} disabled>
					Памятный календарь
				</ButtonLink>
				<ButtonLink path={privateRoutes.memory.path} fullWidth callback={closeNavbar} disabled>
					Memory
				</ButtonLink>
			</MantineAside.Section>
		</MantineAside>
	)
}
