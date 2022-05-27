import {Button, Card, Divider, Group, Text} from '@mantine/core'
import {FC} from 'react'
import {postsState} from '../../store'
import {IPost, PostCategoryLabels} from '../../types'
import {Slider} from '../Slider'

interface Props {
	post: IPost
	unverified?: boolean
}

export const PostCard: FC<Props> = ({post, unverified}) => {
	const {name, description, images, author, category, uuid} = post

	const approvePost = async () => {
		await postsState.approvePost(uuid)
	}

	const deletePost = async () => {
		await postsState.deletePost(uuid)
	}

	return (
		<Card shadow='sm' p='xl'>
			{images && (
				<Card.Section>
					<Slider images={images.map(img => img.image)}/>
				</Card.Section>
			)}
			<Text weight={500} size='lg' mt='sm'>
				{name}
			</Text>
			{author && (
				<Text>
					Автор: {author}
				</Text>
			)}
			{unverified && category && (
				<Text>
					Категория: {PostCategoryLabels[category]}
				</Text>
			)}
			<Text size='sm' dangerouslySetInnerHTML={{__html: description}}/>
			{unverified && (
				<Card.Section>
					<Divider/>
					<Group position='apart' p='md'>
						<Button color='red' onClick={deletePost}>
							Удалить
						</Button>
						<Button color='green' onClick={approvePost}>
							Одобрить
						</Button>
					</Group>
				</Card.Section>
			)}
		</Card>
	)
}
