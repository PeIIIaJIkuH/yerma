import {Image} from '@mantine/core'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import careerBg from '../../assets/images/career-bg.jpg'
import {Posts} from '../../components'
import {PostCategoryEnum} from '../../types'

export const CareerPage: FC = observer(() => {
	return (
		<>
			<Image src={careerBg} alt='фон' mx='-md' mt='-md'/>
			<Posts category={PostCategoryEnum.CAREER}/>
		</>
	)
})
