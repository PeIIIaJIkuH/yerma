import {AppShell, MantineProvider, useMantineTheme} from '@mantine/core'
import {NotificationsProvider} from '@mantine/notifications'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useHolidays} from '../../hooks/useHolidays'
import {appState, authState} from '../../store'
import {AppPreloader} from '../AppPreloader/AppPreloader'
import {Aside} from '../Aside'
import {Header} from '../Header'
import {Navbar} from '../Navbar'
import {Routes} from '../Routes'

export const App: FC = observer(() => {
	const [isNavbarOpen, setIsNavbarOpen] = useState(false)
	const [isAsideOpen, setIsAsideOpen] = useState(false)
	const theme = useMantineTheme()

	const toggleNavbar = () => {
		setIsNavbarOpen(prev => !prev)
	}

	const closeNavbar = () => {
		setIsNavbarOpen(false)
	}

	const closeAside = () => {
		setIsAsideOpen(false)
	}

	useEffect(() => {
		(async () => {
			await appState.initializeApp()
		})()
	}, [])

	useHolidays(!!authState.user)

	if (!appState.initialized) {
		return <AppPreloader/>
	}

	return (
		<BrowserRouter>
			<MantineProvider withCSSVariables withNormalizeCSS>
				<NotificationsProvider>
					<AppShell
						fixed
						navbarOffsetBreakpoint='sm'
						asideOffsetBreakpoint='sm'
						header={<Header isNavbarOpen={isNavbarOpen} toggleNavbar={toggleNavbar}/>}
						navbar={<Navbar isOpen={isNavbarOpen} closeNavbar={closeNavbar}/>}
						aside={<Aside isOpen={isAsideOpen} closeNavbar={closeAside}/>}
						padding={0}
						style={{background: theme.colors.gray[2]}}
					>
						<Routes/>
					</AppShell>
				</NotificationsProvider>
			</MantineProvider>
		</BrowserRouter>
	)
})
