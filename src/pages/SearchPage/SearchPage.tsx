import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {useSearchParams} from 'react-router-dom'
import {Posts} from '../../components'

export const SearchPage: FC = observer(() => {
	const query = useSearchParams()[0].get('query')
	// todo: добавить not found если query пустой

	return (
		<Posts query={query}/>
	)
})
