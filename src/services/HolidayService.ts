import {$api} from '../api'
import {IHoliday} from '../types'

export class HolidayService {
	static async getHoliday(): Promise<{results: IHoliday[]}> {
		return $api.get('users/holidays/')
	}
}
