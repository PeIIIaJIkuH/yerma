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

	static async getUnverifiedPosts(offset: number): Promise<{results: IPost[]}> {
		return $api.get('posts/unverified/', {
			params: {
				offset,
			},
		})
	}

	static async createPost(post: FormData): Promise<IPost> {
		return $api.post('posts/', post)
	}

	static async approvePost(uuid: string) {
		return $api.put(`posts/unverified/${uuid}/verify/`)
	}

	static async deletePost(uuid: string) {
		return $api.delete(`posts/unverified/${uuid}/`)
	}
}
