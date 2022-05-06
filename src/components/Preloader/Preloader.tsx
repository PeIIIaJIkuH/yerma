import {LoadingOverlay} from '@mantine/core'
import {FC} from 'react'

export const Preloader: FC = () => {
	return (
		<div>
			<LoadingOverlay visible/>
		</div>
	)
}
