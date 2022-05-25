import {AppShell, ColorScheme, ColorSchemeProvider, MantineProvider, useMantineTheme} from '@mantine/core'
import {useColorScheme, useHotkeys, useLocalStorage} from '@mantine/hooks'
import {NotificationsProvider, showNotification} from '@mantine/notifications'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {HolidayService} from '../../services'
import {appState} from '../../store'
import {AppPreloader} from '../AppPreloader/AppPreloader'
import {Aside} from '../Aside'
import {Header} from '../Header'
import {Navbar} from '../Navbar'
import {Routes} from '../Routes'

export const App: FC = observer(() => {
	const preferredColorScheme = useColorScheme()
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'color-scheme',
		defaultValue: preferredColorScheme,
		getInitialValueInEffect: true,
	})
	const [isNavbarOpen, setIsNavbarOpen] = useState(false)
	const [isAsideOpen, setIsAsideOpen] = useState(false)
	const theme = useMantineTheme()

	const toggleColorScheme = (value?: ColorScheme) => {
		if (value) {
			setColorScheme(value)
		} else {
			setColorScheme(prev => prev === 'dark' ? 'light' : 'dark')
		}
	}

	const toggleNavbar = () => {
		setIsNavbarOpen(prev => !prev)
	}

	const closeNavbar = () => {
		setIsNavbarOpen(false)
	}

	const closeAside = () => {
		setIsAsideOpen(false)
	}

	useHotkeys([['mod+J', () => toggleColorScheme()]])

	useEffect(() => {
		(async () => {
			await appState.initializeApp()
			const {results: holidays} = await HolidayService.getHoliday()
			if (holidays.length) {
				showNotification({
					title: 'Сегодня празднуют',
					message: holidays.map(({uuid, name}) => (
						<div key={uuid}>
							{name}
						</div>
					)),
					color: 'blue',
				})
			}
		})()
	}, [])

	if (!appState.initialized) {
		return <AppPreloader/>
	}

	return (
		<BrowserRouter>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider theme={{colorScheme}} withCSSVariables withNormalizeCSS>
					<NotificationsProvider>
						<AppShell
							fixed
							navbarOffsetBreakpoint='sm'
							asideOffsetBreakpoint='sm'
							header={
								<Header toggleColorScheme={toggleColorScheme} isNavbarOpen={isNavbarOpen}
									toggleNavbar={toggleNavbar}
								/>}
							navbar={<Navbar isOpen={isNavbarOpen} closeNavbar={closeNavbar}/>}
							aside={<Aside isOpen={isAsideOpen} closeNavbar={closeAside}/>}
							padding={0}
							style={{background: theme.colors.gray[2]}}
						>
							<Routes/>
						</AppShell>
					</NotificationsProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</BrowserRouter>
	)
})

// todo:
//  поменять страницы ошибок
//  захэндлить кейс, когда постов нет, показывать No Posts
