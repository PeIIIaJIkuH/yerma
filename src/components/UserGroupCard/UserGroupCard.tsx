import {Card} from '@mantine/core'
import {FC} from 'react'

interface Props {
}

export const UserGroupCard: FC<Props> = () => {

	return (
		<Card shadow='sm' p='xl'>
			<Card.Section>
				user group card
			</Card.Section>
		</Card>
	)
}
