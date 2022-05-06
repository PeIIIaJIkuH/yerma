import {Group, Title} from '@mantine/core'
import {FC} from 'react'

interface Props {
	code: 403 | 404
	text: string
}

export const ErrorPage: FC<Props> = ({code, text}) => {
	return (
		<Group direction='column' position='center'>
			<Title order={2} color='gray'>
				Ошибка {code}
			</Title>
			<Title order={3} color='gray'>
				<div>{text}</div>
			</Title>
		</Group>
	)
}
