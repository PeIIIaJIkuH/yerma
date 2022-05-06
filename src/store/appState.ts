import {makeAutoObservable} from 'mobx'
import {authState} from './index'

export class AppState {
	initialized = false

	constructor() {
		makeAutoObservable(this)
	}

	initialize() {
		this.initialized = true
	}

	async initializeApp() {
		await authState.fetchUserData()
		this.initialize()
	}
}
