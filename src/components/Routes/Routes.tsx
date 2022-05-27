import {observer} from 'mobx-react-lite'
import {FC, Suspense} from 'react'
import {Route, Routes as ReactRouterRoutes} from 'react-router-dom'
import {ErrorPage, Page} from '../../pages'
import {adminRoutes, privateRoutes, publicRoutes} from '../../routes'
import {Preloader} from '../Preloader'

export const Routes: FC = observer(() => {
	return (
		<Suspense fallback={<Preloader/>}>
			<ReactRouterRoutes>
				{Object.values(privateRoutes).map(({path, title, Component}) => (
					<Route key={path} path={path}
						element={
							<Page title={title} Component={Component} withAuth/>
						}
					/>
				))}
				{Object.values(adminRoutes).map(({path, title, Component}) => (
					<Route key={path} path={path}
						element={
							<Page title={title} Component={Component} withAuth admin/>
						}
					/>
				))}
				{Object.values(publicRoutes).map(({path, title, Component}) => (
					<Route key={path} path={path}
						element={
							<Page title={title} Component={Component}/>
						}
					/>
				))}
				<Route path='*' element={<ErrorPage code={404} title='Страница не найдена'/>}/>
			</ReactRouterRoutes>
		</Suspense>
	)
})
