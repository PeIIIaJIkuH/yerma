import {Image, MantineNumberSize, Modal, useMantineTheme} from '@mantine/core'
import {FC, useState} from 'react'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import s from './Slider.module.css'

interface Props {
	images: string[]
	radius?: MantineNumberSize
}

export const Slider: FC<Props> = ({images, radius}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [imgSrc, setImgSrc] = useState('')
	const theme = useMantineTheme()

	const onClose = () => {
		setIsOpen(false)
	}

	const openModal = (image: string) => {
		setImgSrc(image)
		setIsOpen(true)
	}

	return (
		<>
			<Modal opened={isOpen} onClose={onClose} title='Изображение'
				overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
				overlayOpacity={0.55} overlayBlur={3} overflow='inside' size='100%'
			>
				<Image radius={radius} src={imgSrc} alt='image'/>
			</Modal>
			<Carousel showThumbs={false} showStatus={false}>
				{images.map((image, index) => (
					<div key={index}>
						<Image height={400} fit='cover' radius={radius} src={image} alt='image' className={s.image}
							onClick={openModal.bind(null, image)}
						/>
					</div>
				))}
			</Carousel>
		</>
	)
}
