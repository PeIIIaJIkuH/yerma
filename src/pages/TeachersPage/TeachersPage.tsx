import {FC} from 'react'
import {Posts} from '../../components'
import {PostCategoryEnum} from '../../types'

export const TeachersPage: FC = () => {
	return (
		<Posts category={PostCategoryEnum.TEACHERS}/>
	)
}
