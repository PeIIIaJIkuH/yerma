import {makeAutoObservable} from 'mobx'
import {PostsService} from '../services'
import {FetchPostsParams, IPost, PostFilters} from '../types'
import {authState} from './index'

export class PostsState {
	posts = [] as IPost[]
	offset = 0
	hasMore = true
	loading = false

	constructor() {
		makeAutoObservable(this)
	}

	setPosts(posts: IPost[]) {
		this.posts = posts
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

	async fetchPosts(filters: PostFilters, params?: FetchPostsParams) {
		if ((!this.hasMore && !params?.anotherType) || !authState.user) {
			return
		}
		if (params?.anotherType) {
			this.setPosts([])
			this.setOffset(0)
			this.setHasMore(true)
		}
		this.setLoading(true)
		try {
			let response: {results: IPost[]}
			if (params?.unverified) {
				response = await PostsService.getUnverifiedPosts(this.offset)
			} else {
				response = await PostsService.getPosts(filters, this.offset)
			}
			const {results: posts} = response
			this.updateOffset()
			if (!posts || posts.length < 10) {
				this.setHasMore(false)
			}
			this.setPosts([...this.posts, ...posts])
		} finally {
			this.setLoading(false)
		}
	}

	removePost(uuid: string) {
		this.setPosts(this.posts.filter(post => post.uuid !== uuid))
	}

	async approvePost(uuid: string) {
		await PostsService.approvePost(uuid)
		this.removePost(uuid)
	}

	async deletePost(uuid: string) {
		await PostsService.deletePost(uuid)
		this.removePost(uuid)
	}
}
