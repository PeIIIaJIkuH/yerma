import {Alert, Button, Grid, Group, LoadingOverlay} from '@mantine/core'
import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import {postsState} from '../../store'
import {PostCategoryEnum} from '../../types'
import {PostCard} from '../PostCard'

interface Props {
	category?: PostCategoryEnum
	query?: string | null
	unverified?: boolean
}

export const Posts: FC<Props> = observer(({category, query, unverified}) => {
	const fetchMore = async () => {
		await postsState.fetchPosts({category, name: query || undefined}, {unverified})
	}

	useEffect(() => {
		(async () => {
			await postsState.fetchPosts({category, name: query || undefined}, {anotherType: true, unverified})
		})()
	}, [category, query, unverified])

	return postsState.posts.length ? (
		<Grid p='md' sx={{position: 'relative', height: postsState.posts.length ? '' : '100%'}}>
			<LoadingOverlay visible={postsState.loading}/>
			{postsState.posts.map((post) => (
				<Grid.Col key={post.uuid}>
					<PostCard post={post} unverified={unverified}/>
				</Grid.Col>
			))}
			{postsState.hasMore && (
				<Grid.Col>
					<Group position='center' mt='md'>
						<Button onClick={fetchMore} loading={postsState.loading}>
							Загрузить ещё
						</Button>
					</Group>
				</Grid.Col>
			)}
		</Grid>
	) : (
		<Alert title='Нет постов' color='gray' m='md'>
			<LoadingOverlay visible={postsState.loading}/>
			<div>
				{query ? (
					'Постов с таким названием не найдено'
				) : (
					'Нет постов с данной категорией'
				)}
			</div>
		</Alert>
	)
})
