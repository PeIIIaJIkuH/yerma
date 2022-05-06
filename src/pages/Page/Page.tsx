import {useDocumentTitle} from '@mantine/hooks'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {Navigate} from 'react-router-dom'
import {publicRoutes} from '../../routes'
import {authState} from '../../store'

interface Props {
	title: string
	Component: FC
	withAuth?: boolean
}

export const Page: FC<Props> = observer(({title, Component, withAuth}) => {
	useDocumentTitle(`${title} | ВГПУ`)

	if (withAuth && !authState.user) {
		// return <ErrorPage code={403} text='Вы не авторизованы'/>
		return <Navigate to={publicRoutes.auth.path}/>
	}

	return (
		<Component/>
	)
})
