import {ActionIcon, useMantineTheme} from '@mantine/core'
import {FC} from 'react'
import {Moon, Sun} from 'tabler-icons-react'

interface Props {
	toggle: () => void
}

export const DarkModeButton: FC<Props> = ({toggle}) => {
	const theme = useMantineTheme()

	const onClick = () => {
		toggle()
	}

	return (
		<ActionIcon size={36} title='Тёмный режим' variant='default' onClick={onClick}>
			{theme.colorScheme === 'dark' ? (
				<Sun size={18}/>
			) : (
				<Moon size={18}/>
			)}
		</ActionIcon>
	)
}
