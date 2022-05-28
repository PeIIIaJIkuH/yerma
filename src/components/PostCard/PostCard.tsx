import {Button, Card, Group, Text} from '@mantine/core'
import {RichTextEditor} from '@mantine/rte'
import {FC} from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import {postsState} from '../../store'
import {IPost, PostCategoryLabels} from '../../types'
import s from './PostCard.module.css'


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

	const onChange = () => {
	}

	return (
		<Card shadow='sm' p='xl'>
			{images && (
				<Card.Section>
					<ImageGallery items={images.map(img => ({
						original: img.image,
						thumbnail: img.image,
					}))}
					/>
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
			<RichTextEditor value={description} onChange={onChange} readOnly mx='-md' className={s.editor}
				style={{border: 'none'}}
			/>
			{unverified && (
				<Group position='apart' p='md'>
					<Button color='red' onClick={deletePost}>
						Удалить
					</Button>
					<Button color='green' onClick={approvePost}>
						Одобрить
					</Button>
				</Group>
			)}
		</Card>
	)
}
