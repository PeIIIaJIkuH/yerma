import {AppShell, ColorScheme, ColorSchemeProvider, Container, MantineProvider, Paper} from '@mantine/core'
import {useColorScheme, useHotkeys, useLocalStorage} from '@mantine/hooks'
import {NotificationsProvider} from '@mantine/notifications'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {appState} from '../../store'
import {AppPreloader} from '../AppPreloader/AppPreloader'
import {Aside} from '../Aside'
import {Header} from '../Header'
import {Navbar} from '../Navbar'
import {Routes} from '../Routes'
import s from './App.module.css'

export const App: FC = observer(() => {
	const preferredColorScheme = useColorScheme()
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'color-scheme',
		defaultValue: preferredColorScheme,
		getInitialValueInEffect: true,
	})
	const [isNavbarOpen, setIsNavbarOpen] = useState(false)
	const [isAsideOpen, setIsAsideOpen] = useState(false)

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
						<Paper radius={0} className={s.paper}>
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
							>
								<Container p={0} sx={{height: '90%', position: 'relative', width: '100%'}}>
									<meta name='theme-color'
										content={colorScheme === 'light' ? '#fff' : '#1a1b1e'}
									/>
									<Routes/>
								</Container>
							</AppShell>
						</Paper>
					</NotificationsProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</BrowserRouter>
	)
})

// todo:
//  заполнить страницы с людьми: добавить в них карточки названием группы в заголовке и членами группы, как список снизу
//  поменять страницы ошибок
