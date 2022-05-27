import {useDocumentTitle} from '@mantine/hooks'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {Navigate} from 'react-router-dom'
import {ErrorPage} from '..'
import {publicRoutes} from '../../routes'
import {authState} from '../../store'

interface Props {
	title: string
	Component: FC
	withAuth?: boolean
	admin?: boolean
}

export const Page: FC<Props> = observer(({title, Component, withAuth, admin}) => {
	useDocumentTitle(`${title} | ВГПУ`)

	if (admin && authState.user && !authState.user.is_superuser) {
		return <ErrorPage code={403} title='Нет доступа к этой странице'/>
	}

	if (withAuth && !authState.user) {
		return <Navigate to={publicRoutes.auth.path}/>
	}

	return (
		<Component/>
	)
})
