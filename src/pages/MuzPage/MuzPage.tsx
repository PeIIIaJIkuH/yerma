import {Divider, Group, Image, Text, Title} from '@mantine/core'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {Posts} from '../../components'
import {PostCategoryEnum} from '../../types'
import bgImage from './../../assets/images/9muz-bg.jpg'

export const MuzPage: FC = observer(() => {
	return (
		<>
			<Title order={2} p='md' align='center'>
				Памяти Егурновой Лилии Зосимовной
			</Title>
			<Image src={bgImage}/>
			<Group position='center' direction='column' spacing={0} mt='lg'>
				<Text>Ваш скромный труд цены не знает,</Text>
				<Text>Ни с чем он не сравним! И все с любовью величают</Text>
				<Text>Вас именем простым –</Text>
				<Text>Преподаватель кто же её не знает,</Text>
				<Text>Простое имя это – Лилия!</Text>
				<Text>И пусть года, как свечи, тают,</Text>
				<Text>Нам не забыть Вас никогда!</Text>
			</Group>
			<Divider my='lg'/>
			<Group position='center' direction='column' spacing={0} mb='lg'>
				<Text>Душою красивы и очень добры,</Text>
				<Text>Талантом сильны вы и сердцем щедры.</Text>
				<Text>Все ваши идеи, мечты о прекрасном,</Text>
				<Text>Занятии, затеи не прошли напрасно!</Text>
				<Text>Студентам дорогу сумели найти!</Text>
			</Group>
			<Group direction='column' px='md' style={{textIndent: 20}}>
				<Text>
					Преподаватель с нежным именем Лилия. Вы, навсегда останетесь любимой, уважаемым преподавателем. Ваша
					любовь к предмету привлекала нас. И благодаря, Вам открылись совершенно новые грани
					пропедевтического
					курса «Русское народное творчество».
				</Text>
				<Text>
					Ваш энергичный позитив и очень тонкое понимание предмета увлекало нас до глубины души. Спасибо Вам
					за
					создание литературного кружка «9 - Муз», где мы с большим удовольствием посещали и принимали
					активное
					участие. Ваше умение работать со студентами пробуждало восхищение к народному творчеству, а Ваш
					профессионализм призывал нас студентов к усердному изучению курса! Хочется сказать Вам огромное
					спасибо
					за то, что с Ваших занятии мы получали для себя новое. Занятия Лилии Зосимовны были очень
					интересными и
					насыщенными. Преподаватель с нежным именем и добрым сердцем, Вам спасибо!
				</Text>
				<Text>
					Нашему курсу безгранично повезло с таким преподавателем, как Лилия Зосимовна, начиная с первых дней
					занятии направляла нас на верный путь, чтобы мы учились ставить цель в жизни!
				</Text>
			</Group>
			<Group position='center' direction='column' spacing={0} my='lg'>
				<Text>Преподаватель! Какое прекрасное слово,</Text>
				<Text>Оно в нашей жизни и свет и основа.</Text>
				<Text>Сияет для нас путеводной звездой,</Text>
				<Text>И в мир новых знаний ведёт за собой!</Text>
			</Group>
			<Group position='right' direction='column' spacing={0} px='md'>
				<Text>С большим уважением группа</Text>
				<Text>« Д» филологический факультет</Text>
				<Text>Выпуск 1978-1983гг</Text>
			</Group>
			<Posts category={PostCategoryEnum.MUSE}/>
		</>
	)
})
