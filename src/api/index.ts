import {showNotification} from '@mantine/notifications'
import axios from 'axios'
import {AuthService} from '../services'
import {authState} from '../store'
import {IToken} from '../types'

const {VITE_API_URL} = import.meta.env

export const $api = axios.create({
	baseURL: VITE_API_URL,
})

$api.interceptors.request.use(
	config => {
		const token = localStorage.getItem('accessToken')
		config.headers!.Authorization = `Bearer ${token}`
		return config
	},
	error => Promise.reject(error),
)

let refreshRequest: null | Promise<IToken> = null

$api.interceptors.response.use(
	response => response.data,
	async error => {
		const refreshToken = localStorage.getItem('refreshToken')
		const originalConfig = error.config
		if (error.response.status === 401 && (refreshToken === 'undefined' || !originalConfig._retry)) {
			if (authState.user) {
				authState.logout()
				showNotification({
					message: 'Истёк срок авторизации',
					color: 'red',
				})
			}
		}
		if (!refreshToken || refreshToken === 'undefined' || error.response?.status !== 401 || !originalConfig._retry) {
			return Promise.reject(error)
		}
		try {
			if (!refreshRequest) {
				refreshRequest = AuthService.refreshToken(refreshToken)
			}
			const {access, refresh} = await refreshRequest
			refreshRequest = null
			localStorage.setItem('accessToken', access)
			localStorage.setItem('refreshToken', refresh)
			originalConfig._retry = true
			return $api(originalConfig)
		} catch (err) {
			if (axios.isAxiosError(err) && err.response?.status === 401) {
				authState.logout()
				showNotification({
					message: 'Истёк срок авторизации',
					color: 'red',
				})
			}
			return Promise.reject(err)
		}
	},
)
