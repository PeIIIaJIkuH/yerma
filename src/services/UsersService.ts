import {$api} from '../api'
import {IUser, IUserGroup} from '../types'

export class UsersService {
	static async getUserGroups(): Promise<{results: IUserGroup[]}> {
		return $api.get('users/groups/')
	}

	static async getUsers(groupId: string): Promise<{result: IUser[]}> {
		return $api.get(`users/groups/${groupId}/`)
	}
}
