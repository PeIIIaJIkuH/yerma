import {$api} from '../api'
import {IPost, PostCategoryEnum} from '../types'

export class PostsService {
	static async getPosts(category: PostCategoryEnum, offset: number): Promise<{results: IPost[]}> {
		return $api.get('posts/', {
			params: {
				category,
				offset,
				limit: 10,
			},
		})
	}

	static async createPost(post: FormData): Promise<IPost> {
		return $api.post('posts/', post)
	}

	static async getPost(postId: string): Promise<IPost> {
		return $api.get(`posts/${postId}/`)
	}
}
