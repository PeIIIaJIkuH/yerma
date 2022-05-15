import {FC} from 'react'
import {Posts} from '../../components'
import {PostCategoryEnum} from '../../types'

export const MemoryPage: FC = () => {
	return (
		<Posts category={PostCategoryEnum.MEMORY}/>
	)
}
