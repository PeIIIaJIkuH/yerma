import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {Gaudeamus, Posts} from '../../components'
import {PostCategoryEnum} from '../../types'

export const AlmaMaterPage: FC = observer(() => {
	return (
		<>
			<Gaudeamus/>
			<Posts category={PostCategoryEnum.POST}/>
		</>
	)
})
