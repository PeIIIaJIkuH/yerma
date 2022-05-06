import {$api} from '../api'
import {ILogin, IToken, IUser} from '../types'

export class AuthService {
	static async login(data: ILogin): Promise<IToken> {
		return $api.post('token/', data)
	}

	static async refreshToken(refresh: string): Promise<IToken> {
		return $api.post('token/refresh/', {refresh})
	}

	static async getUserInfo(): Promise<IUser> {
		return $api.get('users/me/')
	}
}
