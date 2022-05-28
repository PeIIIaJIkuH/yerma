import {Button, useMantineTheme} from '@mantine/core'
import {SharedButtonProps} from '@mantine/core/lib/components/Button/Button'
import {useMediaQuery} from '@mantine/hooks'
import clsx from 'clsx'
import {FC} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {privateRoutes, publicRoutes} from '../../routes'
import s from './ButtonLink.module.css'

interface Props extends SharedButtonProps {
	path: string | string[]
	fullWidth?: boolean
	callback?: () => void
}

export const ButtonLink: FC<Props> = ({children, path, fullWidth, callback, ...rest}) => {
	const navigate = useNavigate()
	const {pathname} = useLocation()
	const theme = useMantineTheme()
	const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

	const onClick = () => {
		if (!Array.isArray(path)) {
			navigate(path)
			callback && callback()
		}
	}

	const startsWith = () => {
		if (path === privateRoutes.main.path) {
			return false
		}
		if (path === publicRoutes.auth.path) {
			return true
		}
		if (Array.isArray(path)) {
			return path.some(p => pathname.startsWith(p))
		}
		return pathname.startsWith(path)
	}

	const color = startsWith() ? 'blue' : 'dark'

	return (
		<Button variant='subtle' onClick={onClick} className={clsx(fullWidth && s.fullWidth)} color={color}
			size={isTablet ? 'xl' : 'sm'} {...rest}
		>
			{children}
		</Button>
	)
}
