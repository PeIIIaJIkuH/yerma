import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {Posts} from '../../components'

export const UnverifiedPostsPage: FC = observer(() => {
	return (
		<Posts unverified/>
	)
})
