import {Group, Image, Text} from '@mantine/core'
import {FC} from 'react'
import armsImage from '../../assets/images/arms.jpg'
import mainBg from '../../assets/images/main-bg.png'

export const MainPage: FC = () => {
	return (
		<>
			<Image src={mainBg} alt='фон' mx='-md' mt='-md'/>
			<Group position='center'>
				<Image src={armsImage} alt='герб' width={100} mt='lg'/>
				<Text>Alumniclub друзей - студентов, выпускников</Text>
			</Group>
		</>
	)
}
