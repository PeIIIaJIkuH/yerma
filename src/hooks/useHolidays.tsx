import {NotificationProps, showNotification, updateNotification} from '@mantine/notifications'
import {useEffect, useState} from 'react'
import {flushSync} from 'react-dom'
import {HolidayService} from '../services'

export const useHolidays = (isAuth: boolean) => {
	const [initialized, setInitialized] = useState(false)

	useEffect(() => {
		if (!isAuth) {
			return
		}
		(async () => {
			const {results: holidays} = await HolidayService.getHoliday()
			if (holidays.length === 0) {
				return
			}
			const notification: NotificationProps = {
				id: 'holidays',
				title: 'Сегодня празднуют',
				color: 'blue',
				autoClose: false,
				message: holidays.map(({uuid, name}) => (
					<div key={uuid}>
						{name}
					</div>
				)),
			}
			if (!initialized) {
				flushSync(() => {
					setInitialized(true)
				})
				showNotification(notification)
			} else {
				updateNotification(notification as NotificationProps & {id: string})
			}
		})()
	}, [isAuth])
}
