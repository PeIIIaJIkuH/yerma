import {Image} from '@mantine/core'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import essaysBg from '../../assets/images/essays-bg.jpg'
import {Posts} from '../../components'
import {PostCategoryEnum} from '../../types'

export const EssaysPage: FC = observer(() => {
	return (
		<>
			<Image src={essaysBg} alt='фон' mx='-md' mt='-md' fit='contain'/>
			<Posts category={PostCategoryEnum.ESSAY}/>
		</>
	)
})
