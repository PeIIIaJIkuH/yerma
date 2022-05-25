import {Image} from '@mantine/core'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import muzeBg from '../../assets/images/9muz-bg.jpg'
import {Posts} from '../../components'
import {PostCategoryEnum} from '../../types'

export const MuzPage: FC = observer(() => {
	return (
		<>
			<Image src={muzeBg} alt='фон' mx='-md' mt='-md'/>
			<Posts category={PostCategoryEnum.MUSE}/>
		</>
	)
})
