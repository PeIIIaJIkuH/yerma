import {makeAutoObservable} from 'mobx'
import {UsersService} from '../services'
import {IUser} from '../types'
import {authState} from './index'

export class UsersState {
	users = [] as IUser[]
	offset = 0
	hasMore = true
	loading = false

	constructor() {
		makeAutoObservable(this)
	}

	setUsers(users: IUser[]) {
		this.users = users
	}

	setOffset(offset: number) {
		this.offset = offset
	}

	updateOffset() {
		this.offset += 10
	}

	setHasMore(hasMore: boolean) {
		this.hasMore = hasMore
	}

	setLoading(loading: boolean) {
		this.loading = loading
	}

	async fetchUsers(groupId: string, another?: boolean) {
		if ((!this.hasMore && !another) || !authState.user) {
			return
		}
		if (another) {
			this.setUsers([])
			this.setOffset(0)
			this.setHasMore(true)
		}
		this.setLoading(true)
		try {
			const {results: groups} = await UsersService.getUserGroups()
			console.log(groups)
			const {result: users} = await UsersService.getUsers(groups[0].uuid)
			console.log(users)
		} finally {
			this.setLoading(false)
		}
	}
}
