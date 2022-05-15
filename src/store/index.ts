import {AppState} from './appState'
import {AuthState} from './authState'
import {PostsState} from './postsState'

const authState = new AuthState()
const appState = new AppState()
const postsState = new PostsState()

export {authState, appState, postsState}
