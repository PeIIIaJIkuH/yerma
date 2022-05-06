import {Card, Text} from '@mantine/core'
import {FC} from 'react'
import {Slider} from '../Slider'

interface Props {
	title: string
	description: string
	images?: string[]
	author?: string
}

export const PostCard: FC<Props> = ({title, description, images, author}) => {
	return (
		<Card shadow='sm' p='xl'>
			{images && (
				<Card.Section>
					<Slider images={images}/>
				</Card.Section>
			)}
			<Text weight={500} size='lg' mt='sm'>
				{title}
			</Text>
			{author && (
				<Text>
					Автор: {author}
				</Text>
			)}
			<Text size='sm' dangerouslySetInnerHTML={{__html: description}}/>
		</Card>
	)
}
