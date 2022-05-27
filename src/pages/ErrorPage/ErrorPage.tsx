import {Button, Container, createStyles, Group, Text, Title} from '@mantine/core'
import {useDocumentTitle} from '@mantine/hooks'
import {FC} from 'react'
import {useNavigate} from 'react-router-dom'

const useStyles = createStyles((theme) => ({
	root: {
		paddingTop: 80,
		paddingBottom: 80,
	},

	label: {
		textAlign: 'center',
		fontWeight: 900,
		fontSize: 220,
		lineHeight: 1,
		marginBottom: theme.spacing.xl * 1.5,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 120,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		textAlign: 'center',
		fontWeight: 900,
		fontSize: 38,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 32,
		},
	},
}))

interface Props {
	code: 404 | 403
	title: string
}

export const ErrorPage: FC<Props> = ({code, title}) => {
	const {classes} = useStyles()
	const navigate = useNavigate()
	useDocumentTitle('404 | ВГПУ')

	const onClick = () => {
		navigate('/')
	}

	return (
		<Container className={classes.root}>
			<Text color='dimmed' className={classes.label}>
				{code}
			</Text>
			<Title className={classes.title}>
				{title}
			</Title>
			<Group position='center' mt='md'>
				<Button variant='subtle' size='md' onClick={onClick}>
					Вернуться на главную
				</Button>
			</Group>
		</Container>
	)
}
