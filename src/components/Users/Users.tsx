import {Button, Grid, Group, LoadingOverlay} from '@mantine/core'
import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import {usersState} from '../../store'
import {UserGroupCard} from '../UserGroupCard'

interface Props {
	groupId: string
}

export const Users: FC<Props> = observer(({groupId}) => {
	const fetchMore = async () => {
		// await usersState.fetchUsers(groupId)
	}

	useEffect(() => {
		(async () => {
			await usersState.fetchUsers(groupId, true)
		})()
	}, [groupId])

	return (
		<Grid p='md' sx={{position: 'relative'}}>
			<LoadingOverlay visible={usersState.loading}/>
			{usersState.users.map(({uuid, first_name, last_name}) => (
				<Grid.Col key={uuid}>
					<UserGroupCard/>
				</Grid.Col>
			))}
			{usersState.users.length > 0 && usersState.hasMore && (
				<Grid.Col>
					<Group position='center' mt='md'>
						<Button onClick={fetchMore} loading={usersState.loading}>
							Загрузить ещё
						</Button>
					</Group>
				</Grid.Col>
			)}
			{usersState.users.length === 0 && (
				<Grid.Col>
					Постов нет
				</Grid.Col>
			)}
		</Grid>
	)
})
