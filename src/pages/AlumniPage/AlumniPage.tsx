import {FC} from 'react'
import {Posts} from '../../components'
import {PostCategoryEnum} from '../../types'

export const AlumniPage: FC = () => {
	return (
		<Posts category={PostCategoryEnum.ALUMNI}/>
	)
}
