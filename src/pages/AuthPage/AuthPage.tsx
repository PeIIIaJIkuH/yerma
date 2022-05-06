import {Card, Divider, Group, Title} from '@mantine/core'
import {FC} from 'react'
import {LoginForm} from '../../components'

export const AuthPage: FC = () => {
	return (
		<Card sx={{maxWidth: 300}} mx='auto' mt='lg' shadow='xl'>
			<Card.Section p='md'>
				<Group position='center'>
					<Title order={4}>Вход</Title>
				</Group>
			</Card.Section>
			<Divider mx='-md'/>
			<Card.Section p='md'>
				<LoginForm/>
			</Card.Section>
		</Card>
	)
}
