import {Box, Button, Group, List, Select, Text, TextInput} from '@mantine/core'
import {Dropzone, IMAGE_MIME_TYPE} from '@mantine/dropzone'
import {useForm} from '@mantine/hooks'
import {showNotification} from '@mantine/notifications'
import {RichTextEditor, RichTextEditorLabels} from '@mantine/rte'
import {ToolbarControl} from '@mantine/rte/lib/components/Toolbar/controls'
import {observer} from 'mobx-react-lite'
import {FC, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Photo} from 'tabler-icons-react'
import {privateRoutes} from '../../routes'
import {PostsService} from '../../services'
import {authState} from '../../store'
import {CreatePagePostCategoryEnum, ICreate, PostCategoryLabels} from '../../types'

export const CreatePage: FC = observer(() => {
	const form = useForm<ICreate>({
		initialValues: {
			title: '',
			category: CreatePagePostCategoryEnum.TALE,
			author: authState.getNameSurname(),
			description: '',
		},
		validationRules: {
			title: value => /^[\S\s]+$/.test(value),
			author: value => /^[\S\s]+$/.test(value),
			description: value => /^[\S\s]+$/.test(value),
		},
		errorMessages: {
			title: 'Поле заголовок не может быть пустым',
			author: 'Поле автор не может быть пустым',
			description: 'Поле описание не может быть пустым',
		},
	})
	const ref = useRef<FormData | null>(null)
	const navigate = useNavigate()
	const [images, setImages] = useState<File[]>([])

	const onDrop = (files: File[]) => {
		setImages(files)
	}

	const onReset = () => {
		setImages([])
	}

	const onSubmit = form.onSubmit(async values => {
		console.log(values)
		return
		ref.current = new FormData()
		ref.current?.append('author', values.author)
		ref.current?.append('name', values.title)
		ref.current?.append('description', values.description)
		ref.current?.append('category', values.category)
		for (let i = 0; i < images.length; i++) {
			ref.current?.append(`images${i + 1}`, images[i], images[i].name)
		}
		try {
			await PostsService.createPost(ref.current!)
			showNotification({
				message: 'Пост создан успешно',
				color: 'green',
			})
		} catch (err) {
			showNotification({
				message: 'Не удалось создать пост',
				color: 'red',
			})
		}
		navigate(privateRoutes.main.path)
	})

	const editorControls: ToolbarControl[][] = [
		['bold', 'italic', 'underline', 'strike', 'clean'],
		['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		['unorderedList', 'orderedList'],
		['image', 'blockquote', 'sub', 'sup'],
		['alignLeft', 'alignCenter', 'alignRight'],
	]

	const editorLabels = {
		bold: 'Жирный',
		italic: 'Курсив',
		underline: 'Подчёркнутый',
		strike: 'Перечёркнутый',
		clean: 'Очистить форматирование',
		h1: 'Заголовок 1',
		h2: 'Заголовок 2',
		h3: 'Заголовок 3',
		h4: 'Заголовок 4',
		h5: 'Заголовок 5',
		h6: 'Заголовок 6',
		unorderedList: 'Маркированный список',
		orderedList: 'Упорядоченный список',
		image: 'Загрузить картинку',
		blockquote: 'Цитировать',
		sub: 'Нижний индекс',
		sup: 'Верхний индекс',
		alignLeft: 'Выровнять текст по левому краю',
		alignCenter: 'Выровнять текст по центру',
		alignRight: 'Выровнять текст по правому краю',
	}

	// const onImageUpload = async (file: File): Promise<string> => {
	// 	console.log('123', file)
	// 	setImages(prev => [...prev, file])
	// 	return ''
	// }

	return (
		<Box mx='auto' mt='lg' p='md'>
			<form onSubmit={onSubmit}>
				<TextInput label='Заголовок' {...form.getInputProps('title')} mb='md'/>
				<TextInput label='Автор' {...form.getInputProps('author')} mb='md'/>
				<Select label='Категория' data={Object.values(CreatePagePostCategoryEnum)
					.map(value => ({value, label: PostCategoryLabels[value]}))}
					{...form.getInputProps('category')} mb='md'
				/>
				<RichTextEditor value={form.getInputProps('description').value} mb='md'
					onChange={form.getInputProps('description').onChange}
					controls={editorControls} labels={editorLabels as RichTextEditorLabels}
				/>
				<Dropzone onDrop={onDrop} accept={IMAGE_MIME_TYPE} maxSize={5 * 1024 ** 2} mb='md'>
					{() => (
						<Group position='center' spacing='xl' style={{minHeight: 200, pointerEvents: 'none'}}
							direction='row' noWrap
						>
							<Photo size={80}/>
							<div>
								<Text size='xl' inline>
									Добавьте изображения
								</Text>
							</div>
						</Group>
					)}
				</Dropzone>
				{images.length > 0 && (
					<Button variant='outline' color='red' onClick={onReset} mb='sm'>
						Очистить
					</Button>
				)}
				<List>
					{images.map(image => (
						<List.Item key={image.name}>
							{image.name}
						</List.Item>
					))}
				</List>
				<Group position='center' mt='md'>
					<Button type='submit'>Создать</Button>
				</Group>
			</form>
		</Box>
	)
})
