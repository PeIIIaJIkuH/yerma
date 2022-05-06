import {makeAutoObservable} from 'mobx'
import {AuthService} from '../services'
import {ILogin, IUser} from '../types'

export class AuthState {
	user: IUser | null

	constructor() {
		makeAutoObservable(this)
		this.user = null
	}

	setUser(user: IUser | null) {
		this.user = user
	}

	async login(values: ILogin) {
		try {
			const {access, refresh} = await AuthService.login(values)
			localStorage.setItem('accessToken', access)
			localStorage.setItem('refreshToken', refresh)
			await this.fetchUserData()
			return true
		} catch (err) {
			return false
		}
	}

	logout() {
		this.setUser(null)
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
	}

	async fetchUserData() {
		try {
			const user = await AuthService.getUserInfo()
			this.setUser(user)
		} catch (err) {
			this.logout()
		}
	}

	getNameSurname() {
		if (this.user?.first_name && this.user.last_name) {
			return `${this.user.first_name} ${this.user.last_name}`
		} else if (this.user?.first_name) {
			return this.user.first_name
		} else if (this.user?.last_name) {
			return this.user.last_name
		}
		return ''
	}
}
