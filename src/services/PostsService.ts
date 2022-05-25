import {$api} from '../api'
import {IPost, PostFilters} from '../types'

export class PostsService {
	static async getPosts(filters: PostFilters, offset: number): Promise<{results: IPost[]}> {
		return $api.get('posts/', {
			params: {
				...filters,
				offset,
				limit: 10,
			},
		})
	}

	static async createPost(post: FormData): Promise<IPost> {
		return $api.post('posts/', post)
	}
}
