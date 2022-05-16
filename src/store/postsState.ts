import {makeAutoObservable} from 'mobx'
import {PostsService} from '../services'
import {IPost, PostCategoryEnum, PostFilters} from '../types'
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

	async fetchPosts(filters: PostFilters, another?: boolean) {
		if ((!this.hasMore && !another) || !authState.user) {
			return
		}
		if (another) {
			this.setPosts([])
			this.setOffset(0)
			this.setHasMore(true)
		}
		this.setLoading(true)
		try {
			const {results} = await PostsService.getPosts(filters, this.offset)
			this.updateOffset()
			if (!results || results.length < 10) {
				this.setHasMore(false)
			}
			this.setPosts([...this.posts, ...results])
		} finally {
			this.setLoading(false)
		}
	}
}
